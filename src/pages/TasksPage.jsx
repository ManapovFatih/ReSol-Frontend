import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskList from '../components/TaskList';
import { getTasks, deleteTask } from '../services/api';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
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
      // Обновляем список после удаления
      await fetchTasks();
    } catch (err) {
      setError('Не удалось удалить задачу');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>

      <TaskList
        tasks={tasks}
        loading={loading}
        error={error}
        onRefresh={fetchTasks}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default TasksPage;