import { useState } from "react";
import axiosInstance from "../utils/axiosInstanse"; 
import { useUser } from "../utils/UserContext";
import { useNavigate } from "react-router-dom"; 
import { Center, Input, Button } from "@chakra-ui/react";

const Login = () => {
  const { setUser } = useUser(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
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
        const response = await axiosInstance.post(
            "/api/auth/login",
            formData,
            {
              withCredentials: true,
              validateStatus: (status) => status < 500,
            }
          );
  
      if (response.data.message === "вход выполнен") {
        setUser(response.data.user || {});
        navigate("/");
      } else {
        setError(response.data.message || "Не удалось войти.");
      }
    } catch (err) {
      console.error("Ошибка при входе:", err);
      setError(err.response?.data?.message || "Произошла ошибка при входе.");
    }
  };

  return (
    <div className="login-container">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <Center gap={"5x"} flexDirection={"column"} mt={20}>
          <label htmlFor="email">email:</label>
          <Input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Пароль:</label>
          <Input
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
        <Button mt={20} type="submit">Войти</Button>
      </form>
    </div>
  );
};

export default Login;
