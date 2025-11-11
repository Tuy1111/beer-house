import express from "express";
import cors from "cors";
import fs from "fs";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4001;
const HOST = process.env.HOST || "0.0.0.0"; // Cho phép truy cập từ LAN

app.use(cors());
app.use(bodyParser.json());

// Serve frontend (sau khi build)
app.use(express.static(path.join(__dirname, "public")));

const menuFile = "./data/menu.json";
const ordersFile = "./data/orders.json";

// 📋 GET menu
app.get("/api/menu", (req, res) => {
  const data = JSON.parse(fs.readFileSync(menuFile));
  res.json(data);
});

// 🧾 GET orders
app.get("/api/orders", (req, res) => {
  const data = JSON.parse(fs.readFileSync(ordersFile));
  const { table } = req.query;
  if (table) res.json(data.filter((o) => o.table === table));
  else res.json(data);
});

// ➕ POST order
app.post("/api/orders", (req, res) => {
  const data = JSON.parse(fs.readFileSync(ordersFile));
  const newOrder = {
    id: Date.now(),
    table: req.body.table,
    items: req.body.items,
    total: req.body.total,
    status: "pending",
    time: new Date().toLocaleString("vi-VN"),
  };
  data.push(newOrder);
  fs.writeFileSync(ordersFile, JSON.stringify(data, null, 2));
  res.json({ message: "Order created!", order: newOrder });
});
// PUT /api/orders/:id - cập nhật đơn hàng
app.put("/api/orders/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updated = req.body;
  const filePath = path.join(__dirname, "data", "orders.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const index = data.findIndex((o) => o.id === id);
  if (index === -1) return res.status(404).send({ message: "Order not found" });

  data[index] = { ...data[index], ...updated };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.json({ message: "Order updated", order: data[index] });
});

// POST /api/menu - thêm món mới
app.post("/api/menu", (req, res) => {
  const filePath = path.join(__dirname, "data", "menu.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const newItem = { id: Date.now(), ...req.body };
  data.push(newItem);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json({ message: "Đã thêm món", item: newItem });
});

// DELETE /api/menu/:id - xóa món
app.delete("/api/menu/:id", (req, res) => {
  const filePath = path.join(__dirname, "data", "menu.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const id = parseInt(req.params.id);
  const updated = data.filter((m) => m.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
  res.json({ message: "Đã xóa món" });
});

// Serve React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, HOST, () => {
  console.log(`✅ Server running at http://${HOST}:${PORT}`);
});
