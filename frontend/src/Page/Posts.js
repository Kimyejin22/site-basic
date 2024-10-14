import React, { useEffect, useState } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch('/api/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handleAddPost = () => {
    addPost(title, content);
    setTitle('');
    setContent('');
  };

  const handleUpdatePost = () => {
    updatePost(editId, title, content);
    setTitle('');
    setContent('');
    setEditId(null);
  };

  const addPost = async (title, content) => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    });
    const newPost = await response.json();
    setPosts([...posts, newPost]);
  };

  const updatePost = async (id, title, content) => {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    });
    const updatedPost = await response.json();
    setPosts(posts.map(post => (post.id === id ? updatedPost : post)));
  };

  const deletePost = async (id) => {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div>
      <h1>Posts</h1>
      {/* <ul>
        {posts.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong> - {post.content}
            <button onClick={() => {
              setEditId(post.id);
              setTitle(post.title);
              setContent(post.content);
            }}>
              Edit
            </button>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul> */}
      <h2>{editId ? 'Update Post' : 'Add Post'}</h2>
      <input 
        type="text" 
        placeholder="Title" 
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea 
        placeholder="Content" 
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={editId ? handleUpdatePost : handleAddPost}>
        {editId ? 'Update' : 'Add'}
      </button>
    </div>
  );
};

export default Posts;