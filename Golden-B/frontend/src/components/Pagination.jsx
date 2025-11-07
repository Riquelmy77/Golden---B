import React from 'react';
import Button from './Button';

export default function Pagination({ currentPage, onPageChange, hasMore = true }) {
  return (
    <div style={{ 
      marginTop: 20, 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px',
      justifyContent: 'center'
    }}>
      <Button 
        variant="secondary" 
        size="small"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Anterior
      </Button>
      
      <span style={{ 
        padding: '0 12px',
        color: 'var(--gold-2)',
        fontWeight: 500
      }}>
        Página {currentPage}
      </span>
      
      <Button 
        variant="secondary" 
        size="small"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasMore}
      >
        Próxima
      </Button>
    </div>
  );
}
