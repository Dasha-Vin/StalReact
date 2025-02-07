import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig'; // Импорт конфигурации Firebase
import { collection, getDocs } from "firebase/firestore";
import './Programs.css'; // Подключите ваши стили
import line3Image from '../../assets/line3.png';

const Programs = () => {
    const [services, setServices] = useState([]); // Хранение данных о курсах
    const [error, setError] = useState(''); // Хранение ошибок при получении данных

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const coursesCollection = collection(db, "courses"); // Укажите вашу коллекцию
                const courseSnapshot = await getDocs(coursesCollection);
                const courseList = courseSnapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name,
                    url: "#" // Здесь можно добавить URL, если он есть в базе данных
                }));
                
                setServices(courseList); // Установка полученных курсов в состояние
            } catch (err) {
                console.error("Ошибка при получении курсов: ", err);
                setError('Не удалось загрузить курсы');
            }
        };

        fetchCourses(); // Вызов функции для получения курсов
    }, []); // Пустой массив зависимостей для выполнения один раз при монтировании компонента

    const handleServiceClick = (url) => {
        window.location.href = url; // Перенаправление на URL ссылки
    };

    return (
        <section className="main-programm" id="programm">
            <h2 className="common-title" id="programms">Программы переподготовки</h2>
            <img src={line3Image} alt="line" className="line2" />
            <div className="container">
                {error && <p>{error}</p>} {/* Вывод ошибки, если она есть */}
                <ul className="programms">
                    {services.map((service) => (
                        <li className="programm" key={service.id}>
                            <div className="programm__text" onClick={() => handleServiceClick(service.url)}>
                                <a href={service.url}>{service.name}</a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Programs;