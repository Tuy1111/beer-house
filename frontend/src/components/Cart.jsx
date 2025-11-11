export default function Cart({ cart, removeOne, removeAll, checkout }) {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🧾 Giỏ hàng</h2>

      {cart.length === 0 ? (
        <p>Chưa có món nào.</p>
      ) : (
        <>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Tên món</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Thành tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((i, idx) => (
                <tr key={idx}>
                  <td>{i.name}</td>
                  <td>
                    <button
                      onClick={() => removeOne(i.id)}
                      style={styles.qtyBtn}
                    >
                      ➖
                    </button>
                    <span style={{ margin: "0 10px" }}>{i.qty}</span>
                    <button
                      onClick={() => removeAll(i.id, 1)}
                      style={styles.qtyBtn}
                    >
                      ➕
                    </button>
                  </td>
                  <td>{i.price.toLocaleString()}đ</td>
                  <td>{(i.price * i.qty).toLocaleString()}đ</td>
                  <td>
                    <button
                      onClick={() => removeAll(i.id)}
                      style={styles.removeBtn}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Tổng: {total.toLocaleString()}đ</h3>
          <button onClick={checkout} style={styles.checkoutBtn}>
            ✅ Thanh toán
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  table: {
    margin: "auto",
    borderCollapse: "collapse",
  },
  qtyBtn: {
    background: "#ffbf00",
    border: "none",
    padding: "3px 8px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  removeBtn: {
    background: "red",
    border: "none",
    color: "white",
    padding: "4px 6px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  checkoutBtn: {
    background: "green",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
