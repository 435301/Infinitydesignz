import React, { useEffect, useState } from 'react';
import '../../css/admin/style.css';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/actions/categoryAction';
import AddListSubCategoryModal from '../../includes/addListSubCategory';

const ListSubCategory = () => {
    const [showModal, setShowModal] = useState(false);
    const [subSubCategories, setSubSubCategories] = useState([]);
    const dispatch = useDispatch();
    const { categories, loading, error } = useSelector(state => state.categories || {});

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch])
    
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
            const subCats = categories.filter(cat => cat.parent_id !== null);

            // Get IDs of all subcategories
            const subCatIds = subCats.map(cat => cat.id);

            // Find sub-subcategories: parent_id matches any of the subCatIds
            const subSubCats = categories.filter(cat => subCatIds.includes(cat.parent_id));

            // Optional: enrich with parent/sub info
            const mapped = subSubCats.map(subSub => {
                const parent = categories.find(c => c.id === subSub.parent_id); // subcategory
                const grandParent = categories.find(c => c.id === parent?.parent_id); // main category
                return {
                    ...subSub,
                    subCategory: parent?.title || 'N/A',
                    category: grandParent?.title || 'N/A'
                };
            });

            setSubSubCategories(mapped);
        }
    }, [categories]);



    return (
        <div className="wrapper sidebar-mini fixed">
            <HeaderAdmin />
            <aside className="main-sidebar hidden-print">
                <Sidebar />
            </aside>

            <div className="content-wrapper">
                <div className="main-header" style={{ marginTop: 0 }}>
                    <h4>List Sub Categories</h4>
                </div>

                <div className="container-fluid manage">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-block manage-btn">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" placeholder="Search By" />
                                        </div>
                                        <div className="col-md-3">
                                            <select className="form-control">
                                                <option value="">- Select Status -</option>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                            <button className="btn btn-danger"><i className="ti-search"></i></button>
                                            <button className="btn btn-success"><i className="icon-refresh"></i></button>
                                        </div>
                                        <div className="col-md-4 text-end">
                                            <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add New</button>
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
                                            <button className="btn btn-success">Active</button>
                                            <button className="btn btn-default">Inactive</button>
                                            <button className="btn btn-danger">Front Active</button>
                                            <button className="btn btn-warning">Front Inactive</button>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-12 table-responsive">
                                            <table className="table table-striped table-hover align-middle mb-0">
                                                <thead>
                                                    <tr>
                                                        <th><input type="checkbox" id="select-all" /></th>
                                                        <th>S.No</th>
                                                        <th>Category</th>
                                                        <th>Sub Category</th>
                                                        <th>Category Title</th>
                                                        <th>App Icon</th>
                                                        <th>Web Icon</th>
                                                        <th>Main Image</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {subSubCategories.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td><input type="checkbox" className="row-checkbox" /></td>
                                                            <td>{index + 1}</td>
                                                            <td>{item.category}</td>
                                                            <td>{item.subCategory}</td>
                                                            <td>{item.title}</td>
                                                            <td><img src={item.appIcon} alt={`${item.title} App Icon`} className="rounded-circle" width="50" height="50" /></td>
                                                            <td><img src={item.webIcon} alt={`${item.title} Web Icon`} className="rounded-circle" width="50" height="50" /></td>
                                                            <td><img src={item.mainImage} alt={`${item.title} Main Image`} className="rounded-circle" width="50" height="50" /></td>
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
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {showModal && <AddListSubCategoryModal show={showModal} setShow={setShowModal} />}
                    </div>

                </div>
            </div>

        </div>
    );
};

export default ListSubCategory;
