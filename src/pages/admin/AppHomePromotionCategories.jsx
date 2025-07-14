import React from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';

const AppHomePromotionCategories = () => {
    const data = [
        { id: 1, title: 'Modern Sofa Set', count: 1, rows: 12, priority: 1, status: 'Active' },
        { id: 2, title: 'Wooden Dining Table', count: 2, rows: 8, priority: 2, status: 'Active' },
        { id: 3, title: 'Recliner Chair', count: 3, rows: 10, priority: 3, status: 'Active' },
        { id: 4, title: 'Bookshelf', count: 4, rows: 6, priority: 4, status: 'Inactive' },
    ];

    const getStatusBadge = (status) => (
        <span
            className="badge text-light-primary"
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

                <div className="content-wrapper p-4 pt-2">
                    <div className="main-header" style={{ marginTop: 0 }}>
                        <h4>App Home Promotion Categories</h4>
                    </div>

                    <div className="container-fluid manage">
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-block manage-btn">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <input type="text" className="form-control" placeholder="Search By" />
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
                                                    <i className="bi bi-search"></i>
                                                </button>
                                                <button className="btn btn-success">
                                                    <i className="bi bi-arrow-clockwise"></i>
                                                </button>
                                            </div>

                                            <div className="col-md-4 text-end">
                                                <a href="/admin/app-home-promotion-categories-app" className="btn btn-primary">
                                                    + Add New
                                                </a>
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
                                            <div className="col-md-12 text-end">
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
                                                        <th>Display Count</th>
                                                        <th>Display Rows</th>
                                                        <th>Priority</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((item, idx) => (
                                                        <tr key={item.id}>
                                                            <td><input type="checkbox" /></td>
                                                            <td>{idx + 1}</td>
                                                            <td>{item.title}</td>
                                                            <td>{item.count}</td> {/* Display Count */}
                                                            <td>{item.rows}</td>  {/* Display Rows */}
                                                            <td>{item.priority}</td> {/* Priority */}
                                                            <td>{getStatusBadge(item.status)}</td>
                                                            <td>
                                                                <button className="btn btn-light icon-btn me-2">
                                                                    <i className="bi bi-pencil text-danger"></i>
                                                                </button>
                                                                <button className="btn btn-light icon-btn">
                                                                    <i className="bi bi-trash text-danger"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>

                                            </table>

                                            <nav className="mt-3">
                                                <ul className="pagination justify-content-end">
                                                    <li className="page-item disabled">
                                                        <a className="page-link">Previous</a>
                                                    </li>
                                                    <li className="page-item"><a className="page-link">1</a></li>
                                                    <li className="page-item"><a className="page-link">2</a></li>
                                                    <li className="page-item"><a className="page-link">3</a></li>
                                                    <li className="page-item">
                                                        <a className="page-link">Next</a>
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
    );
};

export default AppHomePromotionCategories;
