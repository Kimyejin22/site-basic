import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const API_URL = 'http://localhost:5000';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation(); // 현재 URL 정보 사용

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // 세션 또는 쿠키 공유 필요 시 추가
      });

      if (response.ok) {
        const data = await response.json();

        // 응답 데이터 전체 확인
        console.log('로그인 응답 데이터:', data);
  
        // 데이터 구조에 맞게 수정: data.user.companyType 또는 data.companyType
        const companyType = data.user?.companyType || data.companyType;
  
        console.log('CompanyType:', companyType);  // companyType 콘솔에 출력
  
        localStorage.setItem('token', data.token); // JWT 토큰을 로컬 스토리지에 저장
  
        // 상위 컴포넌트로 로그인된 사용자 정보 전달
        onLogin({ companyType });

        alert('Login successful!');
        // URL에서 리다이렉션 대상 페이지 확인

        const params = new URLSearchParams(location.search);
        const redirectUrl = params.get('redirect') || '/'; // 리다이렉션 URL이 없으면 대시보드로 이동

        window.location.href = redirectUrl;
      } else {
        alert('Login failed! Please check your credentials.');
      }
    } catch (err) {
      alert('An error occurred: ' + err.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <button type="button" onClick={() => window.location.href = '/forgot-password'}>
          비밀번호를 잊으셨나요?
        </button>
      </form>
    </div>
  );
};

export default Login;
