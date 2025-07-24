import React from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const ManageSliders = () => {
  const sliders = [
    {
      id: 1,
      title: 'Summer Sale',
      sliderImage: 'path/to/slider_image1.jpg',
      appImage: 'path/to/app_image1.jpg',
      description: 'Huge discounts on summer collection',
      link: 'https://example.com/summer',
      status: 'Active',
    },
    {
      id: 2,
      title: 'Winter Collection',
      sliderImage: 'path/to/slider_image2.jpg',
      appImage: 'path/to/app_image2.jpg',
      description: 'Warm and cozy winter wear',
      link: 'https://example.com/winter',
      status: 'Inactive',
    },
    {
      id: 3,
      title: 'New Arrivals',
      sliderImage: 'path/to/slider_image3.jpg',
      appImage: 'path/to/app_image3.jpg',
      description: 'Latest trending products',
      link: 'https://example.com/arrivals',
      status: 'Active',
    },
  ];

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this slider?')) {
      alert(`Slider with ID ${id} would be deleted.`);
      // Implement delete logic here (API call)
    }
  };

  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin />
        <aside className="main-sidebar hidden-print">
          <Sidebar />
        </aside>

        <div className="content-wrapper p-4">
          <div className="main-header mt-0 px-3 pt-3">
            <h4>Sliders</h4>
          </div>

          <div className="container-fluid manage px-3">
            <div className="row mb-2">
              <div className="col-md-12 text-end pt">
                <a href="/admin/add-slider" className="btn btn-primary py-1">
                  + Add New
                </a>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="row mb-2">
                  <div className="col-lg-6">
                    <h5>Manage Sliders</h5>
                  </div>
                  <div className="col-md-6 text-end pt">
                    <button className="btn btn-success me-2">Active</button>
                    <button className="btn btn-secondary me-2">Inactive</button>
                    <button className="btn btn-danger me-2">Delete</button>
                    <button className="btn btn-warning">Trash</button>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-striped table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>S.No</th>
                        <th>Title</th>
                        <th>Slider Image</th>
                        <th>App Image</th>
                        <th>Description</th>
                        <th>Link</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sliders.map((slider, index) => (
                        <tr key={slider.id}>
                          <td>{index + 1}</td>
                          <td>{slider.title}</td>
                          <td>
                            <img src={slider.sliderImage} alt={slider.title} width="50" />
                          </td>
                          <td>
                            <img src={slider.appImage} alt={slider.title} width="50" />
                          </td>
                          <td>{slider.description}</td>
                          <td>
                            <a href={slider.link} target="_blank" rel="noopener noreferrer">
                              {slider.link}
                            </a>
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                slider.status === 'Active'
                                  ? 'bg-primary'
                                  : 'bg-danger'
                              } text-light`}
                            >
                              {slider.status}
                            </span>
                          </td>
                         <td>
  <a href={`/edit-slider/${slider.id}`} className="btn btn-outline-success btn-sm me-2">
    <i className="bi bi-pencil"></i>
  </a>
  <button
    className="btn btn-outline-danger btn-sm"
    onClick={() => handleDelete(slider.id)}
  >
    <i className="bi bi-trash"></i>
  </button>
</td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSliders;
