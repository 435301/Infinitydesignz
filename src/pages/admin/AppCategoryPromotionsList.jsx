import React from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';

const AppCategoryPromotionsList = () => {
    const data = [
        {
            id: 1,
            title: 'Modern Sofa Set',
            menu: 'Modern Sofa Set',
            submenu: '1',
            image: '12',
            priority: 1,
            status: 'Active',
        },
        {
            id: 2,
            title: 'Wooden Dining Table',
            menu: 'Modern Sofa Set',
            submenu: '2',
            image: '8',
            priority: 1,
            status: 'Active',
        },
        {
            id: 3,
            title: 'Recliner Chair',
            menu: 'Modern Sofa Set',
            submenu: '3',
            image: '10',
            priority: 1,
            status: 'Active',
        },
        {
            id: 4,
            title: 'Bookshelf',
            menu: 'Modern Sofa Set',
            submenu: '4',
            image: '6',
            priority: 1,
            status: 'Inactive',
        },
    ];

    const getStatusBadge = (status) => {
        return (
            <span
                className="badge"
                style={{
                    backgroundColor: status === 'Active' ? '#d4f7f2' : '#f8d7da',
                    color: status === 'Active' ? '#28a745' : '#dc3545',
                    fontWeight: '500',
                }}
            >
                {status}
            </span>
        );
    };

    return (
        <div className="sidebar-mini fixed">
            <div className="wrapper">
                <HeaderAdmin />
                <aside className="main-sidebar hidden-print">
                    <Sidebar />
                </aside>

                <div className="content-wrapper p-4 pt-1">
                    <div className="main-header" style={{ marginTop: 0 }}>
                        <h4>App Category Promotions List</h4>
                    </div>

                    <div className="container-fluid manage">
                        <div className="row mb-2">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-block manage-btn">
                                        <div className="row align-items-center">
                                            <div className="col-lg-2">
                                                <select className="form-control">
                                                    <option value="">- Select Status -</option>
                                                    <option value="active">Active</option>
                                                    <option value="inactive">In Active</option>
                                                </select>
                                            </div>

                                            <div className="col-lg-2 ps-0">
                                                <select className="form-control">
                                                    <option value="">- Select Menu -</option>
                                                    <option value="26">Home & Kitchen</option>
                                                    <option value="37">Kids</option>
                                                    <option value="44">Luggage & Travel</option>
                                                    <option value="7">Men</option>
                                                    <option value="36">Mobile</option>
                                                    <option value="47">Sports & Fitness</option>
                                                    <option value="3">Women</option>
                                                </select>
                                            </div>

                                            <div className="col-lg-2 ps-0">
                                                <select className="form-control">
                                                    <option value="">- Select Sub Menu -</option>
                                                    <option value="26">Home & Kitchen</option>
                                                    <option value="37">Kids</option>
                                                    <option value="44">Luggage & Travel</option>
                                                    <option value="7">Men</option>
                                                    <option value="36">Mobile</option>
                                                    <option value="47">Sports & Fitness</option>
                                                    <option value="3">Women</option>
                                                </select>
                                            </div>

                                            <div className="col-lg-2 ps-0">
                                                <input type="text" className="form-control" placeholder="Search By" />
                                            </div>

                                            <div className="col-lg-2 ps-0">
                                                <div className="input-group-append mx-3 d-flex gap-2">
                                                    <button className="btn btn-danger" type="button">
                                                        <i className="bi bi-search" />
                                                    </button>
                                                    <button className="btn btn-success" type="button">
                                                        <i className="bi bi-arrow-clockwise" />
                                                    </button>
                                                </div>
                                            </div>


                                            <div className="col-lg-2 text-end">
                                                <a href="/admin/app-category-promotions-list" className="btn btn-primary">+ Add New</a>
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
                                            <div className="col-md-12 text-end pt pt">
                                                <button className="btn btn-success me-2">Active</button>
                                                <button className="btn btn-secondary me-2">In Active</button>
                                                <button className="btn btn-danger">Update Priority</button>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-12 table-responsive">
                                                <table className="table-lg table-striped align-middle mb-0 table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th><input type="checkbox" id="select-all" /></th>
                                                            <th>S.no</th>
                                                            <th>Title</th>
                                                            <th>Menu</th>
                                                            <th>Submenu</th>
                                                            <th>Image</th>
                                                            <th>Priority</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {data.map((item, index) => (
                                                            <tr key={item.id}>
                                                                <td><input type="checkbox" className="row-checkbox" /></td>
                                                                <td>{index + 1}</td>
                                                                <td>{item.title}</td>
                                                                <td>{item.menu}</td>
                                                                <td>{item.submenu}</td>
                                                                <td>{item.image}</td>
                                                                <td>{item.priority}</td>
                                                                <td>{getStatusBadge(item.status)}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* End Card */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppCategoryPromotionsList;
