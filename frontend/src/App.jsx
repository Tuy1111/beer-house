import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import TableSelector from "./components/TableSelector";
import { getMenu, createOrder, getOrders } from "./services/api";
import "./App.css";

function App() {
  const [page, setPage] = useState("menu");
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [table, setTable] = useState("1");
  const [orders, setOrders] = useState([]);

  // 🔹 1️⃣ Khởi tạo menu (ưu tiên lấy từ localStorage)
  useEffect(() => {
    const localData = localStorage.getItem("beer_menu");
    if (localData) {
      setMenu(JSON.parse(localData));
    } else {
      getMenu().then((res) => {
        setMenu(res.data);
        localStorage.setItem("beer_menu", JSON.stringify(res.data));
      });
    }
  }, []);

  // 🔹 2️⃣ Lưu lại mỗi khi menu thay đổi
  useEffect(() => {
    if (menu.length > 0) {
      localStorage.setItem("beer_menu", JSON.stringify(menu));
    }
  }, [menu]);

  // 🔹 3️⃣ Thêm món mới (admin)
  const addNewMenuItem = (newItem) => {
    const item = { ...newItem, id: Date.now() };
    const updated = [...menu, item];
    setMenu(updated);
  };

  // 🔹 4️⃣ Xóa món khỏi menu (admin)
  const deleteMenuItem = (id) => {
    if (window.confirm("❌ Bạn có chắc muốn xóa món này không?")) {
      const updated = menu.filter((m) => m.id !== id);
      setMenu(updated);
    }
  };

  // 🔹 5️⃣ Giảm stock khi khách đặt món
  const addToCart = (item) => {
    const updatedMenu = menu.map((m) =>
      m.id === item.id && m.stock > 0 ? { ...m, stock: m.stock - 1 } : m
    );
    setMenu(updatedMenu);

    const existing = cart.find((c) => c.id === item.id);
    if (existing) {
      setCart(
        cart.map((c) =>
          c.id === item.id ? { ...c, qty: c.qty + 1 } : c
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  // 🔹 6️⃣ Trả stock khi bỏ món khỏi giỏ
  const removeOneFromCart = (itemId) => {
    const updatedCart = cart
      .map((c) => (c.id === itemId ? { ...c, qty: c.qty - 1 } : c))
      .filter((c) => c.qty > 0);

    const updatedMenu = menu.map((m) =>
      m.id === itemId ? { ...m, stock: m.stock + 1 } : m
    );

    setCart(updatedCart);
    setMenu(updatedMenu);
  };

  // 🔹 7️⃣ Xóa món khỏi giỏ hoàn toàn
  const removeItemCompletely = (itemId) => {
    const item = cart.find((c) => c.id === itemId);
    if (!item) return;

    const updatedMenu = menu.map((m) =>
      m.id === itemId ? { ...m, stock: m.stock + item.qty } : m
    );

    setMenu(updatedMenu);
    setCart(cart.filter((c) => c.id !== itemId));
  };

  // 🔹 8️⃣ Thanh toán và gửi order
  const handleCheckout = async () => {
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const order = { table, items: cart, total };
    await createOrder(order);
    setCart([]);
    alert("✅ Order đã gửi!");
  };

  // 🔹 9️⃣ Làm mới danh sách đơn hàng
  const refreshOrders = () =>
    getOrders(table).then((res) => setOrders(res.data));

  // 🔹 🔟 Reset menu về file gốc (nếu muốn)
  const resetMenu = async () => {
    if (window.confirm("♻️ Bạn có chắc muốn khôi phục menu gốc không?")) {
      const res = await getMenu();
      setMenu(res.data);
      localStorage.setItem("beer_menu", JSON.stringify(res.data));
      alert("✅ Đã khôi phục menu gốc!");
    }
  };

  return (
    <div>
      <Navbar setPage={setPage} />
      <TableSelector table={table} setTable={setTable} />

      {page === "menu" && (
        <Menu
          menu={menu}
          addToCart={addToCart}
          addNewMenuItem={addNewMenuItem}
          deleteMenuItem={deleteMenuItem}
          resetMenu={resetMenu}
        />
      )}

      {page === "cart" && (
        <Cart
          cart={cart}
          removeOne={removeOneFromCart}
          removeAll={removeItemCompletely}
          checkout={handleCheckout}
        />
      )}

      {page === "orders" && (
        <Orders orders={orders} refresh={refreshOrders} />
      )}
    </div>
  );
}

export default App;
