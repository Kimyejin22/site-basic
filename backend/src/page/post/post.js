document.getElementById('add-post-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('add-post-title').value;
    const content = document.getElementById('add-post-content').value;
    const userId = document.getElementById('add-post-userId').value;

    // JWT 토큰을 Authorization 헤더에 포함시킴
    const token = localStorage.getItem('token'); // 로그인 후 저장된 JWT 토큰 가져오기
    console.log('Token from localStorage:', token); 

    await fetch('/api/posts', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // 토큰 포함
        },
        body: JSON.stringify({ title, content, userId })
    });
});

document.getElementById('update-post-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('update-post-id').value;
    const title = document.getElementById('update-post-title').value;
    const content = document.getElementById('update-post-content').value;
    const userId = document.getElementById('update-post-userId').value;

    // JWT 토큰을 Authorization 헤더에 포함시킴
    const token = localStorage.getItem('token');
    await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // 토큰 포함
        },
        body: JSON.stringify({ title, content, userId })
    });
});

document.getElementById('delete-post-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('delete-post-id').value;

    // JWT 토큰을 Authorization 헤더에 포함시킴
    const token = localStorage.getItem('token');
    await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}` // 토큰 포함
        }
    });
});

// 로그인 시 토큰 발급받기
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    
    const data = await res.json();
    
    if (res.status === 200) {
        localStorage.setItem('token', data.token);
        alert('Login successful');
    } else {
        alert(data.message);
    }
});

// 게시글 작성 시 토큰을 포함
document.getElementById('add-post-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('add-post-title').value;
    const content = document.getElementById('add-post-content').value;
    const userId = document.getElementById('add-post-userId').value;
    
    const token = localStorage.getItem('token');
    
    const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content, userId })
    });
    
    const data = await res.json();
    
    if (res.status === 201) {
        alert('Post added successfully');
    } else {
        alert(data.message);
    }
});