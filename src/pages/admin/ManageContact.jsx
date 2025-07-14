import React, { useState } from 'react';
import { Search, ArrowRepeat, PencilSquare, Trash } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';


function ManageContact() {
    return (
        <div className="sidebar-mini fixed">
            <div className="wrapper">
          <HeaderAdmin />
                <aside className="main-sidebar hidden-print">
                    <Sidebar />
                </aside>

                <div className="content-wrapper pt-2 p-4">
                    <div className="main-header" style={{ marginTop: 0 }}>
                        <h4>Contact</h4>
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

                                            <div className="col-md-2">
                                                <button className="btn btn-danger me-2">
                                                    <i className="bi bi-search"></i>
                                                </button>

                                                <button className="btn btn-success">
                                                    <i className="bi bi-arrow-clockwise"></i>
                                                </button>
                                            </div>
                                            {/* <div className="col-md-7 text-end">
                                                <a href="create-cupon.php" className="btn-primary" type="button">Create New</a>
                                            </div> */}
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
                                                <h5>Manage Contact</h5>
                                            </div>
                                            <div className="col-md-6 text-right pt">
                                                <button className="btn btn-success me-2">Active</button>
                                                <button className="btn btn-default me-2">Inactive</button>
                                                <button className="btn btn-danger">Delete</button>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-12 table-responsive">
                                                <table className="table-lg table-striped align-middle mb-0 table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>S.No</th>
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>Mobile</th>
                                                            <th>Subject</th>
                                                            <th>Description</th>
                                                            <th>Contact Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>Mehul Galiyawala</td>
                                                            <td>Sales@styleelifestyle.com</td>
                                                            <td>9081117788</td>
                                                            <td>Business Proposal</td>
                                                            <td>Stylee Lifestyle # Business</td>
                                                            <td>29-04-2025</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
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

export default ManageContact;
