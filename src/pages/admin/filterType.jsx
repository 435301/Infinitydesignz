import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { BsSearch, BsArrowClockwise, BsPencilSquare, BsTrash, BsEye } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFilterType, fetchFilterTypes } from '../../redux/actions/filterTypeAction';
import PaginationComponent from '../../includes/pagination';
import AddFilterTypeModal from '../../components/addFilterTypeModal';
import EditFilterTypeModal from '../../components/editFilterTypeModal';
import DeleteModal from '../../modals/deleteModal';
import ViewFilterTypeModal from '../../modals/viewFilterTypeModal';

const ManageFilterType = () => {
    const dispatch = useDispatch();
    const { filterTypes = [] } = useSelector((state) => state.filterTypes || {});
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedFilterType, setSelectedFilterType] = useState('');
    const [filterTypeToDelete, setFilterTypeToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [viewFilterType, setFilterType] = useState(null);

    useEffect(() => {
        dispatch(fetchFilterTypes());
    }, [dispatch])

    const handleToggleSidebar = (collapsed) => {
        setIsSidebarCollapsed(collapsed);
    };

    const filteredFilterTypes = filterTypes.filter((filterType) => {
        const name = filterType.name.toLowerCase();
        const matchesSearch = name.includes(searchTerm.toLowerCase());
        return matchesSearch
    });

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredFilterTypes.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredFilterTypes.length / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedRows(filterTypes.map((item) => item.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleRowCheckboxChange = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    const handleDelete = async () => {
        await dispatch(deleteFilterType(filterTypeToDelete));
        setFilterTypeToDelete(null);
        setShowDeleteModal(false);
    }

    const handleDeleteClick = (id) => {
        setFilterTypeToDelete(id);
        setShowDeleteModal(true);
    }
    return (
        <div className="sidebar-mini fixed">
            <div className="wrapper">
                <HeaderAdmin onToggleSidebar={handleToggleSidebar} />
                <aside className="main-sidebar hidden-print">
                    <Sidebar isCollapsed={isSidebarCollapsed} />
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
                    <div className="main-header" style={{ marginTop: '0px' }}>
                        <h5>Filter Type</h5>
                    </div>

                    <div className="container-fluid manage">

                        {/* Search and Filter */}
                        <div className="card mb-3">
                            <div className="card-block manage-btn">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-3">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Search By filter type" />
                                        </div>
                                    </div>

                                    <div className="col-md-2 d-flex gap-2">

                                        <button className="btn btn-success">
                                            <BsArrowClockwise style={{ fontSize: '18px' }} />
                                        </button>
                                    </div>
<<<<<<< HEAD
                                    <div className="col-md-7 text-end">
                                        <button className="btn btn-primary" type="button" style={{}} onClick={() => setShowAddModal(true)}>
                                            + Create Filter Type
=======
                                    <div className="col-md-4 text-end">
                                        <button className="btn btn-primary" type="button" style={{position:"relative",left:"285px"}} onClick={() => setShowAddModal(true)}>
                                            + Add Filter Type
>>>>>>> 2fb7b307564f66da0bd97469542d7e7a7230d006
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="card">
                            <div className="card-block">
                                <div className="row mb-3">

                                </div>

                                <div className="table-responsive">
                                    <table className="table table-striped table-hover table-lg align-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <input
                                                        type="checkbox"
                                                        id="select-all"
                                                        checked={selectedRows.length === filterTypes.length && filterTypes.length > 0}
                                                        onChange={handleSelectAll}
                                                    />
                                                </th>
                                                <th>S.No</th>
                                                <th>Type</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentRows.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            className="row-checkbox"
                                                            checked={selectedRows.includes(item.id)}
                                                            onChange={() => handleRowCheckboxChange(item.id)}
                                                        />
                                                    </td>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>

                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-light icon-btn"
                                                            style={{ marginRight: '5px' }}
                                                            title="Edit"
                                                            onClick={() => {
                                                                setSelectedFilterType(item);
                                                                setEditModalVisible(true);
                                                            }}
                                                        >
                                                            <BsPencilSquare style={{ fontSize: '18px', color: '#28a745' }} />
                                                        </button>
                                                        <button
                                                            className="btn btn-light icon-btn"
                                                            onClick={() => {
                                                                setFilterType(item);
                                                                setViewModal(true);
                                                            }}
                                                        >
                                                            <BsEye style={{ fontSize: '18px', color: '#212529' }} />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-light icon-btn delete-btn"
                                                            title="Delete"
                                                            onClick={() => handleDeleteClick(item.id)}
                                                        >
                                                            <BsTrash style={{ fontSize: '18px', color: '#dc3545' }} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {currentRows.length === 0 && (
                                                <tr>
                                                    <td colSpan="5" className="text-center">
                                                        No filter types found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                        {showAddModal && <AddFilterTypeModal show={showAddModal} onClose={() => setShowAddModal()} />}
                        {editModalVisible && <EditFilterTypeModal show={editModalVisible} onClose={() => setEditModalVisible(false)} filterType={selectedFilterType} />}
                        {showDeleteModal && <DeleteModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleDelete} message="Are you sure you want to delete this category?" />}
                        {viewModal && <ViewFilterTypeModal show={viewModal} onClose={() => setViewModal(false)} filterType={viewFilterType} />}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageFilterType;
