import { useState } from "react";
import axiosInstance from "../utils/axiosInstanse"; 
import { useUser } from "../utils/UserContext";
import { useNavigate } from "react-router-dom";
import { Center, Button, Input, VStack, Box, FormLabel, Heading } from "@chakra-ui/react";

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
    <Center h="100vh">
      <Box
        mt={0}
        mb={60}
        w={350}
        h={400}
        p={6}
        borderWidth={1}
        borderRadius={40}
        borderColor="#e60023"
        boxShadow="0 0 10px rgba(255, 0, 0, 0.3)"
        backgroundColor={"#F8F8FF"}
      >
        <VStack>
          <Heading mt={36}>Регистрация</Heading>
          <form onSubmit={handleSubmit}>
            <Center gap={"5x"} flexDirection={"column"} mt={0}>
              <FormLabel htmlFor="email">Email:</FormLabel>
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
              <FormLabel mt={10} htmlFor="name">Имя:</FormLabel>
              <Input
                minH={20}
                minW={240}
                borderRadius="20px"
                mt={10}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <FormLabel mt={10} htmlFor="password">Пароль:</FormLabel>
              <Input
                minH={20}
                minW={240}
                borderRadius="20px"
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
              type="submit"
            >
              Зарегистрироваться
            </Button>
          </form>
        </VStack>
      </Box>
    </Center>
  );
};

export default LoginRegister;
