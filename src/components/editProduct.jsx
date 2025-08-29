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
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { addVariants, editVariants } from '../redux/actions/variantsAction';
import axios from 'axios';
import BASE_URL from '../config/config';
import { toast } from 'react-toastify';

const EditProduct = ({ onClose, onProductCreated }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [id, dispatch]);
    const location = useLocation();
    const variantIds = location.state?.variantIds || [];

    useEffect(() => {
        console.log('Editing Product ID:', id);
        console.log('Variant IDs:', variantIds);
    }, [id, variantIds]);

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
    const [createdVariantIds, setCreatedVariantIds] = useState('');
    const [updatedVariantIds, setUpdatedVariantIds] = useState([]);
    const [selectedDisplay, setSelectedDisplay] = useState([]);
    const frontEndDisplay = ["New Arrivals", "Deals of the Day", "Trending",];

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
        if (product && categories.length) {
            console.log('Product:', product);
            const listSubCategory = categories.find(
                (cat) => cat.id === (product.listSubCategoryId || product.categoryId)
            );
            let menuId = '';
            let subMenuId = '';
            let listSubMenuId = '';

            if (listSubCategory) {
                listSubMenuId = listSubCategory.id || '';
                const subCategory = listSubCategory.parentId
                    ? categories.find((cat) => cat.id === listSubCategory.parentId)
                    : null;
                if (subCategory) {
                    subMenuId = subCategory.id || '';
                    const menuCategory = subCategory.parentId
                        ? categories.find((cat) => cat.id === subCategory.parentId)
                        : null;
                    menuId = menuCategory ? menuCategory.id : subCategory.id;
                } else {
                    menuId = listSubCategory.id;
                }
            }

            console.log('Setting Menu:', menuId, 'SubMenu:', subMenuId, 'ListSubMenu:', listSubMenuId);

            setSelectedMenu(menuId);
            setSelectedSubMenu(subMenuId);
            setSelectedListSubMenu(listSubMenuId);
            setFormData({
                sku: product.sku || '',
                title: product.title || '',
                weight: product.productDetails?.weight || '',
                model: product.productDetails?.model || '',
                sla: product.productDetails?.sla ?? '',
                deliveryCharges: product.productDetails?.deliveryCharges || '',
                description: product.description || '',
                status: product.status ? 'enable' : 'disable',
                searchKeywords: product.searchKeywords || '',
                stock: product.stock || '',
                mrp: product.mrp || '',
                sellingPrice: product.sellingPrice || '',
                height: product.productDetails?.height || '',
                width: product.productDetails?.width || '',
                length: product.productDetails?.length || '',
                sizeId: product.sizeId || '',
                colorId: product.colorId || '',
                brandId: product.brandId || '',
            });
            setVariants(
                Array.isArray(product.variants) && product.variants.length
                    ? product.variants.map((v) => ({
                        id: v.id,
                        sku: v.sku || '',
                        stock: v.stock?.toString() || '',
                        mrp: v.mrp?.toString() || '',
                        sellingPrice: v.sellingPrice?.toString() || '',
                        sizeId: v.sizeId?.toString() || '',
                        colorId: v.colorId?.toString() || '',
                    }))
                    : [{ sku: '', stock: '', mrp: '', sellingPrice: '', sizeId: '', colorId: '' }]
            );
        }
    }, [product, categories]);

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
        if (formData.stock && isNaN(formData.stock)) newErrors.stock = 'Stock must be a number';
        if (formData.mrp && isNaN(formData.mrp)) newErrors.mrp = 'MRP must be a number';
        if (formData.sellingPrice && isNaN(formData.sellingPrice))
            newErrors.sellingPrice = 'Selling Price must be a number';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.status) newErrors.status = 'Product status is required';
        if (!formData.searchKeywords.trim()) newErrors.searchKeywords = 'Search Keywords are required';
        else if (isNaN(formData.weight)) newErrors.weight = 'Weight must be a number';
        if (!formData.sla) newErrors.sla = 'SLA is required';
        else if (isNaN(formData.sla)) newErrors.sla = 'SLA must be a number';
        else if (isNaN(formData.deliveryCharges))
            newErrors.deliveryCharges = 'Delivery Charges must be a number';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({});
        if (!validate()) return;

        const cleanedVariants = variants
            .filter((v) => v.sku && v.stock && v.mrp && v.sellingPrice)
            .map((v) => ({
                ...v,
                sku: v.sku,
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
            categoryId: parseInt(selectedListSubMenu || selectedSubMenu || selectedMenu),
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
            variants: cleanedVariants,
        };

        console.log('Submitting Product with Variants:', payload);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${BASE_URL}/products/${id}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('Product updated successfully:', response.data);
            toast.success('Product updated successfully');

            // Re-fetch the updated product to ensure state consistency
            dispatch(fetchProductById(id));

            // Update created product ID
            setCreatedProductId(response.data.id);

            if (onProductCreated) {
                onProductCreated({
                    id: response.data.id,
                    featureTypeId: selectedFeatureTypeId,
                    featureType: featureType,
                    filterTypeId: selectedFilterTypeId,
                    filterType: filterType,
                });
            }

            if (onClose) {
                onClose();
            }
        } catch (err) {
            console.error('Error updating product:', err);
            setErrors({
                brand: err?.response?.data?.message || 'Something went wrong.',
            });
        }
    };


    const handleReset = (e) => {
        e.preventDefault();
        setFormData(initialFormState);
        setDescription('');
        setVariants([{ sku: '', stock: '', mrp: '', sellingPrice: '', sizeId: '', colorId: '' }]);
        // Optionally preserve category selections
        // setSelectedMenu('');
        // setSelectedSubMenu('');
        // setSelectedListSubMenu('');
    };

    useEffect(() => {
        console.log('Menu Options:', menuOptions);
        console.log('SubMenu Options:', subMenuOptions);
        console.log('List SubMenu Options:', listSubMenuOptions);
    }, [menuOptions, subMenuOptions, listSubMenuOptions]);

    // Variants
    const [variants, setVariants] = useState([
        { sku: '', stock: '', mrp: '', sellingPrice: '', sizeId: '', colorId: '' },
    ]);

    // const handleChange = (index, field, value) => {
    //     const updatedVariants = [...variants];
    //     updatedVariants[index][field] = value;
    //     setVariants(updatedVariants);
    // };

    const handleChange = (index, field, value) => {
        const updatedVariants = [...variants];

        // Ensure only numeric input (optional, but good practice for prices)
        if (['mrp', 'sellingPrice'].includes(field)) {
            value = value.replace(/[^\d.]/g, '');
        }

        updatedVariants[index][field] = value;
        const mrp = parseFloat(field === 'mrp' ? value : updatedVariants[index]['mrp']);
        const sp = parseFloat(field === 'sellingPrice' ? value : updatedVariants[index]['sellingPrice']);

        if (!isNaN(mrp) && !isNaN(sp) && sp > mrp) {
            updatedVariants[index].error = 'Selling Price cannot be greater than MRP';
        } else {
            updatedVariants[index].error = '';
        }

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

    const handleCheckboxChange = (display) => {
        setSelectedDisplay((prev) =>
            prev.includes(display)
                ? prev.filter((c) => c !== display)
                : [...prev, display]
        );
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
                                                { id: 'model', label: 'Model', required: false },
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
                                                <div className="custom-ckeditor">
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
                                                </div>
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
                                                    Comma Separated Search Keywords<span className="text-danger">*</span>
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
                                            <div className="col-lg-6 mb-3">
                                                <label className="form-label">
                                                    Front End Display
                                                </label>
                                                {frontEndDisplay.map((display) => (
                                                    <label key={display} style={{ display: "block" }}>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedDisplay.includes(display)}
                                                            onChange={() => handleCheckboxChange(display)}
                                                            className='mb-3 me-2'
                                                        />
                                                        {display}
                                                    </label>
                                                ))}
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
                                                                let value = e.target.value;

                                                                if (field === 'stock') {
                                                                    value = value.replace(/\D/g, '').slice(0, 4); // Only digits, max 4
                                                                }

                                                                const updatedForm = { ...formData, [field]: value };

                                                                // Check if sellingPrice > mrp
                                                                if (field === 'sellingPrice') {
                                                                    const mrp = parseFloat(updatedForm['mrp']);
                                                                    const sp = parseFloat(value);
                                                                    if (!isNaN(mrp) && !isNaN(sp) && sp > mrp) {
                                                                        setErrors((prev) => ({
                                                                            ...prev,
                                                                            [field]: 'Selling Price cannot be greater than MRP',
                                                                        }));
                                                                    } else {
                                                                        setErrors((prev) => ({ ...prev, [field]: '' }));
                                                                    }
                                                                } else if (errors[field]) {
                                                                    setErrors((prev) => ({ ...prev, [field]: '' }));
                                                                }

                                                                setFormData(updatedForm);
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
                                                    Size
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
                                                    Color
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
                                                                maxLength={4}
                                                                inputMode="numeric"
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    if (/^\d{0,4}$/.test(val)) {
                                                                        handleChange(index, 'stock', val);
                                                                    }
                                                                }}
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
                                                            {variant.error && <div className="text-danger small mt-1">{variant.error}</div>}
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={variant.sellingPrice}
                                                                onChange={(e) => handleChange(index, 'sellingPrice', e.target.value)}
                                                                placeholder="Selling Price"
                                                            />
                                                            {variant.error && (
                                                                <div className="text-danger small mt-1">{variant.error}</div>
                                                            )}

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