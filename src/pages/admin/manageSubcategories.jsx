import React, { useEffect, useMemo, useState } from 'react';
import '../../css/admin/style.css';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/actions/categoryAction';
import AddSubCategoryModal from '../../includes/addSubCategory';

const ManageSubCategories = () => {
    const [showModal, setShowModal] = useState(false);
    const [level1SubCategories, setLevel1SubCategories] = useState([]);
    const dispatch = useDispatch();
    const { categories, loading, error } = useSelector(state => state.categories || {});

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        const selectAll = document.getElementById('select-all');
        if (selectAll) {
            selectAll.addEventListener('change', function () {
                const checkboxes = document.querySelectorAll('.row-checkbox');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = this.checked;
                });
            });
        }
    }, []);
    useEffect(() => {
        if (categories.length) {
            const topLevel = categories.filter(cat => cat.parent_id === null);

            const subCategories = categories
                .filter(cat =>
                    cat.parent_id !== null &&
                    topLevel.some(parent => parent.id === cat.parent_id)
                )
                .map(subCat => {
                    const parent = categories.find(c => c.id === subCat.parent_id);
                    return {
                        ...subCat,
                        category: parent?.title || 'N/A', // Top-level category title
                    };
                });

            setLevel1SubCategories(subCategories);
        }
    }, [categories]);


    return (
        <div className="wrapper sidebar-mini fixed">
            <div className='wrapper'>
                <HeaderAdmin />
                <aside className="main-sidebar hidden-print ">
                    <Sidebar />
                </aside>

                <div className="content-wrapper">
                    <div className="main-header" style={{ marginTop: '0px' }}>
                        <h4>Sub Categories</h4>
                    </div>

                    <div className="container-fluid manage">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-block manage-btn">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Search By " />
                                                    <span className="input-group-btn"></span>
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
                                                <button className="btn btn-danger">
                                                    <i className="ti-search"></i>
                                                </button>
                                                <button className="btn btn-success">
                                                    <i className="icon-refresh"></i>
                                                </button>
                                            </div>
                                            <div className="col-md-4 text-end">
                                                <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add New</button>
                                            </div>
                                            {loading && <p>Loading categories...</p>}
                                            {error && <p className="text-danger">Error: {error}</p>}
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
                                            <div className="col-md-6 text-right pt">
                                                <button className="btn btn-success">Active</button>
                                                <button className="btn btn-default">In Active</button>
                                                <button className="btn btn-danger">Front Active</button>
                                                <button className="btn btn-warning">Front In Active</button>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-12 table-responsive">
                                                <table className="table table-striped table-hover align-middle mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th><input type="checkbox" id="select-all" /></th>
                                                            <th>S.No</th>
                                                            <th>Parent Category</th>
                                                            <th>Category Title</th>
                                                            <th>App Icon</th>
                                                            <th>Web Icon</th>
                                                            <th>Main Image</th>
                                                            <th>SEO Title</th>
                                                            <th>SEO Description</th>
                                                            <th>SEO Keywords</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {level1SubCategories.map((item, index) => (
                                                            <tr key={item.id}>
                                                                <td><input type="checkbox" className="row-checkbox" /></td>
                                                                <td>{index + 1}</td>
                                                                <td>{item.category}</td> {/* Parent category */}
                                                                <td>{item.title}</td>    {/* Subcategory title */}
                                                                <td>{item.title}</td>    {/* Optional: repeat or adjust */}
                                                                <td><img src={item.appIcon} alt={`${item.title} App Icon`} className="rounded-circle" width="50" height="50" /></td>
                                                                <td><img src={item.webIcon} alt={`${item.title} Web Icon`} className="rounded-circle" width="50" height="50" /></td>
                                                                <td><img src={item.mainImage} alt={`${item.title} Main Image`} className="rounded-circle" width="50" height="50" /></td>
                                                                <td>{item.seoTitle || 'N/A'}</td>
                                                                <td>{item.seoDescription || 'N/A'}</td>
                                                                <td>{item.seoKeywords || 'N/A'}</td>
                                                                <td>
                                                                    <span className={`badge text-light-${item.status === 'active' ? 'primary' : 'danger'}`}>
                                                                        {item.status}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button className="btn btn-light-success icon-btn b-r-4">
                                                                        <i className={`ti-pencil-alt text-${item.status === 'active' ? 'success' : 'danger'}`}></i>
                                                                    </button>
                                                                    <button className="btn btn-light icon-btn b-r-4">
                                                                        <i className="ti-eye text-dark"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}


                                                        {level1SubCategories.length === 0 && !loading && (
                                                            <tr>
                                                                <td colSpan="12" className="text-center">No subcategories found.</td>
                                                            </tr>
                                                        )}

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {showModal && <AddSubCategoryModal show={showModal} setShow={setShowModal} />}
        </div>
    );
};

export default ManageSubCategories;
