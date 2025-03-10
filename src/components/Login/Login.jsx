import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Импорт стилей
import Back from '../../assets/back.png';

const Login = ({ setUserId }) => {
    const [email, setEmail] = useState('');  // Состояние для хранения email
    const [password, setPassword] = useState('');  // Состояние для хранения пароля
    const [error, setError] = useState('');  // Состояние для хранения ошибки

    const navigate = useNavigate();  // Хук для навигации

    const handleEmail = (e) => {
        e.preventDefault();  // Предотвращаем перезагрузку страницы при отправке формы
        
        // Симулированные данные пользователей
        const simulatedUsers = [
            { id: '1', email: 'user@example.com', password: 'password123' },
            { id: '2', email: 'admin@example.com', password: 'admin123' }
        ];

        // Проверяем, соответствует ли введенный email и пароль одному из симулированных пользователей
        const user = simulatedUsers.find(user => user.email === email && user.password === password);

        if (user) {
            setUserId(user.id); // Сохраняем идентификатор пользователя
            navigate('/profile'); // Перенаправление на страницу профиля
        } else {
            setError('Неверные почта или пароль'); // Устанавливаем сообщение об ошибке
        }
    };

    const handleBackClick = () => {
        navigate('/'); 
    };

    return (
        <div>
            <div className="Arrow-back" onClick={handleBackClick}>
                <img className="backImage" src={Back} alt="Назад" />
                <h3 className="back">Назад</h3>
            </div>

            <div className="LoginContainer">
                <form onSubmit={handleEmail}>
                    <h2 className='OpenLog'>Вход</h2>
                    <div className="form_item">
                        <input 
                            type="email" 
                            className="form__name form" 
                            name="email" 
                            placeholder="Адрес эл. почты" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form_item">
                        <input 
                            type="password" 
                            className="form__name form" 
                            name="password" 
                            placeholder="Пароль" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button className='Open' type="submit">Войти</button>
                    {error && <p>{error}</p>} {/* Отображаем сообщение об ошибке, если оно есть */}
                </form>
            </div>
        </div>
    );
};

export default Login;