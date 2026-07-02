import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function LayoutPublico() {
  const navigate = useNavigate();
  const [estaLogado, setEstaLogado] = useState(false);

  // Monitoriza o estado do login sempre que a página carrega ou muda
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setEstaLogado(true);
    } else {
      setEstaLogado(false);
    }
  }, []);

  // Função para limpar o token e desconectar
  function handleLogout() {
    localStorage.removeItem('token');
    setEstaLogado(false);
    alert("Você saiu da sua conta.");
    navigate('/login');
  }

  return (
    <>
      <header className="app-header">
        {/* 💡 Logo alterada aqui para refletir o novo tema do site */}
        <Link to="/" className="app-logo">
          Historiólas ;)
        </Link>
        
        <nav className="nav-links">
          <Link to="/home" className="nav-item">Home</Link>
          <Link to="/sobre" className="nav-item">Sobre</Link>
          <Link to="/historias" className="nav-item">Histórias</Link>
          <Link to="/usuarios" className="nav-item">Usuários</Link>

          {/* se tiver logado, mostra o botão de sair */}
          {estaLogado ? (
            <button onClick={handleLogout} className="btn-logout">
              Sair
            </button>
          ) : (
            // se n estiver logado, mostra os dois normais
            <>
              <Link to="/registrar" className="nav-item">Registrar</Link>
              <Link to="/login" className="nav-item">Login</Link>
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