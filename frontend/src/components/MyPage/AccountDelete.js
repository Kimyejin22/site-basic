import React from 'react';

const AccountDelete = ({ companyType }) => {
    return (
      <div>
        <h1>계정 탈퇴</h1>
        {companyType === '의뢰사' ? (
          <p>의뢰사 계정 삭제 관련 내용</p>
        ) : (
          <p>공장 계정 삭제 관련 내용</p>
        )}
      </div>
    );
  };
  
  export default AccountDelete;