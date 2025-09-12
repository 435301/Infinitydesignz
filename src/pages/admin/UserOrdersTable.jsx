import React, { useEffect, useState } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSubscriber, fetchSubscribers } from '../../redux/actions/subscribersAction';
import moment from 'moment';
import { TiTrash } from 'react-icons/ti';
import PaginationComponent from '../../includes/pagination';
import DeleteModal from '../../modals/deleteModal';

function UserOrdersTable() {
    const dispatch = useDispatch();
    const { items, loading, error, page, totalPages } = useSelector(
        (state) => state.subscribers
    );

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [subscriberToDelete, setsubscriberToDelete] = useState(null);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const filteredItems = items.filter((subscriber) =>
        subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        dispatch(fetchSubscribers({ page: currentPage, take: 10, search: searchTerm }));
    }, [dispatch, currentPage, searchTerm]);

    const handleToggleSidebar = (collapsed) => setIsSidebarCollapsed(collapsed);
    
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleReset = () => {
        setSearchTerm("");
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDeleteClick = (email) => {
        setsubscriberToDelete(email);
        setShowDeleteModal(true);
    }

    const handleDelete = () => {
        dispatch(deleteSubscriber(subscriberToDelete));
        setShowDeleteModal(false);
    }
    return (
        <div className="sidebar-mini fixed">
            <div className="wrapper">
                <HeaderAdmin onToggleSidebar={handleToggleSidebar} />
                <aside className="main-sidebar hidden-print">
                    <Sidebar isCollapsed={isSidebarCollapsed} onClose={() => setIsSidebarCollapsed(true)}/>
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
                    <div className="main-header" style={{ marginTop: 0 }}>
                        <h4>Subscribers List</h4>
                    </div>

                    <div className="container-fluid manage">
                        <div className="row mb-2">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-block manage-btn">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Search keyword..."
                                                        value={searchTerm}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-2">
                                                <button className="btn btn-success" onClick={handleReset}>
                                                    <i className="bi bi-arrow-clockwise"></i>
                                                </button>
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
                                        <div className="row">
                                            <div className="col-sm-12 table-responsive">
                                                <table className="table-lg table-striped align-middle mb-0 table table-hover">
                                                    <thead className="thead-dark">
                                                        <tr>
                                                            {/* <th><input type="checkbox" /></th> */}
                                                            <th>Sl. No</th>
                                                            <th>Email</th>
                                                            <th>Subscribed Date</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {loading ? (
                                                            <tr>
                                                                <td colSpan="4" className="text-center">
                                                                    Loading...
                                                                </td>
                                                            </tr>
                                                        ) : filteredItems.length === 0 ? (
                                                            <tr>
                                                                <td colSpan="3">No subscribers found.</td>
                                                            </tr>
                                                        ) : (
                                                            filteredItems.map((subscriber, index) => (
                                                                <tr key={subscriber.id}>
                                                                    <td>{(page - 1) * 10 + index + 1}</td>
                                                                    <td>{subscriber.email}</td>
                                                                    <td>
                                                                        {moment(subscriber.subscribed_at).format("DD-MMM-YYYY")}
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            className="btn btn-light icon-btn mx-1 m-2 text-danger"
                                                                            onClick={() => handleDeleteClick(subscriber.email)}
                                                                        >
                                                                            <TiTrash />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        )}
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
                            <DeleteModal
                                show={showDeleteModal}
                                onClose={() => setShowDeleteModal(false)}
                                onConfirm={handleDelete}
                                message="Are you sure you want to delete this subscriber?"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserOrdersTable;
