

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RequestDetail from '../components/RequestDetail/RequestDetail.js';
import NDA from '../components/RequestDetail/NDA.js';
import EstimateForm from '../components/RequestDetail/EstimateForm.js';

const API_URL = 'http://localhost:5000';

const RequestDetailPage = ({ onBack }) => {
  const { id } = useParams(); // URL에서 요청 ID를 추출
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [user, setUser] = useState(null); // user 상태 추가
  const navigate = useNavigate();

  // localStorage에서 user 정보를 불러와 상태에 저장
  useEffect(() => {
    const loginData = localStorage.getItem('loginData');
    if (loginData) {
      const parsedUser = JSON.parse(loginData);
      setUser(parsedUser);
      console.log('Restored user from localStorage:', parsedUser); // 콘솔에 user 객체 출력
    } else {
      console.error('localStorage에 loginData가 없습니다.');
    }
  }, []);;

  const [showEstimateForm, setShowEstimateForm] = useState(false);

    // companyType을 이용한 조건부 렌더링
    const isFactory = user?.user?.companyType?.trim() === '공장'; // 공백이 있거나 대소문자 문제 방지

    useEffect(() => {
      const fetchRequestDetail = async () => {
        try {
          const response = await fetch(`${API_URL}/api/posts/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setRequest(data); // 요청 데이터를 상태에 저장
        } catch (err) {
          console.error("Failed to fetch request detail", err);
        } finally {
          setLoading(false); // 로딩 완료
        }
      };
  
      fetchRequestDetail();
    }, [id]);


  if (loading) {
    return <div>로딩 중...</div>; // 데이터를 로딩 중일 때 표시
  }

  if (!request) {
    return (
      <div className="request-detail-page">
        <p>선택된 요청이 없습니다.</p>
        <button onClick={onBack}>뒤로 가기</button>
      </div>
    );
  }

  return (
    <div className="request-detail-page">
      <button onClick={onBack} className="back-button">뒤로 가기</button>
      <RequestDetail request={request} />
      <NDA />
      {/* isFactory가 true일 때만 버튼을 렌더링 */}
      {isFactory ? (
        <button onClick={() => navigate(`/estimate/${request.id}`)} className="estimate-button">
          견적 제안하기
        </button>
      ) : (
        <p>해당 회사는 공장이 아닙니다.</p>
      )}
    </div>
  );
};

export default RequestDetailPage;