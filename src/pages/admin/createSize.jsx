import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { BsSearch, BsArrowClockwise, BsPencilSquare, BsTrash, BsEye } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { bulkUpdateSizeStatus, deleteSize, fetchSizes } from '../../redux/actions/sizeAction';
import PaginationComponent from '../../includes/pagination';
import { toast } from 'react-toastify';
import BASE_URL from '../../config/config';
import { TiTrash } from 'react-icons/ti';
import DeleteModal from '../../modals/deleteModal';
import AddSizeModal from '../../components/addSizeModal';
import ViewSizeModal from '../../modals/viewSizeModal';
import EditSizeModal from '../../components/editSizeModal';


const ManageSizes = () => {
  const dispatch = useDispatch();
  const { sizes = [] } = useSelector((state) => state.sizes || {});
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [sizeToDelete, setSizeToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewSize, setViewSize] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchSizes());
  }, [dispatch]);

  const filteredSizes = sizes.filter((size) => {
    const matchesSearch = size.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter
      ? (statusFilter === 'active' ? size.status === true : size.status === false)
      : true;
    return matchesSearch && matchesStatus;
  });

  const rowsPerPage = 10;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredSizes.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredSizes.length / rowsPerPage);

  const handleToggleSidebar = (collapsed) => setIsSidebarCollapsed(collapsed);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  const handleDeleteClick = (id) => {
    setSizeToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteSize(sizeToDelete));
    setShowDeleteModal(false);
    setSizeToDelete(null);

  };

 const handleBulkStatusUpdate = async (newStatus) => {
     if (selectedRows.length === 0) {
       toast.warning("Please select at least one size.");
       return;
     }
     await dispatch(bulkUpdateSizeStatus(selectedRows, newStatus));
     setSelectedRows([]);
   };

  const handleRowCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentRows.map((size) => size.id));
    }
    setSelectAll(!selectAll);
  };

  return (
    <>
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
              <h4>Sizes</h4>
            </div>
            <div className="container-fluid manage">
              <div className="card mb-2">
                <div className="card-block manage-btn">
                  <div className="row g-3 align-items-center">
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search By Size"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="col-md-3">
                      <select
                        className="form-control"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="">- Select Status -</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    <div className="col-md-2 d-flex gap-2">
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          setSearchTerm('');
                          setStatusFilter('');
                        }}
                      >
                        <BsArrowClockwise />
                      </button>
                    </div>
                    <div className="col-md-4 text-end">
                      <button className="btn btn-primary" style={{ padding: '8px 20px', fontWeight: 600 }} type="button" onClick={() => setShowModal(true)}>
                        + Add New
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-block">
                  <div className="row mb-2">
                    <div className="col-md-12 text-end pt pt">
                      <button
                        className="btn btn-success me-2"
                        disabled={selectedRows.length === 0}
                        onClick={() => handleBulkStatusUpdate(true)}
                      >
                        Active
                      </button>
                      <button
                        className="btn btn-danger"
                        disabled={selectedRows.length === 0}
                        onClick={() => handleBulkStatusUpdate(false)}
                      >
                        Inactive
                      </button>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-striped table-hover table-lg align-middle mb-0">
                      <thead>
                        <tr>
                          <th>
                            <input
                              type="checkbox"
                              checked={selectedRows.length === currentRows.length && currentRows.length > 0}
                              onChange={handleSelectAll}
                            />
                          </th>
                          <th>S.No</th>
                          <th>Size</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentRows.map((size, index) => (
                          <tr key={size.id}>
                            <td>
                              <input
                                type="checkbox"
                                checked={selectedRows.includes(size.id)}
                                onChange={() => handleRowCheckboxChange(size.id)}
                              />
                            </td>
                            <td>{index + 1 + indexOfFirstRow}</td>
                            <td>{size.title}</td>
                            <td>
                              <span
                                className={`badge ${size.status ? 'text-light-primary' : 'text-light-danger'}`}
                              >
                                {size.status ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td>
                              <button
                                className="btn btn-light icon-btn m-2"
                                onClick={() => {
                                  setSelectedSize(size);
                                  setEditModalVisible(true);
                                }}
                              >
                                <BsPencilSquare style={{ fontSize: '18px', color: '#dc3545' }} />
                              </button>
                              <button
                                className="btn btn-light icon-btn"
                                onClick={() => {
                                  setViewSize(size);
                                  setShowViewModal(true);
                                }}
                              >
                                <BsEye style={{ fontSize: '18px', color: '#212529' }} />
                              </button>
                              <button
                                className="btn btn-light icon-btn m-2"
                                onClick={() => handleDeleteClick(size.id)}
                              >
                                <TiTrash style={{ fontSize: '18px', color: '#212529' }} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
              {showModal && (
                <AddSizeModal show={showModal} onClose={() => setShowModal(false)} />
              )}
              {showDeleteModal && (
                <DeleteModal
                  show={showDeleteModal}
                  onClose={() => setShowDeleteModal(false)}
                  onConfirm={handleDelete}
                  message="Are you sure you want to delete this size?"
                />
              )}
              {showViewModal && (
                <ViewSizeModal
                  show={showViewModal}
                  onClose={() => setShowViewModal(false)}
                  size={viewSize}
                />
              )}
              {editModalVisible && (
                <EditSizeModal
                  show={editModalVisible}
                  onClose={() => {
                    setEditModalVisible(false);
                    setSelectedSize(null);
                  }}
                  size={selectedSize}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageSizes;
