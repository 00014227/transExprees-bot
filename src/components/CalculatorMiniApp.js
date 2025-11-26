import { useState, useEffect } from "react";
import deliveryData from "../delivery_calculator_full.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTelegram } from "../hooks/useTelegram";

export default function CalculatorMiniApp() {
  const { tg, user } = useTelegram();
  // alert("TG: " + JSON.stringify(tg, null, 2));
  // alert("USER: " + JSON.stringify(user, null, 2));
  
  const userData = JSON.stringify(user)

  const [formData, setFormData] = useState({
    deliveryType: "",
    fromCity: "",
    toCity: "",
    weight: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();
  const cities = deliveryData.cities;

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setFieldErrors((prev) => ({ ...prev, [field]: false }));
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "0.6rem",
    borderRadius: "6px",
    backgroundColor: "#FAFAFA",
    border: fieldErrors[field] ? "1px solid red" : "1px solid #CCC",
    marginTop: "6px"
  });

  const inputStyle2 = (field) => ({
    width: "96%",
    padding: "0.6rem",
    borderRadius: "6px",
    backgroundColor: "#FAFAFA",
    border: fieldErrors[field] ? "1px solid red" : "1px solid #CCC",
    marginTop: "6px"
  });

  const handleSubmit = async () => {
    const { deliveryType, fromCity, toCity, weight } = formData;
    const newErrors = {};

    if (!deliveryType) newErrors.deliveryType = true;
    if (!fromCity) newErrors.fromCity = true;
    if (!toCity) newErrors.toCity = true;
    if (!weight) newErrors.weight = true;

    setFieldErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const fromIndex = cities.indexOf(fromCity);
    const toIndex = cities.indexOf(toCity);

    if (fromIndex === -1 || toIndex === -1) {
      alert("Выбранные города не найдены.");
      return;
    }

    const zone = deliveryData.zones[fromIndex][toIndex];
    const tariff = deliveryData.tariffs[deliveryType];

    const numericWeight = parseInt(weight, 10);
    if (isNaN(numericWeight) || numericWeight < 1) {
      alert("Вес должен быть числом от 1 и выше.");
      return;
    }

    const baseWeight = Math.min(numericWeight, 20);
    const extraWeight = Math.max(numericWeight - 20, 0);

    const zonePrice = tariff?.[baseWeight - 1]?.[zone];

    if (!zonePrice) {
      navigate("/result", {
        state: {
          deliveryType,
          fromCity,
          toCity,
          weight,
          price: "-",
          note: "Не найдены цены для этой зоны. Свяжитесь с оператором.",
        },
      });
      return;
    }

    const extraCharge = extraWeight * 5000;
    const finalPrice = zonePrice.price + extraCharge;
  

    navigate("/result", {
      state: {
        deliveryType,
        fromCity,
        toCity,
        weight,
        price: finalPrice.toLocaleString(),
        note: "Расчет является предвaрительным. Для уточнения свяжитесь с оператором.",
      },
    });

    const dataToSend = {
      deliveryType,
      fromCity,
      toCity,
      weight,
      finalPrice, // numeric
      userData
    };
    alert("Info", dataToSend)
    try {
      await axios.post("https://91f02716afae.ngrok-free.app/api/calculation", dataToSend); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "1.5rem", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#F5F5F5", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", border: "1px solid #E0E0E0", height: "100vh" }}>
      <header style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
        <img src="/download.png" alt="TransAsia Logistics" style={{ height: "48px", marginRight: "12px" }} />
        <h1 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#D32F2F" }}>Калькулятор доставки</h1>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>
          Тип доставки
          <select
            value={formData.deliveryType}
            onChange={(e) => handleChange("deliveryType", e.target.value)}
            style={inputStyle("deliveryType")}
          >
            <option value="">Выберите</option>
            <option value="door-door">Доставка до двери</option>
            <option value="pvz-door">Доставка до пункта выдачи TRANSASIA</option>
          </select>
        </label>

        <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>
          Город отправки
          <select
            value={formData.fromCity}
            onChange={(e) => handleChange("fromCity", e.target.value)}
            style={inputStyle("fromCity")}
          >
            <option value="">Выберите</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>
          Город получения
          <select
            value={formData.toCity}
            onChange={(e) => handleChange("toCity", e.target.value)}
            style={inputStyle("toCity")}
          >
            <option value="">Выберите</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>
          Вес (кг)
          <input
            type="number"
            min="1"
            max="20"
            placeholder="Введите вес"
            value={formData.weight}
            onChange={(e) => handleChange("weight", e.target.value)}
            style={inputStyle2("weight")}
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
          Рассчитать
        </button>
      </div>
    </div>
  );
}
