import React, {useEffect, useState} from 'react';
import '../../request/Request.css';

const API_URL = 'http://localhost:5000';

const Step1_1 = ({selectedCategory, onSelectCategory}) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // 카테고리 데이터를 가져오는 함수
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_URL}/api/steps/step1`);
                const data = await response.json();

                // const uniqueCategories = [...new Set(data.map(item =>
                // item.selectedCategory))]; 중복 제거된 카테고리 리스트를 ID와 함께 저장
                const uniqueCategories = [...new Set(data.map(item => item.selectedCategory))]; // 중복 제거
                setCategories(uniqueCategories);
              } catch (err) {
                console.error("Failed to fetch categories", err);
              }
            };

        fetchCategories();
    }, []);

    return (
        <div className="categories">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={selectedCategory === category ? 'category-button selected' : 'category-button'}
        >
          {category}
                    </button>
                ))
            }
        </div>
    );
};

export default Step1_1;

// import React from 'react'; import '../../request/Request.css'; const Step1_1
// = ({ selectedCategory, onSelectCategory }) => {   const categories = [
// '패션잡화', '가구', '인테리어', '전자', '장난감&게임', '펫케어'   ];   return (     <div
// className="categories">       {categories.map(category => (         <button
// key={category}           onClick={() => onSelectCategory(category)}
// className={selectedCategory === category ? 'category-button selected' :
// 'category-button'}         >           {category}         </button>       ))}
// </div>   ); }; export default Step1_1;