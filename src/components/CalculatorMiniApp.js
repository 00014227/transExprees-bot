import { useState } from "react";
import deliveryData from "../delivery_calculator_full.json"; // подключаем JSON

export default function CalculatorMiniApp() {
  const [formData, setFormData] = useState({
    deliveryType: "",
    fromCity: "",
    toCity: "",
    weight: "",
  });
  const [result, setResult] = useState(null);

  const cities = deliveryData.cities;

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    const { deliveryType, fromCity, toCity, weight } = formData;
  
    if (!deliveryType || !fromCity || !toCity || !weight) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }
  
    const fromIndex = deliveryData.cities.indexOf(fromCity);
    const toIndex = deliveryData.cities.indexOf(toCity);
  
    if (fromIndex === -1 || toIndex === -1) {
      alert("Выбранные города не найдены.");
      return;
    }
  
    const zone = deliveryData.zones[fromIndex][toIndex];
  
    if (!deliveryData.tariffs[deliveryType]) {
      alert("Неверный тип доставки.");
      return;
    }
  
    const numericWeight = parseInt(weight, 10);
    if (isNaN(numericWeight) || numericWeight < 1 || numericWeight > 20) {
      alert("Вес должен быть числом от 1 до 20.");
      return;
    }
  
    const zonePrice = deliveryData.tariffs[deliveryType][numericWeight - 1]?.[zone];
  
    if (!zonePrice) {
      setResult({
        price: "-",
        note: "Не найдены цены для этой зоны. Свяжитесь с оператором.",
      });
      return;
    }
  
    const entry = zonePrice.price;
  
    if (entry) {
      setResult({
        price: `${entry.toLocaleString()} сум`,
        note: "Цена рассчитана на основе введённых данных. Для уточнения свяжитесь с оператором.",
      });
    } else {
      setResult({
        price: "-",
        note: "Цена не найдена для этого веса. Свяжитесь с оператором.",
      });
    }
  };
  
console.log(formData, 'dddd')
  return (
    <div
      style={{
        maxWidth: "480px",
        margin: "0 auto",
        padding: "1.5rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#F5F5F5",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        border: "1px solid #E0E0E0",
        height: "100vh"
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1.5rem"
        }}
      >
        <img
          src="/download.png"
          alt="TransAsia Logistics"
          style={{
            height: "48px",
            marginRight: "12px"
          }}
        />
        <h1
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#D32F2F"
          }}
        >
          Калькулятор доставки
        </h1>
      </header>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}
      >
        {/* Вариант доставки */}
        <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>
          Вариант доставки*
          <select
            value={formData.deliveryType}
            onChange={(e) => handleChange("deliveryType", e.target.value)}
            style={{
              width: "100%",
              padding: "0.6rem",
              borderRadius: "6px",
              backgroundColor: "#FAFAFA",
              border: "1px solid #CCC",
              marginTop: "6px"
            }}
          >
            <option value="">Выберите</option>
            <option value="pvz-pvz">ПВЗ–ПВЗ</option>
            <option value="pvz-door">ПВЗ–Дверь</option>
            <option value="pvz-door">Дверь–ПВЗ</option>
            <option value="door-door">Дверь–Дверь</option>
          </select>
        </label>

        {/* Город отправления */}
        <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>
          Город отправления*
          <select
            value={formData.fromCity}
            onChange={(e) => handleChange("fromCity", e.target.value)}
            style={{
              width: "100%",
              padding: "0.6rem",
              borderRadius: "6px",
              backgroundColor: "#FAFAFA",
              border: "1px solid #CCC",
              marginTop: "6px"
            }}
          >
            <option value="">Выберите</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        {/* Город получения */}
        <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>
          Город получения*
          <select
            value={formData.toCity}
            onChange={(e) => handleChange("toCity", e.target.value)}
            style={{
              width: "100%",
              padding: "0.6rem",
              borderRadius: "6px",
              backgroundColor: "#FAFAFA",
              border: "1px solid #CCC",
              marginTop: "6px"
            }}
          >
            <option value="">Выберите</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        {/* Вес */}
        <label style={{ fontSize: "0.95rem", fontWeight: "500" }}>
          Вес (кг)*
          <input
            type="number"
            min="1"
            max="20"
            placeholder="Введите вес"
            value={formData.weight}
            onChange={(e) => handleChange("weight", e.target.value)}
            style={{
              width: "95%",
              padding: "0.6rem",
              borderRadius: "6px",
              backgroundColor: "#FAFAFA",
              border: "1px solid #CCC",
              marginTop: "6px"
            }}
          />
        </label>


        {/* Кнопка */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
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

        {/* Результат */}
        {result && (
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem",
              backgroundColor: "#FFF",
              borderRadius: "6px",
              border: "1px solid #E0E0E0",
              textAlign: "center"
            }}
          >
            <p style={{ fontWeight: "bold", fontSize: "1.1rem", color: "#333" }}>
              Цена: {result.price}
            </p>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>{result.note}</p>
          </div>
        )}
      </div>
    </div>

  );
}
