import React from 'react';

const Header = ({ onMenuToggle }) => {
  return (
    <header className="header">
      <button className="mobile-menu-toggle" onClick={onMenuToggle}>
        ☰
      </button>
      <h1 className="header-title">Список дел</h1>

    </header>
  );
};

export default Header;