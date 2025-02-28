import { useState, useEffect } from "react";
import axios from "axios";
import { DeleteIcon } from '@chakra-ui/icons'

import {
  Center,
  Text,
  Button,
  VStack,
  Input,
  Textarea,
  Image,
  HStack,
  Box,
  Avatar,
  Stack,
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
    if (!user || user?.isAdmin) {
      return;
    }
    axios
      .get("http://localhost:3000/api/profile/latest", {
        withCredentials: true,
        validateStatus: (status) => status < 500, // важно , иначе запросы между разными источниками не будут корректно работать.
      }) // HttpOnly-cookies для аутентификации, без withCredentials: true запрос будет выполнен без них, и сервер может отклонить его.
      .then((response) => setComments(response.data))
      .catch((error) =>
        console.error("Ошибка при загрузке комментариев:", error)
      );
  }, [user]);

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

  async function onClickDelete(id) {
    try {
      await axios.delete(`http://localhost:3000/api/comments/${id}`);
      setComments(comments.filter((comment) => comment.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении комментария:", error);
    }
  }

  return (
    <Center flexDirection="column" mt={40} mb={0} pb={140} textAlign="center">
      <Text fontSize="2xl" fontWeight="bold">
        {user?.name ? `Привет, ${user.name}!` : "Вы не авторизованы"}
      </Text>

      {user && (
        <Text mt={0} fontSize="2xl" fontWeight="bold">
          {user?.isAdmin ? "Вы можете управлять чаями." : "Это ваш профиль."}
        </Text>
      )}

      {user?.isAdmin && (
        <VStack mt={10} width="100%" maxWidth="610px">
          <VStack
            transition="transform 0.2s ease-in-out"
            _hover={{ transform: "scale(1.05)" }}
            mt={20}
            mb={20}
            width="600px"
            p={6}
            borderWidth={1}
            borderRadius={40}
            borderColor="#e60023"
            boxShadow="0 0 10px rgba(255, 0, 0, 0.3)"
            backgroundColor={"#F8F8FF"}
          >
            <Text mt={20} mb={10} fontSize="xl" fontWeight="bold">
              Добавить новый чай
            </Text>
            <Input
              textIndent={6}
              mb={2}
              width="98%"
              height={20}
              placeholder="Название"
              value={newTea.name}
              onChange={(e) => setNewTea({ ...newTea, name: e.target.value })}
              borderWidth="1px"
              borderRadius="10px"
              borderColor="gray.300"
              boxShadow="sm"
            />
            <Input
              textIndent={6}
              mb={2}
              width="98%"
              height={20}
              placeholder="Место культивации"
              value={newTea.cultivationPlace}
              onChange={(e) =>
                setNewTea({ ...newTea, cultivationPlace: e.target.value })
              }
              borderRadius="10px"
              borderWidth="1px"
              borderColor="gray.300"
              boxShadow="sm"
            />
            <Input
              textIndent={6}
              mb={6}
              borderWidth="1px"
              borderRadius="10px"
              width="98%"
              height={20}
              placeholder="Ссылка на картинку"
              value={newTea.image}
              onChange={(e) => setNewTea({ ...newTea, image: e.target.value })}
              borderColor="gray.300"
              boxShadow="sm"
            />
            <Textarea
              textIndent={6}
              borderRadius="10px"
              borderColor="gray.300"
              width="98%"
              height={200}
              placeholder="Описание..."
              value={newTea.description}
              onChange={(e) =>
                setNewTea({ ...newTea, description: e.target.value })
              }
              boxShadow="sm"
              _placeholder={{ fontSize: "15px" }}
            />
            <Button
              mt={10}
              mb={10}
              _hover={{ bg: "black", color: "white", borderColor: "black" }}
              colorScheme="green"
              borderRadius="full"
              onClick={handleAddTea}
            >
              Добавить чай
            </Button>
          </VStack>
          <VStack columns={{ base: 1, md: 2, lg: 3 }} spacing={6} width="100%" maxWidth="1200px">
            {teaList.map((tea) => (
              <VStack
                mt={2}
                mb={20}
                transition="transform 0.2s ease-in-out"
                _hover={{ transform: "scale(1.05)" }}
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
                  width={300}
                  height={240}
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
                  _hover={{ bg: "white", color: "black", borderColor: "black" }}
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
        <VStack mt={0} width="40%">
          <Text fontSize="2xl" fontWeight="bold">
            Последние комментарии
          </Text>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <HStack
                mt={6}
                mb={6}
                key={comment.id}
                width="100%"
                borderWidth={1}
                borderRadius="10px"
                boxShadow="0 0 5px rgba(107, 107, 107, 0.5)"
                p={4}
                backgroundColor={"#F8F8FF"}
                alignItems="flex-start"
                justifyContent="space-between" // Распределяет пространство между элементами
              >
                {/* Левая часть: Аватар, Имя, Чай */}
                <Stack direction="column" spacing={4}>
                  <Avatar
                    paddingLeft={50}
                    style={{ width: "50px", height: "50px" }}
                    size="md"
                    src={"../../profil-photo.svg"}
                  />
                  <Text mt={0} mb={0} fontSize="16px">
                    Пользователь:
                  </Text>
                  <Text
                    mt={0}
                    mb={0}
                    fontSize="16px"
                    fontWeight="bold"
                  >{`${comment.User?.name}`}</Text>
                  <Text
                    mt={0}
                    mb={0}
                    width={150}
                    height={50}
                    fontSize="12px"
                    color="gray.500"
                  >
                    Оставил коментарий к:{" "}
                    <Text fontWeight="bold" as="span">
                      {comment.Tea?.name}
                    </Text>
                  </Text>
                </Stack>

                {/* Правая часть: Текст комментария */}
                <Box
                  borderRadius="10px"
                  boxShadow="0 0 5px rgba(107, 107, 107, 0.5)"
                  wordBreak="break-word"
                  marginTop={6}
                  marginBottom={6}
                  marginRight={6}
                  textAlign="left"
                  flex="1"
                  p={6}
                  backgroundColor="white"
                  height={140}
                  width={500}
                  >
                  <Text>{comment.comment_text}</Text>
                </Box>
                <DeleteIcon mt={140} mr={6} cursor={'pointer'} onClick={()=> onClickDelete(comment.id)}/>
              </HStack>
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
