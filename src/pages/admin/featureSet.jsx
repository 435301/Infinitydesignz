import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { BsSearch, BsArrowClockwise, BsEye, BsPencilSquare, BsTrash } from 'react-icons/bs';
import AddFeatureSetModal from '../../components/addFeatureSetModal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFeatureSet, fetchFeatureSets, updateFeatureSetPriority } from '../../redux/actions/featureSetAction';
import PaginationComponent from '../../includes/pagination';
import EditFeatureSetModal from '../../components/editFeatureSetModal';
import DeleteModal from '../../modals/deleteModal';
import ViewFeatureSetModal from '../../modals/viewFeatureSetModal';

const ManageFeatureSet = () => {
  const dispatch = useDispatch();
  const { featureSets = [], loading, error } = useSelector((state) => state.featureSets);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFeatureSet, setSelectedFeatureSet] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [featureSetToDelete, setFeatureSetToDelete] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [viewFeatureSet, setViewFeatureSet] = useState(null);
  const [editedPriorities, setEditedPriorities] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;

  useEffect(() => {
    dispatch(fetchFeatureSets('all'));
  }, [dispatch]);

  const handleToggleSidebar = (collapsed) => setIsSidebarCollapsed(collapsed); // Fixed: Added parameter

  const filteredFeatureSets = featureSets.filter(
    (featureSet) =>
      featureSet?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFeatureSets.length / rowsPerPage);
  const currentRows = filteredFeatureSets.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  const handleRowCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const groupedFeatureSets = currentRows.reduce((acc, item) => {
    const groupName = item.featureType?.name || 'Unknown';
    acc[groupName] = acc[groupName] || [];
    acc[groupName].push(item);
    return acc;
  }, {});

  const handleDeleteClick = (id) => {
    setFeatureSetToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteFeatureSet(featureSetToDelete));
    setShowDeleteModal(false);
    setFeatureSetToDelete(null);
  };

  const handlePriorityChange = async () => {
    await Promise.all(
      selectedRows.map((id) =>
        editedPriorities[id] !== undefined
          ? dispatch(
            updateFeatureSetPriority({
              id,
              priority: parseInt(editedPriorities[id], 10),
            })
          )
          : null
      )
    );
    dispatch(fetchFeatureSets('all'));
    setEditedPriorities({});
    setSelectedRows([]);
  };

  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin onToggleSidebar={handleToggleSidebar} />
        <aside className="main-sidebar hidden-print">
          <Sidebar isCollapsed={isSidebarCollapsed} onClose={() => setIsSidebarCollapsed(true)} />
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
            <h5>Feature Set</h5>
          </div>
          <div className="container-fluid manage">
            {/* Search and Filters */}
            <div className="card mb-2">
              <div className="card-block manage-btn">
                <div className="row g-3 align-items-center">
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search By Feature Type and Set"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2 d-flex gap-2">
                    <button
                      className="btn btn-success"
                      onClick={() => setSearchTerm('')}
                    >
                      <BsArrowClockwise style={{ fontSize: '18px' }} />
                    </button>
                  </div>
                  <div className="col-md-7 text-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowModal(true)}
                      type="button"
                    >
                      + Add Feature Set
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Feature Set List */}
            <div className="card">
              <div className="card-block">
                <div className="row mb-2">
                  {loading ? (
                    <div className="text-center my-3">
                      <p>Loading...</p>
                    </div>
                  ) : error ? (
                    <div className="text-center my-3">
                      <p className="text-danger">{error}</p>
                    </div>
                  ) : featureSets.length === 0 ? (
                    <div className="text-center my-3">
                      <p>No feature sets available</p>
                    </div>
                  ) : (
                    Object.entries(groupedFeatureSets).map(
                      ([featureTypeName, items]) => (
                        <div key={featureTypeName} className="mb-4">
                          <div className="col-lg-6 d-flex align-items-center">
                            <div className="feature-set-header">

                              <h3 className="mb-2">
                                {featureTypeName} <span className="badge">{items.length}</span>
                              </h3>
                            </div>
                          </div>
                          <div className="feature-row">
                            {items.map((item) => (
                              <div
                                key={item.id}
                                className="feature-item d-flex justify-content-between align-items-center me-1 mb-2 p-2 border rounded"
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
                                      setViewFeatureSet(item);
                                      setViewModalVisible(true);
                                    }}
                                  >
                                    <BsEye />
                                  </button>
                                  <button
                                    className="btn btn-sm btn-outline-primary"
                                    title="Edit"
                                    onClick={() => {
                                      setSelectedFeatureSet(item);
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
                            className="btn new-btn"

                            onClick={handlePriorityChange}
                            disabled={selectedRows.length === 0}
                          >
                            Change Priority
                          </button>
                        </div>
                      )
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
              <AddFeatureSetModal
                show={showModal}
                onClose={() => setShowModal(false)}
              />
            )}
            {editModalVisible && (
              <EditFeatureSetModal
                show={editModalVisible}
                onClose={() => setEditModalVisible(false)}
                featureSet={selectedFeatureSet}
              />
            )}
            {showDeleteModal && (
              <DeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this feature set?"
              />
            )}
            {viewModalVisible && (
              <ViewFeatureSetModal
                show={viewModalVisible}
                onClose={() => setViewModalVisible(false)}
                featureSet={viewFeatureSet}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageFeatureSet;