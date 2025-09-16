import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/api';

const TaskForm = ({ task, onBack, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('new');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
    }
  }, [task]);

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Название обязательно';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (task) {
        await updateTask(task.id, { title, description, status });
      } else {
        await createTask({ title, description, status });
      }

      onSave();
      onBack();
    } catch (error) {
      console.error('Ошибка при сохранении задачи:', error);
      alert('Не удалось сохранить задачу');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="tasks-container">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            {task ? 'Редактирование задачи' : 'Новая задача'}
          </h2>
          <div className="card-actions">
            <button className="btn btn-secondary" onClick={onBack}>
              Назад
            </button>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label required">Название</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Описание</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Статус</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={isSubmitting}
            >
              <option value="new">Новая</option>
              <option value="in-progress">В процессе</option>
              <option value="completed">Завершена</option>
            </select>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onBack}
              disabled={isSubmitting}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Сохранение...' : (task ? 'Обновить' : 'Создать')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;