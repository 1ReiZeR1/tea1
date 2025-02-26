import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import { UserProvider } from "./components/utils/UserContext";
import Navbar from "./components/layout/Navbar";
import "./app.css";
import Home from "./components/pages/Home";
import AddComment from "./components/pages/AddComment";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/comments" element={<AddComment />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
