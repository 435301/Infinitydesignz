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

const AddProduct = ({onClose}) => {
  const dispatch = useDispatch();
  const { categories = [] } = useSelector((state) => state.categories || {});
  const { sizes = [] } = useSelector((state) => state.sizes || {});
  const { colors = [] } = useSelector((state) => state.colors || {});
  // console.log('colors', colors)

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [description, setDescription] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('');
  const [selectedSubMenu, setSelectedSubMenu] = useState('');
  const [selectedListSubMenu, setSelectedListSubMenu] = useState('');
  const [errors, setErrors] = useState('');

  const [formData, setFormData] = useState({
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
  });

  const menuOptions = categories.filter(cat => cat.parent_id === null);
  const subMenuOptions = categories.filter(cat => cat.parent_id === parseInt(selectedMenu));
  const listSubMenuOptions = categories.filter(cat => cat.parent_id === parseInt(selectedSubMenu));

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchColors());
    dispatch(fetchSizes());
  }, [dispatch]);

  // useEffect(() => {
  //   if (products.length > 0) {
  //     const product = products[0];
  //     setSelectedMenu(product.mainCategoryId.toString());
  //     setSelectedSubMenu(product.subCategoryId.toString());
  //     setSelectedListSubMenu(product.listSubCategoryId.toString());

  //     setFormData({
  //       sku: product.sku || '',
  //       title: product.title || '',
  //       weight: '',
  //       model: '',
  //       sla: '',
  //       deliveryCharges: '',
  //       description: product.description || '',
  //       status: product.status ? 'enable' : 'disable',
  //       searchKeywords: product.searchKeywords || '',
  //       stock: product.stock || '',
  //       mrp: product.mrp || '',
  //       sellingPrice: product.sellingPrice || '',
  //       height: product.height || '',
  //       width: product.width || '',
  //       length: product.length || '',
  //       sizeId: product.sizeId?.toString() || '',
  //       colorId: product.colorId?.toString() || '',
  //     });
  //     setDescription(product.description || '');
  //   }
  // }, [products]);

  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  // const validate = () => {
  //   const newErrors = {};
  //   if (!brand.trim()) newErrors.brand = 'Brand is required';
  //   if (status === null) newErrors.status = 'Status is required';
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // if (!validate()) return;
    const payload = {
      ...formData,
      mainCategoryId: parseInt(selectedMenu),
      subCategoryId: parseInt(selectedSubMenu),
      listSubCategoryId: parseInt(selectedListSubMenu),
      status: formData.status === 'enable',
    };

    console.log('Submitting Product:', payload);
     try {
        await dispatch(addProducts(payload));
        onClose();
        setFormData('');
      } catch (err) {
        setErrors({
          brand: err?.response?.data?.message || 'Something went wrong.',
        });
      }
    
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
            <a href="#" className="active">Add Product</a>
            <a href='/admin/product-image'>Product Images</a>
            <a href="/admin/product-filter">Product Filters</a>
            <a href="/admin/product-features">Product Features</a>
          </div>

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
                              <label className="form-label">Menu</label>
                              <select className="form-control" value={selectedMenu} onChange={(e) => {
                                setSelectedMenu(e.target.value);
                                setSelectedSubMenu('');
                                setSelectedListSubMenu('');
                              }}>
                                <option value="">--Choose Menu--</option>
                                {menuOptions.map(menu => (
                                  <option key={menu.id} value={menu.id}>{menu.title}</option>
                                ))}
                              </select>
                            </div>
                            <div className="col-lg-4 mb-3">
                              <label className="form-label">Sub Menu</label>
                              <select className="form-control" value={selectedSubMenu} onChange={(e) => {
                                setSelectedSubMenu(e.target.value);
                                setSelectedListSubMenu('');
                              }}>
                                <option value="">--Choose Sub Menu--</option>
                                {subMenuOptions.map(sub => (
                                  <option key={sub.id} value={sub.id}>{sub.title}</option>
                                ))}
                              </select>
                            </div>
                            <div className="col-lg-4 mb-3">
                              <label className="form-label">List Sub Menu</label>
                              <select className="form-control" value={selectedListSubMenu} onChange={(e) => setSelectedListSubMenu(e.target.value)}>
                                <option value="">--Choose List Sub Menu--</option>
                                {listSubMenuOptions.map(list => (
                                  <option key={list.id} value={list.id}>{list.title}</option>
                                ))}
                              </select>
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
                                <input id={field.id} className="form-control" placeholder={field.label} type="text" value={formData[field.id]} onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })} />
                              </div>
                            ))}

                            <div className="col-lg-12 mb-3">
                              <label className="form-label">Description</label>
                              <CKEditor editor={ClassicEditor} data={description} onChange={(event, editor) => {
                                const data = editor.getData();
                                setDescription(data);
                                setFormData({ ...formData, description: data });
                              }} />
                            </div>

                            <div className="col-lg-6 mb-3">
                              <label className="form-label">Product Status</label>
                              <select className="form-control" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                                <option value="enable">Enable</option>
                                <option value="disable">Disable</option>
                              </select>
                            </div>

                            <div className="col-lg-6 mb-3">
                              <label className="form-label">Search Keywords</label>
                              <input type="text" className="form-control" placeholder="Comma separated keywords" value={formData.searchKeywords} onChange={(e) => setFormData({ ...formData, searchKeywords: e.target.value })} />
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
                                <input type="text" className="form-control" placeholder={field} value={formData[field]} onChange={(e) => setFormData({ ...formData, [field]: e.target.value })} />
                              </div>
                            ))}

                            <div className="col-lg-3 mb-3">
                              <label className="form-label">Size</label>
                              <select
                                className="form-control"
                                value={formData.sizeId}
                                onChange={(e) => setFormData({ ...formData, sizeId: e.target.value })}
                              >
                                <option value="">--Choose Size--</option>
                                {sizes.map((s) => (
                                  <option key={s.id} value={s.id}>{s.title}</option>
                                ))}
                              </select>
                            </div>

                            <div className="col-lg-3 mb-3">
                              <label className="form-label">Color</label>
                              <select
                                className="form-control"
                                value={formData.colorId}
                                onChange={(e) => setFormData({ ...formData, colorId: e.target.value })}
                              >
                                <option value="">--Choose Color--</option>
                                {colors.map((s) => (
                                  <option key={s.id} value={s.id}>{s.label}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-12 text-center my-4">
                          <button type="submit" className="btn btn-primary py-2 px-5 me-2">Submit</button>
                          <button type="reset" className="btn btn-secondary py-2 px-5">Reset</button>
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