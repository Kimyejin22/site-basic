import React, { useEffect, useState } from 'react';
import '../../request/Request.css';

const API_URL = 'http://localhost:5000';

const Step1_2 = ({ selectedCategory, selectedSubcategory, onSelectSubcategory }) => {
  const [allSubcategories, setAllSubcategories] = useState({});

  useEffect(() => {
    // 모든 카테고리와 서브카테고리를 가져오는 함수
    const fetchSubcategories = async () => {
      try {
        const response = await fetch(`${API_URL}/api/steps/step1`);
        const data = await response.json();

        // 데이터를 카테고리별로 그룹화하며 서브카테고리의 ID도 저장
        const groupedSubcategories = data.reduce((acc, item) => {
          if (!acc[item.selectedCategory]) {
            acc[item.selectedCategory] = [];
          }
          acc[item.selectedCategory].push({
            id: item.id,
            subcategory: item.selectedSubcategory,
          });
          return acc;
        }, {});

        setAllSubcategories(groupedSubcategories);
      } catch (err) {
        console.error("Failed to fetch subcategories", err);
      }
    };

    fetchSubcategories();
  }, []);

  return (
    <div className="step1_2">
      {Object.keys(allSubcategories).map(category => (
        <div key={category}>
          <h3>{category}</h3>
          <div className="subcategory-buttons">
            {allSubcategories[category].map(({ id, subcategory }) => (
              <button
                key={id} // 고유한 key로 서브카테고리 ID 사용
                onClick={() => onSelectSubcategory(subcategory, id, category)}
                className={
                  selectedCategory === category && selectedSubcategory === subcategory
                    ? 'subcategory-button selected'
                    : 'subcategory-button'
                }
              >
                {subcategory}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Step1_2;



// import React from 'react';
// import '../../request/Request.css';

// const Step1_2 = ({ selectedCategory, selectedSubcategory, onSelectSubcategory }) => {
//   const allSubcategories = {
//     '패션잡화': ['신발', '가방, 캐리어', '주얼리, 시계', '안경, 선글라스', '패션잡화 기타'],
//     '가구': ['패브릭가구(침대, 소파 등)', '목재가구(책상, 식탁, 수납장 등)', '스테인가구, 철제가구(진열대 등)', '가구 기타'],
//     '인테리어': ['조명', '오브제', '사무용품', '주방용품', '욕실용품', '블라인드, 커튼', '문, 창문', '벽지, 타일, 바닥', '인테리어 기타'],
//     '전자' : ['선풍기, 에어컨, 가전제품', '노트북, PC, 태블릿, 핸드폰', '이어폰, 헤드셋, 스피커', '카메라, 빔프로젝트'],
//     '장난감&게임' : ['보드게임, 퍼즐', '유아용 장난감', '닌텐도'],
//     '펫케어' : ['애완용 케어용품', '애완용 패션제품', '애완용 장난감']
//     // 다른 카테고리의 서브카테고리도 정의
//   };

//   const handleSubcategoryClick = (subcategory, category) => {
//     onSelectSubcategory(subcategory, category);
//   };

//   return (
//     <div className="step1_2">
//       {Object.keys(allSubcategories).map(category => (
//         <div key={category}>
//           <h3>{category}</h3>
//           <div className="subcategory-buttons">
//             {allSubcategories[category].map(subcategory => (
//               <button
//                 key={`${category}-${subcategory}`} // 고유한 key를 위해 category와 subcategory를 조합
//                 onClick={() => handleSubcategoryClick(subcategory, category)}
//                 className={
//                   selectedCategory === category && selectedSubcategory === subcategory
//                     ? 'subcategory-button selected'
//                     : 'subcategory-button'
//                 }
//               >
//                 {subcategory}
//               </button>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };


// export default Step1_2;