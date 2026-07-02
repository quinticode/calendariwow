import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function LayoutPublico() {
  return (
    <>
      <header className="app-header">
        <Link to="/" className="app-logo">
          Historiólas ;)
        </Link>
        
        <nav className="nav-links">
          <Link to="/home" className="nav-item">Home</Link>
          <Link to="/sobre" className="nav-item">Sobre</Link>
          <Link to="/registrar" className="nav-item">Registrar</Link>
          <Link to="/login" className="nav-item">Login</Link>
          <Link to="/usuarios" className="nav-item">Usuários</Link>
          <Link to="/historias" className="nav-item">Histórias</Link>
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}