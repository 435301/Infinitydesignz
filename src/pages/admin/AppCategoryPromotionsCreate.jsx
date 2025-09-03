import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';

const AppCategoryPromotionsCreate = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const previewImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Image preview:', file.name);
    }
  };
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

          <div className="main-header">
            <h4>App Category Promotions Create</h4>
          </div>

          <div className="container-fluid">
            <div className="row py-4">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header py-3 d-flex justify-content-between align-items-center">
                    <h5 className="text-dark mb-0">Create App Category Promotion</h5>
                    <a href="/admin/menu-create-promotion" className="btn btn-primary btn-sm">Manage</a>
                  </div>

                  <div className="card-block">
                    <form className="app-form" encType="multipart/form-data">
                      <div className="row">

                        {/* --- Section: Promotion Basic Details --- */}
                        <div className="col-lg-12 mb-3">
                          <h6 className="text-info mb-0">Promotion Basic Details</h6>
                          <hr />
                        </div>

                        <div className="col-lg-4 mb-3">
                          <label className="form-label">Display Menu</label>
                          <select className="form-control" name="priority">
                            <option value="">Please select position</option>
                            <option value="1">Top</option>
                            <option value="2">Middle</option>
                            <option value="3">Bottom</option>
                          </select>
                        </div>

                        <div className="col-lg-4 mb-3">
                          <label className="form-label">Title <span className="text-danger">*</span></label>
                          <input type="text" className="form-control" name="title" placeholder="Title" />
                        </div>

                        <div className="col-lg-4 mb-3">
                          <label className="form-label">Image <span className="text-danger">*</span></label>
                          <input
                            type="file"
                            className="form-control"
                            name="app_icon"
                            accept="image/*"
                            onChange={previewImage}
                          />
                        </div>

                        {/* --- Section: Promotion Based On --- */}
                        <div className="col-lg-12 mb-3 mt-4">
                          <h6 className="text-info">Promotion Based On</h6>
                          <hr />
                        </div>

                        <div className="col-lg-4 mb-3">
                          <label className="form-label">Menu <span className="text-danger">*</span></label>
                          <select className="form-control" name="menu">
                            <option value="">--Choose Menu--</option>
                          </select>
                        </div>

                        <div className="col-lg-4 mb-3">
                          <label className="form-label">Sub Menu <span className="text-danger">*</span></label>
                          <select className="form-control" name="sub_menu">
                            <option value="">--Choose Sub Menu--</option>
                          </select>
                          <div className="mt-1 Create-sub">
                            <a href="#" >Create Sub Menu</a> |{' '}
                            <a href="#">Create Brand</a>
                          </div>
                        </div>

                        <div className="col-lg-4 mb-3">
                          <label className="form-label">List Sub Menu <span className="text-danger">*</span></label>
                          <select className="form-control" name="list_sub_menu">
                            <option value="">--Choose List Sub Menu--</option>
                          </select>
                          <div className="mt-1 Create-sub">
                            <a href="#">Create List Sub Menu</a>
                          </div>
                        </div>

                        <div className="col-lg-4 mb-3">
                          <label className="form-label">Brand</label>
                          <input type="text" className="form-control" name="brand" placeholder="Enter brand" />
                        </div>

                        <div className="col-lg-4 mb-3">
                          <label className="form-label">Min Price</label>
                          <input type="text" className="form-control" name="min_price" placeholder="Enter minimum price" />
                        </div>

                        <div className="col-lg-4 mb-3">
                          <label className="form-label">Max Price</label>
                          <input type="text" className="form-control" name="max_price" placeholder="Enter maximum price" />
                        </div>

                        <div className="col-lg-4 mb-3">
                          <label className="form-label">Offer(%) From</label>
                          <input type="text" className="form-control" name="offer_from" placeholder="Offer % from" />
                        </div>

                        <div className="col-lg-4 mb-3">
                          <label className="form-label">Offer(%) To</label>
                          <input type="text" className="form-control" name="offer_to" placeholder="Offer % to" />
                        </div>

                        <div className="col-lg-4 mb-3">
                          <label className="form-label">SEO Title</label>
                          <input type="text" className="form-control" name="seo_title" placeholder="SEO Title" />
                        </div>

                        <div className="col-lg-4 mb-3">
                          <label className="form-label">Status</label>
                          <select className="form-control" name="status">
                            <option value="">- Select Status -</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>

                        {/* Submit Buttons */}
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
};

export default AppCategoryPromotionsCreate;
