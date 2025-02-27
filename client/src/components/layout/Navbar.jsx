/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
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
      await axiosInstance.get("api/auth/logout", { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  }

  return (
    <Flex
      h={60}
      zIndex="1000"
      as="nav"
      position="fixed"
      top="0"
      left="0"
      width="98%"
      boxShadow="md"
      padding="10px 20px"
      justifyContent="center"
    >
      <Center
        backgroundColor={"white"}
        borderColor={"#FED7D7"}
        borderWidth={1}
        borderStyle={"groove"}
        borderRadius={250}
        boxShadow="0 0 10px rgba(255, 0, 0, 0.3)"
        width="98%"
        justifyContent="space-between"
      >
        <ChakraLink
          _hover={{ color: "rgb(131, 131, 131)" }}
          fontSize="xl"
          fontWeight="bold"
          ml="20px"
          color={"black"}
          href="/"
        >
          Главная
        </ChakraLink>

        <ChakraLink
          cursor={"pointer"}
          _hover={{ color: "rgb(131, 131, 131)" }}
          color={"rgb(0, 0, 0)"}
          href="/teas"
        >
          Чайная коллекция
        </ChakraLink>

        <Center gap={15}>
          {user?.name && <Text cursor={'default'} m={0} p={0}>Привет, {user?.name}!</Text>}
          {!user ? (
            <>
              <Box>
                <ChakraLink
                  cursor={"pointer"}
                  color={"rgb(0, 0, 0)"}
                  _hover={{ color: "rgb(131, 131, 131)" }}
                  href="/signup"
                >
                  Регистрация
                </ChakraLink>
              </Box>
              <Box mr={50}>
                <ChakraLink
                  cursor={"pointer"}
                  color={"rgb(0, 0, 0)"}
                  _hover={{ color: "black" }}
                  href="/login"
                >
                  Вход
                </ChakraLink>
              </Box>
            </>
          ) : (
            <>
              <Box>
                <ChakraLink
                  _hover={{ color: "rgb(131, 131, 131)" }}
                  href="/profile"
                  color={"black"}
                >
                  Личный кабинет
                </ChakraLink>
              </Box>
              <Box mr={50} cursor={'pointer'}>
                <ChakraLink
                  _hover={{ color: "rgb(131, 131, 131)" }}
                  onClick={logout}
                  color={"black"}
                >
                  Выход
                </ChakraLink>
              </Box>
            </>
          )}
        </Center>
      </Center>
    </Flex>
  );
}

export default Navbar;
