import React, { useEffect, useState } from 'react';

const QuoteManagement = ({ companyType }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    const fetchUserPosts = async () => {
      const token = localStorage.getItem('token');
      console.log('Token:', token);  // 디버깅용 로그 추가
      if (!token) {
        setError('로그인이 필요합니다.');
        setLoading(false);
        return; // 토큰이 없을 경우, 함수를 종료함
      }

      try {
        const response = await fetch('http://localhost:5000/api/posts/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // JWT 토큰을 헤더에 추가
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message); // 에러 메시지를 상태에 저장
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchUserPosts();
  }, []);

  if (loading) {
    return <p>로딩 중...</p>; // 로딩 상태 표시
  }

  if (error) {
    return <p>에러 발생: {error}</p>; // 에러 발생 시 메시지 출력
  }

  return (
    <div className="quote-management">
      <h1>견적 의뢰 관리</h1>
      {companyType === '의뢰사' ? (
        posts.length ? (
          posts.map((post) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <p>작성된 견적 의뢰가 없습니다.</p>
        )
      ) : (
        <p>공장 계정은 이 페이지에 접근할 수 없습니다.</p>
      )}
    </div>
  );
};

export default QuoteManagement;
