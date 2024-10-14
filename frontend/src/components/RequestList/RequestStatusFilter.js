
import '../RequestList/RequestList.css';

const RequestStatusFilter = ({ setStatusFilter }) => {
    return (
      <div className="request-status-filter">
        <h4>의뢰 진행 상황</h4>
        <button onClick={() => setStatusFilter('전체')}>전체</button>
        <button onClick={() => setStatusFilter('모집중')}>모집중</button>
        <button onClick={() => setStatusFilter('마감')}>마감</button>
      </div>
    );
  };
  
  export default RequestStatusFilter;