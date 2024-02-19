import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
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
import OrderDetails from './pages/orders/OrderDetails';
import PageError from './pages/pageError/PageError';
import ProtectedRoutes from './components/protected/ProtectedRoutes';

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
          <Route path="/prompts" element={
            <ProtectedRoutes>
              <Prompts />
            </ProtectedRoutes>} />
          <Route path="/refine-image" element={
            <ProtectedRoutes>
              <RefineImage />
            </ProtectedRoutes>} />
          <Route path="/selected-image" element={
            <ProtectedRoutes>
              <SelectedImage />
            </ProtectedRoutes>} />
          <Route path="/print-options" element={
            <ProtectedRoutes>
              <PrintOption />
            </ProtectedRoutes>} />
          <Route path="/checkout" element={
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>} />
          <Route path="/order-complete" element={
            <ProtectedRoutes>
              <OrderComplete />
            </ProtectedRoutes>} />
          <Route path="/profile" element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>} />
          <Route path="/orders" element={
            <ProtectedRoutes>
              <Orders />
            </ProtectedRoutes>
          } />
          <Route path="/order/:id" element={
            <ProtectedRoutes>
              <OrderDetails />
            </ProtectedRoutes>
          } />

          {/* 404 ROUTE */}
          <Route path="*" element={<PageError />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
