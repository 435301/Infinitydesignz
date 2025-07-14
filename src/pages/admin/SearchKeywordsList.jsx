import React from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';

function SearchKeywordsList() {
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
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-block manage-btn">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Search By " />
                                                </div>
                                            </div>

                                            <div className="col-md-2">
                                                <button className="btn btn-danger me-2">
                                                    <i className="bi bi-search"></i>
                                                </button>
                                                <button className="btn btn-success">
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
                                                    <thead>
                                                        <tr>
                                                            <th>S.No</th>
                                                            <th>Search Keyword</th>
                                                            <th>Searched On</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr><td>1</td><td>Nino%2Bbonito</td><td>24-Jun-2025</td></tr>
                                                        <tr><td>2</td><td>Tshirt 12 year chauhan Ji</td><td>03-Jun-2025</td></tr>
                                                        <tr><td>3</td><td>Filter_products</td><td>22-May-2025</td></tr>
                                                        <tr><td>4</td><td>Filter_products</td><td>22-May-2025</td></tr>
                                                        <tr><td>5</td><td>Filter_products</td><td>22-May-2025</td></tr>
                                                        <tr><td>6</td><td>Filter_products</td><td>22-May-2025</td></tr>
                                                        <tr><td>7</td><td>Filter_products</td><td>22-May-2025</td></tr>
                                                        <tr><td>8</td><td>Filter_products</td><td>22-May-2025</td></tr>
                                                        <tr><td>9</td><td>Filter_products</td><td>22-May-2025</td></tr>
                                                        <tr><td>10</td><td>Filter_products</td><td>22-May-2025</td></tr>
                                                        <tr><td>11</td><td>Filter_products</td><td>22-May-2025</td></tr>
                                                    </tbody>
                                                </table>

                                                <nav aria-label="Page navigation example">
                                                    <ul className="pagination justify-content-end">
                                                        <li className="page-item disabled">
                                                            <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                                                        </li>
                                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                        <li className="page-item">
                                                            <a className="page-link" href="#">Next</a>
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
        </div>
    );
}

export default SearchKeywordsList;
