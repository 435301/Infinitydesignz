import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { BsArrowClockwise, BsEye, BsPencilSquare } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { bulkUpdateBrandStatus, deleteBrand, fetchBrands } from '../../redux/actions/brandAction';
import PaginationComponent from '../../includes/pagination';
import { toast } from 'react-toastify';
import BASE_URL from '../../config/config';
import AddBrandModal from '../../components/addBrandModal';
import { TiTrash } from 'react-icons/ti';
import DeleteModal from '../../modals/deleteModal';
import ViewBrandModal from '../../modals/viewBrandModal';
import EditBrandModal from '../../components/editBrandModal';


const ManageBrands = () => {
  const dispatch = useDispatch();
  const { brands = [] } = useSelector((state) => state.brands || {});
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewBrand, setViewBrand] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  // Filtering brands
  const filteredBrands = brands.filter((brand) => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter
      ? (statusFilter === 'active' ? brand.status === true : brand.status === false)
      : true;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const rowsPerPage = 10;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredBrands.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredBrands.length / rowsPerPage);

  // Sidebar toggle
  const handleToggleSidebar = (collapsed) => setIsSidebarCollapsed(collapsed);

  // Page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  

  // Row selection
  const handleRowCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Select all rows
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentRows.map((brand) => brand.id));
    }
    setSelectAll(!selectAll);
  };

  // Delete brand
  const handleDeleteClick = (id) => {
    setBrandToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteBrand(brandToDelete));
    setBrandToDelete(null);
    setShowDeleteModal(false);
  }

  // Table actions
  const handleEditClick = (brand) => {
    setSelectedBrand(brand);
    setEditModalVisible(true);
  };

  const handleViewClick = (brand) => {
    setViewBrand(brand);
    setShowViewModal(true);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
  };

   const handleBulkStatusUpdate = async (newStatus) => {
    if (selectedRows.length === 0) {
      toast.warning("Please select at least one brand.");
      return;
    }
  
    await dispatch(bulkUpdateBrandStatus(selectedRows, newStatus));
    setSelectedRows([]);
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
            <h4>Brands</h4>
          </div>
          <div className="container-fluid manage">
            <div className="card mb-2">
              <div className="card-block manage-btn">
                <div className="row  align-items-center">
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search By Brand"
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
                    <button className="btn btn-success" onClick={handleResetFilters}>
                      <BsArrowClockwise style={{ fontSize: '18px' }} />
                    </button>
                  </div>
                  <div className="col-md-4 text-end">
                    <button className="btn btn-primary" type="button" onClick={() => setShowAddBrandModal(true)}>
                      + Add New
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Brands Table Section */}
            <div className="card">
              <div className="card-block">
                <div className="row mb-3">
                  <div className="col-lg-6">
                    <h5>Brands</h5>
                  </div>
                  <div className="col-md-6 text-end">
                    <button
                      className="btn btn-success me-1"
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
                      In Active
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
                        <th>Brands</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRows.map((brand, index) => (
                        <tr key={brand.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(brand.id)}
                              onChange={() => handleRowCheckboxChange(brand.id)}
                            />
                          </td>
                          <td>{indexOfFirstRow + index + 1}</td>
                          <td>{brand.name}</td>
                          <td>
                            <span
                              className={`badge ${brand.status ? 'text-light-primary' : 'text-light-danger'}`}
                            >
                              {brand.status ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-light icon-btn m-2"
                              onClick={() => handleEditClick(brand)}
                            >
                              <BsPencilSquare style={{ fontSize: '18px', color: '#dc3545' }} />
                            </button>
                            <button
                              className="btn btn-light icon-btn"
                              onClick={() => handleViewClick(brand)}
                            >
                              <BsEye style={{ fontSize: '18px', color: '#212529' }} />
                            </button>
                            <button
                              type="button"
                              className="btn btn-light-danger icon-btn b-r-4 delete-btn"
                              title="Delete"
                              onClick={() => handleDeleteClick(brand.id)}
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
            {showAddBrandModal && (
              <AddBrandModal show={showAddBrandModal} onClose={() => setShowAddBrandModal(false)} />
            )}
            {showDeleteModal && (
              <DeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this brand?"
              />
            )}
            {showViewModal && (
              <ViewBrandModal
                show={showViewModal}
                onClose={() => setShowViewModal(false)}
                brand={viewBrand}
              />
            )}
            {editModalVisible && (
              <EditBrandModal
                show={editModalVisible}
                onClose={() => setEditModalVisible(false)}
                brand={selectedBrand}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBrands;
