import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate를 통한 라우팅
import RequestStatusFilter from '../components/RequestList/RequestStatusFilter.js';
import ProductCategoryFilter from '../components/RequestList/ProductCategoryFilter.js';
import MaterialCategoryFilter from '../components/RequestList/MaterialCategoryFilter.js';
import RequestList from '../components/RequestList/RequestList.js';
import RequestDetailPage from './RequestDetailPage.js';
import '../Page/CSS/RequestDetail.css';

const API_URL = 'http://localhost:5000';

const RequestListPage = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('전체');
  const [productCategoryFilter, setProductCategoryFilter] = useState('');
  const [productSubcategoryFilter, setProductSubcategoryFilter] = useState('');
  const [materialCategoryFilter, setMaterialCategoryFilter] = useState('');
  const [materialSubcategoryFilter, setMaterialSubcategoryFilter] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null); // 선택된 요청을 저장할 상태 추가

  const navigate = useNavigate(); // 네비게이션 기능 추가

  useEffect(() => {
    // 서버에서 Request 데이터를 가져오는 함수
    const fetchRequests = async () => {
      try {
        // 같은 도메인(포트 3000)에서 API 요청을 보냄
        const response = await fetch(`${API_URL}/api/posts`); // 상대 경로 사용
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRequests(data);
        setFilteredRequests(data);
      } catch (err) {
        console.error("Failed to fetch requests", err); // 에러 메시지 출력
      }
    };

    fetchRequests();
  }, []);

  // 필터가 변경될 때마다 필터링된 데이터를 업데이트하는 함수
  useEffect(() => {
    let updatedRequests = [...requests];

    if (statusFilter !== '전체') {
      updatedRequests = updatedRequests.filter(request => {
        const requestEndDate = new Date(request.createdAt);
        requestEndDate.setDate(requestEndDate.getDate() + (request.Step3Data?.recruitmentPeriod || 0)); // 수정된 부분
        return statusFilter === '모집중'
          ? requestEndDate >= new Date()
          : requestEndDate < new Date();
      });
    }

    if (productCategoryFilter) {
      updatedRequests = updatedRequests.filter(
        request => request.Step1Data?.selectedCategory === productCategoryFilter // 수정된 부분
      );
    }

    if (productSubcategoryFilter) {
      updatedRequests = updatedRequests.filter(
        request => request.Step1Data?.selectedSubcategory === productSubcategoryFilter // 수정된 부분
      );
    }

    if (materialCategoryFilter) {
      updatedRequests = updatedRequests.filter(
        request => request.Step2Data?.selectedCategory === materialCategoryFilter // 수정된 부분
      );
    }

    if (materialSubcategoryFilter) {
      updatedRequests = updatedRequests.filter(
        request => request.Step2Data?.selectedSubcategory === materialSubcategoryFilter // 수정된 부분
      );
    }

    setFilteredRequests(updatedRequests);
  }, [statusFilter, productCategoryFilter, productSubcategoryFilter, materialCategoryFilter, materialSubcategoryFilter, requests]);

  // 요청 클릭 시 상세 페이지로 이동
  const handleRequestClick = (request) => {
    navigate(`/request/${request.id}`); // 클릭한 요청의 ID를 경로에 전달
  };

  return (
    <div className="request-list-page">
      <div className="filters">
        <RequestStatusFilter setStatusFilter={setStatusFilter} />
        <ProductCategoryFilter
          setProductCategoryFilter={setProductCategoryFilter}
          setProductSubcategoryFilter={setProductSubcategoryFilter}
        />
        <MaterialCategoryFilter
          setMaterialCategoryFilter={setMaterialCategoryFilter}
          setMaterialSubcategoryFilter={setMaterialSubcategoryFilter}
        />
      </div>
      <div className="request-list">
        <RequestList requests={filteredRequests} onRequestClick={handleRequestClick} /> {/* 클릭 핸들러 전달 */}
      </div>
    </div>
  );
};

export default RequestListPage;
