import React from 'react';

const ProgressManagement = ({ companyType }) => {
  return (
    <div className="progress-management">
        <h1>진행 관리</h1>
        {companyType === '의뢰사' ? (
          <p>의뢰사 계정 진행 관련 내용</p>
        ) : (
          <p>공장 계정 진행 관련 내용</p>
        )}
    </div>
  );
};

export default ProgressManagement;