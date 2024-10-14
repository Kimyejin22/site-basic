import React from 'react';
import '../RequestList/RequestList.css';

const RequestList = ({ requests, onRequestClick }) => {
  if (!requests.length) return <div>해당 카테고리로는 찾을 수 없습니다.</div>;

  return (
    <div className="request-list">
      {requests.map((post) => (
        <div key={post.id} className="request-item" onClick={() => onRequestClick(post)}>
          <div className="request-content">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>{post.Step1Data?.selectedSubcategory || 'N/A'}</p>
            <p>{post.Step2Data?.selectedSubcategory || 'N/A'}</p>
            <p>작성자 이메일: {post.User?.email || 'N/A'}</p>
          </div>
          <div className="request-details">
            <p>예상수량: {post.Step3Data?.quantity || 'N/A'} 개</p>
            <p>예상비용: {post.Step3Data?.price || 'N/A'} 원</p>
            <p>예상 납품일: {post.Step3Data?.recruitmentPeriod || 'N/A'} 일</p>
            <p>모집 기간: {post.Step3Data?.deliveryDate || 'N/A'}</p> 
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestList;