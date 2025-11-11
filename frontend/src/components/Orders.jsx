import { useState } from "react";
import {
  updateOrderStatus,
  deleteOrder,
  updateOrder,
} from "../services/api";

export default function Orders({ orders, refresh }) {
  const [editingOrder, setEditingOrder] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleUpdateStatus = async (id, status) => {
    await updateOrderStatus(id, status);
    refresh();
  };

  const handleDelete = async (id) => {
    if (window.confirm("❗Bạn có chắc muốn xóa bill này không?")) {
      await deleteOrder(id);
      refresh();
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order.id);
    setEditedData({ ...order });
  };

  const handleSave = async (id) => {
    await updateOrder(id, editedData);
    setEditingOrder(null);
    refresh();
  };

  const handleCancel = () => {
    setEditingOrder(null);
    setEditedData({});
  };

  const handleChange = (field, value) => {
    setEditedData({ ...editedData, [field]: value });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>📋 Quản lý Đơn hàng</h2>
      <button onClick={refresh} style={styles.refreshBtn}>
        🔄 Làm mới
      </button>

      {orders.length === 0 ? (
        <p>Chưa có đơn hàng nào.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Bàn</th>
              <th>Tổng tiền</th>
              <th>Thời gian</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>
                  {editingOrder === o.id ? (
                    <input
                      value={editedData.table}
                      onChange={(e) =>
                        handleChange("table", e.target.value)
                      }
                      style={styles.input}
                    />
                  ) : (
                    o.table
                  )}
                </td>
                <td>
                  {editingOrder === o.id ? (
                    <input
                      type="number"
                      value={editedData.total}
                      onChange={(e) =>
                        handleChange("total", Number(e.target.value))
                      }
                      style={styles.input}
                    />
                  ) : (
                    o.total.toLocaleString() + "đ"
                  )}
                </td>
                <td>{o.time}</td>
                <td>
                  {editingOrder === o.id ? (
                    <select
                      value={editedData.status}
                      onChange={(e) =>
                        handleChange("status", e.target.value)
                      }
                      style={styles.input}
                    >
                      <option value="pending">pending</option>
                      <option value="completed">completed</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  ) : (
                    <span
                      style={{
                        color:
                          o.status === "completed"
                            ? "green"
                            : o.status === "cancelled"
                            ? "red"
                            : "orange",
                        fontWeight: "bold",
                      }}
                    >
                      {o.status}
                    </span>
                  )}
                </td>
                <td>
                  {editingOrder === o.id ? (
                    <>
                      <button
                        onClick={() => handleSave(o.id)}
                        style={styles.saveBtn}
                      >
                        💾 Lưu
                      </button>
                      <button
                        onClick={handleCancel}
                        style={styles.cancelBtn}
                      >
                        ❌ Hủy
                      </button>
                    </>
                  ) : (
                    <>
                      {o.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleUpdateStatus(o.id, "completed")
                            }
                            style={styles.okBtn}
                          >
                            ✅ Hoàn tất
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateStatus(o.id, "cancelled")
                            }
                            style={styles.cancelBtn}
                          >
                            ❌ Hủy
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleEdit(o)}
                        style={styles.editBtn}
                      >
                        ✏️ Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(o.id)}
                        style={styles.deleteBtn}
                      >
                        🗑️ Xóa
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  
  table: {
    margin: "20px auto",
    borderCollapse: "collapse",
    width: "80%",
  },
  refreshBtn: {
    background: "#ffbf00",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  okBtn: {
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 8px",
    marginRight: "5px",
    cursor: "pointer",
  },
  cancelBtn: {
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 8px",
    marginRight: "5px",
    cursor: "pointer",
  },
  editBtn: {
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 8px",
    marginRight: "5px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#555",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 8px",
    cursor: "pointer",
  },
  saveBtn: {
    background: "#00b300",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 8px",
    marginRight: "5px",
    cursor: "pointer",
  },
  input: {
    padding: "3px 5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
};
