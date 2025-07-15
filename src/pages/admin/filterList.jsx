import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { BsSearch, BsArrowClockwise, BsPencilSquare, BsTrash, BsEye } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFilterList, fetchFilterLists } from '../../redux/actions/filterListActions';
import { fetchFilterTypes } from '../../redux/actions/filterTypeAction';
import PaginationComponent from '../../includes/pagination';
import AddFilterListModal from '../../components/addFilterListModal';
import EditFilterListModal from '../../components/editFilterListModal';
import DeleteModal from '../../modals/deleteModal';
import ViewFilterListModal from '../../modals/viewFilterListModal';

const ManageFilterList = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const[showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFilterList, setSelectedFilterList] = useState(null);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [filterListToDelete, setFilterListToDelete] = useState(null);
    const[viewModalVisible, setViewModalVisible] = useState(false);
    const[viewFilterList, setViewFilterList] = useState(null);

  const dispatch = useDispatch();
  const { filterLists = [] } = useSelector((state) => state.filterLists);
  const { filterTypes = [] } = useSelector((state) => state.filterTypes || {});


  useEffect(() => {
    dispatch(fetchFilterLists());
    dispatch(fetchFilterTypes());
  }, [dispatch]);

  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const getFilterTypeName = (id) => {
    const type = filterTypes.find((t) => t.id === id);
    return type?.name || 'Unknown';
  };


  const filteredFilterList = (filterLists || []).filter((filterLists) => {
    if (!filterLists) return false;

    const label = filterLists.label?.toLowerCase() || '';
    const filterSetTitle = filterLists.filterSet?.title?.toLowerCase() || '';
    const filterTypeName = getFilterTypeName(filterLists.filterSet?.filterTypeId).toLowerCase();

    const term = searchTerm.toLowerCase();

    return (
      label.includes(term) ||
      filterSetTitle.includes(term) ||
      filterTypeName.includes(term)
    );
  }).map((filterList) => {
    const filterSetTitle = filterList?.filterSet?.title || 'N/A';
    const filterTypeName = getFilterTypeName(filterList?.filterSet?.filterTypeId);

    return {
      ...filterList,
      filterSetTitle,
      filterTypeName,
    };
  });



  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredFilterList.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredFilterList.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const groupedFilters = currentRows.reduce((acc, filter) => {
    const groupTitle = filter.filterSet?.title || 'Unknown';
    if (!acc[groupTitle]) {
      acc[groupTitle] = [];
    }
    acc[groupTitle].push(filter);
    return acc;
  }, {});


  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

   const handleDeleteClick = (id) => {
      setFilterListToDelete(id);
      setShowDeleteModal(true);
    };
  
    const handleDelete = async () => {
      await dispatch(deleteFilterList(filterListToDelete));
      setShowDeleteModal(false);
      setFilterListToDelete(null);
    };

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
            <h5>Filter List</h5>
          </div>

          <div className="container-fluid manage">
            {/* Search and Filters */}
            <div className="card mb-3">
              <div className="card-block manage-btn">
                <div className="row g-3 align-items-center">
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search By"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  {/* <div className="col-md-3">
                    <select
                      className="form-control"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="">- Select Status -</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div> */}
                  <div className="col-md-2 d-flex gap-2">
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        setSearchTerm('');
                       
                      }}
                    >
                      <BsArrowClockwise />
                    </button>
                  </div>
                  <div className="col-md-4 text-end">
                    <button className="btn btn-primary" onClick={()=> setShowAddModal(true)}>+ Create Filter List</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter List Items */}
            <div className="card">
              <div className="card-block">
                <div className="row mb-3">
          
                
                </div>

                <div >

                  {Object.entries(groupedFilters).map(([groupTitle, filters], index) => (
                    <div key={index} className="mb-4">
                      <div className="row mb-3">
                        <div>
                          <h3>{groupTitle}</h3>
                          <h6 className="text-info">{getFilterTypeName(filters[0]?.filterSet?.filterTypeId)}</h6>
                        </div>
                      </div>

                      <div className="feature-row d-flex flex-wrap gap-3">
                        {filters.map((filter) => (
                          <div
                            key={filter.id}
                            className="feature-item d-flex justify-content-between align-items-center"
                            style={{
                              backgroundColor: '#2ccfc4',
                              color: '#fff',
                              padding: '10px 15px',
                              borderRadius: '4px',
                              flex: '0 0 30%',
                            }}
                          >
                            <div>
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(filter.id)}
                                onChange={() => handleCheckboxChange(filter.id)}
                                className="me-2"
                              />
                              {filter.label}
                            </div>
                            <div className="d-flex gap-2">
                              <button className="btn btn-sm " title="View" onClick={() => {
                              setViewFilterList(filter);
                              setViewModalVisible(true)
                            }}>
                                <BsEye />
                              </button>
                              <button className="btn btn-sm btn-outline-primary" title="Edit" onClick={() => {
                                setSelectedFilterList(filter);
                                setShowEditModal(true);
                              }}>
                                <BsPencilSquare />
                              </button>
                              <button className="btn btn-sm btn-outline-danger" title="Delete" onClick={() => handleDeleteClick(filter.id)}  >
                                <BsTrash />
                              </button>

                            </div>
                            <span className="badge bg-white text-dark">{filter.priority}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        className="btn mt-3 set-priority-btn"
                        style={{
                          backgroundColor: '#0da79e',
                          color: '#fff',
                          border: 'none',
                          padding: '10px 20px',
                          fontSize: '16px',
                        }}
                      >
                        Set Priority
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
             <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            {showAddModal && <AddFilterListModal show={showAddModal} onClose={() => setShowAddModal(false)} />}
            {showEditModal && <EditFilterListModal show={showEditModal} onClose={()=> setShowEditModal(false)} filterList={selectedFilterList}/>}
            {showDeleteModal && <DeleteModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleDelete} message="Are you sure you want to delete this category?" />}
            {viewModalVisible && <ViewFilterListModal show={viewModalVisible} onClose={()=> setViewModalVisible(false)} filterList={viewFilterList}   />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageFilterList;
