import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import CalculatorMiniApp from './components/CalculatorMiniApp';
import OrderForm from "./components/OrderForm";
import ResultPage from "./components/ResultPage";


function App() {

  
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
