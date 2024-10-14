import React, { useState, useEffect } from 'react';
import './ProfileCompletionPage.css';
import ProfileSidebar from './sidebar/ProfileSideBar.js';

const ProfileCompletionPage = ({}) => {
  const [profileData, setProfileData] = useState({
    profileImage: '',
    briefIntroduction: '',
    selectedCategory: '',
    availableDays: [],
    contactTimeStart: '09:00',
    contactTimeEnd: '18:00',
    offlineMeetingArea: '',
    verificationCode: '', // 인증번호 입력 필드 추가
    phoneNumber: ''
  });

  const [categories, setCategories] = useState([]);
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('requestorInfo'); // 현재 섹션 상태
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기 URL 상태 추가
  const [verificationSent, setVerificationSent] = useState(false); // 인증번호 발송 여부 상태 추가
  const [verificationStatus, setVerificationStatus] = useState(''); // 인증 상태 메시지

  // 카테고리 데이터를 가져오는 API 호출
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/steps/step1');
        const data = await response.json();

        // 중복 제거: Set을 사용하여 고유한 카테고리만 남김
        const uniqueCategories = [...new Set(data.map(item => item.selectedCategory))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);


  // 프로필 완성도 계산
  useEffect(() => {
    calculateProgress();
  }, [profileData]);

  // 입력 변경 핸들러
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setProfileData(prevState => ({ ...prevState, [name]: checked }));
    } else {
      setProfileData(prevState => ({ ...prevState, [name]: value }));
    }
  };

  // 프로필 사진 변경 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData(prevState => ({ ...prevState, profileImage: file }));

      // 이미지 미리보기 URL 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // 이미지 미리보기 URL 설정
      };
      reader.readAsDataURL(file);
    }
  };


  // 연락 가능 요일 체크박스 변경 핸들러
  const handleCheckboxChange = (day) => {
    setProfileData(prevState => {
      const newDays = prevState.availableDays.includes(day)
        ? prevState.availableDays.filter(d => d !== day)
        : [...prevState.availableDays, day];
      return { ...prevState, availableDays: newDays };
    });
  };

  // 프로필 완성도 계산 함수
  const calculateProgress = () => {
    let completedSteps = 0;
    Object.keys(profileData).forEach(key => {
      if (profileData[key] !== '' && profileData[key].length !== 0) {
        completedSteps += 1;
      }
    });
    setProgress((completedSteps / Object.keys(profileData).length) * 100);
  };

// 인증번호 발송 함수
const sendVerificationCode = async () => {
    if (!profileData.phoneNumber) {
      alert('휴대폰 번호를 입력해주세요.');
      return;
    }
  
    try {
      const response = await fetch('/api/send-sms-verification-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: profileData.phoneNumber }),
      });
  
      if (response.ok) {
        setVerificationSent(true);
        alert('인증번호가 발송되었습니다.');
      } else {
        alert('인증번호 발송에 실패했습니다.');
      }
    } catch (err) {
      console.error('Error sending verification code:', err);
    }
  };
    
// 인증번호 확인 함수
const verifyCode = async () => {
    if (!profileData.verificationCode) {
      alert('인증번호를 입력해주세요.');
      return;
    }
  
    try {
      const response = await fetch('/api/verify-sms-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: profileData.phoneNumber, verificationCode: profileData.verificationCode }),
      });
  
      if (response.ok) {
        setVerificationStatus('인증이 완료되었습니다.');
      } else {
        setVerificationStatus('인증에 실패했습니다. 인증번호를 다시 확인하세요.');
      }
    } catch (err) {
      console.error('Error verifying code:', err);
    }
  };
    

  // 프로필 저장 API 호출 함수
  const saveProfile = async () => {
    const formData = new FormData();
    Object.keys(profileData).forEach(key => {
      formData.append(key, profileData[key]);
    });

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/users/me', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        alert('프로필이 저장되었습니다.');
      } else {
        alert('프로필 저장에 실패했습니다.');
      }
    } catch (err) {
      console.error('Error saving profile:', err);
      alert('프로필 저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="profile-completion-page">
        <ProfileSidebar 
        progress={progress} 
        currentSection={currentSection} 
        setCurrentSection={setCurrentSection} 
      />
      <div className="content">
        <div className="form-section">
          <h2>의뢰사 정보</h2>
          <div className="form-group">
            <label>프로필 사진</label>
            <input type="file" name="profileImage" onChange={handleImageChange} />
            {imagePreview && <img src={imagePreview} alt="미리보기" style={{ width: '100px', height: '100px', marginTop: '10px' }} />} {/* 이미지 미리보기 */}
          </div>
          <div className="form-group">
            <label>간략 소개</label>
            <textarea name="briefIntroduction" value={profileData.briefIntroduction} onChange={handleChange} maxLength={60} />
          </div>
          <div className="form-group">
            <label>업종</label>
            <select name="selectedCategory" value={profileData.selectedCategory} onChange={handleChange}>
              <option value="">업종을 선택하세요</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>연락 가능 요일</label>
            <div>
              {['월-금', '주말', '공휴일'].map(day => (
                <label key={day}>
                  <input type="checkbox" checked={profileData.availableDays.includes(day)} onChange={() => handleCheckboxChange(day)} />
                  {day}
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>연락 가능 시간</label>
            <div>
              <input type="time" name="contactTimeStart" value={profileData.contactTimeStart} onChange={handleChange} />
              ~
              <input type="time" name="contactTimeEnd" value={profileData.contactTimeEnd} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label>오프라인 미팅 가능 지역</label>
            <input type="text" name="offlineMeetingArea" value={profileData.offlineMeetingArea} onChange={handleChange} />
          </div>
        </div>

        {/* 본인 인증 정보 섹션 */}
        <div className="form-section">
          <h2>본인 인증 정보</h2>
          <div className="form-group">
            <label>휴대폰 본인인증</label>
            <input type="text" name="phoneNumber" value={profileData.phoneNumber} onChange={handleChange} />
            <button onClick={sendVerificationCode}>인증번호 발송</button>
          </div>
          {verificationSent && (
            <div className="form-group">
              <label>인증번호 입력</label>
              <input type="text" name="verificationCode" value={profileData.verificationCode} onChange={handleChange} />
              <button onClick={verifyCode}>인증완료</button>
              <p>{verificationStatus}</p> {/* 인증 상태 메시지 표시 */}
            </div>
          )}
          <div className="form-group">
            <input type="checkbox" name="agreeToSNS" checked={profileData.agreeToSNS} onChange={handleChange} />
            <label>SNS 정보 수신에 동의하고 본인인증한 핸드폰으로 알림을 받을게요.</label>
          </div>
        </div>

        <button className="save-button" onClick={saveProfile}>프로필 저장</button>
      </div>
    </div>
  );
};

export default ProfileCompletionPage;