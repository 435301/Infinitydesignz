import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';

function AppCategoryPromotionForm() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const handleToggleSidebar = (collapsed) => {
        setIsSidebarCollapsed(collapsed);
    };
    return (
        <div className="sidebar-mini fixed">
            <div className="wrapper">
                <HeaderAdmin onToggleSidebar={handleToggleSidebar} />
                <aside className="main-sidebar hidden-print">
                    <Sidebar isCollapsed={isSidebarCollapsed} />
                </aside>

                <div className="content-wrapper mb-4" style={{ marginLeft: isSidebarCollapsed ? '60px' : '272px', padding: '20px', flex: 1, transition: 'margin-left 0.3s ease', }}>

                    <div className="container-fluid">
                        <div className="row py-4">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header py-3 d-flex justify-content-between align-items-center py-3">
                                        <h5 className="text-dark mb-0">App Category Promotions List</h5>
                                        <a href="/admin/sub-menu-create-promotion" className="btn btn-primary btn-sm">Manage</a>
                                    </div>

                                    <div className="card-block">
                                        <form className="app-form">
                                            <div className="row">

                                                <div className="col-lg-12 mb-3">
                                                    <h6 className="text-info mb-0">Promotion Basic Details</h6>
                                                    <hr />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label htmlFor="title" className="form-label">Title <span className="text-danger">*</span></label>
                                                    <input id="title" name="title" placeholder="Title" className="form-control" type="text" />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label htmlFor="app_icon" className="form-label">Image <span className="text-danger">*</span></label>
                                                    <input id="app_icon" name="app_icon" className="form-control" type="file" accept="image/*" />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label htmlFor="priority" className="form-label">Display Position</label>
                                                    <select id="priority" name="priority" className="form-control">
                                                        <option value="">Please select position</option>
                                                        <option value="1">Top</option>
                                                        <option value="2">Middle</option>
                                                        <option value="3">Bottom</option>
                                                    </select>
                                                </div>

                                                <div className="col-lg-12 mb-3 mt-4">
                                                    <h6 className="text-info">Promotion Based On</h6>
                                                    <hr />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label htmlFor="menu" className="form-label">Menu <span className="text-danger">*</span></label>
                                                    <select id="menu" name="menu" className="form-control">
                                                        <option value="">--Choose Menu--</option>
                                                    </select>
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label htmlFor="sub_menu" className="form-label">Sub Menu <span className="text-danger">*</span></label>
                                                    <select id="sub_menu" name="sub_menu" className="form-control">
                                                        <option value="">--Choose Sub Menu--</option>
                                                    </select>
                                                    <div className="mt-1">
                                                        <a href="#" style={{ fontSize: '10px' }}>Create Sub Menu</a> | <a href="#" style={{ fontSize: '10px' }}>Create Brand</a>
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label htmlFor="list_sub_menu" className="form-label">List Sub Menu <span className="text-danger">*</span></label>
                                                    <select id="list_sub_menu" name="list_sub_menu" className="form-control">
                                                        <option value="">--Choose List Sub Menu--</option>
                                                    </select>
                                                    <div className="mt-1">
                                                        <a href="#" style={{ fontSize: '10px' }}>Create List Sub Menu</a>
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label htmlFor="brand" className="form-label">Brand</label>
                                                    <input id="brand" name="brand" className="form-control" type="text" placeholder="Enter brand" />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label htmlFor="min_price" className="form-label">Min Price</label>
                                                    <input id="min_price" name="min_price" className="form-control" type="text" placeholder="Enter minimum price" />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label htmlFor="max_price" className="form-label">Max Price</label>
                                                    <input id="max_price" name="max_price" className="form-control" type="text" placeholder="Enter maximum price" />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label htmlFor="offer_from" className="form-label">Offer(%) From</label>
                                                    <input id="offer_from" name="offer_from" className="form-control" type="text" placeholder="Offer % from" />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label htmlFor="offer_to" className="form-label">Offer(%) To</label>
                                                    <input id="offer_to" name="offer_to" className="form-control" type="text" placeholder="Offer % to" />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label htmlFor="seo_title" className="form-label">SEO Title</label>
                                                    <input id="seo_title" name="seo_title" className="form-control" type="text" placeholder="SEO Title" />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label htmlFor="status" className="form-label">Status</label>
                                                    <select id="status" name="status" className="form-control">
                                                        <option value="" disabled>- Select Status -</option>
                                                        <option value="active">Active</option>
                                                        <option value="inactive">Inactive</option>
                                                    </select>
                                                </div>

                                                <div className="col-lg-12 text-center my-4">
                                                    <button type="submit" className="btn btn-danger py-2 px-5">SUBMIT</button>
                                                    <button type="button" className="btn btn-success py-2 px-5" onClick={() => window.history.back()}>BACK</button>
                                                </div>
                                            </div>
                                        </form>
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

export default AppCategoryPromotionForm;
