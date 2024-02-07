import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './pages/homepage/Homepage';
import Dreams from './pages/dreams/Dreams';
import Signup from './pages/Auth/Signup/Signup';
import Login from './pages/Auth/Login/Login';
import Howitworks from './pages/Howitworks/Howitworks';
import Prompts from './pages/prompts/Prompts';

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

          {/* 404 ROUTE */}
          {/* <Route path="*" element={<PageError />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
