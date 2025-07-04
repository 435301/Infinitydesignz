import React, { useState } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';

const AddSlider = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [sliderImage, setSliderImage] = useState(null);
  const [appSliderImage, setAppSliderImage] = useState(null);
  const [sliderPreview, setSliderPreview] = useState(null);
  const [appSliderPreview, setAppSliderPreview] = useState(null);

  const handleToggleSidebar = (collapsed) => setIsSidebarCollapsed(collapsed);

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === 'slider') {
          setSliderImage(file);
          setSliderPreview(reader.result);
        } else {
          setAppSliderImage(file);
          setAppSliderPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (type) => {
    if (type === 'slider') {
      setSliderImage(null);
      setSliderPreview(null);
    } else {
      setAppSliderImage(null);
      setAppSliderPreview(null);
    }
  };

  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin onToggleSidebar={handleToggleSidebar} />
        <aside className="main-sidebar hidden-print">
          <Sidebar isCollapsed={isSidebarCollapsed} />
        </aside>

        <div
          className="content-wrapper p-4"
          style={{
            marginLeft: isSidebarCollapsed ? '60px' : '295px',
            padding: '20px',
            transition: 'margin-left 0.3s ease',
          }}
        >
          <div className="container-fluid">
            <div className="card">
              <div className="card-header py-3 d-flex justify-content-between align-items-center">
                <h5 className="text-dark mb-0">Create a Slider</h5>
                <a href="/admin/manage-sliders" className="btn btn-primary btn-sm">Manage</a>
              </div>
              <div className="card-block">
                <form className="app-form" encType="multipart/form-data">
                  <div className="row d-flex justify-content-between">
                    <div className="col-lg-4 mb-3">
                      <label htmlFor="title" className="form-label">Title <span className="text-danger">*</span></label>
                      <input id="title" name="title" className="form-control" type="text" placeholder="Enter Title" />
                    </div>

                    <div className="col-lg-4 col-md-6 mb-3">
                      <label htmlFor="slider_image" className="form-label">Slider Image (100x100)</label>
                      <input
                        id="slider_image"
                        name="slider_image"
                        className="form-control"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, 'slider')}
                      />
                      {sliderPreview && (
                        <div className="image-preview" style={{ display: 'block' }}>
                          <img src={sliderPreview} alt="Slider Preview" style={{ maxWidth: '100px' }} />
                          <button type="button" className="remove-image" onClick={() => removeImage('slider')}>×</button>
                        </div>
                      )}
                    </div>

                    <div className="col-lg-4 col-md-6 mb-3">
                      <label htmlFor="app_slider_image" className="form-label">App Slider Image (100x100)</label>
                      <input
                        id="app_slider_image"
                        name="app_slider_image"
                        className="form-control"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, 'app')}
                      />
                      {appSliderPreview && (
                        <div className="image-preview" style={{ display: 'block' }}>
                          <img src={appSliderPreview} alt="App Slider Preview" style={{ maxWidth: '100px' }} />
                          <button type="button" className="remove-image" onClick={() => removeImage('app')}>×</button>
                        </div>
                      )}
                    </div>

                    <div className="col-lg-4 mb-3">
                      <label htmlFor="url" className="form-label">URL <span className="text-danger">*</span></label>
                      <input id="url" name="url" className="form-control" type="text" placeholder="Enter URL" />
                    </div>

                    <div className="col-lg-12 mb-3">
                      <label htmlFor="description" className="form-label">Description <span className="text-danger">*</span></label>
                      <textarea id="description" name="description" className="form-control" placeholder="Enter Description" />
                    </div>

                    <div className="col-lg-12 text-center my-4">
                      <button type="submit" className="btn btn-success py-2 px-5">SUBMIT</button>
                      <button type="button" className="btn btn-danger py-2 px-5" onClick={() => window.history.back()}>BACK</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSlider;
