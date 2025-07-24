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
import { addProducts, fetchProductById } from '../redux/actions/productAction';
import { fetchBrands } from '../redux/actions/brandAction';
import { useNavigate, useParams } from 'react-router-dom';
import { addVariants, editVariants } from '../redux/actions/variantsAction';
import axios from 'axios';
import BASE_URL from '../config/config';

const EditProduct = ({ onClose, onProductCreated }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [id, dispatch]);

    const { categories = [] } = useSelector((state) => state.categories || {});
    const { sizes = [] } = useSelector((state) => state.sizes || {});
    const { colors = [] } = useSelector((state) => state.colors || {});
    const { brands = [] } = useSelector((state) => state.brands);
    console.log('colors', colors);

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [description, setDescription] = useState('');
    const [selectedMenu, setSelectedMenu] = useState('');
    const [selectedSubMenu, setSelectedSubMenu] = useState('');
    const [selectedListSubMenu, setSelectedListSubMenu] = useState('');
    const [errors, setErrors] = useState({});
    const [createdProductId, setCreatedProductId] = useState(null);

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

    const menuOptions = categories.filter((cat) => cat.parentId === null);
    const subMenuOptions = categories.filter((cat) => cat.parentId === parseInt(selectedMenu));
    const listSubMenuOptions = categories.filter((cat) => cat.parentId === parseInt(selectedSubMenu));
    const featureTypeId = listSubMenuOptions[0]?.featureTypeId || '';
    const featureTypeName = listSubMenuOptions[0]?.featureType?.name || '';
    const selectedFeatureTypeId =
        listSubMenuOptions.find((option) => option.id === parseInt(selectedListSubMenu))?.featureTypeId || null;
    const featureType =
        listSubMenuOptions.find((option) => option.id === parseInt(selectedListSubMenu))?.featureType || null;
    const selectedFilterTypeId =
        listSubMenuOptions.find((option) => option.id === parseInt(selectedListSubMenu))?.filterTypeId || null;
    const filterType =
        listSubMenuOptions.find((option) => option.id === parseInt(selectedListSubMenu))?.filterType || null;

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchColors());
        dispatch(fetchSizes());
        dispatch(fetchBrands());
    }, [dispatch]);

    const { product } = useSelector(state => state.products);

    useEffect(() => {
        if (product) {
            const p = product;
            console.log('p:', p);
            const listSubCategory = categories.find(cat => cat.id === p.listSubCategoryId || p.categoryId);
            const subCategory = categories.find(cat => cat.id === listSubCategory?.parentId);
            const menuCategory = categories.find(cat => cat.id === subCategory?.parentId);
            setSelectedListSubMenu(listSubCategory?.id || '');
            setSelectedSubMenu(subCategory?.id || '');
            setSelectedMenu(menuCategory?.id || '');
            setFormData({
                sku: p.sku,
                title: p.title,
                weight: p.productDetails.weight,
                model: p.productDetails.model,
                sla: p.productDetails.sla,
                deliveryCharges: p.productDetails.deliveryCharges,
                description: p.description,
                status: p.status ? 'enable' : 'disable',
                searchKeywords: p.searchKeywords,
                stock: p.stock,
                mrp: p.mrp,
                sellingPrice: p.sellingPrice,
                height: p.productDetails.height || '',
                width: p.productDetails.width || '',
                length: p.productDetails.length || '',
                sizeId: p.sizeId,
                colorId: p.colorId,
                brandId: p.brandId,
            });
            setVariants(
                Array.isArray(p.variants) && p.variants.length
                    ? p.variants.map(v => ({
                        id: v.id,
                        sku: v.sku || '',
                        stock: v.stock?.toString() || '',
                        mrp: v.mrp?.toString() || '',
                        sellingPrice: v.sellingPrice?.toString() || '',
                        sizeId: v.sizeId?.toString() || '',
                        colorId: v.colorId?.toString() || ''
                    }))
                    : [{ sku: '', stock: '', mrp: '', sellingPrice: '', sizeId: '', colorId: '' }]
            );
        }
    }, [product]);

    const handleToggleSidebar = (collapsed) => {
        setIsSidebarCollapsed(collapsed);
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!selectedMenu) newErrors.selectedMenu = 'Menu is required';
        if (!selectedSubMenu) newErrors.selectedSubMenu = 'Sub Menu is required';
        if (!selectedListSubMenu) newErrors.selectedListSubMenu = 'List Sub Menu is required';
        if (!formData.stock) newErrors.stock = 'Stock is required';
        if (!formData.mrp) newErrors.mrp = 'MRP is required';
        if (!formData.sellingPrice) newErrors.sellingPrice = 'Selling Price is required';
        // if (!formData.brandId) newErrors.brandId = 'Brand is required';
        if (!formData.sizeId) newErrors.sizeId = 'Size is required';
        if (!formData.colorId) newErrors.colorId = 'Color is required';
        if (formData.stock && isNaN(formData.stock)) newErrors.stock = 'Stock must be a number';
        if (formData.mrp && isNaN(formData.mrp)) newErrors.mrp = 'MRP must be a number';
        if (formData.sellingPrice && isNaN(formData.sellingPrice))
            newErrors.sellingPrice = 'Selling Price must be a number';
        // if (formData.height && isNaN(formData.height)) newErrors.height = 'Height must be a number';
        // if (formData.width && isNaN(formData.width)) newErrors.width = 'Width must be a number';
        // if (formData.length && isNaN(formData.length)) newErrors.length = 'Length must be a number';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.status) newErrors.status = 'Product status is required';
        if (!formData.searchKeywords.trim()) newErrors.searchKeywords = 'Search Keywords are required';
        // if (!formData.height) newErrors.height = 'Height is required';
        // if (!formData.width) newErrors.width = 'Width is required';
        // if (!formData.length) newErrors.length = 'Length is required';
        // if (!formData.weight) newErrors.weight = 'Weight is required';
        else if (isNaN(formData.weight)) newErrors.weight = 'Weight must be a number';
        if (!formData.sla) newErrors.sla = 'SLA is required';
        else if (isNaN(formData.sla)) newErrors.sla = 'SLA must be a number';
        // if (!formData.deliveryCharges) newErrors.deliveryCharges = 'Delivery Charges are required';
        else if (isNaN(formData.deliveryCharges))
            newErrors.deliveryCharges = 'Delivery Charges must be a number';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({});
        if (!validate()) return;



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
            categoryId: parseInt(selectedMenu),
            status: formData.status === 'enable',
            featureTypeId: selectedFeatureTypeId,
            featureType: featureType,
            filterTypeId: selectedFilterTypeId,
            filterType: filterType,
            productDetails: {
                model: formData.model,
                weight: parseFloat(formData.weight),
                sla: parseInt(formData.sla),
                deliveryCharges: parseFloat(formData.deliveryCharges),
            },
        };
        console.log('Submitting Product:', payload);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${BASE_URL}/products/${id}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const productId = response.data?.id;
            console.log('productId', productId)
            console.log('Product created successfully:', response.data);
            const cleanedVariants = variants
                .filter(v => v.sku && v.stock && v.mrp && v.sellingPrice)
                .map(v => ({
                    ...v,
                    sku: v.sku,
                    stock: parseInt(v.stock),
                    mrp: parseFloat(v.mrp),
                    sellingPrice: parseFloat(v.sellingPrice),
                    sizeId: v.sizeId ? parseInt(v.sizeId) : null,
                    colorId: v.colorId ? parseInt(v.colorId) : null,
                }));

            for (const variant of cleanedVariants) {
                if (!variant.id) {
                    console.warn("Variant is missing ID:", variant);
                    continue;
                }

                const { id, ...variantPayload } = variant;

                try {
                    await axios.put(`${BASE_URL}/variants/${id}`, { ...variantPayload, productId }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    console.log("Variant updated:", variant);
                } catch (err) {
                    console.error("Failed to update variant:", variant, err);
                }
            }




            // Reset all form data
            setFormData(initialFormState);
            setDescription('');
            setSelectedMenu('');
            setSelectedSubMenu('');
            setSelectedListSubMenu('');
            setVariants([{ sku: '', stock: '', mrp: '', sellingPrice: '', sizeId: '', colorId: '' }]);

            setCreatedProductId(response.data.id);

            // Notify parent component
            if (onProductCreated) {
                onProductCreated({
                    id: response.data.id,
                    featureTypeId: selectedFeatureTypeId,
                    featureType: featureType,
                    filterTypeId: selectedFilterTypeId,
                    filterType: filterType,
                });
            }
            // Only close if it's a modal, otherwise stay on the same page
            if (onClose) {
                onClose(); // Close the modal if provided
            }
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
        setVariants([{ sku: '', stock: '', mrp: '', sellingPrice: '', sizeId: '', colorId: '' }]);
    };

    // Variants
    const [variants, setVariants] = useState([
        { sku: '', stock: '', mrp: '', sellingPrice: '', sizeId: '', colorId: '' },
    ]);

    const handleChange = (index, field, value) => {
        const updatedVariants = [...variants];
        updatedVariants[index][field] = value;
        setVariants(updatedVariants);
    };
    const addRow = () => {
        setVariants([
            ...variants,
            { sku: '', stock: '', mrp: '', sellingPrice: '', sizeId: '', colorId: '' },
        ]);
    };

    const removeRow = (index) => {
        const updatedVariants = variants.filter((_, i) => i !== index);
        setVariants(updatedVariants);
    };

    return (
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
                                                <label className="form-label">
                                                    Menu<span className="text-danger">*</span>
                                                </label>
                                                <select
                                                    className={`form-control ${errors.selectedMenu ? 'is-invalid' : ''}`}
                                                    value={selectedMenu}
                                                    onChange={(e) => {
                                                        setSelectedMenu(e.target.value);
                                                        setSelectedSubMenu('');
                                                        setSelectedListSubMenu('');
                                                        if (errors.selectedMenu) {
                                                            setErrors({ ...errors, selectedMenu: '' });
                                                        }
                                                    }}
                                                >
                                                    <option value="">--Choose Menu--</option>
                                                    {menuOptions.map((menu) => (
                                                        <option key={menu.id} value={menu.id}>
                                                            {menu.title}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.selectedMenu && (
                                                    <div className="invalid-feedback">{errors.selectedMenu}</div>
                                                )}
                                            </div>
                                            <div className="col-lg-4 mb-3">
                                                <label className="form-label">
                                                    Sub Menu<span className="text-danger">*</span>
                                                </label>
                                                <select
                                                    className={`form-control ${errors.selectedSubMenu ? 'is-invalid' : ''}`}
                                                    value={selectedSubMenu}
                                                    onChange={(e) => {
                                                        setSelectedSubMenu(e.target.value);
                                                        setSelectedListSubMenu('');
                                                        if (errors.selectedSubMenu) {
                                                            setErrors({ ...errors, selectedSubMenu: '' });
                                                        }
                                                    }}
                                                >
                                                    <option value="">--Choose Sub Menu--</option>
                                                    {subMenuOptions.map((sub) => (
                                                        <option key={sub.id} value={sub.id}>
                                                            {sub.title}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.selectedSubMenu && (
                                                    <div className="invalid-feedback">{errors.selectedSubMenu}</div>
                                                )}
                                            </div>
                                            <div className="col-lg-4 mb-3">
                                                <label className="form-label">
                                                    List Sub Menu<span className="text-danger">*</span>
                                                </label>
                                                <select
                                                    className={`form-control ${errors.selectedListSubMenu ? 'is-invalid' : ''}`}
                                                    value={selectedListSubMenu}
                                                    onChange={(e) => {
                                                        setSelectedListSubMenu(e.target.value);
                                                        if (errors.selectedListSubMenu) {
                                                            setErrors({ ...errors, selectedListSubMenu: '' });
                                                        }
                                                    }}
                                                >
                                                    <option value="">--Choose List Sub Menu--</option>
                                                    {listSubMenuOptions.map((list) => (
                                                        <option key={list.id} value={list.id}>
                                                            {list.title}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.selectedListSubMenu && (
                                                    <div className="invalid-feedback">{errors.selectedListSubMenu}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 section-divider"></div>

                                    <div className="col-lg-12">
                                        <h6 className="sub-heading">Product Details</h6>
                                        <div className="row">
                                            {[
                                                { id: 'sku', label: 'SKU Code', required: true },
                                                { id: 'title', label: 'Title', required: true },
                                                { id: 'weight', label: 'Weight (gms)', required: false },
                                                { id: 'model', label: 'Model', required: true },
                                                { id: 'sla', label: 'SLA (Delivery Days)', required: true },
                                                { id: 'deliveryCharges', label: 'Delivery Charges', required: false },
                                            ].map((field, idx) => (
                                                <div className="col-lg-4 mb-3" key={idx}>
                                                    <label htmlFor={field.id} className="form-label">
                                                        {field.label} {field.required && <span className="text-danger">*</span>}
                                                    </label>
                                                    <input
                                                        id={field.id}
                                                        className={`form-control ${errors[field.id] ? 'is-invalid' : ''}`}
                                                        placeholder={field.label}
                                                        type="text"
                                                        value={formData[field.id]}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, [field.id]: e.target.value });
                                                            if (errors[field.id]) {
                                                                setErrors({ ...errors, [field.id]: '' });
                                                            }
                                                        }}
                                                    />
                                                    {errors[field.id] && (
                                                        <div className="invalid-feedback">{errors[field.id]}</div>
                                                    )}
                                                </div>
                                            ))}
                                            <div className="col-lg-12 mb-3">
                                                <label className={`form-label ${errors.description ? 'is-invalid' : ''}`}>
                                                    Description<span className="text-danger">*</span>
                                                </label>
                                                <CKEditor
                                                    key={formData.description}
                                                    editor={ClassicEditor}
                                                    data={formData.description}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setFormData((prev) => ({ ...prev, description: data }));
                                                        if (errors.description) {
                                                            setErrors((prev) => ({ ...prev, description: '' }));
                                                        }
                                                    }}
                                                />

                                                {errors.description && (
                                                    <div className="invalid-feedback">{errors.description}</div>
                                                )}
                                            </div>


                                            <div className="col-lg-6 mb-3">
                                                <label className="form-label">
                                                    Product Status<span className="text-danger">*</span>
                                                </label>
                                                <select
                                                    className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                                                    value={formData.status}
                                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                >
                                                    <option value="enable">Enable</option>
                                                    <option value="disable">Disable</option>
                                                </select>
                                                {errors.status && (
                                                    <div className="invalid-feedback">{errors.status}</div>
                                                )}
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <label className="form-label">
                                                    Search Keywords<span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.searchKeywords ? 'is-invalid' : ''}`}
                                                    placeholder="Comma separated keywords"
                                                    value={formData.searchKeywords}
                                                    onChange={(e) => {
                                                        setFormData({ ...formData, searchKeywords: e.target.value });
                                                        if (errors.searchKeywords) {
                                                            setErrors({ ...errors, searchKeywords: '' });
                                                        }
                                                    }}
                                                />
                                                {errors.searchKeywords && (
                                                    <div className="invalid-feedback">{errors.searchKeywords}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 section-divider"></div>

                                    <div className="col-lg-12">
                                        <h6 className="sub-heading">Price & Color/Size Details</h6>
                                        <div className="row">
                                            {['stock', 'mrp', 'sellingPrice', 'height', 'width', 'length'].map((field, idx) => {
                                                const isRequired = ['stock', 'mrp', 'sellingPrice'].includes(field);

                                                return (
                                                    <div className="col-lg-3 mb-3" key={idx}>
                                                        <label className="form-label">
                                                            {field.charAt(0).toUpperCase() + field.slice(1)}
                                                            {isRequired && <span className="text-danger">*</span>}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
                                                            placeholder={field}
                                                            value={formData[field]}
                                                            onChange={(e) => {
                                                                setFormData({ ...formData, [field]: e.target.value });
                                                                if (errors[field]) {
                                                                    setErrors({ ...errors, [field]: '' });
                                                                }
                                                            }}
                                                        />
                                                        {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
                                                    </div>
                                                );
                                            })}
                                            <div className="col-lg-3 mb-3">
                                                <label className="form-label">
                                                    Brand
                                                </label>
                                                <select
                                                    className={`form-control ${errors.brandId ? 'is-invalid' : ''}`}
                                                    value={formData.brandId}
                                                    onChange={(e) => {
                                                        setFormData({ ...formData, brandId: e.target.value });
                                                        if (errors.brandId) {
                                                            setErrors({ ...errors, brandId: '' });
                                                        }
                                                    }}
                                                >
                                                    <option value="">--Choose Brand--</option>
                                                    {brands.map((s) => (
                                                        <option key={s.id} value={s.id}>
                                                            {s.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.brandId && (
                                                    <div className="invalid-feedback">{errors.brandId}</div>
                                                )}
                                            </div>

                                            <div className="col-lg-3 mb-3">
                                                <label className="form-label">
                                                    Size<span className="text-danger">*</span>
                                                </label>
                                                <select
                                                    className={`form-control ${errors.sizeId ? 'is-invalid' : ''}`}
                                                    value={formData.sizeId}
                                                    onChange={(e) => {
                                                        setFormData({ ...formData, sizeId: e.target.value });
                                                        if (errors.sizeId) {
                                                            setErrors({ ...errors, sizeId: '' });
                                                        }
                                                    }}
                                                >
                                                    <option value="">--Choose Size--</option>
                                                    {sizes.map((s) => (
                                                        <option key={s.id} value={s.id}>
                                                            {s.title}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.sizeId && (
                                                    <div className="invalid-feedback">{errors.sizeId}</div>
                                                )}
                                            </div>

                                            <div className="col-lg-3 mb-3">
                                                <label className="form-label">
                                                    Color<span className="text-danger">*</span>
                                                </label>
                                                <select
                                                    className={`form-control ${errors.colorId ? 'is-invalid' : ''}`}
                                                    value={formData.colorId}
                                                    onChange={(e) => {
                                                        setFormData({ ...formData, colorId: e.target.value });
                                                        if (errors.colorId) {
                                                            setErrors({ ...errors, colorId: '' });
                                                        }
                                                    }}
                                                >
                                                    <option value="">--Choose Color--</option>
                                                    {colors.map((s) => (
                                                        <option key={s.id} value={s.id}>
                                                            {s.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.colorId && (
                                                    <div className="invalid-feedback">{errors.colorId}</div>
                                                )}
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
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-light-success icon-btn b-r-4"
                                                                    onClick={addRow}
                                                                >
                                                                    <BsPlus />
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger icon-btn b-r-4"
                                                                    onClick={() => removeRow(index)}
                                                                >
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
                                        <button type="submit" className="btn btn-primary py-2 px-5 me-2">
                                            Save
                                        </button>
                                        <button
                                            type="reset"
                                            className="btn btn-secondary py-2 px-5"
                                            onClick={handleReset}
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;