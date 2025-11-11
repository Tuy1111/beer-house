export default function Navbar({ setPage }) {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>🍻 Beer House</h2>
      <div style={styles.links}>
        <button onClick={() => setPage("menu")}>Menu</button>
        <button onClick={() => setPage("cart")}>Giỏ hàng</button>
        <button onClick={() => setPage("orders")}>Đơn hàng</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: { display: "flex", justifyContent: "space-between", padding: "1rem", background: "#333", color: "white" },
  logo: { margin: 0 },
  links: { display: "flex", gap: "10px" }
};

