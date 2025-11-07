import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post, showFullText = false }) {
  const truncatedText = post.text.substring(0, 200);
  const shouldTruncate = post.text.length > 200 && !showFullText;

  return (
    <div className="post">
      <h3>
        {showFullText ? (
          post.title
        ) : (
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
        )}
      </h3>
      <p>{shouldTruncate ? `${truncatedText}...` : post.text}</p>
      <small>por {post.user?.username || 'Anônimo'}</small>
    </div>
  );
}
