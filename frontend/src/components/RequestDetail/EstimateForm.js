import React, { useState } from 'react';

const API_URL = 'http://localhost:5000';

const EstimateForm = ({ request }) => {
  const [quantities, setQuantities] = useState([]);
  const [prices, setPrices] = useState([]);
  const [message, setMessage] = useState(''); // 서버 응답 메시지

  // 수량/단가 추가 버튼 클릭 시
  const handleAddRow = () => {
    setQuantities([...quantities, '']);
    setPrices([...prices, '']);
  };

  // 수량 입력 변경 핸들러
  const handleQuantityChange = (index, value) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = value;
    setQuantities(updatedQuantities);
  };

  // 단가 입력 변경 핸들러
  const handlePriceChange = (index, value) => {
    const updatedPrices = [...prices];
    updatedPrices[index] = value;
    setPrices(updatedPrices);
  };

  // 서버에 데이터 전송 (견적 제출)
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const token = localStorage.getItem('token'); // 저장된 JWT 토큰

    console.log(localStorage.getItem('token'));

    // 토큰이 없을 경우 처리
    if (!token) {
      setMessage('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/estimates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // 토큰을 헤더에 추가
        },
        credentials: 'include', // 자격 증명 포함
        body: JSON.stringify({
          postId: request.id,
          quantities,
          prices,
        }),
      });

      if (response.status === 401) {
        setMessage('인증 오류: 다시 로그인해주세요.');
        console.error('Authentication error, please login again.');
        return;
      }

      // 서버 응답 처리
      if (response.ok) {
        const data = await response.json();
        setMessage('견적이 성공적으로 제출되었습니다.');
        console.log('서버 응답:', data);
      } else {
        const errorData = await response.json();
        setMessage(`견적 제출 실패: ${errorData.error}`);
        console.error('견적 제출 실패:', errorData);
      }
    } catch (err) {
      console.error('서버 오류:', err);
      setMessage('서버 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="estimate-form">
      <h3>견적 제안하기</h3>
      {quantities.map((quantity, index) => (
        <div key={index} className="estimate-row">
          <input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(index, e.target.value)}
            placeholder="수량"
          />
          <input
            type="number"
            value={prices[index]}
            onChange={(e) => handlePriceChange(index, e.target.value)}
            placeholder="단가"
          />
        </div>
      ))}
      <button type="button" onClick={handleAddRow}>
        수량/단가 추가
      </button>
      <button type="submit">견적 보내기</button>
      {/* 서버 응답 메시지 표시 */}
      {message && <p>{message}</p>}
    </form>
  );
};

export default EstimateForm;
