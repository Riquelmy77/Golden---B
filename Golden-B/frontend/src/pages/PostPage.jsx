import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { 
  PostCard, 
  CommentList, 
  CommentForm, 
  Button, 
  Loading, 
  ErrorMessage 
} from '../components';

export default function PostPage(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => { 
    fetchData(); 
  }, [id]);

  async function fetchData() {
    setLoading(true);
    try {
      await Promise.all([fetchPost(), fetchComments()]);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }

  async function fetchPost(){
    try{
      const res = await API.get(`/posts/${id}`);
      setPost(res.data);
    }catch(err){ 
      console.error(err);
      throw err;
    }
  }

  async function fetchComments(){
    try{
      const res = await API.get(`/comments/${id}`);
      setComments(res.data);
    }catch(err){ 
      console.error(err);
      throw err;
    }
  }

  async function handleCommentSubmit(text){
    try{
      const res = await API.post('/comments', { text, postId: id });
      setComments((prev) => [...prev, res.data]);
    }catch(err){
      console.error(err);
      throw err;
    }
  }

  async function handlePostDelete(){
    if(!confirm('Tem certeza que deseja deletar este post?')) return;
    try{
      await API.delete(`/posts/${id}`);
      navigate('/');
    }catch(err){
      console.error(err);
      setError(err?.response?.data?.message || 'Erro ao deletar post');
    }
  }

  async function handleCommentDelete(commentId){
    if(!confirm('Tem certeza que deseja deletar este comentário?')) return;
    try{
      await API.delete(`/comments/${commentId}`);
      setComments(prev => prev.filter(c => c._id !== commentId));
    }catch(err){
      console.error(err);
      setError(err?.response?.data?.message || 'Erro ao deletar comentário');
    }
  }

  if (loading) return <Loading text="Carregando post..." />;
  if (!post) return <ErrorMessage message="Post não encontrado" />;

  return (
    <div>
      <PostCard post={post} showFullText={true} />

      <ErrorMessage message={error} onDismiss={() => setError('')} />

      <div style={{ marginTop: 12 }}>
        <Button 
          variant="secondary" 
          onClick={handlePostDelete}
        >
          Deletar Post
        </Button>
      </div>

      <section style={{ marginTop: 30 }}>
        <h3>Comentários ({comments.length})</h3>
        
        <CommentForm 
          onSubmit={handleCommentSubmit}
          isAuthenticated={isAuthenticated}
        />

        <CommentList 
          comments={comments}
          onDeleteComment={handleCommentDelete}
          canDelete={true}
        />
      </section>
    </div>
  );
}
