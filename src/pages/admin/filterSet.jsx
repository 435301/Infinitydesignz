import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { BsSearch, BsArrowClockwise } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilterSets } from '../../redux/actions/filterSetAction';
import PaginationComponent from '../../includes/pagination';

const ManageFilterSet = () => {
  const dispatch = useDispatch();
  const { filterSets = [] } = useSelector((state) => state.filterSets);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const filteredFilterSets = (filterSets || [])?.filter((filterSet) => {
    if (!filterSet && !filterSet?.title) return false
    const title = filterSet.title.toLowerCase();
    const matchesSearch = title.includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredFilterSets.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredFilterSets.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    dispatch(fetchFilterSets());
  }, [dispatch]);



  const handleRowCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const groupedFilterSets = currentRows.reduce((acc, item) => {
    const groupName = item.filterType?.name || 'Unknown';
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(item);
    return acc;
  }, {});

  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin onToggleSidebar={handleToggleSidebar} />
        <aside className="main-sidebar hidden-print">
          <Sidebar isCollapsed={isSidebarCollapsed} />
        </aside>

        <div
          className="content-wrapper mb-4"
          style={{
            marginLeft: isSidebarCollapsed ? '60px' : '272px',
            padding: '20px',
            flex: 1,
            transition: 'margin-left 0.3s ease',
          }}
        >
          <div className="main-header" style={{ marginTop: '0px' }}>
            <h5>Filter Set</h5>
          </div>

          <div className="container-fluid manage">
            {/* Search and Filters */}
            <div className="card mb-3">
              <div className="card-block manage-btn">
                <div className="row g-3 align-items-center">
                  <div className="col-md-3">
                    <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search By Title" value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                  </div>
                  {/* <div className="col-md-3">
                    <select className="form-control">
                      <option value="">- Select Status -</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div> */}
                  <div className="col-md-2 d-flex gap-2">
                   
                    <button className="btn btn-success">
                      <BsArrowClockwise onClick={() => setSearchTerm('')} />
                    </button>
                  </div>
                  <div className="col-md-4 text-end">
                    <button className="btn btn-primary">+ Create Filter Set</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Header & Actions */}
            <div className="card">
              <div className="card-block">
                <div className="row mb-3">
                 

                </div>
                <div >
                  {Object.entries(groupedFilterSets).map(([filterTypeName, items]) => (
                    <div key={filterTypeName} className="mb-4">
                      <div className="col-lg-6 d-flex align-items-center">
                        <h5 className="mb-2">{filterTypeName}</h5>
                      </div>
                      <div className="feature-row">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="feature-item d-flex justify-content-between align-items-center mb-2 p-2 border rounded"
                          >
                            <div className="d-flex align-items-center">
                              <input
                                type="checkbox"
                                checked={selectedRows.includes(item.id)}
                                onChange={() => handleRowCheckboxChange(item.id)}
                                className="me-2"
                              />
                              <strong>{item.title}</strong>

                            </div>

                            <div className="d-flex gap-2">
                              {/* <button className="btn btn-sm " title="View" onClick={()=>{
                                                  setViewFeatureSet(item);
                                                  setViewModalVisible(true)
                                                }}>
                                                  <BsEye />
                                                </button>
                                                <button className="btn btn-sm btn-outline-primary" title="Edit"  onClick={() => {
                                                  setSelectedFeatureSet(item);
                                                  setEditModalVisible(true);
                                                }}>
                                                  <BsPencilSquare />
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger" title="Delete"  onClick={() => handleDeleteClick(item.id)}  >
                                                  <BsTrash />
                                                </button> */}

                            </div>
                            <span className="badge ms-2">{item.priority}</span>
                          </div>

                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="btn"
                  style={{
                    backgroundColor: '#0da79e',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    fontSize: '16px',
                    marginTop: '20px',
                  }}
                >
                  Set Priority
                </button>
              </div>
            </div>
            <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageFilterSet;
