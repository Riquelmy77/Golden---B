import React from 'react';
import Button from './Button';

export default function CommentItem({ comment, onDelete, canDelete = true }) {
  return (
    <div style={{ 
      borderTop: '1px solid #eee', 
      padding: '12px 0', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      gap: '12px'
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 4 }}>{comment.text}</div>
        <small style={{ color: 'rgba(212,175,55,0.7)' }}>
          por {comment.user?.username || 'Anônimo'}
        </small>
      </div>
      {canDelete && onDelete && (
        <Button 
          variant="secondary" 
          size="small"
          onClick={() => onDelete(comment._id)}
        >
          Deletar
        </Button>
      )}
    </div>
  );
}
