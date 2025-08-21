import {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import CalculatorMiniApp from './components/CalculatorMiniApp';
import OrderForm from "./components/OrderForm";
import ResultPage from "./components/ResultPage";


function App() {
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;

  
      alert(JSON.stringify(tg, null, 2));
    } else {
      console.log("Telegram WebApp API not available");
      alert("Telegram WebApp API not available");
    }
  }, []);
  
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CalculatorMiniApp />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/order" element={<OrderForm />} />
      </Routes>
    </Router>
  );
}

export default App;
