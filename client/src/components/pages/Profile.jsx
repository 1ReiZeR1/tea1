import { useState, useEffect } from "react";
import axios from "axios";
import {
  Center,
  Text,
  Button,
  VStack,
  Input,
  Textarea,
  Image,
} from "@chakra-ui/react";
import { useUser } from "../utils/UserContext";

function Profile() {
  const { user } = useUser();
  const [teaList, setTeaList] = useState([]);
  const [comments, setComments] = useState([]);
  
  const [newTea, setNewTea] = useState({
    name: "",
    cultivationPlace: "",
    image: "",
    description: "",
  });

  // Загрузка списка чаёв из БД при загрузке страницы
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/teas", {
        withCredentials: true,
        validateStatus: (status) => status < 500,
      })
      .then((response) => setTeaList(response.data))
      .catch((error) => console.error("Ошибка при загрузке чаёв:", error));
  }, []);


  useEffect(() => {
    axios
      .get("http://localhost:3000/api/comments/latest", {
        withCredentials: true,
        validateStatus: (status) => status < 500,            // важно
      })
      .then((response) => setComments(response.data))
      .catch((error) =>
        console.error("Ошибка при загрузке комментариев:", error)
      );
  }, []);

  // Функция удаления чая
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/teas/${id}`);
      setTeaList(teaList.filter((tea) => tea.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении чая:", error);
    }
  };

  // Функция добавления чая
  const handleAddTea = async () => {
    if (newTea.name && newTea.cultivationPlace) {
      try {
        const response = await axios.post("http://localhost:3000/api/teas", {
          ...newTea,
          userId: user.id, // Привязываем чай к администратору
        });

        setTeaList([...teaList, response.data]);
        setNewTea({
          name: "",
          cultivationPlace: "",
          image: "",
          description: "",
        });
      } catch (error) {
        console.error("Ошибка при добавлении чая:", error);
      }
    }
  };

  return (
    <Center flexDirection="column" mt={60} textAlign="center">
      <Text fontSize="2xl" fontWeight="bold">
        {user?.name ? `Привет, ${user.name}!` : "Вы не авторизованы"}
      </Text>

      {user && (
        <Text fontSize="2xl" fontWeight="bold">
          {user?.isAdmin
            ? "Привет, админ! Вы можете управлять чаями."
            : "Это ваш профиль."}
        </Text>
      )}

      {user?.isAdmin && (
        <VStack mt={10} width="100%">
            <VStack
            width="100%"
            p={4}
            borderWidth={1}
            borderRadius="lg"
            borderColor="#e60023"
          >
            <Text fontSize="xl" fontWeight="bold">
              Добавить новый чай
            </Text>
            <Input
              width={600}
              height={20}
              placeholder="Название"
              value={newTea.name}
              onChange={(e) => setNewTea({ ...newTea, name: e.target.value })}
            />
            <Input
              width={600}
              height={20}
              placeholder="Место культивации"
              value={newTea.cultivationPlace}
              onChange={(e) =>
                setNewTea({ ...newTea, cultivationPlace: e.target.value })
              }
            />
            <Input
              width={600}
              height={20}
              placeholder="Ссылка на картинку"
              value={newTea.image}
              onChange={(e) => setNewTea({ ...newTea, image: e.target.value })}
            />
            <Textarea
              width={600}
              height={300}
              placeholder="Описание"
              value={newTea.description}
              onChange={(e) =>
                setNewTea({ ...newTea, description: e.target.value })
              }
            />
            <Button mt={4} colorScheme="green" onClick={handleAddTea}>
              Добавить чай
            </Button>
          </VStack>
          <VStack width="100%" spacing={30} maxWidth="800px">
            {teaList.map((tea) => (
              <VStack
                key={tea.id}
                width="100%"
                borderColor={"#FED7D7"}
                borderWidth={1}
                borderStyle={"groove"}
                borderRadius={50}
                boxShadow="0 0 10px rgba(255, 0, 0, 0.3)"
                backgroundColor={"#F8F8FF"}
              >
                <Image
                  mt={20}
                  mb={10}
                  src={tea.image || "https://via.placeholder.com/150"}
                  boxSize="300px"
                  borderRadius="md"
                />
                <Text
                  mt={2}
                  mb={0}
                  fontSize="xl"
                  fontWeight="bold"
                >{`Название: ${tea.name}`}</Text>
                <Text
                  mt={0}
                  mb={10}
                  as="cite"
                >{`Место культивация чая: ${tea.cultivationPlace}`}</Text>
                <Text m={30} mt={2} mb={2}>
                  {tea.description}
                </Text>
                <Button
                  mt={20}
                  mb={20}
                  bg="#e60023"
                  color="white"
                  borderRadius="full"
                  colorScheme="red"
                  onClick={() => handleDelete(tea.id)}
                >
                  Удалить
                </Button>
              </VStack>
            ))}
          </VStack>

          {/* Форма добавления чая */}
        </VStack>
      )}
      {/* Блок комментариев для пользователей */}
{!user?.isAdmin && (
  <VStack mt={10} width="100%">
    <Text fontSize="2xl" fontWeight="bold">Последние комментарии</Text>
    {comments.length > 0 ? (
      comments.map((comment) => (
        <VStack
          key={comment.id}
          width="100%"
          borderWidth={1}
          borderRadius="lg"
          p={4}
          boxShadow="sm"
          backgroundColor={"#F8F8FF"}
        >
          <Text fontWeight="bold">{comment.User?.name}:</Text>
          <Text>{comment.comment_text}</Text>
          <Text fontSize="sm" color="gray.500">К чаю: {comment.Tea?.name}</Text>
        </VStack>
      ))
    ) : (
      <Text>Комментариев пока нет</Text>
    )}
  </VStack>
)}
    </Center>
  );
}

export default Profile;
