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
import { addProducts } from '../redux/actions/productAction';
import { fetchBrands } from '../redux/actions/brandAction';
import { useNavigate } from 'react-router-dom';
import { addVariants } from '../redux/actions/variantsAction';
import axios from 'axios';
import BASE_URL from '../config/config';

const AddProduct = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories = [] } = useSelector((state) => state.categories || {});
  const { sizes = [] } = useSelector((state) => state.sizes || {});
  const { colors = [] } = useSelector((state) => state.colors || {});
  const { brands = [] } = useSelector((state) => state.brands);
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

  const menuOptions = categories.filter(cat => cat.parentId === null);
  const subMenuOptions = categories.filter(cat => cat.parentId === parseInt(selectedMenu));
  const listSubMenuOptions = categories.filter(cat => cat.parentId === parseInt(selectedSubMenu));

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchColors());
    dispatch(fetchSizes());
    dispatch(fetchBrands());

     const savedDraft = localStorage.getItem('productDraft');
    if (savedDraft) {
      const draft = JSON.parse(savedDraft);
      setFormData(draft.formData || initialFormState);
      setSelectedMenu(draft.selectedMenu || '');
      setSelectedSubMenu(draft.selectedSubMenu || '');
      setSelectedListSubMenu(draft.selectedListSubMenu || '');
      setDescription(draft.description || '');
      setVariants(draft.variants || [{ sku: '', stock: '', mrp: '', sellingPrice: '', sizeId: '', colorId: '' }]);
    }

  }, [dispatch]);


  

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
    if (!formData.brandId) newErrors.brandId = 'Brand is required';
    if (!formData.sizeId) newErrors.sizeId = 'Size is required';
    if (!formData.colorId) newErrors.colorId = 'Color is required';
    if (formData.stock && isNaN(formData.stock)) newErrors.stock = 'Stock must be a number';
    if (formData.mrp && isNaN(formData.mrp)) newErrors.mrp = 'MRP must be a number';
    if (formData.sellingPrice && isNaN(formData.sellingPrice)) newErrors.sellingPrice = 'Selling Price must be a number';
    if (formData.height && isNaN(formData.height)) newErrors.height = 'Height must be a number';
    if (formData.width && isNaN(formData.width)) newErrors.width = 'Width must be a number';
    if (formData.length && isNaN(formData.length)) newErrors.length = 'Length must be a number';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.status) newErrors.status = 'Product status is required';
    if (!formData.searchKeywords.trim()) newErrors.searchKeywords = 'Search Keywords are required';
    if (!formData.height) newErrors.height = 'Height is required';
    if (!formData.width) newErrors.width = 'Width is required';
    if (!formData.length) newErrors.length = 'Length is required';
    if (!formData.weight) newErrors.weight = 'Weight is required';
    else if (isNaN(formData.weight)) newErrors.weight = 'Weight must be a number';

    if (!formData.sla) newErrors.sla = 'SLA is required';
    else if (isNaN(formData.sla)) newErrors.sla = 'SLA must be a number';

    if (!formData.deliveryCharges) newErrors.deliveryCharges = 'Delivery Charges are required';
    else if (isNaN(formData.deliveryCharges)) newErrors.deliveryCharges = 'Delivery Charges must be a number';


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;

  }

  //   const handleInputChange = (field, value) => {
  //   setFormData({ ...formData, [field]: value });

  //   // Validate while typing
  //   let fieldError = '';

  //   if (['sku', 'title', 'searchKeywords'].includes(field) && !value.trim()) {
  //     fieldError = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
  //   }

  //   if (['stock', 'mrp', 'sellingPrice', 'height', 'width', 'length'].includes(field)) {
  //     if (!value) {
  //       fieldError = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
  //     } else if (isNaN(value)) {
  //       fieldError = `${field.charAt(0).toUpperCase() + field.slice(1)} must be a number`;
  //     }
  //   }

  //   setErrors((prev) => ({
  //     ...prev,
  //     [field]: fieldError,
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;

    const payload = {
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
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/products`, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const productId = response.data?.id;

      const variantPayloads = variants
        .filter(v => v.sku && v.stock && v.mrp && v.sellingPrice)
        .map(variant => ({
          ...variant,
          productId,
          stock: parseInt(variant.stock),
          mrp: parseFloat(variant.mrp),
          sellingPrice: parseFloat(variant.sellingPrice),
          sizeId: variant.sizeId ? parseInt(variant.sizeId) : null,
          colorId: variant.colorId ? parseInt(variant.colorId) : null,
        }));

      if (variantPayloads.length) {
        await dispatch(addVariants(variantPayloads));
      }

   // Clear form and draft
      setFormData(initialFormState);
      setDescription('');
      setSelectedMenu('');
      setSelectedSubMenu('');
      setSelectedListSubMenu('');
      setVariants([{ sku: '', stock: '', mrp: '', sellingPrice: '', sizeId: '', colorId: '' }]);
      localStorage.removeItem('productDraft');
      navigate('/admin/manage-product')

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

  // variants 
  const [variants, setVariants] = useState([
    { sku: '', stock: '', mrp: '', sellingPrice: '', sizeId: '', colorId: '' }
  ]);

  const handleChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

    const handleSaveDraft = () => {
    const draftData = {
      formData,
      selectedMenu,
      selectedSubMenu,
      selectedListSubMenu,
      description,
      variants
    };
    localStorage.setItem('productDraft', JSON.stringify(draftData));
    alert('Draft saved locally!');
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

        <div className="content-wrapper py-3" style={{ marginLeft: isSidebarCollapsed ? '60px' : '272px', padding: '20px', flex: 1, transition: 'margin-left 0.3s ease' }}>

          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header py-3">
                    <h5 className="text-dark mb-0">Create Product</h5>
                  </div>
                  <div className="card-block">
                    <form onSubmit={handleSubmit} className="app-form">
                      <div className="row">
                        <div className="col-lg-12">
                          <h6 className="sub-heading">Category Details</h6>
                          <div className="row">
                            <div className="col-lg-4 mb-3">
                              <label className="form-label">Menu<span className='text-danger'>*</span></label>
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
                              <label className="form-label">Sub Menu<span className='text-danger'>*</span></label>
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
                              <label className="form-label">List Sub Menu<span className='text-danger'>*</span></label>
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
                              { id: 'sku', label: 'SKU Code', required: true },
                              { id: 'title', label: 'Title', required: true },
                              { id: 'weight', label: 'Weight (gms)', required: false },
                              { id: 'model', label: 'Model', required: true },
                              { id: 'sla', label: 'SLA (Delivery Days)', required: true },
                              { id: 'deliveryCharges', label: 'Delivery Charges', required: true },
                            ].map((field, idx) => (
                              <div className="col-lg-4 mb-3" key={idx}>
                                <label htmlFor={field.id} className="form-label">{field.label} {field.required && <span className='text-danger'>*</span>}</label>
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
                              <label className={`form-control ${errors.description ? 'is-invalid' : ''}`}>Description<span className='text-danger'>*</span></label>
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
                              <label className="form-label">Product Status<span className='text-danger'>*</span></label>
                              <select className={`form-control ${errors.status ? 'is-invalid' : ''}`} value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                                <option value="enable">Enable</option>
                                <option value="disable">Disable</option>
                              </select>
                              {errors.status && <div className="invalid-feedback">{errors.status}</div>}

                            </div>

                            <div className="col-lg-6 mb-3">
                              <label className="form-label">Search Keywords<span className='text-danger'>*</span></label>
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
                                <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}<span className='text-danger'>*</span></label>
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
                              <label className="form-label">Brand<span className='text-danger'>*</span></label>
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
                              <label className="form-label">Size<span className='text-danger'>*</span></label>
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
                              <label className="form-label">Color<span className='text-danger'>*</span></label>
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

                        {/* <ProductVariants/> */}
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
                           <button type="button" className="btn btn-warning py-2 px-5" onClick={handleSaveDraft}>Save Draft</button>
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

export default AddProduct;