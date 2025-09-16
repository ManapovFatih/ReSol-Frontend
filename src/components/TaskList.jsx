import React, { useState } from 'react';
import TaskItem from './TaskItem';
import Pagination from './Pagination';

const TaskList = ({ tasks, loading, error, onRefresh, onCreateTask, onEditTask }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const tasksPerPage = 6;

  // Фильтрация задач
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'in-progress') return task.status === 'in-progress';
    if (filter === 'new') return task.status === 'new';
    return true;
  });

  // Пагинация
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
            <div className="empty-state-icon">⚠️</div>
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
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Мои задачи</h2>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={onCreateTask}>
              Новая задача
            </button>
          </div>
        </div>

        <div className="task-filters">
          <div
            className={`task-filters-filter ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Все
          </div>
          <div
            className={`task-filters-filter ${filter === 'new' ? 'active' : ''}`}
            onClick={() => setFilter('new')}
          >
            Новые
          </div>
          <div
            className={`task-filters-filter ${filter === 'in-progress' ? 'active' : ''}`}
            onClick={() => setFilter('in-progress')}
          >
            В процессе
          </div>
          <div
            className={`task-filters-filter ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Завершённые
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <p className="empty-state-text">Задачи не найдены</p>
            <button className="btn btn-primary" onClick={onCreateTask}>
              Создать первую задачу
            </button>
          </div>
        ) : (
          <>
            <div className="task-list">
              {currentTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={onEditTask}
                  onDelete={onRefresh}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TaskList;