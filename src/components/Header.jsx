import React from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = ({ onMenuToggle }) => {
  return (
    <header className="header">
      <button className="mobile-menu-toggle" onClick={onMenuToggle}>
        <FaBars />
      </button>
      <Link to="/" className="header-title">
        <img src="/logo.png" alt="" />
        <h1 >Список дел</h1>
      </Link>


    </header>
  );
};

export default Header;