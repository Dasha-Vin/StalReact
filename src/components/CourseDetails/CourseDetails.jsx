import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // импортируйте useHistory
import { db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import './CourseDetails.css'; 
import Popup from './Popup'; 
import CourseDetailsImage from '../../assets/CourseDetails.png';
import Back from '../../assets/back.png';

const CourseDetails = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [error, setError] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const courseDoc = doc(db, "courses", id);
                const courseSnapshot = await getDoc(courseDoc);

                if (courseSnapshot.exists()) {
                    setCourse({ id: courseSnapshot.id, ...courseSnapshot.data() });
                } else {
                    setError('Курс не найден');
                }
            } catch (err) {
                console.error("Ошибка при получении данных курса: ", err);
                setError('Не удалось загрузить данные курса');
            }
        };

        fetchCourseDetails();
    }, [id]);

    if (error) return <p className="error-message">{error}</p>;
    if (!course) return <p className="loading-message">Загрузка...</p>; 

    const togglePopup = () => {
        setIsPopupOpen(prevState => {
            const newState = !prevState;
            if (newState) {
                document.body.classList.add('body_fixed');
            } else {
                document.body.classList.remove('body_fixed');
            }
            return newState;
        });
    };

    const handleBackClick = () => {
        navigate('/'); // переход на главную страницу
    };

    return (
        <div>
            <div className="Arrow-back" onClick={handleBackClick}>
                <img className="backImage" src={Back} alt="Назад" />
                <h3 className="back">Назад</h3>
            </div>
            <div className="course-details container">
                <h1 className="common-title">{course.name}</h1>
                <img src={CourseDetailsImage} className='CourseDetailsImage' alt="Курс" />
                <p className="course-text">{course.text}</p>

                <button className="js-btn widthBtn widthBtn_inverted" onClick={togglePopup}>
                    Зарегистрироваться на курс
                </button>

                {/* Передаем весь объект курса в Popup */}
                <Popup isOpen={isPopupOpen} onClose={togglePopup} course={course} />
            </div>
        </div>
    );
};

export default CourseDetails;