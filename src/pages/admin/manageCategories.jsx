import React, { useState, useEffect } from 'react';
import { BsPencilSquare, BsEye, BsSearch, BsArrowClockwise } from 'react-icons/bs';
import { TiTrash } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/actions/categoryAction';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import AddCategoryModal from '../../includes/addCategory';
import '../../css/admin/style.css';
import ViewCategoryModal from '../../modals/viewCategoryModal';
import axios from 'axios';
import { toast } from 'react-toastify';
import DeleteModal from '../../modals/deleteModal';
import EditCategoryModal from '../../includes/EditCategory';

const ManageCategories = () => {
  const dispatch = useDispatch();
  const { categories = [], loading, error } = useSelector((state) => state.categories || {});
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const BASE_URL = 'http://68.183.89.229:4005/uploads/categories';
  const BASE_URL_DELETE = 'http://68.183.89.229:4005';


  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredCategories = categories.filter((cat) => {
    const parent = categories.find((p) => p.id === cat.parent_id);
    const title = cat.title.toLowerCase();
    const parentTitle = parent?.title?.toLowerCase() || '';
    const matchesSearch = `${title} ${parentTitle}`.includes(searchTerm.toLowerCase());

    const categoryStatus = parent ? parent.status : cat.status;
    const matchesStatus = statusFilter ? categoryStatus === statusFilter : true;

    return matchesSearch && matchesStatus;
  });


  const handleViewCategory = async (id) => {
    const BASE_URL = 'http://68.183.89.229:4005';
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get(`${BASE_URL}/categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('responseview', response)
      setSelectedCategory(response.data);
      setViewModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch category by ID", err);
    }
  };

  const handleDeleteClick = (id) => {
    console.log("handleDeleteClick triggered with ID:", id);
    setCategoryToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${BASE_URL_DELETE}/categories/${categoryToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Category deleted successfully!");
      dispatch(fetchCategories());
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error?.response?.data?.message || "Failed to delete category.");
    } finally {
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    }
  };


  const handleEditClick = async (id) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`http://68.183.89.229:4005/categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCategoryToEdit(response.data);
    setShowModalEdit(true);
  } catch (err) {
    console.error('Error fetching category by ID:', err);
    toast.error('Failed to fetch category data');
  }
};


  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin />
        <aside className="main-sidebar hidden-print">
          <Sidebar />
        </aside>

        <div className="content-wrapper">
          <div className="main-header">
            <h4> Categories</h4>
          </div>

          <div className="container-fluid manage">
            {/* Top Filters and Buttons */}
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
                    <button className="btn btn-danger">
                      <BsSearch style={{ fontSize: '18px' }} />
                    </button>
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
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => setShowModal(true)}
                    >
                      + Add New
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Loading/Error */}
            {loading && <p>Loading categories...</p>}
            {error && <p className="text-danger">Error: {error}</p>}

            {/* Categories Table */}
            <div className="card">
              <div className="card-block">
                <div className="table-responsive">
                  <table className="table table-striped table-hover table-lg align-middle mb-0">
                    <thead>
                      <tr>
                        <th>
                          <input type="checkbox" />
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
                      {filteredCategories.length > 0 ? (
                        filteredCategories.map((cat, index) => {
                          const parentCategory = categories.find(
                            (parent) => parent.id === cat.parent_id
                          );

                          return (
                            <tr key={cat.id}>
                              <td>
                                <input type="checkbox" />
                              </td>
                              <td>{index + 1}</td>
                              <td>{parentCategory ? parentCategory.title : cat.title}</td>
                              <td>
                                <img
                                  src={`${BASE_URL}/${(parentCategory ? parentCategory.appIcon : cat.appIcon)}`}
                                  alt="App Icon"
                                  className="rounded-circle"
                                  width="50"
                                  height="50"
                                />
                              </td>
                              <td>
                                <img
                                  src={`${BASE_URL}/${(parentCategory ? parentCategory.webImage : cat.webImage)}`}
                                  alt="Web Icon"
                                  className="rounded-circle"
                                  width="50"
                                  height="50"
                                />
                              </td>
                              <td>
                                <img
                                  src={`${BASE_URL}/${(parentCategory ? parentCategory.mainImage : cat.mainImage)}`}
                                  alt="Main"
                                  className="rounded-circle"
                                  width="50"
                                  height="50"
                                />
                              </td>
                              <td>
                                <span
                                  className={`badge ${(parentCategory ? parentCategory.status : cat.status) === true
                                    ? 'text-light-primary'
                                    : 'text-light-danger'
                                    }`}
                                >
                                   {(parentCategory ? parentCategory.status : cat.status) === true ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td>
                                <button
                                  className="btn btn-light icon-btn m-2"
                                >
                                  <BsPencilSquare style={{ fontSize: '18px', color: '#dc3545' }} onClick={() => handleEditClick(cat.id) }  />
                                </button>
                                <button className="btn btn-light icon-btn" onClick={() => handleViewCategory(cat.id)}>
                                  <BsEye style={{ fontSize: '18px', color: '#212529' }} />
                                </button>
                                <button className="btn btn-light icon-btn m-2" onClick={() => {
                                  console.log("Delete icon clicked", cat.id);
                                  handleDeleteClick(cat.id);
                                }}>
                                  <TiTrash style={{ fontSize: '18px', color: '#212529' }} />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="8">No categories found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {showModal && <AddCategoryModal show={showModal} setShow={setShowModal} />}
            {showModalEdit && <EditCategoryModal show={showModalEdit} setShow={setShowModalEdit}  category={categoryToEdit} refetchCategories={() => dispatch(fetchCategories())} />}

            {viewModalOpen && (
              <ViewCategoryModal
                show={viewModalOpen}
                onClose={() => setViewModalOpen(false)}
                category={selectedCategory}
              />
            )}
            {showDeleteModal && (
              <DeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this category?"
              />
            )
            }


          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
