import React, { useEffect, useState } from 'react';
import '../../request/Request.css';

const API_URL = 'http://localhost:5000';

const Step2_2 = ({ selectedCategory, selectedSubcategory, onSelectSubcategory }) => {
  const [allSubcategories, setAllSubcategories] = useState({});

  useEffect(() => {
    // 모든 카테고리와 서브카테고리를 가져오는 함수
    const fetchSubcategories = async () => {
      try {
        const response = await fetch(`${API_URL}/api/steps/step2`);
        const data = await response.json();

        // 데이터를 카테고리별로 그룹화
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
                key={id}
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



export default Step2_2;