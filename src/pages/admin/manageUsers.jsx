import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import { useDispatch, useSelector } from 'react-redux';
import { bulkUpdateAdminUserStatus, deleteAdminUser, fetchAdminUsers } from '../../redux/actions/adminUsersAction';
import moment from 'moment';
import { BsTrash } from 'react-icons/bs';
import DeleteModal from '../../modals/deleteModal';
import EditAdminUserModal from '../../components/editAdminUserModal';
import PaginationComponent from '../../includes/pagination';
import { toast } from 'react-toastify';

const ManageUsers = ({ handleUpdate }) => {
  const dispatch = useDispatch();
  const { users, loading, error, page, totalPages } = useSelector((state) => state.adminUsers);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminUserToDelete, setadminUserToDelete] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    dispatch(fetchAdminUsers({ page: 1, take: 10 }));
  }, [dispatch]);

  const handleEdit = (id) => {
    console.log('Edit user with ID:', id);
  };
  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handleDeleteClick = (id) => {
    setadminUserToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteAdminUser(adminUserToDelete));
    setShowDeleteModal(false);
    setadminUserToDelete(null);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowEdit(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(users.map((user) => user.id));
    }
    setSelectAll(!selectAll);
  };


  const handleRowCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleBulkStatusUpdate = async (newStatus) => {
    if (selectedRows.length === 0) {
      toast.warning("Please select at least one brand.");
      return;
    }

    await dispatch(bulkUpdateAdminUserStatus(selectedRows, newStatus));
    setSelectedRows([]);
  };
  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin onToggleSidebar={handleToggleSidebar} />
        <aside className="main-sidebar hidden-print">
          <Sidebar isCollapsed={isSidebarCollapsed} onClose={() => setIsSidebarCollapsed(true)}/>
        </aside>

        <div className="content-wrapper mb-4" style={{ marginLeft: isSidebarCollapsed ? '60px' : '272px', padding: '20px', flex: 1, transition: 'margin-left 0.3s ease', }}>


          <div className="main-header mt-0">
            <h4>Users</h4>

          </div>

          <div className="container-fluid manage">
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-block">
                    <div className="row mb-2">
                      <div className="col-lg-6">
                        <h5>Manage Users</h5>
                      </div>
                      <div className="col-md-6 text-end pt pt">
                        <button
                          className="btn btn-success me-1"
                          disabled={selectedRows.length === 0}
                          onClick={() => handleBulkStatusUpdate(true)}
                        >
                          Active
                        </button>
                        <button
                          className="btn btn-danger"
                          disabled={selectedRows.length === 0}
                          onClick={() => handleBulkStatusUpdate(false)}
                        >
                          In Active
                        </button>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-12 table-responsive">
                        <table className="table table-striped table-hover ">
                          <thead className="table-light">
                            <tr>
                              <input
                                type="checkbox"
                                checked={selectedRows.length === users.length && users.length > 0}
                                onChange={handleSelectAll}
                              />
                              <th>S.No</th>
                              <th>Name</th>
                              <th>Gender</th>
                              <th>Email ID</th>
                              <th>Mobile No</th>
                              <th> DOB</th>
                              <th>Role</th>
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
                            ) : error ? (
                              <tr>
                                <td colSpan="12" className="text-center">
                                  <p className="text-danger">{error}</p>
                                </td>
                              </tr>
                            ) : (
                                users.map((user, index) => (
                                  <tr key={user.id}>
                                    <td><input
                                      type="checkbox"
                                      checked={selectedRows.includes(user.id)}
                                      onChange={() => handleRowCheckboxChange(user.id)}
                                    /></td>
                                    <td>{index + 1}</td>
                                    <td>{user.name || '-'}</td>
                                    <td>{user.gender || '-'}</td>
                                    <td>{user.email || '-'}</td>
                                    <td>{user.phone || '-'}</td>
                                    <td> {moment(user.dateOfBirth).format("DD-MM-YYYY") || '-'}</td>
                                    <td>{user.role || '-'}</td>
                                    <td>
                                      <span className={`badge ${user.status === true ? 'badge-active' : 'badge-inactive'}`}>
                                        {user.status === true ? 'Active' : 'Inactive'}
                                      </span>
                                    </td>
                                    <td>
                                      <button
                                        className="btn btn-light icon-btn mx-1 m-2 text-success"
                                        onClick={() => handleEditClick(user)}
                                      >
                                        <FaEdit />
                                      </button>
                                      <button className="btn btn-light icon-btn mx-1 m-2 text-danger" title="Delete"
                                        onClick={() => handleDeleteClick(user.id)}
                                      >
                                        <BsTrash />
                                      </button>
                                    </td>
                                  </tr>
                                ))
                             ) }
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            {showDeleteModal && (
              <DeleteModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleDelete} message="Are you sure you want to delete this user?" />)}
            <EditAdminUserModal show={showEdit} handleClose={() => setShowEdit(false)} userData={selectedUser} onUpdate={handleUpdate} />
          </div>
        </div >
      </div>
    </div>
  );
};

export default ManageUsers;
