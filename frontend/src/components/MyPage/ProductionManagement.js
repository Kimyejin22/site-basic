import React from 'react';

const ProductionManagement = ({ companyType }) => {
    return (
      <div>
        <h1>제작 관리</h1>
        {companyType === '공장' ? (
          <p>공장 제작 관리 관련 내용</p>
        ) : (
          <p>해당사항 없음</p>
        )}
      </div>
    );
  };
  
  export default ProductionManagement;