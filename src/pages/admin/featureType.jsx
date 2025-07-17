import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { BsSearch, BsArrowClockwise, BsPencilSquare, BsTrash, BsEye } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { bulkUpdateFeatureTypeStatus, deleteFeatureType, fetchFeatureTypes } from '../../redux/actions/featureTypeAction';
import PaginationComponent from '../../includes/pagination';
import AddFeatureTypeModal from '../../components/addFeatureTypeModal';
import EditFeatureTypeModal from '../../components/editFeatureTypeModal';
import DeleteModal from '../../modals/deleteModal';
import ViewFeatureTypeModal from '../../modals/viewFeatureTypeModal';
import { toast } from 'react-toastify';

const ManageFeatureType = () => {
  const dispatch = useDispatch();
  const { featureTypes = [] } = useSelector((state) => state.featureTypes || {});
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState('');
  const [selectedFeatureType, setSelectedFeatureType] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [featureTypeToDelete, setFeatureTypeToDelete] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [viewFeatureType, setViewFeatureType] = useState(null)

  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };


  useEffect(() => {
    dispatch(fetchFeatureTypes()
    )
  }, [dispatch]);

  const filteredFeatureTypes = featureTypes.filter((featureType) => {

    const name = featureType.name.toLowerCase();
    const matchesSearch = name.includes(searchTerm.toLowerCase());


    return matchesSearch
  });

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredFeatureTypes.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredFeatureTypes.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(featureTypes.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleBulkStatusUpdate = async (newStatus) => {
  if (selectedRows.length === 0) {
    toast.warning("Please select at least one feature type.");
    return;
  }

  await dispatch(bulkUpdateFeatureTypeStatus(selectedRows, newStatus));
  setSelectedRows([]);
};


  const handleRowCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleDeleteClick = (id) => {
    setFeatureTypeToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteFeatureType(featureTypeToDelete));
    setShowDeleteModal(false);
    setFeatureTypeToDelete(null);
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
            <h5>Feature Type</h5>
          </div>

          <div className="container-fluid manage">
            {/* Search and Filters */}
            <div className="card mb-3">
              <div className="card-block manage-btn">
                <div className="row g-3 align-items-center">
                  <div className="col-md-3">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search By Feature type"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-2 d-flex gap-2">

                    <button className="btn btn-success" onClick={() => {
                      setSearchTerm('')
                    }}>
                      <BsArrowClockwise style={{ fontSize: '18px' }} />
                    </button>
                  </div>
                  <div className="col-md-7 text-end">
                    <button className="btn btn-primary" type="button" style={{}} onClick={() => setShowAddModal(true)}>
                      + Create Feature
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="card">
              <div className="card-block">
                <div className="row mb-3">
                  <div className="col-md-12 text-end pt">
                     <button className="btn btn-success me-1" disabled={selectedRows.length === 0}
                      onClick={() => handleBulkStatusUpdate(true)}>Active</button>
                    <button className="btn btn-danger" disabled={selectedRows.length === 0}
                      onClick={() => handleBulkStatusUpdate(false)}>In Active</button>

                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-striped table-hover table-lg align-middle mb-0">
                    <thead>
                      <tr>
                        <th>
                          <input
                            type="checkbox"
                            id="select-all"
                            checked={selectedRows.length === featureTypes.length && featureTypes.length > 0}
                            onChange={handleSelectAll}
                          />
                        </th>
                        <th>S.No</th>
                        <th>Type</th>
                        {/* <th>Status</th> */}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRows.map((featureType, index) => (
                        <tr key={featureType.id}>
                          <td>
                            <input
                              type="checkbox"
                              className="row-checkbox"
                              checked={selectedRows.includes(featureType.id)}
                              onChange={() => handleRowCheckboxChange(featureType.id)}
                            />
                          </td>
                          <td>{index + 1}</td>
                          <td>{featureType.name}</td>
                          {/* <td>
                            <span
                              className={`badge ${item.status === 'Active' ? 'text-light-primary' : 'text-light-danger'}`}
                            >
                              {item.status}
                            </span>
                          </td> */}
                          <td>
                            <button
                              type="button"
                              className="btn btn-light icon-btn"
                              style={{ marginRight: '5px' }}
                              title="Edit"
                              onClick={() => {
                                setSelectedFeatureType(featureType);
                                setEditModalVisible(true);
                              }}
                            >
                              <BsPencilSquare style={{ fontSize: '18px', color: '#28a745' }} />
                            </button>
                            <button
                              className="btn btn-light icon-btn"
                              onClick={() => {
                                setViewFeatureType(featureType);
                                setViewModal(true);
                              }}
                            >
                              <BsEye style={{ fontSize: '18px', color: '#212529' }} />
                            </button>
                            <button
                              type="button"
                              className="btn btn-light icon-btn delete-btn"
                              title="Delete"
                              onClick={() => handleDeleteClick(featureType.id)}
                            >
                              <BsTrash style={{ fontSize: '18px', color: '#dc3545' }} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {currentRows.length === 0 && (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No feature types found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
            <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            {showAddModal && <AddFeatureTypeModal show={showAddModal} onClose={() => setShowAddModal(false)} />}
            {editModalVisible && <EditFeatureTypeModal show={editModalVisible} onClose={() => setEditModalVisible(false)} featureType={selectedFeatureType} />}
            {showDeleteModal && <DeleteModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleDelete} message="Are you sure you want to delete this category?" />}
            {viewModal && <ViewFeatureTypeModal show={viewModal} onClose={() => setViewModal(false)} featureType={viewFeatureType} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageFeatureType;
