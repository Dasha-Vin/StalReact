import React, { useState } from 'react';
import './Popup.css';
import CloseImage from '../../assets/close.png';
import { db } from '../../firebaseConfig'; 
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const Popup = ({ isOpen, onClose, course }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({}); // Состояние для хранения ошибок
    const [successMessage, setSuccessMessage] = useState(''); // Состояние для хранения сообщения об успехе

    if (!isOpen) return null;

    const handleSubmit = async () => {
        const newErrors = {}; // Объект для накопления ошибок

        // Проверяем, что все поля заполнены
        if (!firstName) newErrors.firstName = "Пожалуйста, введите имя.";
        if (!lastName) newErrors.lastName = "Пожалуйста, введите фамилию.";
        if (!middleName) newErrors.middleName = "Пожалуйста, введите отчество.";
        if (!login) newErrors.login = "Пожалуйста, введите логин.";
        if (!password) newErrors.password = "Пожалуйста, введите пароль.";
        if (!confirmPassword) newErrors.confirmPassword = "Пожалуйста, подтвердите пароль.";

        // Проверка на наличие курса
        if (!course) {
            alert("Ошибка: недоступен курс.");
            return;
        }

        // Проверка на соответствие паролей
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Пароли не совпадают.";
        }

        // Если есть ошибки, обновляем состояние и выходим
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Проверка на существование пользователя с таким же логином
        const usersRef = collection(db, "employees");
        const q = query(usersRef, where("login", "==", login));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            newErrors.login = "Пользователь с таким логином уже существует. Пожалуйста, выберите другой логин.";
            setErrors(newErrors);
            return;
        }

        // Если логин уникален, добавляем нового пользователя
        try {
            const docRef = await addDoc(collection(db, "employees"), {
                firstName,
                lastName,
                middleName,
                login,
                password, // В реальном приложении следует использовать хеширование пароля
                courseId: course.id, // ID курса
                courseName: course.name, // Имя курса
                statusCourse: "На рассмотрении" // Установка статуса заявки
            });
            console.log("Документ успешно записан с ID: ", docRef.id);

            // Устанавливаем сообщение об успешной отправке
            setSuccessMessage("Вашу заявку успешно отправили!");

            // Сброс формы после успешной отправки
            setFirstName('');
            setLastName('');
            setMiddleName('');
            setLogin('');
            setPassword('');
            setConfirmPassword('');
            setErrors({}); // Сбрасываем ошибки

            // Закрываем попап после задержки, чтобы пользователь увидел сообщение
            setTimeout(() => {
                onClose();
                setSuccessMessage(''); // Сбрасываем сообщение
            }, 2000); // Закрытие попапа через 2 секунды
        } catch (e) {
            console.error("Ошибка при добавлении документа: ", e);
            alert("Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.");
        }
    };

    return (
        <div className="popup popup_open">
            <div className="popup__content js-popup__content">
                <p className="popup__title">Записаться на курс</p>
                <p className="popup__text">Заполните форму, мы рассмотрим вашу заявку</p>

                {successMessage && <p className="success-message">{successMessage}</p>} {/* Сообщение об успехе */}

                <input 
                     className="input" 
                     type="text" 
                     placeholder="Имя" 
                     value={firstName} 
                     onChange={(e) => setFirstName(e.target.value)} 
                 />
                 {errors.firstName && <p className="error-message">{errors.firstName}</p>}
 
                 <input 
                     className="input" 
                     type="text" 
                     placeholder="Фамилия" 
                     value={lastName} 
                     onChange={(e) => setLastName(e.target.value)} 
                 />
                 {errors.lastName && <p className="error-message">{errors.lastName}</p>}
 
                 <input 
                     className="input" 
                     type="text" 
                     placeholder="Отчество" 
                     value={middleName} 
                     onChange={(e) => setMiddleName(e.target.value)} 
                 />
                 {errors.middleName && <p className="error-message">{errors.middleName}</p>}
 
                 <input 
                     className="input" 
                     type="text" 
                     placeholder="Логин" 
                     value={login} 
                     onChange={(e) => setLogin(e.target.value)} 
                 />
                 {errors.login && <p className="error-message">{errors.login}</p>}
 
                 <input 
                     className="input" 
                     type="password" 
                     placeholder="Пароль" 
                     value={password} 
                     onChange={(e) => setPassword(e.target.value)} 
                 />
                 {errors.password && <p className="error-message">{errors.password}</p>}
 
                 <input 
                     className="input" 
                     type="password" 
                     placeholder="Подтверждение пароля" 
                     value={confirmPassword} 
                     onChange={(e) => setConfirmPassword(e.target.value)} 
                 />
                 {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
 
                 <button onClick={handleSubmit} className="widthBtn_popup">Отправить</button>
 
                 <div className="js-popup__close-btn" onClick={onClose}>
                     <img src={CloseImage} className='popup__close-btn' alt="Закрыть" />
                 </div>
             </div>
         </div>
     );
 };
 
 export default Popup;