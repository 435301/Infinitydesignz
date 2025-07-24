import React, { useState, useEffect } from 'react';

import { PencilSquare, Trash, Search, ArrowRepeat } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { bulkUpdateCouponStatus, deleteCoupon, fetchCoupon } from '../../redux/actions/couponAction';
import PaginationComponent from '../../includes/pagination';
import { BsArrowClockwise, BsEye, BsPencilSquare } from 'react-icons/bs';
import CreateCouponModal from './CreateCoupon';
import { toast } from 'react-toastify';
import EditCouponModal from '../../components/editCoupon';
import { TiTrash } from 'react-icons/ti';
import DeleteModal from '../../modals/deleteModal';
import ViewCouponModal from '../../modals/viewCouponModal';

const OffersList = () => {
  const dispatch = useDispatch();
  const { coupons = [] } = useSelector((state) => state.coupons);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedEditCoupon, setSelectedEditCoupon] = useState(null);
  const [couponToDelete, setCouponToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const[viewCouponModal, setViewCouponModal] = useState(false);
  const[selectedViewCoupon, setSelectedViewCoupon] = useState(null);

  useEffect(() => {
    dispatch(fetchCoupon())
  }, [dispatch]);

  const filteredCoupons = coupons.filter((coupon) => {
    const search = (searchTerm || '').toLowerCase();
    const matchesSearch =
      coupon.type.toLowerCase().includes(search) ||
      coupon.code.toLowerCase().includes(search) ||
      coupon.priceType.toLowerCase().includes(search) ||
      coupon.value.toString().toLowerCase().includes(search) ||
      coupon.minOrderAmount.toString().toLowerCase().includes(search);
    const matchesStatus = statusFilter
      ? (statusFilter === 'active' ? coupon.isActive === true : coupon.isActive === false)
      : true;
    return matchesSearch && matchesStatus;
  });

  const rowsPerPage = 10;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredCoupons.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredCoupons.length / rowsPerPage);


  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  const handleBulkStatusUpdate = async (newStatus) => {
    if (selectedRows.length === 0) {
      toast.warning("Please select at least one coupon type.");
      return;
    }
    await dispatch(bulkUpdateCouponStatus(selectedRows, newStatus));
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
      setSelectedRows(currentRows.map((coupon) => coupon.id));
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteClick = (id) => {
    setCouponToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteCoupon(couponToDelete));
    setShowDeleteModal(false);
    setCouponToDelete(null);
  }


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
            <h5>Offers List</h5>
          </div>
          <div className="container-fluid manage">
            <div className="row mb-2">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-block manage-btn">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="input-group">
                          <input type="text" className="form-control" placeholder="Search By coupon type, code ,price.." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <select className="form-control" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                          <option value="">- Select Status -</option>
                          <option value="active">Active</option>
                          <option value="inactive">In Active</option>
                        </select>
                      </div>
                      <div className="col-md-2">

                        <button className="btn btn-success" onClick={() => {
                          setSearchTerm('');
                          setStatusFilter('');
                          setCurrentPage(1);
                        }}>
                          <BsArrowClockwise />
                        </button>
                      </div>
                      <div className="col-md-4 text-end">
                        <button className="btn btn-primary" onClick={() => setShowCouponModal(true)}>
                          + Create New Coupon
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
                      <div className="col-lg-6">
                        <h5></h5>
                      </div>
                      <div className="col-md-6 text-end pt pt">
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
                        <table className="table-lg table-striped align-middle mb-0 table table-hover">
                          <thead>
                            <tr>
                              <th> <input
                                type="checkbox"
                                checked={selectedRows.length === currentRows.length && currentRows.length > 0}
                                onChange={handleSelectAll}
                              /></th>

                              <th>Sl No</th> {/* New Sl No column */}
                              <th>Coupon Type</th>
                              <th>Coupon Code</th>
                              <th>Price/Percentage</th>
                              <th>Value</th>
                              <th>From Date</th>
                              <th>To Date</th>
                              <th>Min Purchase</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentRows.map((coupon, index) => (
                              <tr key={coupon.id}>
                                <td> <input
                                  type="checkbox"
                                  checked={selectedRows.includes(coupon.id)}
                                  onChange={() => handleRowCheckboxChange(coupon.id)}
                                /></td>

                                <td>{index + 1}</td>
                                <td>{coupon.type}</td>
                                <td>{coupon.code}</td>
                                <td>{coupon.priceType}</td>
                                <td>{coupon.value}</td>
                                <td>{new Date(coupon.fromDate).toLocaleDateString('en-GB', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric'
                                })}</td>

                                <td>{new Date(coupon.toDate).toLocaleDateString('en-GB', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric'
                                })}</td>
                                <td>{coupon.minOrderAmount}</td>
                                <td>
                                  <span className={`badge ${coupon.isActive ? 'text-light-primary' : 'text-light-danger'}`}>
                                    {coupon.isActive ? 'Active' : 'Inactive'}
                                  </span>
                                </td>
                                <td>
                                  <button type="button" className="btn btn-light-success icon-btn b-r-4 me-2" onClick={() => {
                                    setEditModalVisible(true)
                                    setSelectedEditCoupon(coupon);
                                  }}>
                                    <BsPencilSquare className="text-success" />
                                  </button>
                                  <button type="button" className="btn btn-light-success icon-btn b-r-4 me-2" onClick={() => {
                                    setViewCouponModal(true)
                                    setSelectedViewCoupon(coupon);
                                  }}>
                                    <BsEye className="text-success" />
                                  </button>
                                  <button type="button" className="btn btn-light-danger icon-btn b-r-4 delete-btn" onClick={() => {
                                    handleDeleteClick(coupon.id);
                                    setShowDeleteModal(true);
                                  }}>
                                    <TiTrash className="text-danger" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

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
            {showCouponModal && <CreateCouponModal show={showCouponModal} onHide={() => setShowCouponModal(false)}
            />}
            {editModalVisible && <EditCouponModal show={editModalVisible} onHide={() => setEditModalVisible(false)} coupon={selectedEditCoupon} />}
            {showDeleteModal && (
              <DeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this size?"
              />
            )}
            {viewCouponModal && (
              <ViewCouponModal
                show={viewCouponModal}
                onHide={() => setViewCouponModal(false)}
                coupon={selectedViewCoupon}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersList;