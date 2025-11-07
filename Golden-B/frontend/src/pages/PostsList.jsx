import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { PostCard, Pagination, Loading, ErrorMessage } from '../components';

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [page]);

  async function fetchPosts() {
    setLoading(true);
    setError('');
    try {
      const res = await API.get('/posts', { params: { page, limit: 10 } });
      setPosts(res.data.posts);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Erro ao carregar posts');
    } finally {
      setLoading(false);
    }
  }

  function handlePageChange(newPage) {
    setPage(Math.max(1, newPage));
  }

  if (loading) return <Loading text="Carregando posts..." />;

  return (
    <div>
      <h2>Todos os Posts</h2>
      
      <ErrorMessage message={error} onDismiss={() => setError('')} />

      {posts.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'rgba(212,175,55,0.5)', padding: '40px 20px' }}>
          Nenhum post encontrado
        </p>
      ) : (
        <>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
          
          <Pagination 
            currentPage={page} 
            onPageChange={handlePageChange}
            hasMore={posts.length === 10}
          />
        </>
      )}
    </div>
  );
}
