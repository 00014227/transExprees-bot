import { useState, useEffect } from "react";
import axios from "axios";
import deliveryData from "../delivery_calculator_full.json";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function OrderForm() {

  const cities = deliveryData.cities;
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    deliveryType: state?.deliveryType || "",
    senderName: "",
    senderPhone: "",
    senderAddress: "",
    recipientName: "",
    recipientPhone: "",
    recipientAddress: state?.toCity || "",
    weight: state?.weight || "",
    price: state?.price || ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});



  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const inputStyle = (fieldName) => ({
    display: "block",
    width: "96%",
    marginTop: "6px",
    marginBottom: "12px",
    padding: "0.6rem",
    borderRadius: "6px",
    border: fieldErrors[fieldName] ? "1px solid red" : "1px solid #CCC",
    backgroundColor: "#FAFAFA",
    fontSize: "16px",
    WebkitAppearance: "none",
  });

  const inputStyle2 = (fieldName) => ({
    display: "block",
    width: "100%",
    marginTop: "6px",
    marginBottom: "12px",
    padding: "0.6rem",
    borderRadius: "6px",
    border: fieldErrors[fieldName] ? "1px solid red" : "1px solid #CCC",
    backgroundColor: "#FAFAFA",
    fontSize: "16px",
    WebkitAppearance: "none",
  });

  const handleSubmit = async () => {
    setError("");
    const deliveryLabels = {
      "door-door": "Доставка до двери",
      "pvz-door": "Доставка до пункта выдачи TRANSASIA",
    };

    const newErrors = {};
    if (!formData.deliveryType) newErrors.deliveryType = true;
    if (!formData.senderName) newErrors.senderName = true;
    if (!formData.senderPhone) newErrors.senderPhone = true;
    if (!formData.senderAddress) newErrors.senderAddress = true;
    if (!formData.recipientName) newErrors.recipientName = true;
    if (!formData.recipientPhone) newErrors.recipientPhone = true;
    if (!formData.recipientAddress) newErrors.recipientAddress = true;
    if (!formData.weight) newErrors.weight = true;

    setFieldErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setError("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    const dataToSend = {
      ...formData,
      deliveryType: deliveryLabels[formData.deliveryType] || formData.deliveryType,
    };

    try {
      await axios.post("https://back.transosiyo-express.uz/api/submit", dataToSend);
      setSubmitted(true);
    } catch (err) {
      setError("Произошла ошибка при отправке. Попробуйте снова.");
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
        padding: "1.5rem",
        fontFamily: "Segoe UI, sans-serif",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          padding: "2rem",
          textAlign: "center",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2
          style={{
            color: "#4CAF50",
            fontSize: "1.6rem",
            marginBottom: "0.5rem",
          }}
        >
          ✅ Ваша заявка принята!
        </h2>
        <p style={{ fontSize: "1.1rem", color: "#333" }}>
          Ожидайте звонка от оператора.
        </p>
  
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: "1.5rem",
            padding: "0.75rem 1.2rem",
            backgroundColor: "#2C3E50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ⬅️ Назад / Калькулятор
        </button>
      </div>
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

    


      <h2 style={{ marginBottom: "1rem", color: "#D32F2F" }}>📝 Оформление заявки</h2>
      {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}

      <label>
        Тип перевозки
        <select
          value={formData.deliveryType}
          onChange={(e) => handleChange("deliveryType", e.target.value)}
          style={inputStyle2("deliveryType")}
        >
          <option value="">Выберите тип доставки</option>
          <option value="pvz-door">Доставка до пункта выдачи TRANSASIA</option>
          <option value="door-door">Доставка до двери</option>
        </select>
      </label>

      <label>
        Имя отправителя
        <input
          type="text"
          placeholder="Имя отправителя"
          value={formData.senderName}
          onChange={(e) => handleChange("senderName", e.target.value)}
          style={inputStyle("senderName")}
        />
      </label>

      <label>
        Телефон отправителя
        <input
          type="tel"
          placeholder="+998 XX XXX XX XX"
          value={formData.senderPhone}
          onChange={(e) => handleChange("senderPhone", e.target.value)}
          style={inputStyle("senderPhone")}
        />
      </label>

      <label>
        Адрес отправителя
        <input
          type="text"
          placeholder="Город, улица, дом"
          value={formData.senderAddress}
          onChange={(e) => handleChange("senderAddress", e.target.value)}
          style={inputStyle("senderAddress")}
        />
      </label>

      <label>
        Имя получателя
        <input
          type="text"
          placeholder="Имя получателя"
          value={formData.recipientName}
          onChange={(e) => handleChange("recipientName", e.target.value)}
          style={inputStyle("recipientName")}
        />
      </label>

      <label>
        Телефон получателя
        <input
          type="tel"
          placeholder="+998 XX XXX XX XX"
          value={formData.recipientPhone}
          onChange={(e) => handleChange("recipientPhone", e.target.value)}
          style={inputStyle("recipientPhone")}
        />
      </label>

      {formData.deliveryType === "pvz-door" ? (
        <label>
          Адрес получателя
          <select
            value={formData.recipientAddress}
            onChange={(e) => handleChange("recipientAddress", e.target.value)}
            style={inputStyle("recipientAddress")}
          >
            <option value="">{state?.toCity || "Выберите город"}</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>
      ) : formData.deliveryType === "door-door" ? (
        <label>
          Адрес получателя
          <input
            type="text"
            placeholder="Город, улица, дом"
            value={formData.recipientAddress}
            onChange={(e) => handleChange("recipientAddress", e.target.value)}
            style={inputStyle("recipientAddress")}
          />
        </label>
      ) : null}

      <label>
        Вес отправки (кг)
        <input
          type="number"
          placeholder="Вес в кг"
          min="1"
          max="20"
          value={formData.weight}
          onChange={(e) => handleChange("weight", e.target.value)}
          style={inputStyle("weight")}
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
          fontSize: "16px",
        }}
      >
        Отправить заявку
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
