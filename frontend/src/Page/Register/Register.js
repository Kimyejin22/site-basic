import React, { useState } from 'react';
import CompanySearchModal from '../../components/Register/CompanySearchModal.js';

// API BASE URL 설정
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Register = () => {
  const [companyType, setCompanyType] = useState('의뢰사');
  const [businessNumber, setBusinessNumber] = useState('');
  const [companyName, setCompanyName] = useState(''); // 회사 이름 상태 추가
  const [ceo, setCeo] = useState(''); // 대표자 상태 추가
  const [address, setAddress] = useState(''); // 주소 상태 추가
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 상태 추가

  const handleCompanyTypeChange = (type) => {
    setCompanyType(type);
  };

  const handleBusinessNumberSearch = () => {
    setShowModal(true);
  };

  const handleCompanySelect = (company) => {
    setBusinessNumber(company.businessNumber); // 선택된 기업의 사업자 등록번호 반영
    setCompanyName(company.companyName); // 회사 이름 설정
    setCeo(company.ceo); // 대표자 설정
    setAddress(company.address); // 주소 설정
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  // 이메일 인증 코드 전송
  const handleEmailSend = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/send-verification-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',  // 세션 쿠키를 포함하도록 설정
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('Verification code sent to your email.');
        setEmailSent(true);
      } else {
        alert('Failed to send verification code.');
      }
    } catch (err) {
      alert('An error occurred: ' + err.message);
    }
  };

  // 이메일 인증 코드 확인
  const handleVerificationCodeSubmit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',  // 세션 쿠키를 포함하도록 설정
        body: JSON.stringify({ email, code: verificationCode }),
      });

      if (response.ok) {
        alert('Email verified successfully!');
        setIsEmailVerified(true); // 이메일 인증 상태 업데이트
      } else {
        alert('Invalid verification code.');
      }
    } catch (err) {
      alert('An error occurred: ' + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailVerified) {
      alert('Please verify your email before submitting.');
      return;
    }

    try {
    // 1. 회사 정보 등록
    let companyResponse = await fetch(`${API_BASE_URL}/api/companies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',  // 세션 쿠키를 포함하도록 설정
      body: JSON.stringify({ companyName, businessNumber, ceo, address }),
    });

    if (!companyResponse.ok) {
      throw new Error('Failed to register company');
    }

    const companyData = await companyResponse.json();

    // 2. 사용자 정보 등록
    const userResponse = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',  // 세션 쿠키를 포함하도록 설정
      body: JSON.stringify({ companyType, email, password, termsAccepted, companyId: companyData.id, businessNumber }),
    });

    const userData = await userResponse.json();

    if (userResponse.ok) {
      alert('Registration successful!');
      window.location.href = '/login';
    } else {
      alert('Registration failed: ' + userData.message);
    }
    } catch (err) {
    alert('An error occurred: ' + err.message);
    }
    };

  return (
    <div className="register-container">
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>기업 유형</label>
          <div>
            <button
              type="button"
              className={companyType === '의뢰사' ? 'selected' : ''}
              onClick={() => handleCompanyTypeChange('의뢰사')}
            >
              의뢰사로 가입
            </button>
            <button
              type="button"
              className={companyType === '공장' ? 'selected' : ''}
              onClick={() => handleCompanyTypeChange('공장')}
            >
              공장으로 가입
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="businessNumber">사업자등록번호</label>
          <input
            type="text"
            id="businessNumber"
            value={businessNumber}
            onChange={(e) => setBusinessNumber(e.target.value)}
            required
          />
          <button type="button" onClick={handleBusinessNumberSearch}>
            검색
          </button>
        </div>

          {/* 회사 이름, 대표자, 주소 입력 필드 */}
          {companyName && (
          <div className="form-group">
            <label htmlFor="companyName">기업명</label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
        </div>
        )}

        {ceo && (
          <div className="form-group">
            <label htmlFor="ceo">대표자</label>
            <input
              type="text"
              id="ceo"
              value={ceo}
              onChange={(e) => setCeo(e.target.value)}
              required
            />
          </div>
        )}

        {address && (
          <div className="form-group">
            <label htmlFor="address">주소</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="button" onClick={handleEmailSend}>
            인증
          </button>
        </div>

        {emailSent && !isEmailVerified && (
          <div className="form-group">
            <label htmlFor="verificationCode">인증번호</label>
            <input
              type="text"
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
            <button type="button" onClick={handleVerificationCodeSubmit}>
              인증 확인
            </button>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="checkbox"
            id="termsAccepted"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            required
          />
          <label htmlFor="termsAccepted">이용약관에 동의합니다.</label>
          <button type="button" onClick={() => {/* 이용약관 모달 띄우기 */}}>보기</button>
        </div>

        <button type="submit" className="register-button" disabled={!isEmailVerified}>
          가입 완료
        </button>
      </form>

      {showModal && (
        <CompanySearchModal
          onClose={handleModalClose}
          onSelect={handleCompanySelect}
        />
      )}
    </div>
  );
};

export default Register;




