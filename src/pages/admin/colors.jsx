import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { BsSearch, BsArrowClockwise, BsPencilSquare, BsTrash, BsEye } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { deleteColor, fetchColors } from '../../redux/actions/colorAction';
import PaginationComponent from '../../includes/pagination';
import AddColorModal from '../../components/addColorModal';
import { toast } from 'react-toastify';
import BASE_URL from '../../config/config';
import { TiTrash } from 'react-icons/ti';
import DeleteModal from '../../modals/deleteModal';
import ViewColorModal from '../../modals/viewColorModal';
import EditColorModal from '../../components/editColorModal';

const ManageColors = () => {
  const dispatch = useDispatch();
  const { colors = [] } = useSelector((state) => state.colors || {});
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [colorToDelete, setColorToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  const [viewColor, setViewColor] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    dispatch(fetchColors());
  }, [dispatch]);

  const filteredColors = colors.filter((color) => {
    const label = color.label?.toLowerCase() || '';
    const matchesSearch = label.includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter
      ? (statusFilter === 'active' ? color.status === true : color.status === false)
      : true;
    return matchesSearch && matchesStatus;
  });

  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredColors.length / rowsPerPage);
  const currentRows = filteredColors.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleToggleSidebar = (collapsed) => setIsSidebarCollapsed(collapsed);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  const handleSelectAll = (e) => {
    setSelectedRows(e.target.checked ? colors.map((item) => item.id) : []);
  };

  const handleRowCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleDeleteClick = (id) => {
    setColorToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
     await dispatch(deleteColor(colorToDelete));
      setShowDeleteModal(false);
      setColorToDelete(null);
    
  };

  const handleBulkStatusUpdate = async (newStatus) => {
    if (selectedRows.length === 0) {
      toast.warning("Please select at least one color.");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${BASE_URL}/common/bulk-update-status`, {
        entity: "colors",
        ids: selectedRows,
        status: newStatus,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`Status updated to ${newStatus ? 'Active' : 'Inactive'}`);
      dispatch(fetchColors());
      setSelectedRows([]);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Bulk status update failed');
    }
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
            <h4>Colors</h4>
          </div>
          <div className="container-fluid manage">
            <div className="card mb-3">
              <div className="card-block manage-btn">
                <div className="row g-3 align-items-center">
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search By Color"
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
                    <button className="btn btn-primary" type="button" onClick={() => setShowModal(true)}>
                      + Add New
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-block">
                <div className="row mb-3">
                  <div className="col-md-12 text-end pt">
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
                            id="select-all"
                            checked={selectedRows.length === colors.length && colors.length > 0}
                            onChange={handleSelectAll}
                          />
                        </th>
                        <th>S.No</th>
                        <th>Color</th>
                        <th>Hex</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRows.map((color, index) => (
                        <tr key={color.id}>
                          <td>
                            <input
                              type="checkbox"
                              className="row-checkbox"
                              checked={selectedRows.includes(color.id)}
                              onChange={() => handleRowCheckboxChange(color.id)}
                            />
                          </td>
                          <td>{index + 1 + (currentPage - 1) * rowsPerPage}</td>
                          <td>{color.label}</td>
                          <td>
                            <div style={{
                              backgroundColor: color.hex_code,
                              width: '25px',
                              height: '25px',
                              borderRadius: '4px',
                              border: '1px solid #ccc'
                            }} ></div>
                          </td>
                          <td>
                            <span
                              className={`badge ${color.status ? 'text-light-primary' : 'text-light-danger'}`}
                            >
                              {color.status ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-light icon-btn"
                              style={{ marginRight: '5px' }}
                              title="Edit"
                              onClick={() => {
                                setSelectedColor(color);
                                setEditModalVisible(true);
                              }}
                            >
                              <BsPencilSquare style={{ fontSize: '18px', color: '#28a745' }} />
                            </button>
                            <button
                              className="btn btn-light icon-btn"
                              onClick={() => {
                                setViewColor(color);
                                setShowColorModal(true);
                              }}
                            >
                              <BsEye style={{ fontSize: '18px', color: '#212529' }} />
                            </button>
                            <button
                              className="btn btn-light icon-btn m-2"
                              onClick={() => handleDeleteClick(color.id)}
                            >
                              <TiTrash style={{ fontSize: '18px', color: '#212529' }} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredColors.length === 0 && (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No colors found.
                          </td>
                        </tr>
                      )}
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
              <AddColorModal
                show={showModal}
                onClose={() => setShowModal(false)}
              />
            )}
            {showDeleteModal && (
              <DeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this color?"
              />
            )}
            {editModalVisible && (
              <EditColorModal
                show={editModalVisible}
                onClose={() => {
                  setEditModalVisible(false);
                  setSelectedColor(null);
                }}
                color={selectedColor}
              />
            )}
            {showColorModal && (
              <ViewColorModal
                show={showColorModal}
                onClose={() => setShowColorModal(false)}
                color={viewColor}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageColors;
