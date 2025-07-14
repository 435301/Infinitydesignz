import React from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';

const ManagePromotions = () => {
    const promotions = [
        { id: 1, title: 'Modern Sofa Set', category: 'Modern Sofa Set', image: 'assets/images/avatar-1.png', priority: 12, status: 'Active' },
        { id: 2, title: 'Wooden Dining Table', category: 'Modern Sofa Set', image: 'assets/images/avatar-1.png', priority: 8, status: 'Active' },
        { id: 3, title: 'Recliner Chair', category: 'Modern Sofa Set', image: 'assets/images/avatar-1.png', priority: 10, status: 'Active' },
        { id: 4, title: 'Bookshelf', category: 'Modern Sofa Set', image: 'assets/images/avatar-1.png', priority: 6, status: 'Inactive' },
    ];

    const getStatusBadge = (status) => (
        <span
            className="badge"
            style={{
                backgroundColor: status === 'Active' ? '#d4f7f2' : '#f8d7da',
                color: status === 'Active' ? '#28a745' : '#dc3545',
            }}
        >
            {status}
        </span>
    );

    return (
        <div className="sidebar-mini fixed">
            <div className="wrapper">
                <HeaderAdmin />
                <aside className="main-sidebar hidden-print">
                    <Sidebar />
                </aside>

                <div className="content-wrapper pt-2 p-4">
                    <div className="main-header mt-0">
                        <h4>Create Promotion</h4>
                    </div>

                    <div className="container-fluid manage">
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-block manage-btn">
                                        <div className="row align-items-center">
                                            <div className="col-lg-2">
                                                <select className="form-control">
                                                    <option>- Select Status -</option>
                                                    <option value="active">Active</option>
                                                    <option value="inactive">In Active</option>
                                                </select>
                                            </div>

                                            <div className="col-lg-3">
                                                <select className="form-control">
                                                    <option>- Select Category -</option>
                                                    <option value="26">Home & Kitchen</option>
                                                    <option value="37">Kids</option>
                                                    <option value="44">Luggage & Travel</option>
                                                    <option value="7">Men</option>
                                                    <option value="36">Mobile</option>
                                                    <option value="47">Sports & Fitness</option>
                                                    <option value="3">Women</option>
                                                </select>
                                            </div>

                                            <div className="col-lg-2 p-0">
                                                <input type="text" className="form-control" placeholder="Search By" />
                                            </div>

                                            <div className="col-lg-2 ps-0">
                                                <div className="input-group-append mx-3">
                                                    <button className="btn btn-danger me-2"><i className="bi bi-search"></i></button>
                                                    <button className="btn btn-success"><i className="bi bi-arrow-clockwise"></i></button>
                                                </div>
                                            </div>

                                            <div className="col-lg-3 text-end">
                                                <a href="/admin/app-category-promotions-list-create" className="btn btn-primary">+ Add New</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Promotion Table */}
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-block">
                                        <div className="row mb-3">
                                            <div className="col-md-6"></div>
                                            <div className="col-md-6 text-end">
                                                <button className="btn btn-success me-2">Active</button>
                                                <button className="btn btn-secondary me-2">In Active</button>
                                                <button className="btn btn-danger">Update Priority</button>
                                            </div>
                                        </div>

                                        <div className="table-responsive">
                                            <table className="table table-hover table-striped table-lg align-middle">
                                                <thead>
                                                    <tr>
                                                        <th><input type="checkbox" /></th>
                                                        <th>S.no</th>
                                                        <th>Title</th>
                                                        <th>Category</th>
                                                        <th>Image</th>
                                                        <th>Priority</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {promotions.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td><input type="checkbox" /></td>
                                                            <td>{index + 1}</td>
                                                            <td>{item.title}</td>
                                                            <td>{item.category}</td>
                                                            <td><img src={item.image} alt={item.title} className="rounded-circle" width="50" height="50" /></td>
                                                            <td>{item.priority}</td>
                                                            <td>{getStatusBadge(item.status)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination justify-content-end">
                                                    <li className="page-item disabled"><a className="page-link">Previous</a></li>
                                                    <li className="page-item"><a className="page-link">1</a></li>
                                                    <li className="page-item"><a className="page-link">2</a></li>
                                                    <li className="page-item"><a className="page-link">3</a></li>
                                                    <li className="page-item"><a className="page-link">Next</a></li>
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
        </div >
    );
};

export default ManagePromotions;
