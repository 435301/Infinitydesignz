import React, { useEffect } from 'react';
import Header from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import '../../css/admin/manageProduct.css';
import { BsArrowClockwise } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions/productAction';

const BASE_URL = 'http://68.183.89.229:4005';

const ManageProducts = () => {
    const dispatch = useDispatch();
    const { products = [] } = useSelector((state) => state.products);
    console.log('products', products)

    useEffect(()=>{
        dispatch(fetchProducts());
    }, [dispatch])

    return (
        <div className="sidebar-mini fixed">
            <div className="wrapper">
                <Header />
                <aside className="main-sidebar hidden-print">
                    <Sidebar />
                </aside>
                <div className="content-wrapper">
                    <div className="main-header" style={{ marginTop: '0px' }}>
                        <h5>Manage Products</h5>
                    </div>

                    <div className="container-fluid manage">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-block manage-btn">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Search by product name, SKU" />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <select className="form-control">
                                                    <option value="">- Product Status -</option>
                                                    <option value="active">Active</option>
                                                    <option value="inactive">In Active</option>
                                                </select>
                                            </div>
                                            <div className="col-md-2 d-flex gap-2">
                                                <button className="btn btn-success">
                                                    <BsArrowClockwise />
                                                </button>
                                            </div>
                                            <div className="col-md-4 text-end">
                                                <a href="/admin/add-product" className="btn btn-primary">+ Create Product</a>
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
                                            <div className="col-md-6"></div>
                                            <div className="col-md-6 text-end">
                                                <button className="btn btn-success">Active</button>
                                                <button className="btn btn-default">In Active</button>
                                                <button className="btn btn-danger">Delete</button>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-12 table-responsive">
                                                <table className="table table-lg table-striped align-middle table-hover mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th><input type="checkbox" id="select-all" /></th>
                                                            <th>Image</th>
                                                            <th>SKU</th>
                                                            <th>Product Name</th>
                                                            <th>Menu</th>
                                                            <th>Sub Menu</th>
                                                            <th>List Sub Menu</th>
                                                            <th>Size</th>
                                                            <th>Colour</th>
                                                            <th>Stock</th>
                                                            <th>Product Status</th>
                                                            <th>Created Date</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {products.map((product, idx) => (
                                                            <tr key={product.id}>
                                                                <td><input type="checkbox" className="row-checkbox" /></td>
                                                                <td>
                                                                    {product.mainCategory?.mainImage ? (
                                                                        <img src={`${BASE_URL}/uploads/categories/${product.mainCategory.mainImage}`} alt={product.title} style={{ width: '50px' }} />
                                                                    ) : '-'}
                                                                </td>
                                                                <td>{product.sku}</td>
                                                                <td><a href="#">{product.title}</a></td>
                                                                <td>{product.mainCategory?.title || '-'}</td>
                                                                <td>{product.subCategory?.title || '-'}</td>
                                                                <td>{product.listSubCategory?.title || '-'}</td>
                                                                <td>{product.size?.title || '-'}</td>
                                                                <td>
                                                                    {product.color ? (
                                                                        <div className="color-container">
                                                                            <span className="color-swatch" style={{ backgroundColor: product.color.hex_code || '#ccc' }} data-color={product.color.label}></span>
                                                                            <span className="color-name">{product.color.label}</span>
                                                                        </div>
                                                                    ) : '-'}
                                                                </td>
                                                                <td>{product.stock}</td>
                                                                <td>
                                                                    <span className={`badge ${product.status ? 'text-light-success' : 'text-light-danger'}`}>
                                                                        {product.status ? 'Active' : 'In-Active'}
                                                                    </span>
                                                                </td>
                                                                <td>{new Date(product.created_at).toLocaleString()}</td>
                                                                <td className="action-buttons">
                                                                    <button type="button" className="action-btn action-primary action-icon action-rounded">
                                                                        <i className="ti-pencil-alt"></i> Update
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
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProducts;
