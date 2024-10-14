import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';  
import Sidebar from '../../components/MyPage/Sidebar.js';
import AccountDelete from '../../components/MyPage/AccountDelete.js';
import NotificationManagement from '../../components/MyPage/NotificationManagement.js';
import ProgressManagement from '../../components/MyPage/ProgressManagement.js';
import QuoteManagement from '../../components/MyPage/QuoteManagement.js';
import ScheduleManagement from '../../components/MyPage/ScheduleManagement.js';
import AccountInfo from '../../components/MyPage/AccountInfo.js';
import MatchingManagement from '../../components/MyPage/MatchingManagement.js'; // New import for '공장'
import ProductionManagement from '../../components/MyPage/ProductionManagement.js'; // New import for '공장'
import AccountingManagement from '../../components/MyPage/AccountingManagement.js'; // New import for '공장'
import '../../components/MyPage/MyPage.css';

const Profile = () => {
  const [companyType, setCompanyType] = useState('의뢰사'); // 기본값을 '의뢰사'로 설정

  useEffect(() => {
    // 이 useEffect는 companyType이 변경될 때마다 실행됩니다.
    // 필요한 경우 이곳에서 추가적으로 로직을 실행할 수 있습니다.
  }, [companyType]);

  return (
    <div className="mypage-container">
      {/* Sidebar에 companyType과 setCompanyType을 props로 전달 */}
      <Sidebar companyType={companyType} setCompanyType={setCompanyType} />  
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Navigate to="account-info" replace />} /> 
          <Route path="account-info" element={<AccountInfo companyType={companyType} />} />
          <Route path="account-delete" element={<AccountDelete companyType={companyType} />} />
          {companyType === '의뢰사' ? (
            <>
              <Route path="quote-management" element={<QuoteManagement companyType={companyType} />} />
              <Route path="progress-management" element={<ProgressManagement companyType={companyType} />} />
              <Route path="schedule-management" element={<ScheduleManagement companyType={companyType} />} />
              <Route path="notification-management" element={<NotificationManagement companyType={companyType} />} />
            </>
          ) : (
            <>
              <Route path="matching-management" element={<MatchingManagement companyType={companyType} />} />
              <Route path="production-management" element={<ProductionManagement companyType={companyType} />} />
              <Route path="schedule-management" element={<ScheduleManagement companyType={companyType} />} />
              <Route path="accounting-management" element={<AccountingManagement companyType={companyType} />} />
              <Route path="notification-management" element={<NotificationManagement companyType={companyType} />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default Profile;