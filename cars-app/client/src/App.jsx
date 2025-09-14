import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/HomePage";
import Statistics from "./pages/Statistics";
import Cars from "./pages/Cars";
import CarSale from "./pages/CarSale";
import CarInspection from "./pages/CarInspection";
import CarDetail from "./pages/CarDetail";
import { Routes, Route } from 'react-router-dom';
import Chatbot from "./pages/Chatbot";
import './App.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Chatbot />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cars" element={<Cars />} />
        <Route path="/Sale" element={<CarSale />} />
        <Route path="/Inspection" element={<CarInspection />} />
        <Route path="/Statistics" element={<Statistics />} />
        <Route path="Car-Detail/:matricule" element={<CarDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
