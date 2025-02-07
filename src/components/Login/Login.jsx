import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig'; // Импорт конфигурации Firebase
import { collection, getDocs, query, where } from "firebase/firestore";
import './Login.css'; // Импорт стилей

const Login = ({ setUserId }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const employeesRef = collection(db, "employees");
            const q = query(employeesRef, where("login", "==", email), where("password", "==", password));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0]; // Получаем первого пользователя из результата
                setUserId(userDoc.id); // Сохраняем идентификатор пользователя
                navigate('/profile'); // Перенаправление на страницу профиля
            } else {
                setError('Неверные логин или пароль');
            }
        } catch (err) {
            console.error("Ошибка при входе: ", err);
            setError('Произошла ошибка');
        }
    };

    return (
        <div className="LoginContainer">
            <form onSubmit={handleLogin}>
                <h2 className='OpenLog'>Вход</h2>
                <div className="form_item">
                    <input 
                        type="email" 
                        className="form__name form" 
                        name="email" 
                        placeholder="Логин" 
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
                {error && <p>{error}</p>}
            </form>

            <div className="back-button-container">
                <button onClick={() => navigate('/')} className="go-home-button">
                    Назад
                </button>
            </div>
        </div>
    );
};

export default Login;