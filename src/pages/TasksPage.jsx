import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import { getTasks, deleteTask } from '../services/api';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0
  });
  const [filters, setFilters] = useState({});

  const fetchTasks = async (page = 1, filters = {}) => {
    try {
      setLoading(true);
      const data = await getTasks(filters, page);
      setTasks(data.tasks || data);


      if (data.pagination) {
        setPagination(data.pagination);
      } else {

        setPagination({
          currentPage: page,
          totalPages: Math.ceil((data.tasks || data).length / 6),
          totalCount: (data.tasks || data).length
        });
      }

      setError(null);
    } catch (err) {
      setError('Не удалось загрузить задачи');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      await fetchTasks(pagination.currentPage, filters);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchTasks(1, newFilters);
  };

  const handlePageChange = (page) => {
    fetchTasks(page, filters);
  };

  useEffect(() => {
    fetchTasks(1, {});
  }, []);

  return (
    <div>
      <TaskList
        tasks={tasks}
        loading={loading}
        error={error}
        pagination={pagination}
        filters={filters}
        onRefresh={() => fetchTasks(pagination.currentPage, filters)}
        onDeleteTask={handleDeleteTask}
        onFilterChange={handleFilterChange}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TasksPage;