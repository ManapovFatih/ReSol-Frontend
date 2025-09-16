import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { getTask, createTask, updateTask } from '../services/api';

const TaskFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(!!id);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchTask();
        }
    }, [id]);

    const fetchTask = async () => {
        try {
            const data = await getTask(id);
            setTask(data);
        } catch (err) {
            setError('Не удалось загрузить задачу');
            console.error('Ошибка загрузки задачи:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (taskData) => {
        try {
            if (id) {
                await updateTask(id, taskData);
            } else {
                await createTask(taskData);
            }
            navigate('/tasks');
        } catch (err) {
            setError(id ? 'Не удалось обновить задачу' : 'Не удалось создать задачу');
            console.error('Ошибка сохранения:', err);
            throw err; // Пробрасываем ошибку для обработки в TaskForm
        }
    };

    const handleBack = () => {
        navigate('/tasks');
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <TaskForm
                task={task}
                onSave={handleSave}
                onBack={handleBack}
                error={error}
            />
        </div>
    );
};

export default TaskFormPage;