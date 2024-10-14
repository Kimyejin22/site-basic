import React from 'react';
import './ProfileSidebar.css'

const ProfileSidebar = ({ progress, currentSection, setCurrentSection }) => {
  return (
    <div className="profile-sidebar">
      {/* 프로필 완성도 */}
      <div className="progress-container">
        <span>프로필 완성도 {progress}%</span>
        <div className="progress-bar">
          <div className="progress-filled" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* 프로필 관리 섹션 */}
      <div className="profile-section">
        <h3>프로필 관리</h3>
        <ul>
          <li 
            className={currentSection === 'requestorInfo' ? 'active' : ''}
            onClick={() => setCurrentSection('requestorInfo')}
          >
            1. 의뢰사 정보
          </li>
          <li 
            className={currentSection === 'verificationInfo' ? 'active' : ''}
            onClick={() => setCurrentSection('verificationInfo')}
          >
            2. 본인 인증 정보
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSidebar;