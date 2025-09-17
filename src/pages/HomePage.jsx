import React from 'react';
import { Link } from 'react-router-dom';
import Meta from '../components/Meta';

const HomePage = () => {
    return (
        <div className='home'>
            <Meta title={"Главная страница"} />
            <h1>Добро пожаловать!</h1>
            <p>Это главная страница приложения для управления задачами.</p>
            <Link to="/tasks" className="btn btn-primary">Перейти к задачам</Link>
        </div>
    );
};

export default HomePage;