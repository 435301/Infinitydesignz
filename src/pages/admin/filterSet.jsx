import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { BsSearch, BsArrowClockwise, BsPencilSquare, BsTrash, BsEye } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFilterSet, fetchFilterSets, updateFilterSetPriority } from '../../redux/actions/filterSetAction';
import PaginationComponent from '../../includes/pagination';
import AddFilterSetModal from '../../components/addFilterSetModal';
import EditFilterSetModal from '../../components/editFilterSetModal';
import DeleteModal from '../../modals/deleteModal';
import ViewFilterSetModal from '../../modals/viewFilterSetModal';

const ManageFilterSet = () => {
  const dispatch = useDispatch();
  const { filterSets = [] } = useSelector((state) => state.filterSets);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedFilterSet, setSelectedFilterSet] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filterSetToDelete, setFilterSetToDelete] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [viewFilterSet, setViewFilterSet] = useState(null);
  const [editedPriorities, setEditedPriorities] = useState({});

  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const filteredFilterSets = (filterSets || []).filter((filterSet) => {
    if (!filterSet && !filterSet?.title) return false;
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

  const handleDeleteClick = (id) => {
    setFilterSetToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteFilterSet(filterSetToDelete));
    setShowDeleteModal(false);
    setFilterSetToDelete(null);
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
            <h5>Filter Set</h5>
          </div>

          <div className="container-fluid manage">
            {/* Search and Filters */}
            <div className="card mb-2">
              <div className="card-block manage-btn">
                <div className="row g-3 align-items-center">
                  <div className="col-md-3">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search By Filter Type, Set"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
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
                    <button className="btn btn-success" onClick={() => setSearchTerm('')}>
                      <BsArrowClockwise />
                    </button>
                  </div>
                  <div className="col-md-7 text-end">
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Create Filter Set</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Header & Actions */}
            <div className="card">
              <div className="card-block">
                <div className="row mb-2"></div>
                <div>
                  {Object.entries(groupedFilterSets).map(([filterTypeName, items]) => (
                    <div key={filterTypeName} className="mb-4">
                      <div className="col-lg-6 d-flex align-items-center">
                       
                        <div class="feature-set-header">
                          <h3 className="mb-2">
                            {filterTypeName} <span className="badge ">{items.length}</span>
                          </h3>
                        </div>
                      </div>
                      <div className="feature-row">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="feature-item me-3 d-flex justify-content-between align-items-center mb-2 p-2 border rounded"
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
                              <button
                                className="btn btn-sm btn-outline-primary"
                                title="View"
                                onClick={() => {
                                  setViewFilterSet(item);
                                  setViewModalVisible(true);
                                }}
                              >
                                <BsEye />
                              </button>
                              <button
                                className="btn btn-sm btn-outline-primary"
                                title="Edit"
                                onClick={() => {
                                  setSelectedFilterSet(item);
                                  setEditModalVisible(true);
                                }}
                              >
                                <BsPencilSquare />
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                title="Delete"
                                onClick={() => handleDeleteClick(item.id)}
                              >
                                <BsTrash />
                              </button>
                            </div>
                            {selectedRows.includes(item.id) ? (
                              <input
                                type="number"
                                value={editedPriorities[item.id] ?? item.priority}
                                onChange={(e) =>
                                  setEditedPriorities((prev) => ({
                                    ...prev,
                                    [item.id]: e.target.value,
                                  }))
                                }
                                className="form-control"
                                style={{ width: '50px' }}
                              />
                            ) : (
                              <span className="badge ms-2">{item.priority}</span>
                            )}
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
                        onClick={async () => {
                          for (let id of selectedRows) {
                            if (editedPriorities[id] !== undefined) {
                              await dispatch(
                                updateFilterSetPriority({
                                  id,
                                  priority: parseInt(editedPriorities[id]),
                                })
                              );
                            }
                          }
                          dispatch(fetchFilterSets());
                          setEditedPriorities({});
                          setSelectedRows([]);
                        }}
                      >
                        Change Priority
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            {showModal && (
              <AddFilterSetModal
                show={showModal}
                onClose={() => setShowModal(false)}
              />
            )}
            {editModalVisible && (
              <EditFilterSetModal
                show={editModalVisible}
                onClose={() => setEditModalVisible(false)}
                filterSet={selectedFilterSet}
              />
            )}
            {showDeleteModal && (
              <DeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this filter set?"
              />
            )}
            {viewModalVisible && (
              <ViewFilterSetModal
                show={viewModalVisible}
                onClose={() => setViewModalVisible(false)}
                filterSet={viewFilterSet}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageFilterSet;