import { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";

// Создаем контекст для пользователя
const UserContext = createContext();

// Компонент-провайдер, который оборачивает приложение и предоставляет данные пользователя
export const UserProvider = ({ children }) => {
  // Создаем состояние для пользователя, начальное значение null
  const [user, setUser] = useState(null);

  return (
    // Передаем через контекст объект с данными пользователя и функцией для их обновления
    <UserContext.Provider value={{ user, setUser }}>
      {children}{" "}
      {/* Рендерим дочерние элементы, переданные в пропсе children */}
    </UserContext.Provider>
  );
};

// Валидируем пропсы компонента UserProvider, указываем, что пропс children обязателен и должен быть допустимым React-элементом
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Хук для удобного доступа к контексту пользователя из любых компонентов
export const useUser = () => useContext(UserContext);
