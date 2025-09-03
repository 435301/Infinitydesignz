import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../includes/headerAdmin";
import Sidebar from "../../includes/sidebar";
import "../../css/admin/style.css";
import "../../css/admin/icofont.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteKeyword, fetchKeywords } from "../../redux/actions/searchKeywordsAction";
import moment from "moment";
import PaginationComponent from "../../includes/pagination";
import DeleteModal from '../../modals/deleteModal';
import { TiTrash } from "react-icons/ti";

function SearchKeywordsList() {
    const dispatch = useDispatch();
    const { items, loading, error, page, totalPages } = useSelector(
        (state) => state.keywords
    );

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [keywordToDelete, setKewywordToDelete] = useState(null);

    useEffect(() => {
        dispatch(fetchKeywords(currentPage, 10));
    }, [dispatch, currentPage]);

    const handleSearch = () => {
        dispatch(fetchKeywords({ page: 1, take: 10, search: searchTerm }));
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        handleSearch(value);
    };

    const handleReset = () => {
        setSearchTerm("");
        dispatch(fetchKeywords({ page: 1, take: 10, search: "" }));
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDeleteClick = (id) => {
        setKewywordToDelete(id);
        setShowDeleteModal(true);
    }

    const handleDelete = () => {
        dispatch(deleteKeyword(keywordToDelete));
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
                        <h4>Search Keywords List</h4>
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
                                                {/* <button
                                                    className="btn btn-danger me-2"
                                                    onClick={handleSearch}
                                                >
                                                    <i className="bi bi-search"></i>
                                                </button> */}
                                                <button className="btn btn-success" onClick={handleReset}>
                                                    <i className="bi bi-arrow-clockwise"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-block">
                                        <div className="row">
                                            <div className="col-sm-12 table-responsive">
                                                <table className="table-lg table-striped align-middle mb-0 table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>S.No</th>
                                                            <th>Search Keyword</th>
                                                            <th>Searched On</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {items.length === 0 ? (
                                                            <tr>
                                                                <td colSpan="3">No keywords found.</td>
                                                            </tr>
                                                        ) : (
                                                            items.map((keyword, index) => (
                                                                <tr key={keyword.id}>
                                                                    <td>{(page - 1) * 10 + index + 1}</td>
                                                                    <td>{keyword.keyword}</td>
                                                                    <td>
                                                                        {moment(keyword.createdAt).format("DD-MMM-YYYY")}
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            className="btn btn-light icon-btn mx-1 m-2"
                                                                            onClick={() => handleDeleteClick(keyword.id)}
                                                                        >
                                                                            <TiTrash  />
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
                                message="Are you sure you want to delete this keyword?"
                            />
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchKeywordsList;
