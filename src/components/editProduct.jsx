import React, { useEffect, useState } from 'react';
import HeaderAdmin from '../includes/headerAdmin';
import Sidebar from '../includes/sidebar';
import '../css/admin/style.css';
import '../css/admin/icofont.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BsPlus } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/actions/categoryAction';
import { fetchColors } from '../redux/actions/colorAction';
import { fetchSizes } from '../redux/actions/sizeAction';
import { fetchBrands } from '../redux/actions/brandAction';
import { useNavigate } from 'react-router-dom';
import { editProducts } from '../redux/actions/productAction';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../redux/actions/productAction';
import { editVariants } from '../redux/actions/variantsAction';


const EditProduct = ({ onClose, show }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [id, dispatch]);

    const { product } = useSelector(state => state.products);

    const { categories = [] } = useSelector((state) => state.categories || {});
    const { sizes = [] } = useSelector((state) => state.sizes || {});
    const { colors = [] } = useSelector((state) => state.colors || {});
    const { brands = [] } = useSelector((state) => state.brands);
    const { products = [] } = useSelector((state) => state.products || []);
    // console.log('brands', brands)

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [description, setDescription] = useState('');
    const [selectedMenu, setSelectedMenu] = useState('');
    const [selectedSubMenu, setSelectedSubMenu] = useState('');
    const [selectedListSubMenu, setSelectedListSubMenu] = useState('');
    const [errors, setErrors] = useState({});


    const initialFormState = {
        sku: '',
        title: '',
        weight: '',
        model: '',
        sla: '',
        deliveryCharges: '',
        description: '',
        status: 'enable',
        searchKeywords: '',
        stock: '',
        mrp: '',
        sellingPrice: '',
        height: '',
        width: '',
        length: '',
        sizeId: '',
        colorId: '',
        brandId: '',
    };

    const [formData, setFormData] = useState(initialFormState);

    const menuOptions = categories.filter(cat => cat.parent_id === null);
    const subMenuOptions = categories.filter(cat => cat.parent_id === parseInt(selectedMenu));
    const listSubMenuOptions = categories.filter(cat => cat.parent_id === parseInt(selectedSubMenu));

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchColors());
        dispatch(fetchSizes());
        dispatch(fetchBrands());
    }, [dispatch]);


    useEffect(() => {
        console.log("Product for editing:", product);
        if (product) {
            setSelectedMenu(product.mainCategoryId.toString());
            setSelectedSubMenu(product.subCategoryId.toString());
            setSelectedListSubMenu(product.listSubCategoryId.toString());

            setFormData({
                sku: product.sku || '',
                title: product.title || '',
                weight: product?.productDetails?.weight.toString() || '',
                model: product?.productDetails?.model || '',
                sla: product?.productDetails?.sla.toString() || '',
                deliveryCharges: product?.productDetails?.deliveryCharges.toString() || '',
                description: product.description || '',
                status: product.status ? 'enable' : 'disable',
                searchKeywords: product.searchKeywords || '',
                stock: product.stock?.toString() || '',
                mrp: product.mrp?.toString() || '',
                sellingPrice: product.sellingPrice?.toString() || '',
                height: product.height?.toString() || '',
                width: product.width?.toString() || '',
                length: product.length?.toString() || '',
                sizeId: product.sizeId?.toString() || '',
                colorId: product.colorId?.toString() || '',
                brandId: product.brandId?.toString() || '',
                
            });
            setVariants(
                Array.isArray(product.variants) && product.variants.length
                    ? product.variants.map(v => ({
                        sku: v.sku || '',
                        stock: v.stock?.toString() || '',
                        mrp: v.mrp?.toString() || '',
                        sellingPrice: v.sellingPrice?.toString() || '',
                        sizeId: v.sizeId?.toString() || '',
                        colorId: v.colorId?.toString() || ''
                    }))
                    : [{ sku: '', stock: '', mrp: '', sellingPrice: '', sizeId: '', colorId: '' }]
            );

            setDescription(product.description || '');
        }
    }, [product]);

    const handleToggleSidebar = (collapsed) => {
        setIsSidebarCollapsed(collapsed);
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.sku?.trim()) newErrors.sku = 'SKU is required';
        if (!formData.title?.trim()) newErrors.title = 'Title is required';
        if (!selectedMenu) newErrors.selectedMenu = 'Menu is required';
        if (!selectedSubMenu) newErrors.selectedSubMenu = 'Sub Menu is required';
        if (!selectedListSubMenu) newErrors.selectedListSubMenu = 'List Sub Menu is required';
        if (!formData.stock) newErrors.stock = 'Stock is required';
        if (!formData.mrp) newErrors.mrp = 'MRP is required';
        if (!formData.sellingPrice) newErrors.sellingPrice = 'Selling Price is required';
        if (!formData.brandId) newErrors.brandId = 'Brand is required';
        if (!formData.sizeId) newErrors.sizeId = 'Size is required';
        if (!formData.colorId) newErrors.colorId = 'Color is required';
        if (formData.stock && isNaN(formData.stock)) newErrors.stock = 'Stock must be a number';
        if (formData.mrp && isNaN(formData.mrp)) newErrors.mrp = 'MRP must be a number';
        if (formData.sellingPrice && isNaN(formData.sellingPrice)) newErrors.sellingPrice = 'Selling Price must be a number';
        if (formData.height && isNaN(formData.height)) newErrors.height = 'Height must be a number';
        if (formData.width && isNaN(formData.width)) newErrors.width = 'Width must be a number';
        if (formData.length && isNaN(formData.length)) newErrors.length = 'Length must be a number';
        if (!formData.description?.trim()) newErrors.description = 'Description is required';
        if (!formData.status) newErrors.status = 'Product status is required';
        if (!formData.searchKeywords?.trim()) newErrors.searchKeywords = 'Search Keywords are required';
        if (!formData.height) newErrors.height = 'Height is required';
        if (!formData.width) newErrors.width = 'Width is required';
        if (!formData.length) newErrors.length = 'Length is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    }

 const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;

    const cleanedVariants = variants
        .filter(v => v.sku && v.stock && v.mrp && v.sellingPrice)
        .map(v => ({
            ...v,
            stock: parseInt(v.stock),
            mrp: parseFloat(v.mrp),
            sellingPrice: parseFloat(v.sellingPrice),
            sizeId: v.sizeId ? parseInt(v.sizeId) : null,
            colorId: v.colorId ? parseInt(v.colorId) : null,
        }));

    const payload = {
        id: id,
        sku: formData.sku,
        title: formData.title,
        description: formData.description,
        searchKeywords: formData.searchKeywords,
        stock: parseInt(formData.stock),
        mrp: parseFloat(formData.mrp),
        sellingPrice: parseFloat(formData.sellingPrice),
        height: parseFloat(formData.height),
        width: parseFloat(formData.width),
        length: parseFloat(formData.length),
        sizeId: parseInt(formData.sizeId),
        colorId: parseInt(formData.colorId),
        brandId: parseInt(formData.brandId),
        mainCategoryId: parseInt(selectedMenu),
        subCategoryId: parseInt(selectedSubMenu),
        listSubCategoryId: parseInt(selectedListSubMenu),
        status: formData.status === 'enable',
        productDetails: {
            model: formData.model,
            weight: parseFloat(formData.weight),
            sla: parseInt(formData.sla),
            deliveryCharges: parseFloat(formData.deliveryCharges),
        }
    };

    console.log('Submitting Product:', payload);
    try {
        await dispatch(editProducts(payload));

        // Update each variant individually
        for (const variant of cleanedVariants) {
            if (!variant.id) {
                console.warn("Variant is missing ID:", variant);
                continue; // skip if no ID (maybe new one not yet saved)
            }
            await dispatch(editVariants({ ...variant, productId: id }));
        }

        onClose();
        setFormData(initialFormState);
        setDescription('');
        setSelectedMenu('');
        setSelectedSubMenu('');
        setSelectedListSubMenu('');
        navigate('/admin/manage-product');
    } catch (err) {
        setErrors({
            brand: err?.response?.data?.message || 'Something went wrong.',
        });
    }
};


    const handleReset = (e) => {
        e.preventDefault();
        setFormData(initialFormState);
        setSelectedMenu('');
        setSelectedSubMenu('');
        setSelectedListSubMenu('');
        setDescription('');
    };

    const [variants, setVariants] = useState([
        { sku: '', stock: '', mrp: '', sellingPrice: '', sizeId: '', colorId: '' }
    ]);


    const handleChange = (index, field, value) => {
        const updatedVariants = [...variants];
        updatedVariants[index][field] = value;
        setVariants(updatedVariants);
    };

    const addRow = () => {
        setVariants([
            ...variants,
            { sku: '', stock: '', mrp: '', sellingPrice: '', size: '', color: '' }
        ]);
    };

    const removeRow = (index) => {
        const updatedVariants = variants.filter((_, i) => i !== index);
        setVariants(updatedVariants);
    };

    return (
        <div className="sidebar-mini fixed">
            <div className="wrapper">
                <HeaderAdmin onToggleSidebar={handleToggleSidebar} />
                <aside className="main-sidebar hidden-print">
                    <Sidebar isCollapsed={isSidebarCollapsed} />
                </aside>

                <div className="content-wrapper py-3" style={{ marginLeft: isSidebarCollapsed ? '60px' : '295px', padding: '20px', flex: 1, transition: 'margin-left 0.3s ease' }}>
                    <div className="section-nav mt-4 mb-3 d-flex gap-3">
                        <a href="#" className="active">Edit Product</a>
                        <a href='/admin/product-image'>Product Images</a>
                        <a href="/admin/product-filter">Product Filters</a>
                        <a href="/admin/product-features">Product Features</a>
                    </div>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header py-3">
                                        <h5 className="text-dark mb-0">Edit Product</h5>
                                    </div>
                                    <div className="card-block">
                                        <form onSubmit={handleSubmit} className="app-form">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <h6 className="sub-heading">Category Details</h6>
                                                    <div className="row">
                                                        <div className="col-lg-4 mb-3">
                                                            <label className="form-label">Menu</label>
                                                            <select className={`form-control ${errors.selectedMenu ? 'is-invalid' : ''}`} value={selectedMenu} onChange={(e) => {
                                                                setSelectedMenu(e.target.value);
                                                                setSelectedSubMenu('');
                                                                setSelectedListSubMenu('');
                                                                if (errors.selectedMenu) {
                                                                    setErrors({ ...errors, selectedMenu: '' });
                                                                }
                                                            }}>
                                                                <option value="">--Choose Menu--</option>
                                                                {menuOptions.map(menu => (
                                                                    <option key={menu.id} value={menu.id}>{menu.title}</option>
                                                                ))}
                                                            </select>
                                                            {errors.selectedMenu && <div className="invalid-feedback">{errors.selectedMenu}</div>}
                                                        </div>
                                                        <div className="col-lg-4 mb-3">
                                                            <label className="form-label">Sub Menu</label>
                                                            <select className={`form-control ${errors.selectedSubMenu ? 'is-invalid' : ''}`} value={selectedSubMenu} onChange={(e) => {
                                                                setSelectedSubMenu(e.target.value);
                                                                setSelectedListSubMenu('');
                                                                if (errors.selectedSubMenu) {
                                                                    setErrors({ ...errors, selectedSubMenu: '' });
                                                                }
                                                            }}>
                                                                <option value="">--Choose Sub Menu--</option>
                                                                {subMenuOptions.map(sub => (
                                                                    <option key={sub.id} value={sub.id}>{sub.title}</option>
                                                                ))}
                                                            </select>
                                                            {errors.selectedSubMenu && <div className="invalid-feedback">{errors.selectedSubMenu}</div>}
                                                        </div>
                                                        <div className="col-lg-4 mb-3">
                                                            <label className="form-label">List Sub Menu</label>
                                                            <select className={`form-control ${errors.selectedListSubMenu ? 'is-invalid' : ''}`} value={selectedListSubMenu} onChange={(e) => {
                                                                setSelectedListSubMenu(e.target.value);
                                                                if (errors.selectedListSubMenu) {
                                                                    setErrors({ ...errors, selectedListSubMenu: '' });
                                                                }
                                                            }}>
                                                                <option value="">--Choose List Sub Menu--</option>
                                                                {listSubMenuOptions.map(list => (
                                                                    <option key={list.id} value={list.id}>{list.title}</option>
                                                                ))}
                                                            </select>
                                                            {errors.selectedListSubMenu && <div className="invalid-feedback">{errors.selectedListSubMenu}</div>}

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12 section-divider"></div>

                                                <div className="col-lg-12">
                                                    <h6 className="sub-heading">Product Details</h6>
                                                    <div className="row">
                                                        {[
                                                            { id: 'sku', label: 'SKU Code' },
                                                            { id: 'title', label: 'Title' },
                                                            { id: 'weight', label: 'Weight (gms)' },
                                                            { id: 'model', label: 'Model' },
                                                            { id: 'sla', label: 'SLA (Delivery Days)' },
                                                            { id: 'deliveryCharges', label: 'Delivery Charges' },
                                                        ].map((field, idx) => (
                                                            <div className="col-lg-4 mb-3" key={idx}>
                                                                <label htmlFor={field.id} className="form-label">{field.label}</label>
                                                                <input id={field.id} className={`form-control ${errors[field.id] ? 'is-invalid' : ''}`} placeholder={field.label} type="text" value={formData[field.id]} onChange={(e) => {
                                                                    setFormData({ ...formData, [field.id]: e.target.value });
                                                                    if (errors[field.id]) {
                                                                        setErrors({ ...errors, [field.id]: '' });
                                                                    }
                                                                }} />
                                                                {errors[field.id] && (
                                                                    <div className="invalid-feedback">{errors[field.id]}</div>
                                                                )}
                                                            </div>
                                                        ))}

                                                        <div className="col-lg-12 mb-3">
                                                            <label className={`form-control ${errors.description ? 'is-invalid' : ''}`}>Description</label>
                                                            <CKEditor editor={ClassicEditor} data={description} onChange={(event, editor) => {
                                                                const data = editor.getData();
                                                                setDescription(data);
                                                                setFormData({ ...formData, description: data });
                                                                if (errors.description) {
                                                                    setErrors({ ...errors, description: "" })
                                                                }
                                                            }} />
                                                            {errors.description && <div className="invalid-feedback">{errors.description}</div>}

                                                        </div>

                                                        <div className="col-lg-6 mb-3">
                                                            <label className="form-label">Product Status</label>
                                                            <select className={`form-control ${errors.status ? 'is-invalid' : ''}`} value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                                                                <option value="enable">Enable</option>
                                                                <option value="disable">Disable</option>
                                                            </select>
                                                            {errors.status && <div className="invalid-feedback">{errors.status}</div>}

                                                        </div>

                                                        <div className="col-lg-6 mb-3">
                                                            <label className="form-label">Search Keywords</label>
                                                            <input type="text" className={`form-control ${errors.searchKeywords ? 'is-invalid' : ''}`} placeholder="Comma separated keywords" value={formData.searchKeywords} onChange={(e) => {
                                                                setFormData({ ...formData, searchKeywords: e.target.value });
                                                                if (errors.searchKeywords) {
                                                                    setErrors({ ...errors, searchKeywords: '' });
                                                                }
                                                            }}
                                                            />
                                                            {errors.searchKeywords && <div className="invalid-feedback">{errors.searchKeywords}</div>}

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12 section-divider"></div>

                                                <div className="col-lg-12">
                                                    <h6 className="sub-heading">Price & Color/Size Details</h6>
                                                    <div className="row">
                                                        {['stock', 'mrp', 'sellingPrice', 'height', 'width', 'length'].map((field, idx) => (
                                                            <div className="col-lg-3 mb-3" key={idx}>
                                                                <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                                                <input type="text" className={`form-control ${errors[field] ? 'is-invalid' : ''}`} placeholder={field} value={formData[field]} onChange={(e) => {
                                                                    setFormData({ ...formData, [field]: e.target.value });
                                                                    if (errors[field]) {
                                                                        setErrors({ ...errors, [field]: '' });
                                                                    }
                                                                }} />
                                                                {errors[field] && (
                                                                    <div className="invalid-feedback">{errors[field]}</div>
                                                                )}
                                                            </div>
                                                        ))}
                                                        <div className="col-lg-3 mb-3">
                                                            <label className="form-label">Brand</label>
                                                            <select
                                                                className={`form-control ${errors.brandId ? 'is-invalid' : ''}`}
                                                                value={formData.brandId}
                                                                onChange={(e) => {
                                                                    setFormData({ ...formData, brandId: e.target.value });
                                                                    if (errors.brandId) {
                                                                        setErrors({ ...errors, brandId: "" });
                                                                    }
                                                                }}
                                                            >
                                                                <option value="">--Choose Brand--</option>
                                                                {brands.map((s) => (
                                                                    <option key={s.id} value={s.id}>{s.name}</option>
                                                                ))}
                                                            </select>
                                                            {errors.brandId && <div className="invalid-feedback">{errors.brandId}</div>}

                                                        </div>

                                                        <div className="col-lg-3 mb-3">
                                                            <label className="form-label">Size</label>
                                                            <select
                                                                className={`form-control ${errors.sizeId ? 'is-invalid' : ''}`}

                                                                value={formData.sizeId}
                                                                onChange={(e) => {
                                                                    setFormData({ ...formData, sizeId: e.target.value });
                                                                    if (errors.sizeId) {
                                                                        setErrors({ ...errors, sizeId: "" });
                                                                    }
                                                                }}
                                                            >
                                                                <option value="">--Choose Size--</option>
                                                                {sizes.map((s) => (
                                                                    <option key={s.id} value={s.id}>{s.title}</option>
                                                                ))}
                                                            </select>
                                                            {errors.sizeId && <div className="invalid-feedback">{errors.sizeId}</div>}

                                                        </div>

                                                        <div className="col-lg-3 mb-3">
                                                            <label className="form-label">Color</label>
                                                            <select
                                                                className={`form-control ${errors.colorId ? 'is-invalid' : ''}`}
                                                                value={formData.colorId}
                                                                onChange={(e) => {
                                                                    setFormData({ ...formData, colorId: e.target.value });
                                                                    if (errors.colorId) {
                                                                        setErrors({ ...errors, colorId: "" })
                                                                    }
                                                                }}
                                                            >
                                                                <option value="">--Choose Color--</option>
                                                                {colors.map((s) => (
                                                                    <option key={s.id} value={s.id}>{s.label}</option>
                                                                ))}
                                                            </select>
                                                            {errors.colorId && <div className="invalid-feedback">{errors.colorId}</div>}

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12 mb-3">
                                                    <h6 className="sub-heading pt-4">Other Variants</h6>
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th>SKU <span className="text-danger">*</span></th>
                                                                <th>Stock <span className="text-danger">*</span></th>
                                                                <th>MRP <span className="text-danger">*</span></th>
                                                                <th>Selling Price <span className="text-danger">*</span></th>
                                                                <th>Size</th>
                                                                <th>Color</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {variants.map((variant, index) => (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={variant.sku}
                                                                            onChange={(e) => handleChange(index, 'sku', e.target.value)}
                                                                            placeholder="SKU"
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={variant.stock}
                                                                            onChange={(e) => handleChange(index, 'stock', e.target.value)}
                                                                            placeholder="Stock"
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={variant.mrp}
                                                                            onChange={(e) => handleChange(index, 'mrp', e.target.value)}
                                                                            placeholder="MRP"
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={variant.sellingPrice}
                                                                            onChange={(e) => handleChange(index, 'sellingPrice', e.target.value)}
                                                                            placeholder="Selling Price"
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <select
                                                                            className="form-control"
                                                                            value={variant.sizeId}
                                                                            onChange={(e) => handleChange(index, 'sizeId', e.target.value)}
                                                                        >
                                                                            <option value="">-- Choose Size --</option>
                                                                            {sizes.map((size) => (
                                                                                <option key={size.id} value={size.id}>
                                                                                    {size.title}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <select
                                                                            className="form-control"
                                                                            value={variant.colorId}
                                                                            onChange={(e) => handleChange(index, 'colorId', e.target.value)}
                                                                        >
                                                                            <option value="">-- Choose Color --</option>
                                                                            {colors.map((color) => (
                                                                                <option key={color.id} value={color.id}>
                                                                                    {color.label}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                    </td>

                                                                    <td>
                                                                        {index === variants.length - 1 ? (
                                                                            <button type="button" className="btn btn-light-success icon-btn b-r-4" onClick={addRow}>
                                                                                +
                                                                            </button>
                                                                        ) : (
                                                                            <button type="button" className="btn btn-danger icon-btn b-r-4" onClick={() => removeRow(index)}>
                                                                                -
                                                                            </button>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className="col-lg-12 text-center my-4">
                                                    <button type="submit" className="btn btn-primary py-2 px-5 me-2">Submit</button>
                                                    <button type="reset" className="btn btn-secondary py-2 px-5" onClick={handleReset}>Reset</button>
                                                </div>

                                            </div>
                                        </form>
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

export default EditProduct;