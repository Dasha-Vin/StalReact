import React, { useState } from 'react';
import './Contacts.css'; // Подключите свои стили

const ContactSection = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь можно добавить логику отправки данных на сервер
        console.log('Имя:', name);
        console.log('Сообщение:', message);
        
        // Установить состояние submitted в true
        setSubmitted(true);

        // Очистить поля ввода
        setName('');
        setMessage('');
    };

    return (
        <div className="container">
            <h2 className='contact'>Свяжитесь с нами</h2>
            
            <div className="contacts__block">
            <a className="contacts-phone" href="tel:+7 935  895-45-35">+7 935  895-45-35</a>  
            <a className="contacts-mail" href="mailto:hello@mail.com">hello@mail.com</a>
            </div>
        </div>
    );
};

export default ContactSection;