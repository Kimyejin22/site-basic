import React, { useEffect, useState } from 'react';

const MatchingManagement = () => {
  const [estimates, setEstimates] = useState([]);
  const [selectedEstimate, setSelectedEstimate] = useState(null); // 선택한 견적을 저장하는 상태 추가
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchUserEstimates = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('로그인이 필요합니다.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/estimates/user/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // JWT 토큰을 헤더에 추가
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setEstimates(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserEstimates();
  }, []);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>에러 발생: {error}</p>;
  }

  // 견적을 클릭하면 해당 견적의 정보를 표시
  const handleEstimateClick = (estimate) => {
    setSelectedEstimate(estimate);
  };

  return (
    <div className="my-estimates">
      <h1>내가 보낸 견적 목록</h1>
      {selectedEstimate ? (
        // 선택한 견적의 상세 정보 표시
        <div>
          <h2>Post Title: {selectedEstimate.post.title}</h2>
          <p>Post Content: {selectedEstimate.post.content}</p>
          <p>Quantities: {selectedEstimate.quantities}</p>
          <p>Prices: {selectedEstimate.prices}</p>
          <button onClick={() => setSelectedEstimate(null)}>목록으로 돌아가기</button>
        </div>
      ) : (
        // 견적 목록 표시
        estimates.length ? (
          estimates.map((estimate) => (
            <div key={estimate.id} onClick={() => handleEstimateClick(estimate)} style={{ cursor: 'pointer' }}>
              <h2>Post Title: {estimate.post.title}</h2>
              <p>Quantities: {estimate.quantities}</p>
              <p>Prices: {estimate.prices}</p>
            </div>
          ))
        ) : (
          <p>보낸 견적이 없습니다.</p>
        )
      )}
    </div>
  );
};

export default MatchingManagement;
