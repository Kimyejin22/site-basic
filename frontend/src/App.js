import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/routes.js';
import Header from './components/header/Header.js';  // Header 컴포넌트 임포트

const App = () => {
  const [user, setUser] = useState({
    companyType: '',  // 기본 값은 빈 문자열
  });

  // 로그인 후 user 상태를 업데이트하는 함수
  const handleLogin = (userData) => {
    console.log('Received userData:', userData);  // 로그인 후 받은 userData를 확인
    setUser(userData);
  };

  return (
    <Router>
      <Header />  {/* 헤더 컴포넌트 추가 */}
      {/* user와 handleLogin을 AppRoutes로 전달 */}
      <AppRoutes user={user} onLogin={handleLogin} />
    </Router>
  );
};

export default App;




// import React, { useState } from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import AppRoutes from './routes/routes.js';
// import Header from './components/header/Header.js';  // Header 컴포넌트 임포트

// const App = () => {
//   // 기본적으로 공장으로 설정된 user 상태
//   const [user, setUser] = useState({
//     companyType: '',  // 초기 상태는 빈 문자열 (로그인 후 변경됨)
//   });

//   // 로그인 후 user 정보를 업데이트하는 함수
//   const handleLogin = async (loginData) => {
//     // 예시로 서버에서 사용자 정보를 받아오는 부분
//     const response = await fetch('/api/login', {
//       method: 'POST',
//       body: JSON.stringify(loginData),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     const userData = await response.json();

//     // 서버에서 받은 사용자 정보로 user 상태 업데이트
//     setUser({
//       companyType: userData.companyType,  // '공장' 또는 '의뢰사' 값 설정
//     });
//   };

//   return (
//     <Router>
//       <Header />  {/* 헤더 컴포넌트 추가 */}
//       {/* user 객체와 handleLogin 함수를 AppRoutes에 전달 */}
//       <AppRoutes user={user} onLogin={handleLogin} />
//     </Router>
//   );
// };

// export default App;



// import React, { useState } from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import AppRoutes from './routes/routes.js';
// import Header from './components/header/Header.js';  // Header 컴포넌트 임포트

// const App = () => {
  
  
//   return (
//     <Router>
//       <Header />  {/* 헤더 컴포넌트 추가 */}
//       {/* 라우트를 분리된 파일로 관리 */}
//       <AppRoutes />
//     </Router>
//   );
// };

// export default App;