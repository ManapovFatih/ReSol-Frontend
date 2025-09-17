import React, { useState, useRef, useEffect } from 'react';
import { updateTask } from '../services/api';
import { FiEdit2, FiTrash2, FiClock, FiCheckCircle, FiCircle, FiEye } from 'react-icons/fi';
import { RiProgress4Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import CustomSelect from './CustomSelect';

const TaskItem = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const statusOptions = [
    { value: 'new', label: 'Новая' },
    { value: 'in-progress', label: 'В процессе' },
    { value: 'completed', label: 'Завершена' }
  ];

  const handleStatusChange = async (newStatus) => {

    if (onStatusChange) {
      onStatusChange(task.id, newStatus);
    }

  };

  const handleCardClick = () => {
    navigate(`/tasks/view/${task.id}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(task);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(task);
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
    <div className="task-item" onClick={handleCardClick}>
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

      <div className="task-item-actions" onClick={(e) => e.stopPropagation()}>
        <div >
          <CustomSelect
            value={task.status}
            onChange={handleStatusChange}
            disabled={isUpdating}
            options={statusOptions}
          />
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={handleEditClick}
          disabled={isUpdating}
        >
          <FiEdit2 size={16} />
        </button>

        <button
          className="btn btn-danger btn-sm"
          onClick={handleDeleteClick}
          disabled={isUpdating}
        >
          <FiTrash2 size={16} />
        </button>

        <button
          className="btn btn-info btn-sm"
          onClick={handleCardClick}
          disabled={isUpdating}
        >
          <FiEye size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;