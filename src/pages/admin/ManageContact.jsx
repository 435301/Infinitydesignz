import React, { useEffect, useMemo, useState } from 'react';
import { Search, ArrowRepeat, PencilSquare, Trash } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, getContacts } from '../../redux/actions/contactAction';
import moment from 'moment';
import PaginationComponent from '../../includes/pagination';
import { TiTrash } from 'react-icons/ti';
import DeleteModal from '../../modals/deleteModal';

function ManageContact() {
    const dispatch = useDispatch();
    const { contacts = [], loading } = useSelector((state) => state.contact);
    console.log('contact', contacts)
    useEffect(() => {
        dispatch(getContacts());
    }, [dispatch]);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);

    const filteredContacts = useMemo(() => {
        return contacts.filter((contact) =>
            contact.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [contacts, searchTerm]);

    const rowsPerPage = 10;
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredContacts.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredContacts.length / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
    };


    const handleDeleteClick = (contactId) => {
        setContactToDelete(contactId);
        setShowDeleteModal(true);
    }
    const handleDelete = async () => {
        await dispatch(deleteContact(contactToDelete));
        setContactToDelete(null);
        setShowDeleteModal(false);
    }

    return (
        <div className="sidebar-mini fixed">
            <div className="wrapper">
                <HeaderAdmin />
                <aside className="main-sidebar hidden-print">
                    <Sidebar />
                </aside>

                <div className="content-wrapper pt-2 p-4">
                    <div className="main-header" style={{ marginTop: 0 }}>
                        <h4>Contact</h4>
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
                                                        placeholder="Search By contact"
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-2">

                                                <button className="btn btn-success" onClick={() => setSearchTerm('')}>
                                                    <i className="bi bi-arrow-clockwise"></i>
                                                </button>
                                            </div>
                                            {/* <div className="col-md-7 text-end">
                                                <a href="create-cupon.php" className="btn-primary" type="button">Create New</a>
                                            </div> */}
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
                                            <div className="col-lg-6">
                                                <h5>Manage Contact</h5>
                                            </div>


                                        </div>


                                        <div className="row">
                                            <div className="col-sm-12 table-responsive">
                                                <table className="table-lg table-striped align-middle mb-0 table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>S.No</th>
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>Mobile</th>
                                                            <th>Subject</th>
                                                            <th>Description</th>
                                                            <th>Contact Date</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {loading ? (
                                                            <tr>
                                                                <td colSpan="7">Loading...</td>
                                                            </tr>
                                                        ) : filteredContacts.length === 0 ? (
                                                            <tr>
                                                                <td colSpan="7">No contacts found.</td>
                                                            </tr>
                                                        ) : (
                                                            currentRows.map((contact, index) => {
                                                                return (
                                                                    <tr key={contact.id}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{contact.name}</td>
                                                                        <td>{contact.email}</td>
                                                                        <td>{contact.mobile}</td>
                                                                        <td>{contact.subject}</td>
                                                                        <td>{contact.description}</td>
                                                                        <td>
                                                                            {moment(contact.created_at).format("DD-MM-YYYY")}
                                                                        </td>
                                                                        <td>
                                                                            <button type="button" className="btn btn-light icon-btn mx-1 b-r-4 delete-btn"
                                                                                title="Delete"
                                                                                onClick={() => handleDeleteClick(contact.id)}
                                                                            >
                                                                                <TiTrash  />
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
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
                                message="Are you sure you want to delete this contact ?"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageContact;
