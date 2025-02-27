import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../utils/UserContext";
import axiosInstance from "../utils/axiosInstanse";
import { Center, Text, Box, Flex, Link as ChakraLink } from "@chakra-ui/react";

function Navbar() {
  const { user, setUser } = useUser();

  useEffect(() => {
    if (!user) {
      getRefreshToken();
    }
  }, [user]);

  async function getRefreshToken() {
    try {
      const response = await axiosInstance.get("/tokens/refresh", {
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
      zIndex="1000"
      as="nav"
      position="fixed"
      top="0"
      left="0"
      width="100%"
      backgroundColor="white"
      boxShadow="md"
      padding="10px 20px"
    >
      <Center
        borderColor={"#FED7D7"}
        borderWidth={1}
        borderStyle={"groove"}
        borderRadius={250}
        boxShadow="0 0 10px rgba(255, 0, 0, 0.3)"
        backgroundColor={"#white"}
        width="98%"
        justifyContent="space-between"
      >
        <Link to="/">
          <Text
            fontSize="xl"
            fontWeight="bold"
            ml="20px"
            style={{ color: "#e60023" }}
          >
            Tea sort
          </Text>
        </Link>
        <Center gap={15}>
          {user?.name && <Text>Привет, {user?.name}!</Text>}
          {!user ? (
            <>
              <Box>
                <ChakraLink
                  cursor={"pointer"}
                  color={"rgb(230, 0, 35)"}
                  _hover={{ color: "black" }}
                  href="/signup"
                >
                  Регистрация
                </ChakraLink>
              </Box>
              <Box mr={50}>
                <ChakraLink
                  cursor={"pointer"}
                  color={"rgb(230, 0, 35)"}
                  _hover={{ color: "black" }}
                  href="/login"
                >
                  Вход
                </ChakraLink>
              </Box>
            </>
          ) : (
            <>
             <Link to="/comments" style={{ color: "#e60023" }}>
                  Информация
                </Link>
              <Box>
                <Link to="/profile" style={{ color: "#e60023" }}>
                  Личный кабинет
                </Link>
              </Box>
              <Box mr={50}>
                <Link onClick={logout} style={{ color: "#e60023" }}>
                  Выход
                </Link>
              </Box>
            </>
          )}
        </Center>
      </Center>
    </Flex>
  );
}

export default Navbar;
