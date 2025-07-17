// Imports
import React, { useState, useEffect } from 'react';
import { BsPencilSquare, BsEye, BsArrowClockwise } from 'react-icons/bs';
import { TiTrash } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, fetchCategories } from '../../redux/actions/categoryAction';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import AddCategoryModal from '../../includes/addCategory';
import '../../css/admin/style.css';
import ViewCategoryModal from '../../modals/viewCategoryModal';
import axios from 'axios';
import { toast } from 'react-toastify';
import DeleteModal from '../../modals/deleteModal';
import EditCategoryModal from '../../includes/EditCategory';
import PaginationComponent from '../../includes/pagination';
import BASE_URL from '../../config/config';

const ManageCategories = () => {
  const dispatch = useDispatch();
  const { categories = [] } = useSelector((state) => state.categories || {});

  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredCategories = categories.filter((cat) => {
    const isTopLevel = cat.parent_id === null;
    if (!isTopLevel) return false;

    const title = cat.title.toLowerCase();
    const matchesSearch = title.includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter
      ? (statusFilter === 'active' ? cat.status === true : cat.status === false)
      : true;

    return matchesSearch && matchesStatus;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredCategories.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredCategories.length / rowsPerPage);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      const ids = currentRows.map((cat) => cat.id);
      setSelectedIds(ids);
    }
    setSelectAll(!selectAll);
  };


  const handleRowCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleBulkStatusUpdate = async (newStatus) => {
    if (selectedRows.length === 0) {
      toast.warning("Please select at least one sub-subcategory.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${BASE_URL}/categories/bulk-update-status`, {
        ids: selectedRows,
        status: newStatus,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(`Status updated to ${newStatus ? 'Active' : 'Inactive'}`);
      dispatch(fetchCategories());
      setSelectedRows([]);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Bulk status update failed');
    }
  };

  const handleViewClick = (id) => {
    const cat = filteredCategories.find((item) => item.id === id);
    if (cat) {
      setSelectedCategory(cat);
      setViewModalOpen(true);
    }
  };

  const handleDeleteClick = (id) => {
    setCategoryToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteCategory(categoryToDelete));
    setShowDeleteModal(false);
    setCategoryToDelete(null);

  };

  const handleEditClick = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${BASE_URL}/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategoryToEdit(response.data);
      setShowModalEdit(true);
    } catch (err) {
      console.error('Error fetching category by ID:', err);
      toast.error('Failed to fetch category data');
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin />
        <aside className="main-sidebar hidden-print">
          <Sidebar />
        </aside>
        <div className="content-wrapper p-3">
          <div className="main-header px-3">
            <h4> Categories</h4>
          </div>

          <div className="container-fluid manage">
            <div className="card mb-3">
              <div className="card-block manage-btn">
                <div className="row g-3 align-items-center">
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search By Category Title"
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
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                      + Add New
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-block">
                <div className="row mb-3">
                  <div className="col-md-12 text-end">
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
                            checked={
                              selectedRows.length === categories.length &&
                              categories.length > 0
                            }
                            onChange={handleSelectAll}
                          />
                        </th>
                        <th>S.No</th>
                        <th>Category</th>
                        <th>App Icon</th>
                        <th>Web Icon</th>
                        <th>Main Image</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRows.length > 0 ? currentRows.map((cat, index) => {
                        const parentCategory = categories.find(p => p.id === cat.parent_id);
                        const isSelected = selectedIds.includes(cat.id);

                        return (
                          <tr key={cat.id}>
                            <td>
                              <input
                                type="checkbox"
                                checked={selectedRows.includes(cat.id)}
                                onChange={() => handleRowCheckboxChange(cat.id)}
                              />
                            </td>
                            <td>{index + 1}</td>
                            <td>{parentCategory ? parentCategory.title : cat.title}</td>
                            <td>{(cat.appIcon || parentCategory?.appIcon) ? <img src={`${BASE_URL}${cat.appIcon || parentCategory.appIcon}`} alt="App Icon" width="50" height="50" /> : 'N/A'}</td>
                            <td>{(cat.webImage || parentCategory?.webImage) ? <img src={`${BASE_URL}${cat.webImage || parentCategory.webImage}`} alt="Web Icon" width="50" height="50" /> : 'N/A'}</td>
                            <td>{(cat.mainImage || parentCategory?.mainImage) ? <img src={`${BASE_URL}${cat.mainImage || parentCategory.mainImage}`} alt="Main" width="50" height="50" /> : 'N/A'}</td>
                            <td>
                              <span className={`badge ${cat.status ? 'text-light-primary' : 'text-light-danger'}`}>
                                {cat.status ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td>
                              <button className="btn btn-light icon-btn m-2" onClick={() => handleEditClick(cat.id)}>
                                <BsPencilSquare style={{ fontSize: '18px', color: '#dc3545' }} />
                              </button>
                              <button className="btn btn-light icon-btn" onClick={() => handleViewClick(cat.id)}>
                                <BsEye style={{ fontSize: '18px', color: '#212529' }} />
                              </button>
                              <button className="btn btn-light icon-btn m-2" onClick={() => handleDeleteClick(cat.id)}>
                                <TiTrash style={{ fontSize: '18px', color: '#212529' }} />
                              </button>
                            </td>
                          </tr>
                        );
                      }) : (
                        <tr><td colSpan="8">No categories found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {showModal && <AddCategoryModal show={showModal} setShow={setShowModal} />}
            {showModalEdit && <EditCategoryModal show={showModalEdit} setShow={setShowModalEdit} category={categoryToEdit} refetchCategories={() => dispatch(fetchCategories())} />}
            {viewModalOpen && <ViewCategoryModal show={viewModalOpen} onClose={() => setViewModalOpen(false)} category={selectedCategory} />}
            {showDeleteModal && <DeleteModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleDelete} message="Are you sure you want to delete this category?" />}
            <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
