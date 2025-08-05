import { useLocation, useNavigate } from "react-router-dom";

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <p>Нет данных для отображения результата.</p>;
  }

  const {
    deliveryType,
    fromCity,
    toCity,
    weight,
    price,
    note,
  } = state;

  // Преобразование типа доставки
  const deliveryLabels = {
    "door-pvz": "Доставка до пункта выдачи TRANSASIA",
    "door-door": "Доставка до двери",
  };

  return (
    <div style={{
      maxWidth: "480px",
      margin: "0 auto",
      padding: "1.5rem",
      fontFamily: "Segoe UI",
      backgroundColor: "#F5F5F5",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      height: "100vh"
    }}>
      <h2 style={{ color: "#D32F2F", marginBottom: "1rem" }}>📦 Результат расчета</h2>

      <p><strong>🚚 Тип доставки:</strong> {deliveryLabels[deliveryType] || deliveryType}</p>
      <p><strong>📍 Откуда:</strong> {fromCity}</p>
      <p><strong>📍 Куда:</strong> {toCity}</p>
      <p><strong>⚖️ Вес:</strong> {weight} кг</p>
      <p><strong>💵 Стоимость:</strong> {price} сум</p>
      <p style={{ fontStyle: "italic", marginTop: "0.5rem" }}>{note}</p>

      <button
        onClick={() => navigate("/order")}
        style={{
          marginTop: "1.5rem",
          padding: "0.8rem 1.2rem",
          backgroundColor: "#D32F2F",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          width: "100%",
          fontWeight: "bold"
        }}
      >
        📝 Оформить заказ
      </button>
    </div>
  );
}
