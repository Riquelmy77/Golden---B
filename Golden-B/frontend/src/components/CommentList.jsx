import React from 'react';
import CommentItem from './CommentItem';

export default function CommentList({ comments, onDeleteComment, canDelete = true }) {
  if (!comments || comments.length === 0) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center', 
        color: 'rgba(212,175,55,0.5)',
        fontStyle: 'italic'
      }}>
        Nenhum comentário ainda. Seja o primeiro a comentar!
      </div>
    );
  }

  return (
    <div>
      {comments.map(comment => (
        <CommentItem 
          key={comment._id} 
          comment={comment}
          onDelete={onDeleteComment}
          canDelete={canDelete}
        />
      ))}
    </div>
  );
}
