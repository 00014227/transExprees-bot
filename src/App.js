import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import CalculatorMiniApp from './components/CalculatorMiniApp';
import OrderForm from "./components/OrderForm";

import {useEffect} from "react";
import { initSocket } from "./socket";

function App() {
  useEffect(() => {
    initSocket();
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
