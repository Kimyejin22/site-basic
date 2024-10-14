import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // 리디렉션 후 URL에서 쿼리 파라미터 확인
import Step1_1 from '../components/request/Step1/One.js';
import Step1_2 from '../components/request/Step1/Two.js';
import Step2_1 from '../components/request/Step2/One.js';
import Step2_2 from '../components/request/Step2/Two.js';
import Step3_1 from '../components/request/Step3/One.js';
import Step4 from '../components/request/Step4/One.js';
import '../components/request/Request.css';
import StepProgressBar from '../components/StepProgress/StepProgressBar.js';

const API_URL = 'http://localhost:5000';

const Request = () => {
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState({});
  const [step2Data, setStep2Data] = useState({});
  const [step3Data, setStep3Data] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [sampleNeeded, setSampleNeeded] = useState('필요없음');
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [preferredCommunication, setPreferredCommunication] = useState([]);
  const [recruitmentPeriod, setRecruitmentPeriod] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState({ 1: '', 2: '' });
  const [selectedSubcategories, setSelectedSubcategories] = useState({ 1: '', 2: '' });
  
  const location = useLocation();

  // 로컬 스토리지에서 데이터를 불러오기
  useEffect(() => {
    const savedData = localStorage.getItem('requestData');
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect');

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setStep1Data(parsedData.step1Data);
      setStep2Data(parsedData.step2Data);
      setStep3Data(parsedData.step3Data);
      setQuantity(parsedData.quantity);
      setPrice(parsedData.price);
      setSampleNeeded(parsedData.sampleNeeded);
      setDeliveryDate(new Date(parsedData.deliveryDate));
      setPreferredCommunication(parsedData.preferredCommunication || []);
      setRecruitmentPeriod(parsedData.recruitmentPeriod);
      setTitle(parsedData.title);
      setContent(parsedData.content);
      setFile(parsedData.file);
      setSelectedCategories(parsedData.selectedCategories);
      setSelectedSubcategories(parsedData.selectedSubcategories);

      // 로그인 후 리디렉션된 경우에만 Step4로 이동
      if (redirect) {
        setStep(4);
      }
    }
  }, [location.search]);

  // 로컬 스토리지에 데이터 저장
  const handleNextStep = () => {
    const currentData = {
      step1Data,
      step2Data,
      step3Data,
      quantity,
      price,
      sampleNeeded,
      deliveryDate,
      preferredCommunication,
      recruitmentPeriod,
      title,
      content,
      file,
      selectedCategories,
      selectedSubcategories,
    };
    localStorage.setItem('requestData', JSON.stringify(currentData));
  };

  const handleCategorySelect = (category, categoryId) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [step]: category,
    }));
    setSelectedSubcategories((prev) => ({
      ...prev,
      [step]: '', // 카테고리가 변경되면 서브카테고리를 초기화
    }));

    if (step === 1) {
      setStep1Data((prev) => ({
        ...prev,
        selectedCategory: category,
        selectedCategoryId: categoryId,
      }));
    } else if (step === 2) {
      setStep2Data((prev) => ({
        ...prev,
        selectedCategory: category,
        selectedCategoryId: categoryId,
      }));
    }
  };

  const handleSubcategorySelect = (subcategory, subcategoryId, category, categoryId) => {
    setSelectedSubcategories((prev) => ({
      ...prev,
      [step]: subcategory,
    }));
    setSelectedCategories((prev) => ({
      ...prev,
      [step]: category, // 서브카테고리 선택 시 카테고리도 업데이트
    }));

    if (step === 1) {
      setStep1Data((prev) => ({
        ...prev,
        selectedSubcategory: subcategory,
        selectedSubcategoryId: subcategoryId,
        selectedCategory: category,
        selectedCategoryId: categoryId,
      }));
    } else if (step === 2) {
      setStep2Data((prev) => ({
        ...prev,
        selectedSubcategory: subcategory,
        selectedSubcategoryId: subcategoryId,
        selectedCategory: category,
        selectedCategoryId: categoryId,
      }));
    }
  };

  // Step 3에서 사용하는 상태 변경 핸들러
  const handleQuantityChange = (value) => setQuantity(value);
  const handlePriceChange = (value) => setPrice(value);
  const handleSampleChange = (value) => setSampleNeeded(value);
  const handleDeliveryDateChange = (date) => setDeliveryDate(date);
  const handlePreferredCommunicationChange = (option) => {
    setPreferredCommunication((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };
  const handleRecruitmentPeriodChange = (value) => setRecruitmentPeriod(value);

  // Step 4에서 사용하는 상태 변경 핸들러
  const handleTitleChange = (value) => setTitle(value);
  const handleContentChange = (value) => setContent(value);
  const handleFileChange = (file) => setFile(file);

  const goToNextStep = () => {
    if (step < 4) {
      handleNextStep();
      setStep(step + 1);
    }
  };

  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleStep4Submit = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token); 
      
      if (!token) {
        alert('로그인 후 견적 의뢰가 정상 등록됩니다.');
        window.location.href = `/login?redirect=${encodeURIComponent(window.location.href)}`;
        return;
      }
  
      console.log("Submitting Step 4");
      console.log("Step 1 Data:", step1Data);
      console.log("Step 2 Data:", step2Data);
  
      const step1Id = step1Data?.selectedSubcategoryId;
      const step2Id = step2Data?.selectedSubcategoryId;
  
      if (!step1Id || !step2Id) {
        throw new Error('Step1 ID or Step2 ID is missing');
      }
  
      // FormData 생성
      const formData = new FormData();
      formData.append('step1Id', step1Id);
      formData.append('step2Id', step2Id);
  
      // Step 3 데이터 저장
      const step3Response = await fetch(`${API_URL}/api/steps/step3`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,  // JWT 토큰 추가
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quantity: quantity || 0,  // quantity 값이 없는 경우 기본값 0 설정
          price: price || 0,
          sampleNeeded: sampleNeeded || '필요없음',
          deliveryDate: deliveryDate ? deliveryDate.toISOString() : new Date().toISOString(), // deliveryDate가 없는 경우 현재 날짜 사용
          preferredCommunication: preferredCommunication.join(',') || '없음',  // 배열을 문자열로 변환
          recruitmentPeriod: recruitmentPeriod || 0,
        }),
      });
  
      const step3DataResponse = await step3Response.json();
      console.log("Step 3 Response:", step3DataResponse);
  
      if (!step3Response.ok) {
        throw new Error('Failed to save Step 3 data: ' + step3DataResponse.error);
      }
  
      const step3Id = step3DataResponse.id;
      formData.append('step3Id', step3Id);
  
      // Step 4 데이터 추가
      formData.append('title', title);
      formData.append('content', content);
      if (file) {
        formData.append('file', file);
      }
  
      const response = await fetch(`${API_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
  
      const data = await response.json();

      console.log('FormData before submission:', formData);
  
      if (response.ok) {
        console.log('Data submitted successfully:', data);
        alert('Form submitted successfully!');
        localStorage.removeItem('requestData');
      } else {
        console.error('Error submitting form:', data.message);
        alert('Form submission failed: ' + data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while submitting the form.');
    }
  };
  
  return (
    <div className="container">
      <StepProgressBar currentStep={step} />
      <div className="step1-container">
        {step === 1 && (
          <>
            <Step1_1
              selectedCategory={selectedCategories[1]}
              onSelectCategory={handleCategorySelect}
              className="step1-1-component"
            />
            <Step1_2
              selectedCategory={selectedCategories[1]}
              selectedSubcategory={selectedSubcategories[1]}
              onSelectSubcategory={handleSubcategorySelect}
              className="step1-2-component"
            />
          </>
        )}
        {step === 2 && (
          <>
            <Step2_1
              selectedCategory={selectedCategories[2]}
              onSelectCategory={handleCategorySelect}
              className="step2-1-component"
            />
            <Step2_2
              selectedCategory={selectedCategories[2]}
              selectedSubcategory={selectedSubcategories[2]}
              onSelectSubcategory={handleSubcategorySelect}
              className="step2-2-component"
            />
          </>
        )}
        {step === 3 && (
          <Step3_1
            quantity={quantity}
            price={price}
            sampleNeeded={sampleNeeded}
            onQuantityChange={handleQuantityChange}
            onPriceChange={handlePriceChange}
            onSampleChange={handleSampleChange}
            deliveryDate={deliveryDate}
            onDeliveryDateChange={handleDeliveryDateChange}
            preferredCommunication={preferredCommunication}
            onPreferredCommunicationChange={handlePreferredCommunicationChange}
            recruitmentPeriod={recruitmentPeriod}
            onRecruitmentPeriodChange={handleRecruitmentPeriodChange}
            className="step3-1-component"
          />
        )}
        {step === 4 && (
          <Step4
            title={title}
            content={content}
            file={file}
            onTitleChange={handleTitleChange}
            onContentChange={handleContentChange}
            onFileChange={handleFileChange}
            onSubmit={handleStep4Submit}
            className="step4-component"
          />
        )}
      </div>
      <div className="button-container">
        {step > 1 && <button className="prev-button" onClick={goToPreviousStep}>이전</button>}
        {step < 4 && <button className="next-button" onClick={goToNextStep}>다음</button>}
      </div>
    </div>
  );
};

export default Request;



