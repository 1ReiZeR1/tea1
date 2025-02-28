import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import { UserProvider } from "./components/utils/UserContext";
import Navbar from "./components/layout/Navbar";
import "./app.css";
import Home from "./components/pages/Home";
import TeaPage from "./components/pages/TeaPage";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
             <Route path="/teas" element={<TeaPage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
