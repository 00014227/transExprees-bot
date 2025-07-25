import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import CalculatorMiniApp from './components/CalculatorMiniApp';
import OrderForm from "./components/OrderForm";

import {useEffect} from "react";

function App() {
  useEffect(() => {
    window.onerror = function (message, source, lineno, colno, error) {
      console.error("Global error caught:", message, source, lineno, colno, error);
    };
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CalculatorMiniApp />} />
        <Route path="/order" element={<OrderForm />} />
      </Routes>
    </Router>
  );
}

export default App;
