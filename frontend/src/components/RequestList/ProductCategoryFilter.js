import React, { useEffect, useState } from 'react';
import '../RequestList/RequestList.css';

const ProductCategoryFilter = ({ setProductCategoryFilter, setProductSubcategoryFilter }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState({});
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  useEffect(() => {
    // Step1 카테고리와 서브카테고리를 가져오는 함수
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/steps/step1');
        const data = await response.json();

        // 중복된 카테고리를 제거하고 카테고리별로 서브카테고리를 그룹화
        const categoriesMap = {};
        data.forEach(item => {
          if (!categoriesMap[item.selectedCategory]) {
            categoriesMap[item.selectedCategory] = [];
          }
          categoriesMap[item.selectedCategory].push(item.selectedSubcategory);
        });

        setCategories(Object.keys(categoriesMap));
        setSubcategories(categoriesMap);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSelectedSubcategory('');
    setProductCategoryFilter(category);
  };

  const handleSubcategoryChange = (event) => {
    const subcategory = event.target.value;
    setSelectedSubcategory(subcategory);
    setProductSubcategoryFilter(subcategory);
  };

  return (
    <div className="product-category-filter">
      <h4>제품 카테고리</h4>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">카테고리 선택</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      {selectedCategory && (
        <select value={selectedSubcategory} onChange={handleSubcategoryChange}>
          <option value="">서브카테고리 선택</option>
          {subcategories[selectedCategory].map(subcategory => (
            <option key={subcategory} value={subcategory}>{subcategory}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default ProductCategoryFilter;
