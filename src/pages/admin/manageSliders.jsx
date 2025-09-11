import React, { useEffect, useState } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { addSliders, bulkUpdateSliderStatus, deleteSliders, editSliders, fetchSliders } from '../../redux/actions/slidersAction';
import { useDispatch, useSelector } from 'react-redux';
import BASE_URL from '../../config/config';
import AddSliderModal from '../../components/addSlider';
import EditSliderModal from '../../components/editSliderModal';
import DeleteModal from '../../modals/deleteModal';
import ViewSliderModal from '../../modals/viewSliderModal';
import PaginationComponent from '../../includes/pagination';
import { toast } from 'react-toastify';
import { TiTrash } from 'react-icons/ti';
import { BsEye, BsPencilSquare } from 'react-icons/bs';

const ManageSliders = () => {
  const { sliders, loading, error } = useSelector((state) => state.sliders);
  console.log('sliders', sliders)
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setEditShowModal] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState(null);
  const [sliderToDelete, setSliderToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewSlider, setViewSlider] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    dispatch(fetchSliders('all'));
  }, [dispatch])

  // Pagination logic
  const rowsPerPage = 10;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  // const currentRows = sliders.slice(indexOfFirstRow, indexOfLastRow);
  const currentRows = (sliders || []).slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(sliders.length / rowsPerPage);

  const handleToggleSidebar = (collapsed) => setIsSidebarCollapsed(collapsed);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };


  const handleAddSlider = (formData) => {
    dispatch(addSliders(formData));
  };

  const handleEdit = (slider) => {
    setSelectedSlider(slider);
    setEditShowModal(true);
  };

  console.log("selectedSlider", selectedSlider);

  const handleDeleteClick = (id) => {
    setSliderToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteSliders(sliderToDelete));
    setShowDeleteModal(false);
    setSliderToDelete(null);
  };

  // Row selection
  const handleRowCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Select all rows
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentRows.map((brand) => brand.id));
    }
    setSelectAll(!selectAll);
  };


  const handleBulkStatusUpdate = async (newStatus) => {
    if (selectedRows.length === 0) {
      toast.warning("Please select at least one slider.");
      return;
    }

    await dispatch(bulkUpdateSliderStatus(selectedRows, newStatus));
    setSelectedRows([]);
  };



  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin onToggleSidebar={handleToggleSidebar} />
        <aside className="main-sidebar hidden-print">
          <Sidebar isCollapsed={isSidebarCollapsed} onClose={() => setIsSidebarCollapsed(true)} />
        </aside>

        <div
          className="content-wrapper mb-4"
          style={{
            marginLeft: isSidebarCollapsed ? '60px' : '272px',
            padding: '20px',
            flex: 1,
            transition: 'margin-left 0.3s ease',
          }}
        >
          <div className="main-header mt-0 px-3 pt-3">
            <h4>Sliders</h4>
          </div>

          <div className="container-fluid manage px-3">
            <div className="row mb-2">
              <div className="col-md-12 text-end pt pt">
                <button className="btn btn-primary" type="button" onClick={() => setShowModal(true)}>
                  + Add New
                </button>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row mb-2">
                  <div className="col-lg-6">
                    <h5>Manage Sliders</h5>
                  </div>
                  <div className="col-md-6 text-end pt pt">
                    <button className="btn btn-success me-2" disabled={selectedRows.length === 0}
                      onClick={() => handleBulkStatusUpdate(true)}>Active</button>
                    <button className="btn btn-danger" disabled={selectedRows.length === 0}
                      onClick={() => handleBulkStatusUpdate(false)}>Inactive</button>

                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-striped table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>
                          <input
                            type="checkbox"
                            checked={selectedRows.length === currentRows.length && currentRows.length > 0}
                            onChange={handleSelectAll}
                          />
                        </th>
                        <th>S.No</th>
                        <th>Title</th>
                        <th>Slider Image</th>
                        <th>Link</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="12" className="text-center">
                            <p>Loading...</p>
                          </td>
                        </tr>
                      ) : (
                        currentRows?.length > 0 ? (
                          currentRows.map((slider, index) => (
                            <tr key={slider?.id}>
                              <td>
                                <input
                                  type="checkbox"
                                  checked={selectedRows.includes(slider?.id)}
                                  onChange={() => handleRowCheckboxChange(slider?.id)}
                                />
                              </td>
                              <td>{index + 1}</td>
                              <td>{slider?.title}</td>
                              <td>
                                <img src={`${BASE_URL}${slider?.image_url}`} alt={slider?.title} width="80" />
                              </td>
                              <td>
                                <a href={slider?.link} target="_blank" rel="noopener noreferrer">
                                  {slider?.link}
                                </a>
                              </td>
                              <td>{slider?.priority}</td>
                              <td>
                                <span
                                  className={`badge ${slider?.status ? 'text-light-primary' : 'text-light-danger'} `}
                                >
                                  {slider?.status ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td>
                                <button
                                  // onClick={() => {
                                  //   setSelectedSlider(slider);  
                                  //   setEditShowModal(true); 
                                  // }}
                                  onClick={() => handleEdit(slider)}
                                  className="btn btn-light icon-btn mx-1 m-2 text-success"
                                >
                                  <BsPencilSquare />
                                </button>
                                <button
                                  className="btn btn-light icon-btn mx-1 m-2 text-primary"
                                  onClick={() => {
                                    setViewSlider(slider);
                                    setShowViewModal(true);
                                  }}
                                >
                                  <BsEye />
                                </button>


                                <button
                                  className="btn btn-light icon-btn mx-1 m-2 text-danger"
                                  onClick={() => handleDeleteClick(slider?.id)}
                                >
                                  <TiTrash />
                                </button>

                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8" className="text-center">
                              No sliders found.
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            {showModal && (
              <AddSliderModal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={handleAddSlider} />
            )}
            {showEditModal && selectedSlider && (
              <EditSliderModal
                isOpen={showEditModal}
                onClose={() => setEditShowModal(false)}
                slider={selectedSlider}
              />
            )}
            {showDeleteModal && <DeleteModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleDelete} message="Are you sure you want to delete this slider?" />}
            {showViewModal && viewSlider && (
              <ViewSliderModal isOpen={showViewModal} onClose={() => setShowViewModal(false)} slider={viewSlider} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSliders;
