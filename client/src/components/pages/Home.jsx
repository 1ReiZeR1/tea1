import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstanse";
import { useUser } from "../utils/UserContext";
import { Flex, Button, Image, Center, Input, Text } from "@chakra-ui/react";

export default function Home() {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    image: "",
    text: "",
  });

  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  async function getAllMessages() {
    const response = await axiosInstance.get("/message", {
      withCredentials: true,
      validateStatus: (status) => status < 500,
    });
    setMessages(response.data.messages);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axiosInstance.post(
        "/message",
        { ...formData, userId: user?.id },
        {
          withCredentials: true,
          validateStatus: (status) => status < 500,
        }
      );
      setMessages((prevData) => [...prevData, response?.data.message]);
    } catch (err) {
      console.error("Ошибка при входе:", err);
      setError(err.response?.data?.message || "Произошла ошибка при входе.");
    }
  };

  async function clickLike(messageId) {
    if(!user) {
        alert('Зарегестрируйтесь что бы ставить лайки')
        return 
    }
    try {
      const response = await axiosInstance.post(
        "/like",
        { messageId },
        {
          withCredentials: true,
          validateStatus: (status) => status < 500,
        }
      );
      getAllMessages();
      alert(response.data.message || response.data.error);
    } catch (error) {
      const err = error.response?.data?.message || "Произошла ошибка";
      setError(err);
    }
  }

  return (
    <div className="login-container">
        {!user && 
        <Text>Чтобы отправить свой щебет, пожалуйста, зарегестрируйтесь.</Text>
        }
      {user && (
        <form onSubmit={handleSubmit}>
          <Flex gap={10} flexDirection={"column"}>
            <Input
              borderRadius={5}
              placeholder={"Сообщение"}
              minW={300}
              h={30}
              type="text"
              id="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              required
            />
            <Input
              borderRadius={5}
              placeholder={"Добавьте ссылку на изображение"}
              minW={300}
              h={30}
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </Flex>
          {error && (
            <p className="error-message" style={{ color: "red" }}>
              {error}
            </p>
          )}
          <Button mt={20} type="submit">
            Отправить
          </Button>
        </form>
      )}
      <Center gap={"20px"} flexDirection={"column"} mt={20}>
        {messages
          .sort((a, b) => a.id - b.id)
          .map((message) => (
            <Flex
              borderColor={"black"}
              borderWidth={1}
              borderStyle={"groove"}
              padding={10}
              borderRadius={10}
              key={message.id}
              flexDirection={"column"}
            >
              <Flex>
                <Image maxW={"300px"} src={message?.image}></Image>
              </Flex>
              <Flex>Автор: {message?.User?.name} </Flex>
              <Flex>
                Дата:{" "}
                {new Date(message?.createdAt).toLocaleString("ru-RU", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Flex>
              <Flex>Щебетание: {message?.text} </Flex>
              <Center>
                <Button onClick={() => clickLike(message.id)}>
                  {message?.countLike ?? 0} ♡{" "}
                </Button>
              </Center>
            </Flex>
          ))}
      </Center>
    </div>
  );
}
