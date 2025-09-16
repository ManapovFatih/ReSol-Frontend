import React from 'react';

const Menu = ({ isOpen, onClose, onCreateTask, onBack }) => {
  const handleCreateTask = () => {
    onCreateTask();
    onClose();
  };

  return (
    <>
      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <ul className="menu-list">
          <li className="menu-item active" onClick={onBack}>
            <span className="menu-icon">✓</span>
            <span className="menu-text">Все задачи</span>
          </li>
          <li className="menu-item" onClick={handleCreateTask}>
            <span className="menu-icon">+</span>
            <span className="menu-text">Новая задача</span>
          </li>
        </ul>
      </div>
      {isOpen && <div className="menu-overlay" onClick={onClose}></div>}
    </>
  );
};

export default Menu;