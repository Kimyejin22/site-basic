import React from 'react';

const RequestDetail = ({ request }) => {
  return (
    <div className="request-detail">
      <h3>{request.title}</h3>
      <p>{request.content}</p>
      <p>예상수량: {request.Step3Data?.quantity || 'N/A'} 개</p>
      <p>예상비용: {request.Step3Data?.price || 'N/A'} 원</p>
      <p>예상 납품일: {request.Step3Data?.recruitmentPeriod || 'N/A'} 일</p>
      <p>모집 기간: {request.Step3Data?.deliveryDate || 'N/A'}</p>
    </div>
  );
};

export default RequestDetail;