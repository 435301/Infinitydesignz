import React from 'react';
import { PencilSquare, Trash, Search, ArrowRepeat } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';

const OffersList = () => {
  const coupons = [
    {
      id: 1,
      type: 'Flat',
      code: 'FLAT50',
      unit: '₹',
      value: '50',
      fromDate: '2025-07-01',
      toDate: '2025-07-15',
      minPurchase: '₹300',
      status: 'Active',
    },
    {
      id: 2,
      type: 'Percentage',
      code: 'SAVE10',
      unit: '%',
      value: '10%',
      fromDate: '2025-07-01',
      toDate: '2025-07-20',
      minPurchase: '₹500',
      status: 'Inactive',
    },
  ];

  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin />
        <aside className="main-sidebar hidden-print">
          <Sidebar />
        </aside>
        <div className="content-wrapper p-4">
          <div className="main-header" style={{ marginTop: '0px' }}>
            <h5>Offers List</h5>
          </div>
          <div className="container-fluid manage">
            <div className="row mb-3">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-block manage-btn">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="input-group">
                          <input type="text" className="form-control" placeholder="Search By" />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <select className="form-control">
                          <option value="">- Select Status -</option>
                          <option value="active">Active</option>
                          <option value="inactive">In Active</option>
                        </select>
                      </div>
                      <div className="col-md-2">
                        <button className="btn btn-danger me-2">
                          <Search />
                        </button>
                        <button className="btn btn-success">
                          <ArrowRepeat />
                        </button>
                      </div>
                      <div className="col-md-4 text-end">
                        <a href="/admin/create-cupon" className="btn btn-primary">Create New</a>
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
                    <div className="row mb-3">
                      <div className="col-lg-6">
                        <h5></h5>
                      </div>
                      <div className="col-md-6 text-end pt">
                        <button className="btn btn-success me-2">Active</button>
                        <button className="btn btn-default">In Active</button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 table-responsive">
                        <table className="table-lg table-striped align-middle mb-0 table table-hover">
                          <thead>
                            <tr>
                              <th><input type="checkbox" /></th>

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
                            {coupons.map((coupon, index) => (
                              <tr key={coupon.id}>
                                <td><input type="checkbox" className="row-checkbox" /></td>

                                <td>{index + 1}</td> {/* Serial number based on index */}
                                <td>{coupon.type}</td>
                                <td>{coupon.code}</td>
                                <td>{coupon.unit}</td>
                                <td>{coupon.value}</td>
                                <td>{coupon.fromDate}</td>
                                <td>{coupon.toDate}</td>
                                <td>{coupon.minPurchase}</td>
                                <td>
                                  <span className={`badge ${coupon.status === 'Active' ? 'text-light-primary' : 'text-light-danger'}`}>
                                    {coupon.status}
                                  </span>
                                </td>
                                <td>
                                  <button type="button" className="btn btn-light-success icon-btn b-r-4 me-2">
                                    <PencilSquare className="text-success" />
                                  </button>
                                  <button type="button" className="btn btn-light-danger icon-btn b-r-4 delete-btn">
                                    <Trash className="text-danger" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <nav aria-label="Page navigation example">
                          <ul className="pagination justify-content-end mt-3">
                            <li className="page-item disabled">
                              <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                              <a className="page-link" href="#">Next</a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersList;