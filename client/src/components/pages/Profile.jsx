import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstanse";
import { Flex, Button, Image, Center, Input } from "@chakra-ui/react";

function Profile() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getAllMessages();
  }, []);

  async function getAllMessages() {
    const response = await axiosInstance.get("/profile", {
      withCredentials: true,
      validateStatus: (status) => status < 500,
    });
    setMessages(response.data.messages);
  }

  async function deleteMessage(messageId) {
    await axiosInstance.delete(`/profile/${messageId}`, {
      withCredentials: true,
      validateStatus: (status) => status < 500,
    });
    setMessages((prevData) => prevData.filter((data) => data.id !== messageId));
  }

  async function handleSubmit(event, messageId) {
    event.preventDefault();
    const updatedMessage = messages.find((msg) => msg.id === messageId);
    if (!updatedMessage.text.trim() || !updatedMessage.image.trim()) {
      alert("Все поля должны быть заполнены");
      return;
    }

    try {
      await axiosInstance.post(
        "/profile",
        { text: updatedMessage.text, image: updatedMessage.image, messageId },
        { withCredentials: true }
      );

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === messageId ? { ...msg, text: updatedMessage.text, image: updatedMessage.image } : msg
        )
      );
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }
  }

  function handleInputChange(messageId, field, value) {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId ? { ...msg, [field]: value } : msg
      )
    );
  }

  return (
    <div>
      <Center>Ваши щебеты</Center>
      <Center gap={"20px"} flexDirection={"column"} mt={20}>
        {messages.map((message) => (
          <Flex
            borderColor={"black"}
            borderWidth={1}
            borderStyle={"groove"}
            padding={10}
            borderRadius={10}
            key={message.id}
            flexDirection={"column"}
          >
            <form onSubmit={(e) => handleSubmit(e, message.id)}>
              <Flex flexDirection="column" gap={3}>
                <Input
                  type="text"
                  value={message.text}
                  onChange={(e) => handleInputChange(message.id, "text", e.target.value)}
                />
                <Input
                  type="text"
                  value={message.image}
                  onChange={(e) => handleInputChange(message.id, "image", e.target.value)}
                />
                <Button type="submit">Сохранить</Button>
              </Flex>
            </form>

            <Flex>
              {new Date(message.createdAt).toLocaleString("ru-RU", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Flex>

            <Image src={message.image} alt="message-img" maxW="200px" />

            <Flex> {message?.countLike ?? 0} ♡ </Flex>
            <Button onClick={() => deleteMessage(message.id)}> Удалить </Button>
          </Flex>
        ))}
      </Center>
    </div>
  );
}

export default Profile;
