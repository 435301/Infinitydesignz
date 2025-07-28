import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { BsSearch, BsArrowClockwise, BsPencilSquare, BsTrash, BsEye } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFilterList, fetchFilterLists, updateFilterListPriority } from '../../redux/actions/filterListActions';
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFilterList, setSelectedFilterList] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filterListToDelete, setFilterListToDelete] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [viewFilterList, setViewFilterList] = useState(null);
  const [editedPriorities, setEditedPriorities] = useState({});

  const dispatch = useDispatch();
  const { filterLists = [] } = useSelector((state) => state.filterLists || {});
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

  const filteredFilterList = (filterLists || []).filter((filterList) => {
    if (!filterList) return false;
    const label = filterList.label?.toLowerCase() || '';
    const filterSetTitle = filterList.filterSet?.title?.toLowerCase() || '';
    const filterTypeName = getFilterTypeName(filterList.filterSet?.filterTypeId).toLowerCase();
    const term = searchTerm.toLowerCase();
    return label.includes(term) || filterSetTitle.includes(term) || filterTypeName.includes(term);
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
    const filterTypeId = filter.filterSet?.filterTypeId;
    const filterTypeName = getFilterTypeName(filterTypeId);
    const filterSetTitle = filter.filterSet?.title || 'Unknown';
    if (!acc[filterTypeName]) acc[filterTypeName] = {};
    if (!acc[filterTypeName][filterSetTitle]) acc[filterTypeName][filterSetTitle] = [];
    acc[filterTypeName][filterSetTitle].push(filter);
    return acc;
  }, {});

  const handleRowCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
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
          className="content-wrapper"
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
            <div className="card mb-2">
              <div className="card-block manage-btn p-3">
                <div className="row g-3 align-items-center">
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search By Filter Type, Set, List"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2 d-flex gap-2">
                    <button className="btn btn-success" onClick={() => setSearchTerm('')}>
                      <BsArrowClockwise />
                    </button>
                  </div>
                  <div className="col-md-7 text-end">
                    <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                      + Create Filter List
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-block p-3">
                {Object.entries(groupedFilters).map(([filterTypeName, filterSets]) => (
                  <div key={filterTypeName} className="mb-5 feature-set-headers">
                    <div className="feature-set-header p-2" style={{ backgroundColor: 'rgb(217, 237, 247)' }}>
                      <h3>
                        {filterTypeName} <span className="badge">{Object.keys(filterSets).length}</span>
                      </h3>
                    </div>
                    {Object.entries(filterSets).map(([filterSetTitle, filters]) => (
                      <div key={filterSetTitle} className="mb-4">
                        <h5 className="mt-4">
                          {filterSetTitle} <span className="badge">{filters.length}</span>
                        </h5>
                        <div className="feature-row d-flex flex-wrap gap-3 mt-4">
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
                                  checked={selectedRows.includes(filter.id)}
                                  onChange={() => handleRowCheckboxChange(filter.id)}
                                  className="me-2"
                                />
                                {filter.label}
                              </div>
                              <div className="d-flex gap-2">
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  title="View"
                                  onClick={() => {
                                    setViewFilterList(filter);
                                    setViewModalVisible(true);
                                  }}
                                >
                                  <BsEye />
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  title="Edit"
                                  onClick={() => {
                                    setSelectedFilterList(filter);
                                    setShowEditModal(true);
                                  }}
                                >
                                  <BsPencilSquare />
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  title="Delete"
                                  onClick={() => handleDeleteClick(filter.id)}
                                >
                                  <BsTrash />
                                </button>
                              </div>
                              {selectedRows.includes(filter.id) ? (
                                <input
                                  type="number"
                                  value={editedPriorities[filter.id] ?? filter.priority}
                                  onChange={(e) =>
                                    setEditedPriorities((prev) => ({
                                      ...prev,
                                      [filter.id]: e.target.value,
                                    }))
                                  }
                                  className="form-control"
                                  style={{ width: '50px' }}
                                />
                              ) : (
                                <span className="badge ms-2">{filter.priority}</span>
                              )}
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
                          onClick={async () => {
                            for (let id of selectedRows) {
                              if (editedPriorities[id] !== undefined) {
                                await dispatch(
                                  updateFilterListPriority({
                                    id,
                                    priority: parseInt(editedPriorities[id]),
                                  })
                                );
                              }
                            }
                            dispatch(fetchFilterLists());
                            setEditedPriorities({});
                            setSelectedRows([]);
                          }}
                        >
                          Change Priority
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            {showAddModal && (
              <AddFilterListModal show={showAddModal} onClose={() => setShowAddModal(false)} />
            )}
            {showEditModal && (
              <EditFilterListModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                filterList={selectedFilterList}
              />
            )}
            {showDeleteModal && (
              <DeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this filter?"
              />
            )}
            {viewModalVisible && (
              <ViewFilterListModal
                show={viewModalVisible}
                onClose={() => setViewModalVisible(false)}
                filterList={viewFilterList}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageFilterList;