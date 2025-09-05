import React, { useState } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const PromotionCategoryList = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const [editModalOpen, setEditModalOpen] = useState(false);
  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

    const data = [
        { id: 1, title: 'Modern Sofa Set', menu: 'Modern Sofa Set', submenu: 1, displayCount: 12, displayRows: 1, priority: 1, status: 'Active' },
        { id: 2, title: 'Wooden Dining Table', menu: 'Modern Sofa Set', submenu: 2, displayCount: 8, displayRows: 1, priority: 1, status: 'Active' },
        { id: 3, title: 'Recliner Chair', menu: 'Modern Sofa Set', submenu: 3, displayCount: 10, displayRows: 2, priority: 1, status: 'Active' },
        { id: 4, title: 'Bookshelf', menu: 'Modern Sofa Set', submenu: 4, displayCount: 6, displayRows: 2, priority: 1, status: 'Inactive' },
    ];

    const openModal = () => setEditModalOpen(true);
    const closeModal = () => setEditModalOpen(false);

    return (
        <div className="sidebar-mini fixed">
            <div className="wrapper">
                <HeaderAdmin onToggleSidebar={handleToggleSidebar} />
                <aside className="main-sidebar hidden-print">
                    <Sidebar isCollapsed={isSidebarCollapsed} onClose={() => setIsSidebarCollapsed(true)} />
                </aside>

                <div className="content-wrapper mb-4" style={{ marginLeft: isSidebarCollapsed ? '60px' : '272px', padding: '20px', flex: 1, transition: 'margin-left 0.3s ease', }}>

                    <div className="main-header mt-0">
                        <h4>Create Promotion Category</h4>
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
                                                    <option value="1">Sub Menu 1</option>
                                                    <option value="2">Sub Menu 2</option>
                                                </select>
                                            </div>
                                            <div className="col-lg-2 ps-0">
                                                <input type="text" className="form-control" placeholder="Search By" />
                                            </div>
                                            <div className="col-lg-2 ps-0">
                                                <div className="d-flex gap-2">
                                                    <button className="btn btn-danger">
                                                        <i className="bi bi-search"></i> {/* Bootstrap search icon */}
                                                    </button>
                                                    <button className="btn btn-success">
                                                        <i className="bi bi-arrow-clockwise"></i> {/* Bootstrap refresh icon */}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="col-lg-2 text-end">
                                                <a href="/admin/add-menu-create-promotions" className="btn btn-primary">+ Add New</a>
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
                                        <div className="table-responsive">
                                            <table className="table table-lg table-striped table-hover align-middle">
                                                <thead>
                                                    <tr>
                                                        <th><input type="checkbox" /></th>
                                                        <th>S.no</th>
                                                        <th>Title</th>
                                                        <th>Menu</th>
                                                        <th>Submenu</th>
                                                        <th>Display Count</th>
                                                        <th>Display Rows</th>
                                                        <th>Priority</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td><input type="checkbox" /></td>
                                                            <td>{index + 1}</td>
                                                            <td>{item.title}</td>
                                                            <td>{item.menu}</td>
                                                            <td>{item.submenu}</td>
                                                            <td>{item.displayCount}</td>
                                                            <td>{item.displayRows}</td>
                                                            <td>{item.priority}</td>
                                                            <td>
                                                                <span className={`badge ${item.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
                                                                    {item.status}
                                                                </span>
                                                            </td>


                                                            <td>
                                                                <button className="btn btn-light icon-btn mx-1 b-r-4 me-2" onClick={openModal}>
                                                                    <i className="bi bi-pencil text-danger"></i> {/* Bootstrap pencil/edit icon */}
                                                                </button>
                                                                <button className="btn btn-light icon-btn mx-1 b-r-4">
                                                                    <i className="bi bi-trash text-danger"></i> {/* Bootstrap trash/delete icon */}
                                                                </button>
                                                            </td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <nav className="mt-3">
                                            <ul className="pagination justify-content-end">
                                                <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                            </ul>
                                        </nav>

                                        {/* Modal */}
                                        {editModalOpen && (
                                            <div className="modal show d-block" tabIndex="-1" role="dialog">
                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title">Update Promotion Category</h5>
                                                            <button type="button" className="close" onClick={closeModal}><span>&times;</span></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <form className="row">
                                                                <div className="form-group col-lg-6">
                                                                    <label>Display Count*</label>
                                                                    <input type="text" className="form-control" placeholder="Enter Count" />
                                                                </div>
                                                                <div className="form-group col-lg-6">
                                                                    <label>Display Rows*</label>
                                                                    <input type="text" className="form-control" placeholder="Enter Rows" />
                                                                </div>
                                                            </form>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button className="btn btn-danger" onClick={closeModal}>Close</button>
                                                            <button className="btn btn-success">Save changes</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

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

export default PromotionCategoryList;
