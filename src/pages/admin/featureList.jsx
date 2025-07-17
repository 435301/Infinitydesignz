import React, { useEffect, useState } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { BsSearch, BsArrowClockwise, BsEye, BsPencilSquare, BsTrash } from 'react-icons/bs';
import AddFeatureListModal from '../../components/addFeatureListModal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFeatureList, fetchFeatureLists, updateFeatureListPriority } from '../../redux/actions/featureListAction';
import { fetchFeatureTypes } from '../../redux/actions/featureTypeAction';
import PaginationComponent from '../../includes/pagination';
import EditFeatureListModal from '../../components/editFeatureListModal';
import DeleteModal from '../../modals/deleteModal';
import ViewFeatureListModal from '../../modals/viewFeatureListModal';

const ManageFeatureList = () => {
  const dispatch = useDispatch();
  const { featureLists = [] } = useSelector((state) => state.featureLists || {});
  console.log('featureLists', featureLists)
  const { featureTypes = [] } = useSelector((state) => state.featureTypes || {});
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFeatureList, setSelectedFeatureList] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [featureListToDelete, setFeatureListToDelete] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [viewFeatureList, setviewFeatureList] = useState(null);
  const [editedPriorities, setEditedPriorities] = useState({});


  useEffect(() => {
    dispatch(fetchFeatureLists());
    dispatch(fetchFeatureTypes())
  }, [dispatch]);

  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleRowCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const getFeatureTypeName = (id) => {
    const type = featureTypes.find((t) => t.id === id);
    return type?.name || 'Unknown';
  };


  const filteredFeatureList = (featureLists || []).filter((featureList) => {
    if (!featureList) return false;

    const label = featureList.label?.toLowerCase() || '';
    const featureSetTitle = featureList.featureSet?.title?.toLowerCase() || '';
    const featureTypeName = getFeatureTypeName(featureList.featureSet?.featureTypeId).toLowerCase();

    const term = searchTerm.toLowerCase();

    return (
      label.includes(term) ||
      featureSetTitle.includes(term) ||
      featureTypeName.includes(term)
    );
  }).map((featureList) => {
    const featureSetTitle = featureList?.featureSet?.title || 'N/A';
    const featureTypeName = getFeatureTypeName(featureList?.featureSet?.featureTypeId);

    return {
      ...featureList,
      featureSetTitle,
      featureTypeName,
    };
  });



  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredFeatureList.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredFeatureList.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const groupedFeatures = currentRows.reduce((acc, feature) => {
    const groupTitle = feature.featureSet?.title || 'Unknown';
    if (!acc[groupTitle]) {
      acc[groupTitle] = [];
    }
    acc[groupTitle].push(feature);
    return acc;
  }, {});

  const handleDeleteClick = (id) => {
    setFeatureListToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteFeatureList(featureListToDelete));
    setShowDeleteModal(false);
    setFeatureListToDelete(null);
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
            <h5>Feature List</h5>
          </div>

          <div className="container-fluid manage">
            {/* Top Filters */}
            <div className="card mb-3">
              <div className="card-block manage-btn p-3">
                <div className="row g-3 align-items-center">
                  <div className="col-md-3">
                    <input type="text" className="form-control" placeholder="Search By Title" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  </div>

                  <div className="col-md-2 d-flex gap-2">

                    <button className="btn btn-success" onClick={() => setSearchTerm('')}>
                      <BsArrowClockwise />
                    </button>
                  </div>
                  <div className="col-md-7 text-end">
                    <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>+ Create Feature Set</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Group Sections */}
            <div className="card">
              <div className="card-block p-3">
              

                {Object.entries(groupedFeatures).map(([groupTitle, features], index) => (
                  <div key={index} className="mb-4">
                    <div className="row mb-3">
                      <div>
                        <h3>{groupTitle}</h3>
                        <h6 className="text-info">{getFeatureTypeName(features[0]?.featureSet?.featureTypeId)}</h6>
                      </div>
                    </div>

                    <div className="feature-row d-flex flex-wrap gap-3">
                      {features.map((feature) => (
                        <div
                          key={feature.id}
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
                              checked={selectedRows.includes(feature.id)}
                              onChange={() => handleRowCheckboxChange(feature.id)}
                              className="me-2"
                            />
                            {feature.label}
                          </div>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm " title="View" onClick={() => {
                              setviewFeatureList(feature);
                              setViewModalVisible(true)
                            }}>
                              <BsEye />
                            </button>
                            <button className="btn btn-sm btn-outline-primary" title="Edit" onClick={() => {
                              setSelectedFeatureList(feature);
                              setShowEditModal(true);
                            }}>
                              <BsPencilSquare />
                            </button>
                            <button className="btn btn-sm btn-outline-danger" title="Delete" onClick={() => handleDeleteClick(feature.id)}  >
                              <BsTrash />
                            </button>

                          </div>
                          {selectedRows.includes(feature.id) ? (
                            <input
                              type="number"
                              value={editedPriorities[feature.id] ?? feature.priority}
                              onChange={(e) =>
                                setEditedPriorities((prev) => ({
                                  ...prev,
                                  [feature.id]: e.target.value
                                }))
                              }
                              className="form-control"
                              style={{ width: '50px' }}
                            />
                          ) : (
                            <span className="badge ms-2">{feature.priority}</span>
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
                            await dispatch(updateFeatureListPriority({
                              id,
                              priority: parseInt(editedPriorities[id])
                            }));
                          }
                        }
                        dispatch(fetchFeatureLists());
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
            {showAddModal && <AddFeatureListModal show={showAddModal} onClose={() => setShowAddModal(false)} />}
            <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            {showEditModal && (
              <EditFeatureListModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                featureList={selectedFeatureList}
              />
            )}
            {showDeleteModal && <DeleteModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleDelete} message="Are you sure you want to delete this category?" />}
            {viewModalVisible && <ViewFeatureListModal show={viewModalVisible} onClose={() => setViewModalVisible(false)} featureList={viewFeatureList} />}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageFeatureList;
