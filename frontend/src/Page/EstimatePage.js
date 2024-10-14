import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EstimateForm from '../components/RequestDetail/EstimateForm.js'; // 견적 폼 컴포넌트
import RequestDetail from '../components/RequestDetail/RequestDetail.js'; // 요청 세부사항 컴포넌트

const API_URL = 'http://localhost:5000'; // Posts 데이터베이스 API 엔드포인트

const EstimatePage = () => {
  const { id } = useParams(); // URL에서 요청 ID를 가져옴
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect로 데이터 불러오기
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await fetch(`${API_URL}/api/posts/${id}`); // ID에 해당하는 포스트 데이터 가져오기
        if (!response.ok) {
          throw new Error('Failed to fetch request');
        }
        const data = await response.json();
        setRequest(data); // 요청 데이터를 상태로 저장
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchRequest();
  }, [id]);

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 표시
  }

  if (error) {
    return <div>에러가 발생했습니다: {error}</div>; // 에러 발생 시 표시
  }

  if (!request) {
    return <div>요청을 찾을 수 없습니다.</div>; // 요청을 찾을 수 없을 때 표시
  }

  return (
    <div className="estimate-page">
      <div className="estimate-form-section">
        <EstimateForm request={request} />
      </div>
      <div className="request-detail-section">
        <RequestDetail request={request} />
      </div>
    </div>
  );
};

export default EstimatePage;