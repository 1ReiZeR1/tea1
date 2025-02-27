import { useState } from "react";
import axiosInstance from "../utils/axiosInstanse"; 
import { useUser } from "../utils/UserContext";
import { useNavigate } from "react-router-dom";
import { Center, Button } from "@chakra-ui/react";

const LoginRegister = () => {
  const { setUser } = useUser(); 
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
    
      const response = await axiosInstance.post("api/auth/signup", formData, {
        withCredentials: true,
      });

      if (response && response.data && response.data.user) {
        setUser(response.data.user);
        navigate("/profile"); 
      } else if (response && response.data && response.data.message) {
        setError(response.data.message); 
      } else {
        setError("Не удалось войти. Попробуйте снова.");
      }
    } catch (err) {
      console.error("Ошибка при отправке формы:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Произошла ошибка при входе. Попробуйте снова.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <Center gap={"5x"} flexDirection={"column"} mt={20}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Center>
        {error && (
          <p className="error-message" style={{ color: "red" }}>
            {error}
          </p>
        )}
        <Button mt={20} type="submit">Зарегестрироваться</Button>
      </form>
    </div>
  );
};

export default LoginRegister;
