import React from 'react';

const NotificationManagement = ({ companyType }) => {
  return (
    <div className="notification-management">
        <h1>알림 관리</h1>
        {companyType === '의뢰사' ? (
          <p>의뢰사 계정 알림 관련 내용</p>
        ) : (
          <p>공장 계정 알림 관련 내용</p>
        )}
    </div>
  );
};

export default NotificationManagement;