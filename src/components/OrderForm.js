import { useState, useEffect } from "react";
import axios from "axios";
import deliveryData from "../delivery_calculator_full.json";
import { useLocation } from "react-router-dom";

export default function OrderForm() {
  const cities = deliveryData.cities;
  const { state } = useLocation();

  const [formData, setFormData] = useState({
    deliveryType: state?.deliveryType || "",
    senderName: "",
    senderPhone: "",
    senderAddress: "",
    recipientName: "",
    recipientPhone: "",
    recipientAddress: "",
    weight: "",
  });

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
  
      alert("Telegram WebApp:", tg);
      alert("User:", tg.initDataUnsafe.user);
  
      const phone = tg.initDataUnsafe.user?.phone_number;
      if (phone) {
        setFormData(prev => ({ ...prev, senderPhone: phone }));
      }
    } else {
      console.warn("Telegram WebApp API is not available. Are you testing outside Telegram?");
    }
  }, []);
  


  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");


  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  
  const handleSubmit = async () => {
    setError("");
    const deliveryLabels = {
      "door-door": "Доставка до двери",
      "pvz-door": "Доставка до пункта выдачи TRANSASIA"
    };
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
    const dataToSend = {
      ...formData,
      deliveryType: deliveryLabels[formData.deliveryType] || formData.deliveryType,
    };
    


    try {
      await axios.post("https://back.transosiyo-express.uz/api/orders/submit", dataToSend);
      setSubmitted(true);
    } catch (err) {
      setError("Произошла ошибка при отправке. Попробуйте снова.", err);
      console.error(err);
    }
  };

  if (submitted) {
    return (
<div
  style={{
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "1.5rem",
    flexDirection: "column",
    fontFamily: "Segoe UI, sans-serif"
  }}
>
  <h2 style={{ color: "#4CAF50", fontSize: "1.6rem", marginBottom: "0.5rem" }}>
    ✅ Ваша заявка принята!
  </h2>
  <p style={{ fontSize: "1.1rem", color: "#333" }}>
    Ожидайте звонка от оператора.
  </p>
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
          <option value="pvz-door">Доставка до пунка выдачи TRANSASIA</option>
          <option value="door-door">Доставка до двери</option>
        </select>
      </label>

      <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>
        Имя отправителя
        <input
          type="text"
          placeholder="Введите имя"
          value={formData.senderName}
          onChange={(e) => handleChange("senderName", e.target.value)}
          style={inputStyle}
        />
      </label>

      <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>
        Телефон отправителя
        <input
          type="tel"
          placeholder="+998 XX XXX XX XX"
          value={formData.senderPhone}
          onChange={(e) => handleChange("senderPhone", e.target.value)}
          style={inputStyle}
        />
      </label>

       {/* Мгновенная смена формы */}
       {formData.deliveryType === "pvz-door" ? (
        <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>
          Адрес отправителя
          <select
            value={formData.fromCity}
            onChange={(e) => handleChange("senderAddress", e.target.value)}
            style={inputStyle}
          >
            <option value="">Выберите</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>
      ) : formData.deliveryType === "door-door" ? (
        <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>
          Адрес отправителя
          <input
            type="text"
            placeholder="Город, улица, дом."
            value={formData.senderAddress}
            onChange={(e) => handleChange("senderAddress", e.target.value)}
            style={inputStyle}
          />
        </label>
      ) : null}

      {/* Имя и номер получателя */}
      <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>
        Имя получателя
        <input
          type="text"
          placeholder="Введите имя"
          value={formData.recipientName}
          onChange={(e) => handleChange("recipientName", e.target.value)}
          style={inputStyle}
        />
      </label>

      <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>
        Телефон получателя
        <input
          type="tel"
          placeholder="+998 XX XXX XX XX"
          value={formData.recipientPhone}
          onChange={(e) => handleChange("recipientPhone", e.target.value)}
          style={inputStyle}
        />
      </label>


      <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>
        Адрес получателя
        <input
          type="text"
          placeholder="Город, улица, дом."
          value={formData.recipientAddress}
          onChange={(e) => handleChange("recipientAddress", e.target.value)}
          style={inputStyle}
        />
      </label>

      <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>
        Вес отправки (кг)
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
