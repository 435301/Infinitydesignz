import React from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const CreateAppPromotionHeader = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add form submission logic here
    alert('Form submitted!');
  };

  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin />
        <aside className="main-sidebar hidden-print">
          <Sidebar />
        </aside>

        <div className="content-wrapper p-4">
          <div className="container-fluid">
            <div className="row py-4">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header py-3 d-flex justify-content-between align-items-center">
                    <h5 className="text-dark mb-0">Create App Promotion Header</h5>
                    <a href="/admin/menu-promotion-category" className="btn btn-primary btn-sm">Manage</a>
                  </div>

                  <div className="card-block">
                    <form className="app-form" onSubmit={handleSubmit} encType="multipart/form-data">
                      <div className="row">
                        {/* Title */}
                        <div className="col-lg-4 mb-3">
                          <label htmlFor="title" className="form-label">Title <span className="text-danger">*</span></label>
                          <input id="title" name="title" placeholder="Title" className="form-control" type="text" />
                        </div>

                        {/* Menu */}
                        <div className="col-lg-4 mb-3">
                          <label htmlFor="menu" className="form-label">Menu <span className="text-danger">*</span></label>
                          <select id="menu" name="menu" className="form-control">
                            <option value="" disabled selected>- Select Menu -</option>
                            {/* You can map menu options here dynamically */}
                          </select>
                        </div>

                        {/* Display Count */}
                        <div className="col-lg-4 mb-3">
                          <label htmlFor="displayCount" className="form-label">Display Count <span className="text-danger">*</span></label>
                          <input id="displayCount" name="displayCount" placeholder="Display Count" className="form-control" type="text" />
                        </div>

                        {/* Display Columns */}
                        <div className="col-lg-4 mb-3">
                          <label htmlFor="displayColumns" className="form-label">Display Columns <span className="text-danger">*</span></label>
                          <input id="displayColumns" name="displayColumns" placeholder="Display Columns" className="form-control" type="text" />
                        </div>

                        {/* Image */}
                        <div className="col-lg-4 mb-3">
                          <label htmlFor="image" className="form-label">Image</label>
                          <input id="image" name="image" className="form-control" type="file" />
                        </div>

                        {/* Submit & Back Buttons */}
                        <div className="col-lg-12 text-center my-4">
                          <button type="submit" className="btn btn-danger py-2 px-5 me-2">SUBMIT</button>
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
      </div> {/* End wrapper */}
    </div>
  );
};

export default CreateAppPromotionHeader;
