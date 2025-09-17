import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTask, updateTask } from '../services/api';
import { FiArrowLeft, FiEdit2, FiClock, FiCheckCircle, FiCircle, FiTrash2 } from 'react-icons/fi';
import { RiProgress4Line } from 'react-icons/ri';
import Meta from '../components/Meta';
import CustomSelect from '../components/CustomSelect';

const TaskViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      setLoading(true);
      const taskData = await getTask(id);
      setTask(taskData);
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить задачу');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setIsUpdating(true);
      await updateTask(id, { status: newStatus });
      setTask(prev => ({ ...prev, status: newStatus, updatedAt: new Date().toISOString() }));
    } catch (error) {
      console.error('Ошибка при обновлении статуса:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEdit = () => {
    navigate(`/tasks/edit/${id}`);
  };

  const handleBack = () => {
    navigate('/tasks');
  };
  const statusOptions = [
    { value: 'new', label: 'Новая' },
    { value: 'in-progress', label: 'В процессе' },
    { value: 'completed', label: 'Завершена' }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = () => {
    switch (task?.status) {
      case 'new':
        return <FiCircle size={16} />;
      case 'in-progress':
        return <RiProgress4Line size={16} />;
      case 'completed':
        return <FiCheckCircle size={16} />;
      default:
        return <FiClock size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="card">
        <div className="empty-state">
          <p className="empty-state-text">{error || 'Задача не найдена'}</p>
          <button className="btn btn-primary" onClick={handleBack}>
            <FiArrowLeft size={16} />
            Вернуться к списку
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='task-view'>
      <Meta title={"Задача: " + task?.title} />
      <div className="card">
        <div className="card-header">
          <button className="btn btn-secondary" onClick={handleBack}>
            <FiArrowLeft size={16} />
            Назад
          </button>
          <h2 className="card-title">Просмотр задачи</h2>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={handleEdit}>
              <FiEdit2 size={16} />
              Редактировать
            </button>
          </div>
        </div>

        <div className="task-view-content">
          <div className="task-view-header">
            <h1 className="task-view-title">{task.title}</h1>
            <span className={`task-view-status task-view-status-${task.status}`}>
              {getStatusIcon()}
              {task.status === 'new' && 'Новая'}
              {task.status === 'in-progress' && 'В процессе'}
              {task.status === 'completed' && 'Завершена'}
            </span>
          </div>

          <div className="task-view-section">
            <h3>Описание</h3>
            {task.description ? (
              <p className="task-view-description">{task.description}</p>
            ) : (
              <p className="task-view-no-description">Описание отсутствует</p>
            )}
          </div>

          <div className="task-view-section">
            <h3>Информация</h3>
            <div className="task-view-meta">
              <div className="task-view-meta-item">
                <FiClock size={14} />
                <span>Создано: {formatDate(task.createdAt)}</span>
              </div>
              {task.updatedAt !== task.createdAt && (
                <div className="task-view-meta-item">
                  <FiClock size={14} />
                  <span>Обновлено: {formatDate(task.updatedAt)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="task-view-section">
            <h3>Статус</h3>
            <CustomSelect
              value={task.status}
              onChange={handleStatusChange}
              disabled={isUpdating}
              options={statusOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskViewPage;