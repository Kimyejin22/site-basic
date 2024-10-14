import React from 'react';
import { Link } from 'react-router-dom';
import '../header/Header.css';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/posts">Posts</Link></li>
          <li><Link to="/register">Register</Link></li>  {/* 회원가입 링크 추가 */}
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/request">무료 견적 의뢰</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/requestlist">의뢰리스트</Link></li>
          <li><Link to="/profile">프로필</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;