export default function TableSelector({ table, setTable }) {
  return (
    <div style={{ textAlign: "center", margin: "10px" }}>
      <label>Chọn bàn: </label>
      <select value={table} onChange={(e) => setTable(e.target.value)}>
        <option value="1">Bàn 1</option>
        <option value="2">Bàn 2</option>
        <option value="3">Bàn 3</option>
        <option value="4">Bàn 4</option>
      </select>
    </div>
  );
}
