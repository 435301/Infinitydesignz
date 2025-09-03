import React, { useEffect, useState } from 'react';
import { Search, ArrowRepeat, PencilSquare, Trash } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { bulkUpdateProductPromotionStatus, deleteProductPromotion, fetchProductPromotions, updateProductPromotion } from '../../redux/actions/productionPromotionAction';
import BASE_URL from '../../config/config';
import { BsArrowClockwise, BsEye, BsTrash } from 'react-icons/bs';
import PaginationComponent from '../../includes/pagination';
import { toast } from 'react-toastify';
import DeleteModal from '../../modals/deleteModal';
import ViewPromotionModal from '../../modals/viewPromotionModal';


const HomeScreenPromotions = () => {
  const dispatch = useDispatch();
  const { items: promotions, loading, error, categories, limit, total } = useSelector((state) => state.productPromotions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(total / limit || 1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [promotionToDelete, setPromotionToDelete] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    search: "",
  });
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);


  const filteredPromotions = promotions.filter((promotion) => {
    const title = promotion.title || "";
    const matchesTitle = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter
      ? (statusFilter === "active" ? promotion.status === true : promotion.status === false)
      : true;
    const matchesCategory = filters.category
      ? String(promotion.category?.id) === String(filters.category)
      : true;
    return matchesTitle && matchesStatus && matchesCategory;
  });

  useEffect(() => {
    dispatch(fetchProductPromotions(1, 20, currentPage));
  }, [dispatch, currentPage]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const handleSearch = () => {
    dispatch(fetchProductPromotions(1, 20));
  };

  const handleReset = () => {
    setSearchTerm("");
    setStatusFilter("");
    setFilters({ category: "", status: "", search: "" });
    dispatch(fetchProductPromotions(1, 20));
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredPromotions.map((brand) => brand.id));
    }
    setSelectAll(!selectAll);
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleBulkStatusUpdate = async (newStatus) => {
    if (selectedRows.length === 0) {
      toast.warning("Please select at least one brand.");
      return;
    }

    await dispatch(bulkUpdateProductPromotionStatus(selectedRows, newStatus));
    setSelectedRows([]);
  };

  const handleDeleteClick = (id) => {
    setPromotionToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteProductPromotion(promotionToDelete));
    setShowDeleteModal(false);
    setPromotionToDelete(null);
  };

  const handleView = (promotion) => {
    setSelectedPromotion(promotion);
    setShowViewModal(true);
  };

  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin />
        <aside className="main-sidebar hidden-print">
          <Sidebar />
        </aside>
        <div className="content-wrapper p-4">
          <div className="main-header" style={{ marginTop: "0px" }}>
            <h4>Promotions</h4>
          </div>
          <div className="container-fluid manage">
            <div className="row mb-2">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-block manage-btn">
                    <div className="row">
                      <div className="col-lg-3">
                        <select
                          className="form-control"
                          name="category"
                          value={filters.category}
                          onChange={handleFilterChange}
                        >
                          <option value="">- Select Category -</option>
                          {Array.isArray(categories) &&
                            categories.map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.title}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="col-lg-3">
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
                      <div className="col-lg-2 p-0">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search promotion..."
                            value={searchTerm}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 ">
                        <button className="btn btn-success me-2"
                          onClick={() => { handleReset() }}>
                          <BsArrowClockwise />
                        </button>
                      </div>
                      <div className="col-lg-2 text-end">
                        <a
                          href="/admin/add-home-screen-create-promotion"
                          className="btn btn-primary"
                          type="button"
                        >
                          + Add New
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-block">
                    <div className="row mb-2">
                      <div className="col-lg-6"></div>
                      <div className="col-md-6 text-end pt pt pt">
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
                    <div className="row">
                      <div className="col-sm-12 table-responsive">
                        {error ? (
                          <p className="text-danger">{error}</p>
                        ) : (
                          <table className="table-lg table-striped align-middle mb-0 table table-hover">
                            <thead>
                              <tr>
                                <th>
                                  <input
                                    type="checkbox"
                                    checked={selectedRows.length === filteredPromotions.length && filteredPromotions.length > 0}
                                    onChange={handleSelectAll}
                                  />
                                </th>
                                <th>S.no</th>
                                <th>Title</th>
                                <th>Image</th>
                                <th>Category</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredPromotions?.map((promotion, index) => (
                                <tr key={promotion.id}>
                                  <td>
                                    <input
                                      type="checkbox"
                                      checked={selectedRows.includes(promotion.id)}
                                      onChange={() => handleRowCheckboxChange(promotion.id)}
                                    />
                                  </td>
                                  <td>{index + 1}</td>
                                  <td>{promotion.title}</td>
                                  <td>
                                    <img
                                      src={`${BASE_URL}${promotion.imageUrl}`}
                                      alt={promotion.title}
                                      className="rounded-circle"
                                      width="40"
                                      height="40"
                                    />
                                  </td>
                                  <td>{promotion.category?.title}</td>
                                  {/* <td>{promotion.priority}</td> */}
                                  <td>
                                    <input
                                      type="number"
                                      value={promotion.priority}
                                      onChange={(e) => {
                                        const newPriority = e.target.value;
                                        dispatch(updateProductPromotion(promotion.id, newPriority));
                                      }}
                                      style={{ width: "80px" }}
                                      className="form-control form-control-sm"
                                    />
                                  </td>
                                  <td>
                                    <span
                                      className={`badge ${promotion.status ? "badge-active" : "badge-inactive"
                                        }`}
                                    >
                                      {promotion.status ? "Active" : "Inactive"}
                                    </span>

                                  </td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-light icon-btn mx-1 b-r-4 me-2 text-primary"
                                      onClick={() => handleView(promotion)}
                                    >
                                      <BsEye />
                                    </button>
                                    <button className="btn btn-light icon-btn mx-1 b-r-4 me-2 text-danger" title="Delete"
                                      onClick={() => handleDeleteClick(promotion.id)}
                                    >
                                      <BsTrash />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            {showDeleteModal && (
              <DeleteModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleDelete} message="Are you sure you want to delete this product promotion?" />)}
            {showViewModal &&
              <ViewPromotionModal show={showViewModal} handleClose={() => setShowViewModal(false)} promotion={selectedPromotion} />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreenPromotions;
