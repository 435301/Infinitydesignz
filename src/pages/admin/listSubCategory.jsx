import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/admin/style.css';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteListSubCategory, fetchCategories } from '../../redux/actions/categoryAction';
import { BsPencilSquare, BsEye, BsSearch, BsArrowClockwise } from 'react-icons/bs';
import AddListSubCategoryModal from '../../includes/addListSubCategory';
import EditListSubCategoryModal from '../../includes/editListSubCategoryModal';
import DeleteModal from '../../modals/deleteModal';
import { toast } from 'react-toastify';
import { TiTrash } from "react-icons/ti";
import ViewListSubCategoryModal from '../../modals/viewListCategoryModal';
import PaginationComponent from '../../includes/pagination';
import BASE_URL from '../../config/config';

const ListSubCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [subCategoryIdToEdit, setSubCategoryIdToEdit] = useState(null);
  const [ListSubCategoryToDelete, setListSubCategoryToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // const BASE_URL = 'http://68.183.89.229:4005';
  // const BASE_URL_DELETE = 'http://68.183.89.229:4005';
  const dispatch = useDispatch();
  const { categories = [], loading, error } = useSelector((state) => state.categories || {});

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length) {
      const topLevel = categories.filter((cat) => cat.parentId === null);
      const subCats = categories.filter((cat) => cat.parentId !== null);
      const subCatIds = subCats.map((cat) => cat.id);
      const subSubCats = categories.filter((cat) => subCatIds.includes(cat.parentId));
      const mapped = subSubCats.map((subSub) => {
        const parent = categories.find((c) => c.id === subSub.parentId); // subcategory
        const grandParent = categories.find((c) => c.id === parent?.parentId); // main category
        return {
          ...subSub,
          subCategory: parent?.title || 'N/A',
          category: grandParent?.title || 'N/A',
        };
      });
      setSubSubCategories(mapped);
    }
  }, [categories]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(subSubCategories.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const filteredSubCategories = subSubCategories.filter((subCat) => {
    const matchesSearch =
      subCat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subCat.category.toLowerCase().includes(searchTerm.toLowerCase());
    subCat.subCategory.toLowerCase().includes(searchTerm.toLowerCase());
    // const matchesStatus = statusFilter ? subCat.status === statusFilter : true;
    // return matchesSearch && matchesStatus;
    const matchesStatus = statusFilter
      ? (statusFilter === 'active' ? subCat.status === true : subCat.status === false)
      : true;

    return matchesSearch && matchesStatus;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredSubCategories.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredSubCategories.length / rowsPerPage);


  const handleEditClick = (id) => {
    setSubCategoryIdToEdit(id);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    console.log("handleDeleteClick triggered with ID:", id);
    setListSubCategoryToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteListSubCategory(ListSubCategoryToDelete));
    setShowDeleteModal(false);
    setListSubCategoryToDelete(null);

  };
  const handleViewClick = (id) => {
    const listsubCat = subSubCategories.find((item) => item.id === id);
    if (listsubCat) {
      setSelectedSubCategory(listsubCat);
      setViewModalOpen(true);
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
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


  return (
    <div className="wrapper sidebar-mini fixed">
      <HeaderAdmin />
      <aside className="main-sidebar hidden-print">
        <Sidebar />
      </aside>

      <div className="content-wrapper p-3">
        <div className="main-header px-3" style={{ marginTop: 0 }}>
          <h4>List Sub Categories</h4>
        </div>

        <div className="container-fluid manage">
          <div className="row mb-2">
            <div className="col-md-12">
              <div className="card">
                <div className="card-block manage-btn">
                  <div className="row align-items-center">
                    <div className="col-md-3">
                      <input type="text" className="form-control" placeholder="Search By category, sub and list category" value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="col-md-3">
                      <select className="form-control" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="">- Select Status -</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    <div className="col-md-2 d-flex gap-2">
                      <button className="btn btn-success" onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('');
                      }}>
                        <BsArrowClockwise style={{ fontSize: '18px' }} />
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
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-block">
                  <div className="row mb-2">
                    <div className="col-lg-6"></div>
                    <div className="col-md-6 text-end pt pt pt">
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

                  <div className="row">
                    <div className="col-sm-12 table-responsive">
                      <table className="table table-striped table-hover align-middle mb-0">
                        <thead>
                          <tr>
                            <th>
                              <input
                                type="checkbox"
                                checked={
                                  selectedRows.length === subSubCategories.length &&
                                  subSubCategories.length > 0
                                }
                                onChange={handleSelectAll}
                              />
                            </th>
                            <th>S.No</th>
                            <th>Category</th>
                            <th>Sub Category</th>
                            <th>Category Title</th>
                            <th>App Icon</th>
                            <th>Web Icon</th>
                            <th>Main Image</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentRows.length > 0 ? (
                            currentRows.map((item, index) => (
                              <tr key={item.id}>
                                <td>
                                  <input
                                    type="checkbox"
                                    checked={selectedRows.includes(item.id)}
                                    onChange={() => handleRowCheckboxChange(item.id)}
                                  />
                                </td>
                                <td>{index + 1}</td>
                                <td>{item.category}</td>
                                <td>{item.subCategory}</td>
                                <td>{item.title}</td>
                                <td>
                                  {(item?.appIcon) ? (
                                  
                                    <img
                                      src={`${BASE_URL}${item?.appIcon}`}
                                      alt={`${item.title} App Icon`}
                                      className="rounded-circle"
                                      width="50"
                                      height="50"
                                    />
                                   
                                  ) : (
                                    <span>N/A</span>
                                  )}
                                </td>
                                <td>
                                  {(item?.webImage) ? (
                                   
                                      <img
                                        src={`${BASE_URL}${item?.webImage}`}
                                        alt={`${item.title} Web Icon`}
                                        className="rounded-circle"
                                        width="50"
                                        height="50"
                                      />
                                  
                                  ) : (
                                    <span>N/A</span>
                                  )}
                                </td>
                                <td>
                                  {(item?.mainImage) ? (
                                    
                                       <img
                                      src={`${BASE_URL}${item?.mainImage}`}
                                      alt={`${item.title} Main Image`}
                                      className="rounded-circle"
                                      width="50"
                                      height="50"
                                    />
                                     
                                  ) : (
                                    <span>N/A</span>
                                  )}
                                </td>
                                <td>
                                  <span
                                    className={`badge text-light-${item.status === true ? 'primary' : 'danger'
                                      }`}
                                  >
                                    {item.status === true ? 'Active' : 'Inactive'}
                                  </span>
                                </td>
                                <td>
                                  <button className="btn btn-light icon-btn mx-1 me-2 text-success" onClick={() => handleEditClick(item.id)}>
                                    <BsPencilSquare  />
                                  </button>
                                  <button className="btn btn-light icon-btn mx-1 text-primary" onClick={() => handleViewClick(item.id)}>
                                    <BsEye   />
                                  </button>
                                  <button className="btn btn-light icon-btn mx-1 m-2 text-danger" onClick={() => {
                                      console.log("Delete icon clicked", item.id);
                                      handleDeleteClick(item.id);
                                    }} >
                                    <TiTrash   />
                                  </button>
                                </td>
                              </tr>
                            )
                            )
                          ) : (
                            filteredSubCategories.length === 0 && !loading && (
                              <tr>
                                <td colSpan="10" className="text-center">
                                  No sub-subcategories found.
                                </td>
                              </tr>
                            )
                          )
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showModal && <AddListSubCategoryModal show={showModal} setShow={setShowModal} />}
          {editModalOpen && (
            <EditListSubCategoryModal
              show={editModalOpen}
              setShow={setEditModalOpen}
              subCategoryId={subCategoryIdToEdit}
              refetchCategories={() => dispatch(fetchCategories())}
            />
          )}
          {showDeleteModal && (
            <DeleteModal
              show={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
              onConfirm={handleDelete}
              message="Are you sure you want to delete this list sub category?"
            />
          )
          }
          {viewModalOpen && (
            <ViewListSubCategoryModal
              show={viewModalOpen}
              onClose={() => setViewModalOpen(false)}
              subCategory={selectedSubCategory}
            />
          )}
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ListSubCategory;