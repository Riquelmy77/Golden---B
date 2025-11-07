import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import PostsList from './pages/PostsList';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import Register from './pages/Register';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  const isLogged = !!localStorage.getItem('token');

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  }

  return (
    <div className="container">
      <header style={{ marginBottom: 20 }}>
        <h1>Golden-B</h1>
        <nav style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Link to="/">Todos os Posts</Link>
            <span>|</span>
            <Link to="/create">Criar Post</Link>
          </div>

          <div style={{ marginLeft: 'auto' }}>
            {!isLogged ? (
              <Link to="/register">Cadastro</Link>
            ) : (
              <>
                <span style={{ marginRight: 8 }}>Olá, {user?.username || 'Usuário'}</span>
                <button onClick={logout}>Sair</button>
              </>
            )}
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
