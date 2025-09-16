import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <div className="menu-list">
          <NavLink
            to="/tasks"
            className="menu-item"
            onClick={onClose}
            end
          >
            <span className="menu-icon">✓</span>
            <span className="menu-text">Все задачи</span>
          </NavLink>
          <NavLink
            to="/tasks/new"
            className="menu-item"
            onClick={onClose}
          >
            <span className="menu-icon">+</span>
            <span className="menu-text">Новая задача</span>
          </NavLink>
        </div>
      </div>
      {isOpen && <div className="menu-overlay" onClick={onClose}></div>}
    </>
  );
};

export default Menu;