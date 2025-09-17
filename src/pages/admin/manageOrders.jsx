import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import { FaEye } from 'react-icons/fa';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminOrders } from '../../redux/actions/orderAction';
import { useNavigate } from 'react-router-dom';
import PaginationComponent from '../../includes/pagination';

const ManageOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { adminOrder: orders, loading, pagination = {} } = useSelector((state) => state.ordersState);
  console.log('orders', pagination);
  const [filters, setFilters] = useState({
    orderId: '',
    dateFrom: '',
    dateTo: '',
    status: 'PENDING',
    active: true,
    orderFrom: 'web',
    page: 1,
    pageSize: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewOrder = (orderId) => {
    navigate(`/admin/orders/${orderId}`);
  };

  useEffect(() => {
    dispatch(fetchAdminOrders(filters));
  }, []);

  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const orderId = e.target.orderNo.value;
    const dateFrom = e.target.fromDate.value;
    const dateTo = e.target.toDate.value;
    const status = e.target.status;

    const newFilters = {
      orderId,
      dateFrom,
      dateTo,
      status,
      active: true,
      orderFrom: 'web',
      page: 1,
      pageSize: 10,
    };

    setFilters(newFilters);
    dispatch(fetchAdminOrders(newFilters));
  };


  const handleReset = () => {
    const resetFilters = {
      orderId: '',
      dateFrom: '',
      dateTo: '',
      status: 'PENDING',
      active: true,
      orderFrom: 'web',
      page: 1,
      pageSize: 10,
    };
    setFilters(resetFilters);
    dispatch(fetchAdminOrders(resetFilters));
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= pagination.totalPages) {
      setCurrentPage(pageNumber);
      const newFilters = {
        ...filters,
        page: pageNumber,
      };
      setFilters(newFilters);
      dispatch(fetchAdminOrders(newFilters));
    }
  };


  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin onToggleSidebar={handleToggleSidebar} />
        <aside className="main-sidebar hidden-print">
          <Sidebar isCollapsed={isSidebarCollapsed} onClose={() => setIsSidebarCollapsed(true)} />
        </aside>

        <div className="content-wrapper mb-4" style={{ marginLeft: isSidebarCollapsed ? '60px' : '272px', padding: '20px', flex: 1, transition: 'margin-left 0.3s ease', }}>

          <div className="main-header mt-0">
            <h4>Orders</h4>

          </div>

          <div className="container-fluid manage">
            {/* Search Form */}
            <div className="card mb-4">
              <div className="card-block">
                <form onSubmit={handleSearch} className="row align-items-end g-3">
                  <div className="col-md-3">
                    <label htmlFor="orderNo" className="form-label">Orders</label>
                    <input type="text" className="form-control" id="orderNo"  placeholder='Search with Order-Id '/>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="fromDate" className="form-label">From Date</label >
                    <input type="date" className="form-control" id="fromDate"  max={new Date().toISOString().split("T")[0]} />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="toDate" className="form-label">To Date</label>
                    <input type="date" className="form-control" id="toDate"  max={new Date().toISOString().split("T")[0]}/>
                  </div>
                  {/* <div className="col-md-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select id="status" className="form-select default-select">
                      <option value="PENDING">PENDING</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div> */}
                  <div className="col-md-3 d-flex gap-2">
                    <button type="submit" className="btn btn-danger"><i className="ti-search me-1"></i> Search</button>
                    <button type="reset" className="btn btn-success" onClick={handleReset}><i className="icon-refresh me-1"></i> Reset</button>
                  </div>
                </form>

              </div>
            </div>

            {/* Orders Table */}
            <div className="card">
              <div className="card-block">
                <div className="row mb-2">

                </div>

                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Order No</th>
                        <th>Qty</th>
                        {/* <th>Price</th> */}
                        <th>Additional Charges</th>
                        <th>Total Amount</th>
                        <th>Order Date</th>
                        <th>Order From</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(orders) && orders.length > 0 ? (
                        orders.map((order, index) => (
                          <tr key={index}>
                            <td>{order.orderId || order.orderNo}</td>
                            <td>{order.totalQuantity || order.qty}</td>

                            {/* <td>{order.amt || ''}</td> */}
                            <td>{order.additonlCharges || '100'}</td>
                            <td>{order.price || ''}</td>
                            <td>
                              {order.orderDate || order.date
                                ? new Date(order.orderDate || order.date).toLocaleDateString('en-GB')
                                : ''}
                            </td>


                            <td>{order.orderFrom}</td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary" onClick={() => handleViewOrder(order.id || order.orderNo)}>
                                <FaEye /> View
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : loading ? (
                        <tr>
                          <td colSpan="6" className="text-center">Loading...</td>
                        </tr>
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">No orders found.</td>
                        </tr>
                      )
                      }
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
            <PaginationComponent
              currentPage={currentPage}
              totalPages={pagination.totalPages || 1}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
