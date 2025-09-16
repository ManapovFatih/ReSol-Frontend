import React, { useState } from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app-container">
      <Header onMenuToggle={() => setMenuOpen(!menuOpen)} />
      <Menu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;