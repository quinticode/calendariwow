import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'; // 💡 Importamos o useLocation

export default function LayoutPublico() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [estaLogado, setEstaLogado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setEstaLogado(true);
    } else {
      setEstaLogado(false);
    }
  }, [location]);

  function handleLogout() {
    localStorage.removeItem('token');
    setEstaLogado(false);
    // alert("Você saiu da sua conta.");
    navigate('/login');
  }

  return (
    <>
      <header className="app-header">
        <Link to="/" className="app-logo">
          Historiólas ;)
        </Link>
        
        <nav className="nav-links">
          <Link to="/home" className="nav-item">Home</Link>
          <Link to="/sobre" className="nav-item">Sobre</Link>
          <Link to="/historias" className="nav-item">Histórias</Link>
          <Link to="/usuarios" className="nav-item">Usuários</Link>

            {/*se ta logado só aparece + isso */}
          {estaLogado ? (
            <button onClick={handleLogout} className="btn-logout">
              <Link to="/login" className="nav-item">Sair</Link>
            </button>
          ) : (
            <>
              <Link to="/registrar" className="nav-item">Registrar</Link>
              <Link to="/login" className="nav-item">Entrar</Link>
            </>
          )}
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}