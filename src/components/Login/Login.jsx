import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig'; // Импорт конфигурации Firebase
import { collection, getDocs, query, where } from "firebase/firestore"; // Импорт функций Firestore для работы с базой данных
import './Login.css'; // Импорт стилей

const Login = ({ setUserId }) => {
    // Состояния для хранения введенного логина, пароля и возможных ошибок
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Хук для навигации по страницам

    // Функция обработки входа в систему
    const handleLogin = async (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
        
        try {
            const employeesRef = collection(db, "employees"); // Получаем коллекцию сотрудников
            // Создаем запрос для поиска пользователя по введенному логину и паролю
            const q = query(employeesRef, where("login", "==", email), where("password", "==", password));
            const querySnapshot = await getDocs(q); // Выполняем запрос к базе данных
            
            if (!querySnapshot.empty) { // Если найдены документы в коллекции (пользователь существует)
                const userDoc = querySnapshot.docs[0]; // Берем первый найденный документ
                setUserId(userDoc.id); // Сохраняем ID пользователя (чтобы использовать в профиле)
                navigate('/profile'); // Перенаправляем пользователя на страницу профиля
            } else {
                setError('Неверные логин или пароль'); // Выводим сообщение об ошибке
            }
        } catch (err) {
            console.error("Ошибка при входе: ", err);
            setError('Произошла ошибка'); // Выводим сообщение об ошибке, если что-то пошло не так
        }
    };

    return (
        <div className="LoginContainer">
            <form onSubmit={handleLogin}> {/* Форма входа */}
                <h2 className='OpenLog'>Вход</h2>
                <div className="form_item">
                    {/* Поле ввода логина */}
                    <input 
                        type="email" 
                        className="form__name form" 
                        name="email" 
                        placeholder="Логин" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} // Обновляем состояние email при изменении ввода
                        required 
                    />
                </div>
                <div className="form_item">
                    {/* Поле ввода пароля */}
                    <input 
                        type="password" 
                        className="form__name form" 
                        name="password" 
                        placeholder="Пароль" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} // Обновляем состояние password при изменении ввода
                        required 
                    />
                </div>
                {/* Кнопка отправки формы (входа) */}
                <button className='Open' type="submit">Войти</button>
                {error && <p>{error}</p>} {/* Отображение ошибки, если она есть */}
            </form>

            {/* Кнопка возврата на главную страницу */}
            <div className="back-button-container">
                <button onClick={() => navigate('/')} className="go-home-button">
                    Назад
                </button>
            </div>
        </div>
    );
};

export default Login;