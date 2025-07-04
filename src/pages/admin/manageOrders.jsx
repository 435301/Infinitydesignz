import React from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import { FaEye } from 'react-icons/fa';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';

const ManageOrders = () => {
  const orders = [
    {
      orderNo: '#1001',
      qty: 5,
      date: '2025-05-25',
      customer: 'Vikas Reddy',
      mobile: '9876543210',
    },
    {
      orderNo: '#1002',
      qty: 2,
      date: '2025-05-24',
      customer: 'Vikas Reddy',
      mobile: '9876543211',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching orders...');
    // You can fetch filtered results here
  };

  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin />
        <aside className="main-sidebar hidden-print">
          <Sidebar />
        </aside>

        <div className="content-wrapper p-4">
          <div className="main-header mt-0">
            <h4>Orders</h4>
            <ol className="breadcrumb breadcrumb-title breadcrumb-arrow">
              <li className="breadcrumb-item"><a href="#">Manage</a></li>
            </ol>
          </div>

          <div className="container-fluid manage">
            {/* Search Form */}
            <div className="card mb-4">
              <div className="card-block">
                <form onSubmit={handleSearch} className="row align-items-end g-3">
                  <div className="col-md-3">
                    <label htmlFor="orderNo" className="form-label">Order No</label>
                    <input type="text" className="form-control" id="orderNo" placeholder="Enter Order No" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="fromDate" className="form-label">From Date</label>
                    <input type="date" className="form-control" id="fromDate" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="toDate" className="form-label">To Date</label>
                    <input type="date" className="form-control" id="toDate" />
                  </div>
                  <div className="col-md-3 d-flex gap-2">
                    <button type="submit" className="btn btn-danger"><i className="ti-search me-1"></i> Search</button>
                    <button type="reset" className="btn btn-success"><i className="icon-refresh me-1"></i> Reset</button>
                  </div>
                </form>
              </div>
            </div>

            {/* Orders Table */}
            <div className="card">
              <div className="card-block">
                <div className="row mb-3">
                  <div className="col-md-12 text-end">
                    <button className="btn btn-success me-2">Active</button>
                    <button className="btn btn-secondary me-2">Inactive</button>
                    <button className="btn btn-danger me-2">Delete</button>
                    <button className="btn btn-warning">Trash</button>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Order No</th>
                        <th>Qty</th>
                        <th>Order Date</th>
                        <th>Customer Name</th>
                        <th>Mobile No</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <tr key={index}>
                          <td>{order.orderNo}</td>
                          <td>{order.qty}</td>
                          <td>{order.date}</td>
                          <td>{order.customer}</td>
                          <td>{order.mobile}</td>
                          <td>
                            <a href="/order-details" className="btn btn-sm btn-outline-primary">
                              <FaEye /> View
                            </a>
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
    </div>
  );
};

export default ManageOrders;
