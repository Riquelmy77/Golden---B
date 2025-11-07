import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { Input, Textarea, Button, ErrorMessage } from '../components';

export default function CreatePost(){
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    
    if(!title.trim()) {
      setError('Título é obrigatório');
      return;
    }
    if(!text.trim()) {
      setError('Texto é obrigatório');
      return;
    }
    
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Cadastre-se primeiro para criar posts');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try{
      const res = await API.post('/posts', { title, text });
      navigate(`/posts/${res.data._id}`);
    }catch(err){
      console.error(err);
      setError(err?.response?.data?.message || 'Erro ao criar post');
    }finally{
      setLoading(false);
    }
  }

  const token = localStorage.getItem('token');
  if (!token) {
    return (
      <div>
        <h2>Criar Post</h2>
        <div style={{ 
          padding: '20px', 
          background: 'rgba(212,175,55,0.05)',
          borderRadius: 6,
          border: '1px solid rgba(212,175,55,0.12)',
          textAlign: 'center'
        }}>
          <p>Você precisa estar cadastrado para criar posts.</p>
          <Link to="/register">
            <Button>Ir para cadastro</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Criar Post</h2>
      <form onSubmit={handleSubmit}>
        <Input 
          label="Título"
          value={title} 
          onChange={e => setTitle(e.target.value)}
          placeholder="Digite o título do post"
        />
        
        <Textarea 
          label="Texto"
          rows={6}
          value={text} 
          onChange={e => setText(e.target.value)}
          placeholder="Escreva o conteúdo do seu post..."
        />
        
        <ErrorMessage message={error} onDismiss={() => setError('')} />
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </form>
    </div>
  );
}
