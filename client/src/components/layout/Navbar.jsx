import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../utils/UserContext";
import axiosInstance from "../utils/axiosInstanse";
import { Center, Text, Box } from "@chakra-ui/react";

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
    <nav className="navbar">
      <Center gap={100}>
      <Link to="/"><h2>Щебетатель</h2></Link>
        <Center gap={10}>
          {user?.name && <Text>Привет, {user?.name}!</Text>}
          {!user && (
            <>
              <Box>
                <Link to="/signup">Регистрация</Link>
              </Box>
              <Box>
                <Link to="/login">Вход</Link>
              </Box>
            </>
          )}
          {user && <Box>
            <Link to="/profile">Профиль</Link>
          </Box>}
          {user && (
            <Box>
              <Link onClick={logout}>Выход</Link>
            </Box>
          )}
      </Center>
      </Center>
    </nav>
  );
}

export default Navbar;
