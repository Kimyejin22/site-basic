import React, { useState } from 'react';
import '../Register/CompanySearchModal.css';

const CompanySearchModal = ({ onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState([
    { companyName: '알리제', businessNumber: '3708602992', ceo: '권순범', address: '서울특별시 구로구 디지털로 288' },
    // 추가적인 회사 데이터
  ]);
  const [noResults, setNoResults] = useState(false); // 검색 결과 없음 상태
  const [newCompany, setNewCompany] = useState({ companyName: '', businessNumber: '', ceo: '', address: '' }); // 새로 등록할 회사 정보

  const handleSearch = () => {
    const cleanedSearchTerm = searchTerm.replace(/-/g, ''); // 하이픈 제거
    if (!/^\d{10}$/.test(cleanedSearchTerm)) { // 숫자 10자리인지 검사
      alert('사업자등록번호는 정확히 10자리 숫자여야 합니다.');
      return;
    }

    const filteredCompanies = companies.filter(company =>
      company.businessNumber.includes(cleanedSearchTerm)
    );
    setCompanies(filteredCompanies);
    setNoResults(filteredCompanies.length === 0); // 검색 결과가 없으면 true 설정
  };

  const handleSelect = (company) => {
    onSelect(company);
    onClose();
  };

  const handleRegisterNewCompany = () => {
    if (!newCompany.companyName || !newCompany.businessNumber || !newCompany.ceo || !newCompany.address) {
      alert('모든 필드를 입력해야 합니다.');
      return;
    }
    onSelect(newCompany); // 새로 입력된 회사 정보 전달
    onClose();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^[\d-]*$/.test(value)) {
      setSearchTerm(value);
    }
  };

  const handleNewCompanyChange = (e) => {
    const { name, value } = e.target;
    setNewCompany({ ...newCompany, [name]: value });
  };

  return (
    <div className="modal show">
      <div className="modal-content">
        <h2>기업 찾기</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="사업자등록번호로 검색"
          maxLength={12}
        />
        <button onClick={handleSearch}>검색</button>
        {noResults ? (
          <div>
            <p>검색 결과가 없습니다. 이 사업자등록번호로 새로 등록하시겠습니까?</p>
            <table>
              <thead>
                <tr>
                  <th>기업 명</th>
                  <th>사업자등록번호</th>
                  <th>대표자</th>
                  <th>사업장 주소</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      name="companyName"
                      value={newCompany.companyName}
                      onChange={handleNewCompanyChange}
                      placeholder="기업 명 입력"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="businessNumber"
                      value={newCompany.businessNumber}
                      onChange={handleNewCompanyChange}
                      placeholder="사업자번호 입력"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="ceo"
                      value={newCompany.ceo}
                      onChange={handleNewCompanyChange}
                      placeholder="대표자 입력"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="address"
                      value={newCompany.address}
                      onChange={handleNewCompanyChange}
                      placeholder="사업장 주소 입력"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button onClick={handleRegisterNewCompany}>확인</button>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>기업 명</th>
                <th>사업자등록번호</th>
                <th>대표자</th>
                <th>사업장 주소</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr key={index} onClick={() => handleSelect(company)}>
                  <td>{company.companyName}</td>
                  <td>{company.businessNumber}</td>
                  <td>{company.ceo}</td>
                  <td>{company.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default CompanySearchModal;
