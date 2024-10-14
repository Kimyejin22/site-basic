import React, { useEffect, useState } from 'react';
import CompanySearchModal from '../Register/CompanySearchModal.js';

const AccountInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCompanyModal, setShowCompanyModal] = useState(false);

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
          setUserInfo(data.user); // user 객체만 설정
        } else {
          alert('유저 정보를 가져오는데 실패했습니다: ' + data.message);
        }
      } catch (err) {
        alert('에러가 발생했습니다: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChangePassword = () => {
    window.location.href = '/forgot-password';
  };
  
  const handleCompanySelect = (company) => {
    // 선택한 회사 정보로 사용자 정보 업데이트
    setUserInfo({ ...userInfo, ...company });
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (!userInfo) {
    return <p>사용자 정보를 사용할 수 없습니다.</p>;
  }

  return (
    <div>
      <h1>계정 정보</h1>
      <div className="form-group">
        <label>이메일</label>
        <input type="text" value={userInfo.email} readOnly />
      </div>
      <div className="form-group">
        <label>현재 비밀번호</label>
        <input type="password" value="********" readOnly />
        <button onClick={handleChangePassword}>비밀번호 변경</button>
      </div>
      {userInfo.companyInfo && (
        <>
          <div className="form-group">
            <label>사업자명</label>
            <input type="text" value={userInfo.companyInfo.companyName} readOnly />
          </div>
          <div className="form-group">
            <label>사업자 등록번호</label>
            <input type="text" value={userInfo.companyInfo.businessNumber} readOnly />
          </div>
          <div className="form-group">
            <label>대표자명</label>
            <input type="text" value={userInfo.companyInfo.ceo} readOnly />
          </div>
          <div className="form-group">
            <label>사업장 주소</label>
            <input type="text" value={userInfo.companyInfo.address} readOnly />
          </div>
        </>
      )}
      <button onClick={() => {
        localStorage.removeItem('token'); // 로그아웃 시 토큰 삭제
        localStorage.removeItem('requestData'); // 로그아웃 시 requestData 삭제
        window.location.href = '/login'; // 로그인 페이지로 리다이렉트
      }}>로그아웃</button>

      {showCompanyModal && <CompanySearchModal onClose={() => setShowCompanyModal(false)} onSelect={handleCompanySelect} />}
    </div>
  );
};

export default AccountInfo;
