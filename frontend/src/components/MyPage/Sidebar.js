import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../MyPage/MyPage.css';

const Sidebar = ({ companyType, setCompanyType }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // useNavigate 훅 추가
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token'); // JWT 토큰 가져오기
      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }

      try {
        const response = await fetch('/api/users/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // JWT 토큰을 Authorization 헤더에 추가
          }
        });

        const data = await response.json();

        if (response.ok) {
          setUserInfo(data);
          setCompanyType(data.companyType); // companyType 설정
        } else {
          alert('Failed to fetch user info: ' + data.message);
        }
      } catch (err) {
        alert('An error occurred: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [setCompanyType]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userInfo) {
    return <p>No user info available.</p>;
  }

  const handleCompleteProfile = () => {
    if (userInfo.companyType === '의뢰사') {
      navigate('/complete-profile/requestor');  // 의뢰사 프로필 완성 페이지로 이동
    } else {
      navigate('/complete-profile/manufacturer');  // 공장 프로필 완성 페이지로 이동
    }
  };

  return (
    <div className="sidebar">
      {/* 프로필 영역 추가 */}
      <div className="profile-section">
        <div className="profile-info">
          <button onClick={handleCompleteProfile}>프로필 완성하기</button>
          <img src="/path/to/profile/image.png" alt="Profile" className="profile-image" />
          <p className="profile-name">{userInfo.username || '미지정'}</p> {/* 사용자 이름 표시 */}
        </div>
        <div className="profile-buttons">
          <button
            className={userInfo.companyType === '의뢰사' ? 'selected' : ''}
            onClick={() => setCompanyType('의뢰사')}
          >
            의뢰사
          </button>
          <button
            className={userInfo.companyType === '공장' ? 'selected' : ''}
            onClick={() => setCompanyType('공장')}
          >
            공장
          </button>
        </div>
      </div>

      {/* companyType에 따라 다른 메뉴 렌더링 */}
      {companyType === '의뢰사' ? (
        <>
          <div className="sidebar-section">
            <h3>의뢰사 메뉴</h3>
            <ul>
              <li><Link to="account-info">계정 정보</Link></li>
              <li><Link to="account-delete">계정 탈퇴</Link></li>
              <li><Link to="quote-management">견적 의뢰 관리</Link></li>
              <li><Link to="progress-management">진행 관리</Link></li>
              <li><Link to="schedule-management">일정 관리</Link></li>
              <li><Link to="notification-management">알림 관리</Link></li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className="sidebar-section">
            <h3>공장 메뉴</h3>
            <ul>
              <li><Link to="account-info">계정 정보</Link></li>
              <li><Link to="account-delete">계정 탈퇴</Link></li>
              <li><Link to="matching-management">매칭 관리</Link></li>
              <li><Link to="production-management">생산 관리</Link></li>
              <li><Link to="schedule-management">일정 관리</Link></li>
              <li><Link to="accounting-management">회계 관리</Link></li>
              <li><Link to="notification-management">알림 관리</Link></li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
