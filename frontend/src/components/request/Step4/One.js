import React, { useState } from 'react';
import '../../request/Request.css';

const Step4 = ({ title, content, file, onTitleChange, onContentChange, onFileChange, onSubmit }) => {

    const handleFileChange = (event) => {
      onFileChange(event.target.files[0]);
    };

  
    const handleSubmit = (event) => {
      event.preventDefault();

      // JWT 토큰이 있는지 확인 (로그인 여부 확인)
      const token = localStorage.getItem('token');
      if (!token) {
      alert('로그인 후 견적 의뢰가 정상 등록됩니다.');
      const currentUrl = window.location.href;
      window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
      return;
      }
  
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (file) {
        formData.append('file', file);
      }
  
      onSubmit(formData);
    };
  
    return (
      <form onSubmit={handleSubmit} className="step4-form">
        <div className="form-group">
          <label htmlFor="title">견적 요청 타이틀을 입력해주세요.</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            required
            placeholder="예시)2024 S/S 알리제 가죽 숄더백 제작"
            className="input-field"
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="content">제작 요청 사항을 작성해주세요.</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="여기에 제작 요청 사항을 입력해주세요..."
            className="textarea-field"
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="file">첨부파일 (선택)</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>
        <div className="submit-button-container">
            <button type="submit" className="submit-button">
            완료
            </button>
        </div>

      </form>
    );
  };
  
  export default Step4;