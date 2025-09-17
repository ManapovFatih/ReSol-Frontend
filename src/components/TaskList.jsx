import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskItem from './TaskItem';
import Pagination from './Pagination';
import DeleteModal from './DeleteModal';
import { FiPlus, FiAlertTriangle, FiFileText } from 'react-icons/fi';

const TaskList = ({
  tasks,
  loading,
  error,
  pagination,
  filters,
  onRefresh,
  onDeleteTask,
  onFilterChange,
  onPageChange
}) => {
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    taskId: null,
    taskTitle: ''
  });

  const handleCreateTask = () => {
    navigate('/tasks/new');
  };

  const handleEditTask = (task) => {
    navigate(`/tasks/edit/${task.id}`);
  };

  const handleDeleteClick = (task) => {
    setDeleteModal({
      isOpen: true,
      taskId: task.id,
      taskTitle: task.title
    });
  };

  const handleDeleteConfirm = async () => {
    if (deleteModal.taskId) {
      await onDeleteTask(deleteModal.taskId);
    }
    setDeleteModal({ isOpen: false, taskId: null, taskTitle: '' });
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, taskId: null, taskTitle: '' });
  };

  const handleFilterChange = (filter) => {
    onFilterChange(filter === 'all' ? {} : { status: filter });
  };

  if (loading) {
    return (
      <div className="tasks-container">
        <div className="loading">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tasks-container">
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">
              <FiAlertTriangle size={32} />
            </div>
            <p className="empty-state-text">{error}</p>
            <button className="btn btn-primary" onClick={onRefresh}>
              Попробовать снова
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tasks-container">
      <DeleteModal
        isOpen={deleteModal.isOpen}
        taskTitle={deleteModal.taskTitle}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Мои задачи <span className='btn btn-secondary'>{pagination?.totalCount}</span></h2>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={handleCreateTask}>
              <FiPlus size={16} />
              Новая задача
            </button>
          </div>
        </div>

        <div className="task-filters">
          <div
            className={`task-filters-filter ${!filters.status ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            Все
          </div>
          <div
            className={`task-filters-filter ${filters.status === 'new' ? 'active' : ''}`}
            onClick={() => handleFilterChange('new')}
          >
            Новые
          </div>
          <div
            className={`task-filters-filter ${filters.status === 'in-progress' ? 'active' : ''}`}
            onClick={() => handleFilterChange('in-progress')}
          >
            В процессе
          </div>
          <div
            className={`task-filters-filter ${filters.status === 'completed' ? 'active' : ''}`}
            onClick={() => handleFilterChange('completed')}
          >
            Завершённые
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <FiFileText size={32} />
            </div>
            <p className="empty-state-text">Задачи не найдены</p>
            <button className="btn btn-primary" onClick={handleCreateTask}>
              <FiPlus size={16} />
              Создать первую задачу
            </button>
          </div>
        ) : (
          <>
            <div className="task-list">
              {tasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={() => handleEditTask(task)}
                  onDelete={() => handleDeleteClick(task)}
                />
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={onPageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TaskList;