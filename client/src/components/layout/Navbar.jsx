import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../utils/UserContext";
import axiosInstance from "../utils/axiosInstanse";
import { Center, Text, Box, Flex } from "@chakra-ui/react";

function Navbar() {
  const { user, setUser } = useUser();

  useEffect(() => {
    if (!user) {
      getRefreshToken();
    }
  }, [user]);

  async function getRefreshToken() {
    try {
      const response = await axiosInstance.get("/api/tokens/refresh", {
        withCredentials: true,
      });
      const user = response.data.user;
      setUser(user);
    } catch (error) {
      console.error("Ошибка обновления токена:", error);
    }
  }

  async function logout() {
    try {
      await axiosInstance.get("/auth/logout", { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  }

  return (
    <Flex
      as="nav"
      position="fixed"
      top="0"
      left="0"
      width="100%"
      backgroundColor="white"
      boxShadow="md"
      padding="10px 20px"
    >
      <Center width="95%" justifyContent="space-between">
        <Link to="/">
          <Text fontSize="xl" fontWeight="bold" ml="20px">
            Tea_Ceremony
          </Text>
        </Link>
        <Center gap={5}>
          {user?.name && <Text>Привет, {user?.name}!</Text>}
          {!user ? (
            <>
              <Box>
                <Link to="/signup">Регистрация</Link>
              </Box>
              <Box>
                <Link to="/login">Вход</Link>
              </Box>
            </>
          ) : (
            <>
              <Box>
                <Link to="/profile">Профиль</Link>
              </Box>
              <Box>
                <Link onClick={logout}>Выход</Link>
              </Box>
            </>
          )}
        </Center>
      </Center>
    </Flex>
  );
}

export default Navbar;
