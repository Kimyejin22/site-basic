import React from 'react';

const ScheduleManagement = ({ companyType }) => {
  return (
    <div className="schedule-management">
        <h1>일정 관리</h1>
        {companyType === '의뢰사' ? (
          <p>의뢰사 계정 일정 관련 내용</p>
        ) : (
          <p>공장 계정 일정 관련 내용</p>
        )}
    </div>
  );
};

export default ScheduleManagement;