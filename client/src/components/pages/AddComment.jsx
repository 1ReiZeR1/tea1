import { useState , useEffect } from "react";
import axios from "axios";
import { useUser } from "../utils/UserContext";
import { Button, Textarea, VStack, Text, Select } from "@chakra-ui/react";

function AddComment() {
  const { user } = useUser();
  const [commentText, setCommentText] = useState("");
  const [teaId, setTeaId] = useState("");
  const [teaList, setTeaList] = useState([]);

  // Загрузка списка чаёв при монтировании компонента
  useEffect(() => { // Используйте useEffect
    axios
      .get("http://localhost:3000/api/teas")
      .then((response) => setTeaList(response.data))
      .catch((error) => console.error("Ошибка при загрузке чаёв:", error));
  }, []);

  // Функция для отправки комментария
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!user) {
      alert("Пожалуйста, авторизуйтесь, чтобы оставить комментарий");
      return;
    }
  
    if (!commentText || !teaId) {
      alert("Пожалуйста, заполните все поля");
      return;
    }
  
    try {
      await axios.post("http://localhost:3000/api/comments", {
        comment_text: commentText,
        teaId,
        userId: user.id, 
      });
  
      alert("Комментарий успешно добавлен!");
      setCommentText("");
      setTeaId("");
    } catch (error) {
      console.error("Ошибка при добавлении комментария:", error);
      alert("Ошибка при добавлении комментария");
    }
  };

  return (
    <VStack spacing={4} align="stretch" maxWidth="600px" margin="0 auto" mt={10}>
      <Text fontSize="2xl" fontWeight="bold">
        Добавить комментарий
      </Text>

      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
            
          <Select
            placeholder="Выберите чай"
            value={teaId}
            onChange={(e) => setTeaId(e.target.value)}
            required
          >
            {teaList.map((tea) => (
              <option key={tea.id} value={tea.id}>
                {tea.name}
              </option>
            ))}
          </Select>

          <Textarea
            placeholder="Введите ваш комментарий"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          />

          <Button type="submit" colorScheme="teal">
            Отправить комментарий
          </Button>
        </VStack>
      </form>
    </VStack>
  );
}

export default AddComment;