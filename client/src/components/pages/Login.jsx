import { useState } from "react";
import axiosInstance from "../utils/axiosInstanse"; 
import { useUser } from "../utils/UserContext";
import { useNavigate } from "react-router-dom"; 
import { Center, Input, Button, VStack, Box, FormLabel, Heading } from "@chakra-ui/react";

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
    <Center h="100vh">
    <Box 
 
   
    mt={0}
    mb={60}
    w={350}
    h={350}
    p={6}
    borderWidth={1}
    borderRadius={40}
    borderColor="#e60023"
    boxShadow="0 0 10px rgba(255, 0, 0, 0.3)"
    backgroundColor={"#F8F8FF"}
>
    <VStack >
      <Heading mt={36}>Вход</Heading>
      <form onSubmit={handleSubmit}>
        <Center gap={"5x"} flexDirection={"column"} mt={0}>
          <FormLabel htmlFor="email">email:</FormLabel>
          <Input 
            minH={20}
            minW={240}
            borderRadius="20px"
            mt={10}
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FormLabel mt={10}  htmlFor="password">Пароль:</FormLabel>
          <Input

           minW={240}
           borderRadius="20px"           
            minH={20}
            mt={10}
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
        <Button 
        mt={30}

        _hover={{ bg: "black", color: "white", borderColor: "black" }}
        type="submit">Войти</Button>
      </form>
    </VStack>
    </Box>
      </Center>
  );
};

export default Login;
