import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Footer from './components/Footer';
import TaskForm from './components/TaskForm';
import './assets/styles/style.min.css';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('list');
  const [editingTask, setEditingTask] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Здесь будут функции для работы с API

  const fetchTasks = async () => {
    try {
      setLoading(true);
      // Запрос к API для получения задач
      const response = await fetch('http://localhost:5000/api/tasks');
      const data = await response.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить задачи');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = () => {
    setEditingTask(null);
    setCurrentView('form');
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setCurrentView('form');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setEditingTask(null);
    fetchTasks(); // Обновляем список после возврата
  };

  return (
    <div className="app-container">
      <Header onMenuToggle={() => setMenuOpen(!menuOpen)} />
      <Menu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onCreateTask={handleCreateTask}
        onBack={handleBackToList}
      />
      <main className="main-content">
        {currentView === 'list' ? (
          <TaskList
            tasks={tasks}
            loading={loading}
            error={error}
            onRefresh={fetchTasks}
            onCreateTask={handleCreateTask}
            onEditTask={handleEditTask}
          />
        ) : (
          <TaskForm
            task={editingTask}
            onBack={handleBackToList}
            onSave={fetchTasks}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;