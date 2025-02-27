import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstanse";
import { useUser } from "../utils/UserContext";
import './TeaPage.css'

const TeaPage = () => {
    const [teas, setTeas] = useState([]);
    const { user } = useUser();
    const [comments, setComments] = useState({});  
    const [commentText, setCommentText] = useState('');
     const [err, setErr] = useState('');

    useEffect(() => {
        const fetchTeas = async () => {
            try {
                const response = await axiosInstance.get("/teas");
                setTeas(response.data);

                const initialComments = {};
                for (const tea of response.data) {
                    try {
                        const commentsResponse = await axiosInstance.get(`/comments/${tea.id}`);
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
             setErr('Необходимо авторизоваться чтобы оставить комментарий')
             return;
         }
        try {
            await axiosInstance.post('/comments', {
                teaId: teaId,
                comment_text: commentText,
            });
            const response = await axiosInstance.get(`/comments/${teaId}`);
            setComments({...comments, [teaId]:response.data});
            setCommentText('');
             setErr('');
        } catch (error) {
            console.error('Ошибка при добавлении комментария:', error);
        }
    };

return (
    <div className="container">
        <h1 className="page-title">Чайная Коллекция</h1>
        <div className="tea-grid">
            {teas.map((tea) => (
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
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
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