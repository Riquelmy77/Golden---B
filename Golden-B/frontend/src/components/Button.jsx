import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) {
  const baseStyles = {
    padding: size === 'small' ? '6px 10px' : size === 'large' ? '14px 24px' : '10px 18px',
    borderRadius: 6,
    fontSize: size === 'small' ? '0.85rem' : size === 'large' ? '1.1rem' : '1rem',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s ease',
  };

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, var(--gold-2) 0%, var(--gold-1) 100%)',
      color: '#ecb80cff',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--gold-2)',
      border: '1px solid rgba(212,175,55,0.12)',
    },
    danger: {
      background: '#dc3545',
      color: '#fff',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--gold-2)',
      border: 'none',
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{ ...baseStyles, ...variantStyles[variant] }}
      {...props}
    >
      {children}
    </button>
  );
}
