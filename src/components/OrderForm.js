import { useState } from "react";
import axios from "axios";

export default function OrderForm() {
  const [formData, setFormData] = useState({
    deliveryType: "",
    senderName: "",
    senderPhone: "",
    senderAddress: "",
    recipientName: "",
    recipientPhone: "",
    recipientAddress: "",
    weight: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    setError("");
    const {
      deliveryType,
      senderName,
      senderPhone,
      senderAddress,
      recipientName,
      recipientPhone,
      recipientAddress,
      weight,
    } = formData;

    if (
      !deliveryType ||
      !senderName ||
      !senderPhone ||
      !senderAddress ||
      !recipientName ||
      !recipientPhone ||
      !recipientAddress ||
      !weight
    ) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }


    try {
      await axios.post("http://localhost:3000/api/orders/submit", formData);
      setSubmitted(true);
    } catch (err) {
      setError("Произошла ошибка при отправке. Попробуйте снова.", err);
      console.error(err);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "1.5rem" }}>
        <h2 style={{ color: "#4CAF50" }}>✅ Заявка отправлена!</h2>
        <p>С вами скоро свяжется оператор.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "480px",
        margin: "0 auto",
        padding: "1.5rem",
        fontFamily: "Segoe UI, sans-serif",
        backgroundColor: "#F5F5F5",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        
      }}
    >
      <h2 style={{ marginBottom: "1rem", color: "#D32F2F" }}>
        📝 Оформление заявки
      </h2>

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}

      {/* Вариант доставки */}
      <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>
        Вариант перевозки*
        <select
          value={formData.deliveryType}
          onChange={(e) => handleChange("deliveryType", e.target.value)}
          style={{
            display: "block",
            width: "100%",
            marginTop: "6px",
            marginBottom: "12px",
            padding: "0.6rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            backgroundColor: "#FAFAFA",
          }}
        >
          <option value="">Выберите</option>
          <option value="pvz-pvz">ПВЗ–ПВЗ</option>
          <option value="pvz-door">ПВЗ–Дверь</option>
          <option value="pvz-door">Дверь–ПВЗ</option>
          <option value="door-door">Дверь–Дверь</option>
        </select>
      </label>

      <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>
        Имя отправителя*
        <input
          type="text"
          placeholder="Введите имя"
          value={formData.senderName}
          onChange={(e) => handleChange("senderName", e.target.value)}
          style={inputStyle}
        />
      </label>

      <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>
        Телефон отправителя*
        <input
          type="tel"
          placeholder="+998 XX XXX XX XX"
          value={formData.senderPhone}
          onChange={(e) => handleChange("senderPhone", e.target.value)}
          style={inputStyle}
        />
      </label>

      <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>
        Адрес отправителя*
        <input
          type="text"
          placeholder="Улица, дом, кв."
          value={formData.senderAddress}
          onChange={(e) => handleChange("senderAddress", e.target.value)}
          style={inputStyle}
        />
      </label>

      {/* Имя и номер получателя */}
      <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>
        Имя получателя*
        <input
          type="text"
          placeholder="Введите имя"
          value={formData.recipientName}
          onChange={(e) => handleChange("recipientName", e.target.value)}
          style={inputStyle}
        />
      </label>

      <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>
        Телефон получателя*
        <input
          type="tel"
          placeholder="+998 XX XXX XX XX"
          value={formData.recipientPhone}
          onChange={(e) => handleChange("recipientPhone", e.target.value)}
          style={inputStyle}
        />
      </label>


      <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>
        Адрес получателя*
        <input
          type="text"
          placeholder="Улица, дом, кв."
          value={formData.recipientAddress}
          onChange={(e) => handleChange("recipientAddress", e.target.value)}
          style={inputStyle}
        />
      </label>

      <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>
        Вес отправки (кг)*
        <input
          type="number"
          min="1"
          max="20"
          value={formData.weight}
          onChange={(e) => handleChange("weight", e.target.value)}
          style={inputStyle}
        />
      </label>

      <button
        onClick={handleSubmit}
        style={{
          marginTop: "1rem",
          padding: "0.8rem 1.2rem",
          backgroundColor: "#D32F2F",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          width: "100%",
          fontWeight: "bold",
        }}
      >
        Отправить заявку
      </button>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "95%",
  marginTop: "6px",
  marginBottom: "12px",
  padding: "0.6rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  backgroundColor: "#FAFAFA",
};
