import React, { useState } from 'react';
import { Search, ArrowRepeat, PencilSquare, Trash } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';

const HomePromotionCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({ title: '', displayCount: '' });

  const promotions = [
    {
      id: 1,
      title: 'Modern Sofa Set',
      image: '../../img/avatar-1.png',
      position: 1,
      displayCount: 12,
      priority: 1,
      status: 'Active',
    },
    {
      id: 2,
      title: 'Wooden Dining Table',
      image: '../../img/avatar-1.png',
      position: 2,
      displayCount: 8,
      priority: 1,
      status: 'Active',
    },
    {
      id: 3,
      title: 'Recliner Chair',
      image: '../../img/avatar-1.png',
      position: 3,
      displayCount: 10,
      priority: 2,
      status: 'Active',
    },
    {
      id: 4,
      title: 'Bookshelf',
      image: '../../img/avatar-1.png',
      position: 4,
      displayCount: 6,
      priority: 2,
      status: 'Inactive',
    },
  ];

  const handleEditClick = (promotion) => {
    setEditData({ title: promotion.title, displayCount: promotion.displayCount });
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditData({ title: '', displayCount: '' });
  };

  const handleModalSave = () => {
    console.log('Saving changes:', editData);
    setShowModal(false);
    setEditData({ title: '', displayCount: '' });
  };

  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin />
        <aside className="main-sidebar hidden-print">
          <Sidebar />
        </aside>
        <div className="content-wrapper p-4">
          <div className="main-header" style={{ marginTop: '0px' }}>
            <h4>Home Promotion Category</h4>
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
                      <div className="col-md-3">
                        <select className="form-control">
                          <option value="">- Select Status -</option>
                          <option value="active">Active</option>
                          <option value="inactive">In Active</option>
                        </select>
                      </div>
                      <div className="col-md-2">
                        <button className="btn btn-danger me-2">
                          <Search />
                        </button>
                        <button className="btn btn-success">
                          <ArrowRepeat />
                        </button>
                      </div>
                      <div className="col-md-4 text-end">
                        <a href="/admin/add-home-promotions-category" className="btn btn-primary">
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
                      <div className="col-lg-6"></div>
                      <div className="col-md-6 text-end pt">
                        <button className="btn btn-success me-2">Active</button>
                        <button className="btn btn-default me-2">In Active</button>
                        <button className="btn btn-danger">Update Priority</button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 table-responsive">
                        <table className="table-lg table-striped align-middle mb-0 table table-hover">
                          <thead>
                            <tr>
                              <th>
                                <input type="checkbox" id="select-all" />
                              </th>
                              <th>S.no</th>
                              <th>Title</th>
                              <th>Image</th>
                              <th>Position</th>
                              <th>Display Count</th>
                              <th>Priority</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {promotions.map((promotion, index) => (
                              <tr key={promotion.id}>
                                <td>
                                  <input type="checkbox" className="row-checkbox" />
                                </td>
                                <td>{index + 1}</td>
                                <td>{promotion.title}</td>
                                <td>
                                  <img
                                    src={promotion.image}
                                    alt={promotion.title}
                                    className="rounded-circle"
                                    width="25"
                                    height="25"
                                  />
                                </td>
                                <td>{promotion.position}</td>
                                <td>{promotion.displayCount}</td>
                                <td>{promotion.priority}</td>
                                <td>
                                  <span
                                    className={`badge ${
                                      promotion.status === 'Active'
                                        ? 'text-light-primary'
                                        : 'text-light-danger'
                                    }`}
                                    style={{
                                      backgroundColor:
                                        promotion.status === 'Active' ? '#d4f7f2' : '#f8d7da',
                                      color: promotion.status === 'Active' ? '#28a745' : '#dc3545',
                                    }}
                                  >
                                    {promotion.status}
                                  </span>
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-light icon-btn b-r-4 me-2"
                                    onClick={() => handleEditClick(promotion)}
                                  >
                                    <PencilSquare style={{ color: '#dc3545' }} />
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-light icon-btn b-r-4"
                                  >
                                    <Trash style={{ color: '#dc3545' }} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <nav aria-label="Page navigation example">
                          <ul className="pagination justify-content-end mt-3">
                            <li className="page-item disabled">
                              <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">
                                Previous
                              </a>
                            </li>
                            <li className="page-item">
                              <a className="page-link" href="#">
                                1
                              </a>
                            </li>
                            <li className="page-item">
                              <a className="page-link" href="#">
                                2
                              </a>
                            </li>
                            <li className="page-item">
                              <a className="page-link" href="#">
                                3
                              </a>
                            </li>
                            <li className="page-item">
                              <a className="page-link" href="#">
                                Next
                              </a>
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

      {/* Modal */}
      <div
        className={`modal fade ${showModal ? 'show d-block' : ''}`}
        id="editPopupModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editPopupModalLabel"
        aria-hidden={!showModal}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editPopupModalLabel">
                Update Promotion Category
              </h5>
              <button
                type="button"
                className="close"
                onClick={handleModalClose}
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="editTitle">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editTitle"
                    placeholder="Enter Title"
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="editDisplayCount">Display Count*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editDisplayCount"
                    placeholder="Enter Display Count"
                    value={editData.displayCount}
                    onChange={(e) =>
                      setEditData({ ...editData, displayCount: e.target.value })
                    }
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleModalClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleModalSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default HomePromotionCategory;