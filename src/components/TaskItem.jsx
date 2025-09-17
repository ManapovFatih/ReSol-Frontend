import React, { useState } from 'react';
import { updateTask } from '../services/api';
import { FiEdit2, FiTrash2, FiClock, FiCheckCircle, FiCircle } from 'react-icons/fi';
import { RiProgress4Line } from 'react-icons/ri';

const TaskItem = ({ task, onEdit, onDelete }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus) => {
    try {
      setIsUpdating(true);
      await updateTask(task.id, { status: newStatus });
      onDelete();
    } catch (error) {
      console.error('Ошибка при обновлении статуса:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusIcon = () => {
    switch (task.status) {
      case 'new':
        return <FiCircle size={14} />;
      case 'in-progress':
        return <RiProgress4Line size={14} />;
      case 'completed':
        return <FiCheckCircle size={14} />;
      default:
        return <FiClock size={14} />;
    }
  };

  return (
    <div className="task-item">
      <div className="task-item-header">
        <h3 className="task-item-title">{task.title}</h3>
        <span className={`task-item-status task-item-status-${task.status}`}>
          {getStatusIcon()}
          {task.status === 'new' && 'Новая'}
          {task.status === 'in-progress' && 'В процессе'}
          {task.status === 'completed' && 'Завершена'}
        </span>
      </div>

      {task.description && (
        <p className="task-item-description">{task.description}</p>
      )}

      <div className="task-item-meta">
        <FiClock size={12} />
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
          disabled={isUpdating}
        >
          <FiEdit2 size={16} />
        </button>

        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(task)}
          disabled={isUpdating}
        >
          <FiTrash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;