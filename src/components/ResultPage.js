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

  const deliveryLabels = {
    "door-door": "Доставка до двери",
    "pvz-door": "Доставка до пункта выдачи TRANSASIA"
  };

  return (
    <div style={{
      maxWidth: "520px",
      margin: "0 auto",
      padding: "2rem",
      fontFamily: "Segoe UI, sans-serif",
      backgroundColor: "#F0F2F5",
      borderRadius: "12px",
      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
      height: "100vh",
      boxSizing: "border-box"
    }}>

        <h2 style={{
          color: "#2C3E50",
          marginBottom: "1.5rem",
          fontSize: "1.7rem"
        }}>
          📦 Результат расчета
        </h2>
      <p style={textStyle}><strong>🚚 Тип доставки:</strong> {deliveryLabels[deliveryType] || deliveryType}</p>
      <p style={textStyle}><strong>📍 Откуда:</strong> {fromCity}</p>
      <p style={textStyle}><strong>📍 Куда:</strong> {toCity}</p>
      <p style={textStyle}><strong>⚖️ Вес:</strong> {weight} кг</p>
      <p style={textStyle}><strong>💵 Стоимость:</strong> {price} сум</p>
      <p style={{ fontStyle: "italic", marginTop: "1rem", fontSize: "1rem", color: "#555" }}>
        {note}
      </p>

      <button
        onClick={() => navigate("/order", {
          state: {
            deliveryType,
            toCity,
            weight,
            price
          }
        })}
        style={{
          marginTop: "2rem",
          padding: "1rem 1.5rem",
          backgroundColor: "#D32F2F",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          width: "100%",
          fontWeight: "bold",
          fontSize: "1.1rem"
        }}
      >
        📝 Оформить заказ
      </button>

      <button
          onClick={() => navigate('/')}
          style={{
          marginTop: "1rem",
          padding: "0.8rem 1.2rem",
          backgroundColor: "#2C3E50",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          width: "100%",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
          ⬅️ Назад      </button>
    </div>
  );
}

const textStyle = {
  fontSize: "1.1rem",
  color: "#333",
  marginBottom: "0.6rem"
};
