import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h1>Добро пожаловать!</h1>
            <p>Это главная страница приложения для управления задачами.</p>
            <Link to="/tasks" className="btn">Перейти к задачам</Link>
        </div>
    );
};

export default HomePage;