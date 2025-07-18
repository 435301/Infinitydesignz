import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import '../../css/admin/manageProduct.css';
import { BsArrowClockwise, BsEye, BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { bulkUpdateProductStatus, deleteProducts, fetchProducts } from '../../redux/actions/productAction';
import PaginationComponent from '../../includes/pagination';
import DeleteModal from '../../modals/deleteModal';
import EditProduct from '../../components/editProduct';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../config/config';
import { toast } from 'react-toastify';
import ViewProductModal from '../../modals/viewProductModal';


const ManageProducts = () => {
    const dispatch = useDispatch();
    const { products = [] } = useSelector((state) => state.products);
    console.log('products', products)
    const navigate = useNavigate();


    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState(false);
    // console.log('statusFilter',statusFilter)
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewProduct, setViewProduct] = useState('');

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])



    const filteredProducts = products.filter((product) => {
        const search = searchTerm.toLowerCase();
        const matchesSearch = product?.title?.toLowerCase().includes(search) ||
            product?.sku?.toLowerCase().includes(search) ||
            product?.mainCategory?.title?.toLowerCase().includes(search) ||
            product?.subCategory?.title?.toLowerCase().includes(search) ||
            product?.listSubCategory?.title?.toLowerCase().includes(search) ||
            product?.size?.title?.toLowerCase().includes(search) ||
            product?.color?.label?.toLowerCase().includes(search);


        const matchesStatus = statusFilter
            ? (statusFilter === 'active' ? product.status === true : product.status === false)
            : true;
        return matchesSearch && matchesStatus;

    });

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredProducts.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleRowCheckboxChange = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedIds([]);
        } else {
            const ids = currentRows.map((cat) => cat.id);
            setSelectedIds(ids);
        }
        setSelectAll(!selectAll);
    };

    const handleDelete = async () => {
        await dispatch(deleteProducts(productToDelete));
        setProductToDelete(null);
        setShowDeleteModal(false);
    }

    const handleDeleteClick = (id) => {
        setProductToDelete(id);
        setShowDeleteModal(true);
    }

    const handleEdit = (id) => {
        navigate(`/admin/edit-product/${id}`);
    }

    const handleBulkStatusUpdate = async (newStatus) => {
        if (selectedRows.length === 0) {
            toast.warning("Please select at least one feature type.");
            return;
        }

        await dispatch(bulkUpdateProductStatus(selectedRows, newStatus));
        setSelectedRows([]);
    };
    return (
        <div className="sidebar-mini fixed">
            <div className="wrapper">
                <Header />
                <aside className="main-sidebar hidden-print">
                    <Sidebar />
                </aside>
                <div className="content-wrapper p-4">
                    <div className="main-header" style={{ marginTop: '0px' }}>
                        <h5>Manage Products</h5>
                    </div>

                    <div className="container-fluid manage ">
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-block manage-btn">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Search By SKU, Name"
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <select
                                                    className="form-control"
                                                    value={statusFilter}
                                                    onChange={(e) => setStatusFilter(e.target.value)}
                                                >
                                                    <option value="">- Select Status -</option>
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                </select>
                                            </div>
                                            <div className="col-md-2 d-flex gap-2">
                                                <button className="btn btn-success" onClick={() => {
                                                    setSearchTerm('');
                                                    setStatusFilter('');
                                                }}>
                                                    <BsArrowClockwise />
                                                </button>
                                            </div>
                                            <div className="col-md-4 text-end">
                                                <a href="/admin/add-product" className="btn btn-primary">+ Add Product</a>
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
                                                <button className="btn btn-success me-1" disabled={selectedRows.length === 0}
                                                    onClick={() => handleBulkStatusUpdate(true)}>Active</button>
                                                <button className="btn btn-danger" disabled={selectedRows.length === 0}
                                                    onClick={() => handleBulkStatusUpdate(false)}>In Active</button>

                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-12 table-responsive">
                                                <table className="table table-lg table-striped align-middle table-hover mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th><input
                                                                type="checkbox"
                                                                checked={
                                                                    selectedRows.length === products.length &&
                                                                    products.length > 0
                                                                }
                                                                onChange={handleSelectAll}
                                                            /></th>
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
                                                        {currentRows.map((product, idx) => (
                                                            <tr key={product.id}>
                                                                <td><input
                                                                    type="checkbox"
                                                                    checked={selectedRows.includes(product.id)}
                                                                    onChange={() => handleRowCheckboxChange(product.id)}
                                                                /></td>
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
                                                                    <span className={`badge ${product.status ? 'text-light-primary' : 'text-light-danger'}`}>
                                                                        {product.status ? 'Active' : 'In-Active'}
                                                                    </span>
                                                                </td>

                                                                <td>{new Date(product.created_at).toLocaleString()}</td>
                                                                <td>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-light icon-btn"
                                                                        style={{ marginRight: '5px' }}
                                                                        title="Edit"
                                                                        onClick={() => handleEdit(product.id)}
                                                                    >
                                                                        <BsPencilSquare style={{ fontSize: '18px', color: '#28a745' }} />
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-light icon-btn"
                                                                        onClick={()=>{
                                                                            setShowViewModal(true);
                                                                            setViewProduct(product);
                                                                        }}

                                                                    >
                                                                        <BsEye style={{ fontSize: '18px', color: '#212529' }} />
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-light icon-btn delete-btn"
                                                                        title="Delete"
                                                                        onClick={() => handleDeleteClick(product.id)}
                                                                    >
                                                                        <BsTrash style={{ fontSize: '18px', color: '#dc3545' }} />
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
                        <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                        {showDeleteModal && <DeleteModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleDelete} message="Are you sure you want to delete this category?" />}
                        {showViewModal && <ViewProductModal show={showViewModal} onClose={() => setShowViewModal(false)} product={viewProduct} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProducts;
