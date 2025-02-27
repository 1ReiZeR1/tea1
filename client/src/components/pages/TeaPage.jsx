import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstanse";
import { useUser } from "../utils/UserContext";
import './TeaPage.css'
import { useSearchParams } from "react-router-dom";

const TeaPage = () => {
    const [searchParams] = useSearchParams(); // Получаем параметры запроса из URL
    const location = searchParams.get("location"); // Извлекаем значение параметра location
    const [teas, setTeas] = useState([]); 
    const [filteredTeas, setFilteredTeas] = useState([]);
    const carrentTeas = location ? filteredTeas : teas // если нет локации то брать все чаи, если есть то берем отфильтрованные 
    
    useEffect(() => {
      if (!location || !teaByLocation[location]) { // если в url нет location то отфидбтрованные чаи это все чаи 
        setFilteredTeas(teas); // Если location нет или он невалидный, возвращаем все чаи
        return;
      }
    
      const validTeaNames = teaByLocation[location]; // Получаем массив допустимых названий чаёв для данной локации
      const filtered = teas.filter((tea) => validTeaNames.includes(tea.name)); // Фильтруем по имени
    
      setFilteredTeas(filtered);
    }, [location, teas]); // Следим за изменением location и списка чаёв

    const teaByLocation = {
        cn: ["Эрл Грей", "Белый чай Бай Му Дань", "Улун Те Гуань Инь", "Пуэр", "Жасминовый чай", "Лапсанг Сушонг", "Хуан Шань Мао Фэн"],
        in: ["Дарджилинг", "Ассам"],
        jp: ["Зелёный чай Сенча", "Маття", "Спирулина Чай"],
        za: ["Ройбуш"],
        eg: ["Мята перечная"]
    };

    const { user } = useUser();
    const [comments, setComments] = useState({});  
    const [commentText, setCommentText] = useState({});
    const [err, setErr] = useState('');

    const handleInputChange = (teaId, text) => {
        setCommentText(prev => ({
            ...prev,
            [teaId]: text
        }));
    };

    useEffect(() => {
        const fetchTeas = async () => {
            try {
                const response = await axiosInstance.get("/api/teas");
                setTeas(response.data);

                const initialComments = {};
                for (const tea of response.data) {
                    try {
                        const commentsResponse = await axiosInstance.get(`/api/comments/${tea.id}`);
                         initialComments[tea.id] = commentsResponse.data;
                    } catch (error) {
                        console.error(`Ошибка при получении комментариев для чая ${tea.id}:`, error);
                         initialComments[tea.id] = []; 
                    }
                }
                setComments(initialComments); 
            } catch (error) {
                console.error("Ошибка при получении списка чаев:", error);
            }
        };

        fetchTeas();
    }, []);

    const handleAddComment = async (teaId) => {
        if (!user) {
            setErr('Необходимо авторизоваться, чтобы оставить комментарий');
            return;
        }
        try {
            await axiosInstance.post('/api/comments', {
                teaId: teaId,
                comment_text: commentText[teaId] || '', // Используем текст для конкретного чая
            });
            const response = await axiosInstance.get(`/api/comments/${teaId}`);
            setComments(prev => ({ ...prev, [teaId]: response.data }));
            setCommentText(prev => ({ ...prev, [teaId]: '' })); // Очищаем только поле ввода для этого чая
            setErr('');
        } catch (error) {
            console.error('Ошибка при добавлении комментария:', error);
        }
    };

return (
    <div className="container">
        <h1 className="page-title">Чайная Коллекция</h1>
        <div className="tea-grid">
            {carrentTeas?.map((tea) => (
                <div key={tea.id} className="tea-card">
                    <div className="image-container">
                        <img src={tea.image} alt={tea.name} className="tea-image"/>
                    </div>
                    <h2 className="tea-name">{tea.name}</h2>
                    <p className="tea-cultivation">Выращен в: {tea.cultivationPlace}</p>
                    <p className="tea-description">{tea.description}</p>

                    <div className="comments-section">
                        <h3 className="comments-title">Комментарии</h3>
                        <ul className="comments-list">
                            {comments[tea.id] && comments[tea.id].map((comment) => (
                                <li key={comment.id} className="comment">
                                    {comment.comment_text} - <span className="comment-author">{comment.User?.name || "Аноним"}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="add-comment-form">
                             {err && <p style={{color:'red'}}>{err}</p>}
                            <textarea

                                className="comment-input"
                                placeholder={user ? "Добавьте свой комментарий..." : "Войдите, чтобы оставить комментарий"}
                                value={commentText[tea.id] || ''}
                                onChange={(e) => handleInputChange(tea.id, e.target.value)}
                                disabled={!user}
                            />
                            <button
                                className="comment-button"
                                onClick={() => handleAddComment(tea.id)}
                                disabled={!user}
                            >
                                Оставить комментарий
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

}; export default TeaPage;