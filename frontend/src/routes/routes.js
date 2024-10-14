import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Products from '../Page/Products.js';
import Posts from '../Page/Posts.js';
import Register from '../Page/Register/Register.js';
import Login from '../Page/Login.js';
import Request from '../Page/Request.js';
import RequestList from '../Page/RequestList.js';
import RequestDetailPage from '../Page/RequestDetailPage.js';
import Profile from '../Page/MyPage/Profile.js';
import ForgotPassword from '../Page/Password/ForgetPassword.js';
import ResetPassword from '../Page/Password/ResetPassword.js';
import ProfileCompletionPage from '../components/ProfileCom/ProfileCompletionPage.js';
import EstimatePage from '../Page/EstimatePage.js';

const AppRoutes = ({ onLogin }) => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/register" element={<Register />} />  {/* 회원가입 라우트 추가 */}
      <Route path="/login" element={<Login onLogin={onLogin} />} />
      <Route path="/request" element={<Request />} />
      <Route path="/requestlist" element={<RequestList />} />
      <Route path="/request/:id" element={<RequestDetailPage/>} />
      <Route path="/estimate/:id" element={<EstimatePage />} /> {/* 견적 제안 페이지 */}
      <Route path="/profile/*" element={<Profile />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/complete-profile">
        <Route path="requestor" element={<ProfileCompletionPage />} />  {/* 의뢰사 프로필 완성 페이지 */}
        <Route path="manufacturer" element={<ProfileCompletionPage />} />  {/* 공장 프로필 완성 페이지 */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;