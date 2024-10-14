import React from 'react';

const AccountingManagement = ({ companyType }) => {
    return (
      <div>
        <h1>정산 관리</h1>
        {companyType === '공장' ? (
          <p>공장 정산 관리 관련 내용</p>
        ) : (
          <p>해당 사항 없음</p>
        )}
      </div>
    );
  };
  
  export default AccountingManagement;