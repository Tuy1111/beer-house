import { useState } from "react";

export default function Menu({
  menu,
  addToCart,
  addNewMenuItem,
  deleteMenuItem,
  resetMenu,
}) {
  const [newItem, setNewItem] = useState({
    name: "",
    type: "",
    price: "",
    stock: "",
  });

  const handleAddNew = () => {
    if (!newItem.name || !newItem.price || !newItem.stock) {
      alert("⚠️ Nhập đủ thông tin!");
      return;
    }
    addNewMenuItem({
      name: newItem.name,
      type: newItem.type || "Khác",
      price: Number(newItem.price),
      stock: Number(newItem.stock),
    });
    setNewItem({ name: "", type: "", price: "", stock: "" });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🍺 Menu Quán Bia</h2>

      {/* Thêm món mới */}
      <div style={styles.formBox}>
        <h4>🆕 Thêm món mới</h4>
        <input
          placeholder="Tên món"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          placeholder="Loại"
          value={newItem.type}
          onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
        />
        <input
          type="number"
          placeholder="Giá"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Tồn kho"
          value={newItem.stock}
          onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
        />
        <button onClick={handleAddNew} style={styles.addNewBtn}>
          ➕ Thêm món
        </button>
        <button onClick={resetMenu} style={styles.resetBtn}>
          ♻️ Reset menu gốc
        </button>
      </div>

      {/* Danh sách món */}
      <div style={styles.grid}>
        {menu.map((item) => (
          <div key={item.id} style={styles.card}>
            <h3>{item.name}</h3>
            <p>{item.type}</p>
            <p>{item.price.toLocaleString()}đ</p>
            <p
              style={{
                color: item.stock > 0 ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {item.stock > 0 ? `Còn: ${item.stock}` : "Hết hàng"}
            </p>
            <button
              onClick={() => addToCart(item)}
              disabled={item.stock <= 0}
              style={{
                ...styles.addBtn,
                opacity: item.stock > 0 ? 1 : 0.5,
              }}
            >
              🛒 Thêm
            </button>
            <button
              onClick={() => deleteMenuItem(item.id)}
              style={styles.deleteBtn}
            >
              🗑️ Xóa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  formBox: {
    background: "#f8f8f8",
    padding: "10px",
    borderRadius: "8px",
    display: "inline-block",
    marginBottom: "20px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1rem",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "1rem",
    width: "180px",
    backgroundColor: "white",
  },
  addBtn: {
    backgroundColor: "#ffbf00",
    border: "none",
    borderRadius: "8px",
    padding: "6px 12px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "6px 12px",
    marginTop: "5px",
    cursor: "pointer",
  },
  addNewBtn: {
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    marginLeft: "10px",
    cursor: "pointer",
  },
  resetBtn: {
    backgroundColor: "#555",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    marginLeft: "10px",
    cursor: "pointer",
  },
};
