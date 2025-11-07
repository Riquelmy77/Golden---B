import React from 'react';

export default function Loading({ text = 'Carregando...' }) {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '40px 20px',
      color: 'rgba(212,175,55,0.7)'
    }}>
      <div style={{ 
        fontSize: '1.2rem',
        marginBottom: 8
      }}>
        ⏳
      </div>
      <p>{text}</p>
    </div>
  );
}
