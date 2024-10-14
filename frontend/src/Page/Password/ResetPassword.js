// ResetPassword.js

import React, { useState } from 'react';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  // Query parameters from URL
  const params = new URLSearchParams(window.location.search);
  const emailParam = params.get('email');
  const codeParam = params.get('code');

  // Set initial state from URL params
  if (!email && emailParam) setEmail(emailParam);
  if (!verificationCode && codeParam) setVerificationCode(codeParam);

  const handleResetPassword = async () => {
    try {
      const response = await fetch('/api/users/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, verificationCode, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset successfully!');
      } else {
        setMessage('Failed to reset password: ' + data.error);
      }
    } catch (err) {
      setMessage('An error occurred: ' + err.message);
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Verification Code:</label>
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
        />
      </div>
      <div>
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <button onClick={handleResetPassword}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
