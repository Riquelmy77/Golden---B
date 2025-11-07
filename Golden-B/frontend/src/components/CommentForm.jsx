import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Textarea from './Textarea';
import Button from './Button';

export default function CommentForm({ onSubmit, isAuthenticated = false }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/register');
      return;
    }

    if (!text.trim()) {
      setError('Comentário não pode ser vazio');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onSubmit(text);
      setText('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Erro ao enviar comentário');
    } finally {
      setLoading(false);
    }
  }

  if (!isAuthenticated) {
    return (
      <div style={{ 
        marginBottom: 20, 
        padding: '12px 16px', 
        background: 'rgba(212,175,55,0.05)',
        borderRadius: 6,
        border: '1px solid rgba(212,175,55,0.12)'
      }}>
        <small>
          Você precisa se cadastrar para comentar. <Link to="/register">Ir para cadastro</Link>
        </small>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
      <Textarea
        label="Adicionar comentário"
        value={text}
        onChange={e => setText(e.target.value)}
        rows={3}
        placeholder="Escreva seu comentário..."
        error={error}
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Comentar'}
      </Button>
    </form>
  );
}
