import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Input, Button, ErrorMessage } from '../components';

export default function Register(){
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    if(!username.trim()) {
      setError('Preencha usuário');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try{
      const res = await API.post('/auth/register', { username });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    }catch(err){
      console.error(err);
      setError(err?.response?.data?.message || 'Erro no cadastro');
    }finally{
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <Input 
          label="Usuário"
          value={username} 
          onChange={e => setUsername(e.target.value)}
          placeholder="Digite seu nome de usuário"
          helpText="Escolha um nome único para se identificar"
        />
        
        <ErrorMessage message={error} onDismiss={() => setError('')} />
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
      </form>
    </div>
  );
}
