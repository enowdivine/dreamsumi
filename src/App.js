import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './pages/homepage/Homepage';
import Dreams from './pages/dreams/Dreams';
import Signup from './pages/Auth/Signup/Signup';
import Login from './pages/Auth/Login/Login';
import Howitworks from './pages/Howitworks/Howitworks';
import Prompts from './pages/prompts/Prompts';
import RefineImage from './pages/refineImage/RefineImage';
import SelectedImage from './pages/selectedImage/SelectedImage';
import PrintOption from './pages/printOptions/PrintOption';
import Checkout from './pages/checkout/Checkout';
import OrderComplete from './pages/orderComplete/OrderComplete';
import Profile from './pages/profile/Profile';
import Orders from "./pages/orders/Orders"
import PageError from './pages/pageError/PageError';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* UNPROTECTED ROUTES */}
          <Route path="/" element={<Homepage />} />
          <Route path="/dreams" element={<Dreams />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/how-it-works" element={<Howitworks />} />
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/refine-image" element={<RefineImage />} />
          <Route path="/selected-image" element={<SelectedImage />} />
          <Route path="/print-options" element={<PrintOption />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-complete" element={<OrderComplete />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />

          {/* 404 ROUTE */}
          <Route path="*" element={<PageError />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;