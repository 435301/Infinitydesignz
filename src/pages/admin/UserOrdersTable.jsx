import React from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';

function UserOrdersTable() {
    return (
        <div className="sidebar-mini fixed">
            <div className="wrapper">
                <HeaderAdmin />
                <aside className="main-sidebar hidden-print">
                    <Sidebar />
                </aside>

                <div className="content-wrapper pt-2 p-4">
                    <div className="main-header" style={{ marginTop: 0 }}>
                        <h4>User Orders</h4>
                    </div>

                    <div className="container-fluid manage">
                        <div className="row mb-2">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-block manage-btn">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Search By" />
                                                </div>
                                            </div>

                                            <div className="col-md-2">
                                                <button className="btn btn-danger me-2">
                                                    <i className="bi bi-search"></i>
                                                </button>
                                                <button className="btn btn-success">
                                                    <i className="bi bi-arrow-clockwise"></i>
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
                                        <div className="row">
                                            <div className="col-sm-12 table-responsive">
                                                <table className="table-lg table-striped align-middle mb-0 table table-hover">
                                                    <thead className="thead-dark">
                                                        <tr>
                                                            <th><input type="checkbox" /></th>
                                                            <th>Sl. No</th>
                                                            <th>Email</th>
                                                            <th>Subscribed Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {[
                                                            { id: 1, email: 'Apeksha.chavda@gmail.com', date: '14-06-2018' },
                                                            { id: 2, email: 'Apeksha.chavda@gmail.com', date: '14-06-2018' },
                                                            { id: 3, email: 'Apeksha.chavda@gmail.com', date: '14-06-2018' },
                                                            { id: 4, email: 'Apeksha.chavda@gmail.com', date: '14-06-2018' },
                                                        ].map((order, index) => (
                                                            <tr key={order.id}>
                                                                <td><input type="checkbox" /></td>
                                                                <td>{index + 1}</td>
                                                                <td>{order.email}</td>
                                                                <td>{order.date}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>

                                                <nav aria-label="Page navigation example pt-4">
                                                    <ul className="pagination justify-content-end mt-4">
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
}

export default UserOrdersTable;
