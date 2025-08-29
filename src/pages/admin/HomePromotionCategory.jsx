import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Search, ArrowRepeat, PencilSquare, Trash } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { deleteHomeCategoryPromotion, fetchHomeCategoryPromotions } from '../../redux/actions/categoryPromotionAction';
import BASE_URL from '../../config/config';
import PaginationComponent from '../../includes/pagination';
import { BsArrowClockwise, BsEye, BsTrash } from 'react-icons/bs';
import HomeScreenCreatePromotionModal from '../../components/homeScreenCreatePromotion';
import HomeScreenEditPromotionModal from '../../components/homeEditPromotionModal';
import DeleteModal from '../../modals/deleteModal';
import HomeScreenViewPromotionModal from '../../components/viewHomePromotionModal';

const HomePromotionCategory = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState({ title: '', displayCount: '' });
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [categoryPromotionToDelete, setCategoryPromotionToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");

  const rowsPerPage = 10;

  const dispatch = useDispatch();
  const { items: promotions, loading, error } = useSelector(
    (state) => state.categoryPromotion
  );
  console.log('status123', promotions);

  useEffect(() => {
    dispatch(fetchHomeCategoryPromotions());
  }, [dispatch]);

  const filteredPromotions = promotions.filter((promotion) => {
    const title = promotion.title || "";
    const matchesTitle = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter
      ? (statusFilter === "active" ? promotion.status : !promotion.status)
      : true;
    return matchesTitle && matchesStatus;
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredPromotions.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredPromotions.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };


  const handleEditClick = (promotion) => {
    setEditData(promotion);
    setShowEditModal(true);
  };

  const handleDeleteClick = (id) => {
    setCategoryPromotionToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteHomeCategoryPromotion(categoryPromotionToDelete));
    setShowDeleteModal(false);
    setCategoryPromotionToDelete(null);
  };

  const handleViewClick = (promotion) => {
    setViewData(promotion);
    setShowViewModal(true);
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
            <h4>Home Promotion Category</h4>
          </div>
          <div className="container-fluid manage">
            {/* Search + Filters */}
            <div className="row mb-2">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-block manage-btn">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search By Title"
                            value={searchTerm}
                            onChange={(e) => {
                              setSearchTerm(e.target.value);
                              setCurrentPage(1);
                            }}
                          />
                        </div>
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
                      <div className="col-md-2">
                        <button className="btn btn-success me-2"
                          onClick={() => {
                            setSearchTerm('');
                            setStatusFilter('');
                          }}>
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
              </div>
            </div>

            {/* Table */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-block">
                    <div className="row">
                      <div className="col-sm-12 table-responsive">
                        {loading ? (
                          <p>Loading...</p>
                        ) : error ? (
                          <p className="text-danger">{error}</p>
                        ) : (
                          <table className="table-lg table-striped align-middle mb-0 table table-hover">
                            <thead>
                              <tr>
                                <th><input type="checkbox" id="select-all" /></th>
                                <th>S.no</th>
                                <th>Title</th>
                                <th>Image</th>
                                <th>Display Count</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentRows.map((promotion, index) => (
                                <tr key={promotion.id}>
                                  <td><input type="checkbox" className="row-checkbox" /></td>
                                  <td>{indexOfFirstRow + index + 1}</td>
                                  <td>{promotion.title}</td>
                                  <td>
                                    {promotion.imageUrl ? ( <img
                                        src={`${BASE_URL}${promotion.imageUrl}`}
                                        alt={promotion.title}
                                        className="rounded-circle"
                                        width="25"
                                        height="25"
                                      />
                                    ) : (
                                      <span className="text-muted">N/A</span>
                                    )}
                                  </td>
                                  <td>{promotion.displayCount}</td>
                                  <td>{promotion.priority}</td>
                                  <td>
                                    <span
                                      className={`badge ${promotion.status ? 'text-light-primary' : 'text-light-danger'}`}
                                    >
                                      {promotion.status ? 'Active' : 'Inactive'}
                                    </span>
                                  </td>

                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-light icon-btn b-r-4 me-2"
                                      onClick={() => handleEditClick(promotion)}
                                    >
                                      <PencilSquare style={{ color: '#dc3545' }} />
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-light icon-btn b-r-4 me-2"
                                      onClick={() => handleViewClick(promotion)}
                                    >
                                      <BsEye />
                                    </button>
                                    <button className="btn btn-sm btn-outline-danger" title="Delete"
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

              <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              <HomeScreenCreatePromotionModal show={showModal} handleClose={() => setShowModal(false)} />
              {showEditModal && <HomeScreenEditPromotionModal show={showEditModal} handleClose={() => setShowEditModal(false)} editData={editData} />}
              {showDeleteModal && (
                <DeleteModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleDelete} message="Are you sure you want to delete this category promotion?" />)}
              {showViewModal && <HomeScreenViewPromotionModal show={showViewModal} handleClose={() => setShowViewModal(false)} viewData={viewData} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePromotionCategory;
