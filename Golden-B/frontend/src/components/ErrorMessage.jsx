import React from 'react';

export default function ErrorMessage({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="error" style={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span>{message}</span>
      {onDismiss && (
        <button 
          onClick={onDismiss}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'inherit',
            cursor: 'pointer',
            fontSize: '1.2rem',
            padding: '0 8px'
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}
