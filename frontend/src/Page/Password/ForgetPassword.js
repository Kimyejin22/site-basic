// ForgotPassword.js

import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendVerificationCode = async () => {
    try {
      const response = await fetch('/api/users/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Verification code sent to your email.');
        setCodeSent(true); // 인증 코드가 전송된 후 상태 업데이트
      } else {
        setMessage('Failed to send verification code: ' + data.error);
      }
    } catch (err) {
      setMessage('An error occurred: ' + err.message);
    }
  };

  const handleResetPassword = () => {
    // 비밀번호 재설정 페이지로 이동
    window.location.href = `/reset-password?email=${encodeURIComponent(email)}&code=${encodeURIComponent(verificationCode)}`;
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button onClick={handleSendVerificationCode}>Send Verification Code</button>
      {codeSent && (
        <>
          <div>
            <label>Verification Code:</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </div>
          <button onClick={handleResetPassword}>Verify Code & Reset Password</button>
        </>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;