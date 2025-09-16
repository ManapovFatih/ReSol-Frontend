import React, { useState } from 'react';
import { deleteTask, updateTask } from '../services/api';

const TaskItem = ({ task, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus) => {
    try {
      setIsUpdating(true);
      await updateTask(task.id, { status: newStatus });
      onDelete(); // Обновляем список
    } catch (error) {
      console.error('Ошибка при обновлении статуса:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      return;
    }

    try {
      setIsDeleting(true);
      await deleteTask(task.id);
      onDelete(); // Обновляем список
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="task-item">
      <div className="task-item-header">
        <h3 className="task-item-title">{task.title}</h3>
        <span className={`task-item-status task-item-status-${task.status}`}>
          {task.status === 'new' && 'Новая'}
          {task.status === 'in-progress' && 'В процессе'}
          {task.status === 'completed' && 'Завершена'}
        </span>
      </div>

      {task.description && (
        <p className="task-item-description">{task.description}</p>
      )}

      <div className="task-item-meta">
        Создано: {formatDate(task.createdAt)}
        {task.updatedAt !== task.createdAt && ` | Обновлено: ${formatDate(task.updatedAt)}`}
      </div>

      <div className="task-item-actions">
        <select
          className="form-control"
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={isUpdating}
          style={{ width: 'auto', marginRight: 'auto' }}
        >
          <option value="new">Новая</option>
          <option value="in-progress">В процессе</option>
          <option value="completed">Завершена</option>
        </select>

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => onEdit(task)}
          disabled={isUpdating || isDeleting}
        >
          ✏️
        </button>

        <button
          className="btn btn-danger btn-sm"
          onClick={handleDelete}
          disabled={isUpdating || isDeleting}
        >
          {isDeleting ? '...' : '🗑️'}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;