import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format'; 
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 


const Step3_1 = ({
  quantity,
  price,
  sampleNeeded,
  onQuantityChange,
  onPriceChange,
  onSampleChange,
  deliveryDate,
  onDeliveryDateChange,
  preferredCommunication,
  onPreferredCommunicationChange,
  recruitmentPeriod,
  onRecruitmentPeriodChange
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleCheckboxChange = (option) => {
    onPreferredCommunicationChange(option);
  };

  const handleDateChange = (date) => {
    onDeliveryDateChange(date);
    setIsCalendarOpen(false); // 날짜 선택 후 달력 닫기
  };

  return (
    <div className="step3_1">
      {/* 1. 제작 예상 수량 입력 */}
      <div>
        <label>제작 예상 수량을 입력해주세요</label>
        <NumericFormat
          value={quantity || 0}  // quantity가 null인 경우 기본값 0
          thousandSeparator={true}
          onValueChange={(values) => onQuantityChange(values.value)}
          suffix=" 개"
          placeholder="수량"
          className="input-field"
        />
      </div>
      
      {/* 2. 제품 예상 단가 입력 */}
      <div>
        <label>제품 예상 단가를 입력해주세요</label>
        <NumericFormat
          value={price || 0}  // price가 null인 경우 기본값 0
          thousandSeparator={true}
          onValueChange={(values) => onPriceChange(values.value)}
          suffix=" 원"
          placeholder="단가"
          className="input-field"
        />
      </div>

      {/* 3. 샘플 제작 여부 선택 */}
      <div>
        <label>샘플 제작 여부를 선택해주세요</label>
        <div>
          <input
            type="radio"
            value="필요"
            checked={sampleNeeded === '필요'}
            onChange={(e) => onSampleChange(e.target.value)}
          />
          <label>샘플 제작 필요</label>
        </div>
        <div>
          <input
            type="radio"
            value="불필요"
            checked={sampleNeeded === '불필요'}
            onChange={(e) => onSampleChange(e.target.value)}
          />
          <label>샘플 제작 필요없음</label>
        </div>
      </div>

      {/* 4. 프로젝트 진행 시 선호하는 소통 방식 */}
      <div>
        <label>프로젝트 진행 시 선호하는 소통 방식을 선택해주세요</label>
        <div>
          <input
            type="checkbox"
            value="A"
            checked={preferredCommunication.includes('A')}
            onChange={() => handleCheckboxChange('A')}
          />
          <label>A - 상시 온라인 채팅/카톡</label>
        </div>
        {/* 추가 소통 방식 옵션들 */}
      </div>

      {/* 5. 견적 제안 가능한 모집 기간 선택 */}
      <div>
        <label>견적 제안 가능한 모집 기간을 선택해주세요</label>
        <NumericFormat
          value={recruitmentPeriod || 0}  // recruitmentPeriod가 null인 경우 기본값 0
          onValueChange={(values) => onRecruitmentPeriodChange(values.value)}
          suffix=" 일"
          placeholder="모집 기간"
          className="input-field"
        />
      </div>

      {/* 6. 제품 받아야 하는 납품 완료일 선택 */}
      <div>
        <label>제품을 받아야 하는 납품 완료일을 선택해주세요</label>
        <input
          type="text"
          value={deliveryDate.toISOString().split('T')[0].replace(/-/g, '.')}
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          readOnly
          placeholder="납품 완료일 선택"
          className="input-field"
        />
        {isCalendarOpen && (
          <Calendar
            onChange={handleDateChange}
            value={deliveryDate || new Date()}  // deliveryDate가 null인 경우 현재 날짜
          />
        )}
      </div>
    </div>
  );
};

export default Step3_1;

// import React, { useState } from 'react';
// import { NumericFormat } from 'react-number-format'; 
// import Calendar from 'react-calendar'; 
// import 'react-calendar/dist/Calendar.css'; 

// const Step3_1 = ({ quantity, price, sampleNeeded, onQuantityChange, onPriceChange, onSampleChange }) => {
//   const [preferredCommunication, setPreferredCommunication] = useState([]);
//   const [recruitmentPeriod, setRecruitmentPeriod] = useState('');
//   const [deliveryDate, setDeliveryDate] = useState(new Date());
//   const [isCalendarOpen, setIsCalendarOpen] = useState(false);

//   const handleCheckboxChange = (option) => {
//     if (preferredCommunication.includes(option)) {
//       setPreferredCommunication(preferredCommunication.filter(item => item !== option));
//     } else {
//       setPreferredCommunication([...preferredCommunication, option]);
//     }
//   };

//   const handleDateChange = (date) => {
//     setDeliveryDate(date);
//     setIsCalendarOpen(false); // 날짜 선택 후 달력 닫기
//   };

//   return (
//     <div className="step3_1">
//       {/* 1. 제작 예상 수량 입력 */}
//       <div>
//         <label>제작 예상 수량을 입력해주세요</label>
//         <NumericFormat
//           value={quantity}
//           thousandSeparator={true}
//           onValueChange={(values) => onQuantityChange(values.value)}
//           suffix=" 개"
//           placeholder="수량"
//           className="input-field"
//         />
//       </div>
      
//       {/* 2. 제품 예상 단가 입력 */}
//       <div>
//         <label>제품 예상 단가를 입력해주세요</label>
//         <NumericFormat
//           value={price}
//           thousandSeparator={true}
//           onValueChange={(values) => onPriceChange(values.value)}
//           suffix=" 원"
//           placeholder="단가"
//           className="input-field"
//         />
//       </div>

//       {/* 3. 샘플 제작 여부 선택 */}
//       <div>
//         <label>샘플 제작 여부를 선택해주세요</label>
//         <div>
//           <input
//             type="radio"
//             value="필요"
//             checked={sampleNeeded === '필요'}
//             onChange={(e) => onSampleChange(e.target.value)}
//           />
//           <label>샘플 제작 필요</label>
//         </div>
//         <div>
//           <input
//             type="radio"
//             value="불필요"
//             checked={sampleNeeded === '불필요'}
//             onChange={(e) => onSampleChange(e.target.value)}
//           />
//           <label>샘플 제작 필요없음</label>
//         </div>
//       </div>

//       {/* 4. 프로젝트 진행 시 선호하는 소통 방식 */}
//       <div>
//         <label>프로젝트 진행 시 선호하는 소통 방식을 선택해주세요</label>
//         <div>
//           <input
//             type="checkbox"
//             value="A"
//             checked={preferredCommunication.includes('A')}
//             onChange={() => handleCheckboxChange('A')}
//           />
//           <label>A - 상시 온라인 채팅/카톡</label>
//         </div>
//         {/* 나머지 옵션들... */}
//       </div>

//       {/* 5. 견적 제안 가능한 모집 기간 선택 */}
//       <div>
//         <label>견적 제안 가능한 모집 기간을 선택해주세요</label>
//         <NumericFormat
//           value={recruitmentPeriod}
//           onValueChange={(values) => setRecruitmentPeriod(values.value)}
//           suffix=" 일"
//           placeholder="모집 기간"
//           className="input-field"
//         />
//       </div>

//       {/* 6. 제품 받아야 하는 납품 완료일 선택 */}
//       <div>
//         <label>제품을 받아야 하는 납품 완료일을 선택해주세요</label>
//         <input
//           type="text"
//           value={deliveryDate.toISOString().split('T')[0].replace(/-/g, '.')}
//           onClick={() => setIsCalendarOpen(!isCalendarOpen)}
//           readOnly
//           placeholder="납품 완료일 선택"
//           className="input-field"
//         />
//         {isCalendarOpen && (
//           <Calendar
//             onChange={handleDateChange}
//             value={deliveryDate}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Step3_1;






// import React, { useState } from 'react';
// import { NumericFormat } from 'react-number-format'; 
// import DatePicker from 'react-datepicker'; 
// import 'react-datepicker/dist/react-datepicker.css'; 
// import '../../request/Request.css';

// const Step3_1 = ({ quantity, price, sampleNeeded, onQuantityChange, onPriceChange, onSampleChange }) => {
//     const [preferredCommunication, setPreferredCommunication] = useState([]);
//     const [recruitmentPeriod, setRecruitmentPeriod] = useState('');
//     const [deliveryDate, setDeliveryDate] = useState(null);
  
//     const handleCheckboxChange = (option) => {
//       if (preferredCommunication.includes(option)) {
//         setPreferredCommunication(preferredCommunication.filter(item => item !== option));
//       } else {
//         setPreferredCommunication([...preferredCommunication, option]);
//       }
//     };
  

//     return (
//         <div className="step3_1">
//           {/* 1. 제작 예상 수량 입력 */}
//           <div>
//             <label>제작 예상 수량을 입력해주세요</label>
//             <NumericFormat
//               value={quantity}
//               thousandSeparator={true}
//               onValueChange={(values) => onQuantityChange(values.value)}
//               suffix=" 개"
//               placeholder="수량"
//               className="input-field"
//             />
//           </div>
    
//           {/* 2. 제품 예상 단가 입력 */}
//           <div>
//             <label>제품 예상 단가를 입력해주세요</label> 
//             <NumericFormat
//               value={price}
//               thousandSeparator={true}
//               onValueChange={(values) => onPriceChange(values.value)}
//               suffix=" 원"
//               placeholder="단가"
//               className="input-field"
//             />
//           </div>
    
//           {/* 3. 샘플 제작 여부 선택 */}
//           <div>
//             <label>샘플 제작 여부를 선택해주세요</label>
//             <div>
//               <input
//                 type="radio"
//                 value="필요"
//                 checked={sampleNeeded === '필요'}
//                 onChange={(e) => onSampleChange(e.target.value)}
//               />
//               <label>샘플 제작 필요</label>
//             </div>
//             <div>
//               <input
//                 type="radio"
//                 value="불필요"
//                 checked={sampleNeeded === '불필요'}
//                 onChange={(e) => onSampleChange(e.target.value)}
//               />
//               <label>샘플 제작 필요없음</label>
//             </div>
//           </div>
    
//           {/* 4. 프로젝트 진행시 선호하는 소통 방식 */}
//           <div>
//             <label>프로젝트 진행 시 선호하는 소통 방식을 선택해주세요</label>
//             <div>
//               <input
//                 type="checkbox"
//                 value="A"
//                 checked={preferredCommunication.includes('A')}
//                 onChange={() => handleCheckboxChange('A')}
//               />
//               <label>A - 상시 온라인 채팅/카톡</label>
//             </div>
//             {/* 나머지 옵션들... */}
//           </div>
    
//           {/* 5. 견적 제안 가능한 모집 기간 선택 */}
//           <div>
//             <label>견적 제안 가능한 모집 기간을 선택해주세요</label>
//             <NumericFormat
//               value={recruitmentPeriod}
//               onValueChange={(values) => setRecruitmentPeriod(values.value)}
//               suffix=" 일"
//               placeholder="모집 기간"
//               className="input-field"
//             />
//           </div>
    
//           {/* 6. 제품 받아야 하는 납품 완료일 선택 */}
//           <div>
//             <label>제품을 받아야 하는 납품 완료일을 선택해주세요</label>
//             <DatePicker
//               selected={deliveryDate}
//               onChange={(date) => setDeliveryDate(date)}
//               dateFormat="yyyy.MM.dd"
//               placeholderText="납품 완료일 선택"
//               className="input-field"
//             />
//           </div>
//         </div>
//       );
//     };

// export default Step3_1;
