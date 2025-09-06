import React, { useEffect, useState } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDispatch, useSelector } from 'react-redux';
import { createProductPromotion } from '../../redux/actions/productionPromotionAction';
import { fetchHomeCategoryPromotions } from '../../redux/actions/categoryPromotionAction';
import { fetchCategories } from '../../redux/actions/categoryAction';
import { fetchBrands } from '../../redux/actions/brandAction';
import { useNavigate } from 'react-router-dom';

const CreatePromotion = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const { items: categoryPromotions, loading, error } = useSelector((state) => state.categoryPromotion);
    const { categories = [] } = useSelector((state) => state.categories || {});
    const { brands = [] } = useSelector((state) => state.brands);
    const [selectedMenu, setSelectedMenu] = useState('');
    const [selectedSubMenu, setSelectedSubMenu] = useState('');
    const [selectedListSubMenu, setSelectedListSubMenu] = useState('');
    const menuOptions = categories.filter((cat) => cat.parentId === null);
    const subMenuOptions = categories.filter((cat) => cat.parentId === parseInt(selectedMenu));
    const listSubMenuOptions = categories.filter((cat) => cat.parentId === parseInt(selectedSubMenu));
    const [errors, setErrors] = useState({});
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    console.log('promotions', categoryPromotions)

    useEffect(() => {
        dispatch(fetchHomeCategoryPromotions());
        dispatch(fetchCategories());
        dispatch(fetchBrands())
    }, [dispatch]);
    const handleToggleSidebar = (collapsed) => setIsSidebarCollapsed(collapsed);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
    let fieldValue = value;
    if (type === "checkbox") {
        fieldValue = checked; 
    } else if (type === "file") {
        fieldValue = files && files.length > 0 ? files[0] : null; 
    }
    setFormData((prev) => ({
        ...prev,
        [name]: fieldValue,
    }));
         setErrors((prev) => ({
        ...prev,
        [name]: "",
    }));
    };

    const handleMenuChange = (e) => {
    setSelectedMenu(e.target.value);
    setErrors((prev) => ({ ...prev, menu: "" })); 
};

const handleSubMenuChange = (e) => {
    setSelectedSubMenu(e.target.value);
    setErrors((prev) => ({ ...prev, submenu: "" })); 
};

const handleListSubMenuChange = (e) => {
    setSelectedListSubMenu(e.target.value);
    setErrors((prev) => ({ ...prev, listsubmenu: "" })); 
};

    const validateForm = () => {
        let newErrors = {};

        if (!formData.title) newErrors.title = "Title is required";
        if (!formData.priority) newErrors.priority = "Priority is required";
        if (!formData.display_position) newErrors.display_position = "Display Position is required";
        if (!formData.app_icon) newErrors.app_icon = "Image is required";
        if (!formData.status || formData.status === "") newErrors.status = "Status is required";
        if (!selectedMenu) {
            newErrors.menu = "Menu is required";
        }
        if (!selectedSubMenu) {
            newErrors.submenu = "Submenu is required";
        }
        if (!selectedListSubMenu) {
            newErrors.listsubmenu = "List Submenu is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const payload = new FormData();

        if (formData.app_icon) payload.append("image", formData.app_icon);
        if (formData.title) payload.append("title", formData.title);
        if (formData.priority) payload.append("priority", formData.priority);
        if (formData.display_position) payload.append("mainCategoryPromotionId", formData.display_position);

        if (selectedListSubMenu) {
            payload.append("categoryId", selectedListSubMenu);
        } else if (selectedSubMenu) {
            payload.append("categoryId", selectedSubMenu);
        } else if (selectedMenu) {
            payload.append("categoryId", selectedMenu);
        }

        if (formData.brand) payload.append("brandId", formData.brand);
        if (formData.seller) payload.append("seller", formData.seller);
        if (formData.min_price) payload.append("minPrice", formData.min_price);
        if (formData.max_price) payload.append("maxPrice", formData.max_price);
        if (formData.offer_from) payload.append("offerPercentFrom", formData.offer_from);
        if (formData.offer_to) payload.append("offerPercentTo", formData.offer_to);
        if (formData.seo_title) payload.append("seoTitle", formData.seo_title);
        if (formData.seo_description) payload.append("seoDescription", formData.seo_description);
        if (formData.seo_keywords) payload.append("seoKeywords", formData.seo_keywords);
        if (formData.status) payload.append("status", formData.status);

        // Debug log
        for (let [key, value] of payload.entries()) {
            console.log(key, value);
        }

        dispatch(createProductPromotion(payload))
            .then(() => {
                setFormData({});
                setSelectedMenu("");
                setSelectedSubMenu("");
                setSelectedListSubMenu("");
               navigate("/admin/home-screen-create-promotion");
            })
            .catch((err) => console.error(err));
    };


    return (
        <div className="sidebar-mini fixed">
            <div className="wrapper">
                <HeaderAdmin />
                <aside className="main-sidebar hidden-print">
                    <Sidebar  isCollapsed={isSidebarCollapsed} onClose={() => setIsSidebarCollapsed(true)} />
                </aside>

                <div className="content-wrapper p-3">
                    <div className="container-fluid">
                        <div className="row py-4">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header py-3 d-flex justify-content-between align-items-center">
                                        <h5 className="mb-0">Create Promotion</h5>
                                        <a href="/admin/home-screen-create-promotion" className="btn btn-primary btn-sm">Manage</a>
                                    </div>

                                    <div className="card-block">
                                        <form className="app-form" onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-lg-12 mb-3">
                                                    <h6 className="text-info mb-0">Promotion Basic Details</h6>
                                                    <hr />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Title <span className="text-danger">*</span></label>
                                                    <input name="title" className={`form-control ${errors.title ? "is-invalid" : ""}`} onChange={handleChange} placeholder="Title" type="text" value={formData.title || ""} />
                                                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                                                </div>
                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Priority<span className="text-danger">*</span></label>
                                                    <input
                                                        id="priority"
                                                        name="priority"
                                                        className={`form-control ${errors.priority ? "is-invalid" : ""}`}
                                                        type="number"
                                                        placeholder="Priority"
                                                        value={formData.priority}
                                                        onChange={handleChange}
                                                        style={{ maxWidth: "100px" }}
                                                    />
                                                    {errors.priority && <div className="invalid-feedback">{errors.priority}</div>}

                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Display Position <span className="text-danger">*</span></label>
                                                    <select
                                                        name="display_position"
                                                        className={`form-control ${errors.display_position ? "is-invalid" : ""}`}

                                                        onChange={handleChange}
                                                    >
                                                        <option value="">--Choose--</option>

                                                        {categoryPromotions &&
                                                            categoryPromotions.map((promotion) => (
                                                                <option key={promotion.id} value={promotion.id}>
                                                                    {promotion.title}
                                                                </option>
                                                            ))}
                                                    </select>
                                                    {errors.display_position && <div className="invalid-feedback">{errors.display_position}</div>}

                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Image <span className="text-danger">*</span></label>
                                                    <input name="app_icon" type="file"  className={`form-control ${errors.app_icon ? "is-invalid" : ""}`} onChange={handleChange} accept="image/*" />
                                                    {errors.app_icon && <div className="invalid-feedback">{errors.app_icon}</div>}

                                                </div>

                                                <div className="col-lg-12 mb-3 mt-4">
                                                    <h6 className="text-info">Promotion Based On</h6>
                                                    <hr />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Menu <span className="text-danger">*</span></label>
                                                    <select name="menu"  className={`form-control ${errors.menu ? "is-invalid" : ""}`} value={selectedMenu}
                                                        onChange={handleMenuChange}>
                                                        <option value="">--Choose Menu--</option>
                                                        {menuOptions.map((menu) => (
                                                            <option key={menu.id} value={menu.id}>
                                                                {menu.title}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.menu && <small className="text-danger">{errors.menu}</small>}
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Sub Menu <span className="text-danger">*</span></label>
                                                    <select name="sub_menu" className={`form-control ${errors.submenu ? "is-invalid" : ""}`} value={selectedSubMenu}
                                                        onChange={handleSubMenuChange}>
                                                        <option value="">--Choose Sub Menu--</option>
                                                        {subMenuOptions.map((sub) => (
                                                            <option key={sub.id} value={sub.id}>
                                                                {sub.title}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.submenu && <small className="text-danger">{errors.submenu}</small>}
                                                  
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">List Sub Menu <span className="text-danger">*</span></label>
                                                    <select name="list_sub_menu" className={`form-control ${errors.listsubmenu ? "is-invalid" : ""}`} value={selectedListSubMenu}
                                                        onChange={handleListSubMenuChange}>
                                                        <option value="">--Choose List Sub Menu--</option>
                                                        {listSubMenuOptions.map((list) => (
                                                            <option key={list.id} value={list.id}>
                                                                {list.title}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.listsubmenu && <small className="text-danger">{errors.listsubmenu}</small>}
                                                 
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Brand</label>
                                                    <select
                                                        name="brand"
                                                        className="form-control"
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">--Choose Brand--</option>
                                                        {brands.map((brand) => (
                                                            <option key={brand.id} value={brand.id}>
                                                                {brand.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Seller</label>
                                                    <input name="seller" className="form-control" onChange={handleChange} placeholder="Enter seller" type="text" />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Min Price</label>
                                                    <input name="min_price" className="form-control" onChange={handleChange} placeholder="Enter minimum price" type="text" />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Max Price</label>
                                                    <input name="max_price" className="form-control" onChange={handleChange} placeholder="Enter maximum price" type="text" />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Offer(%) From</label>
                                                    <input name="offer_from" className="form-control" onChange={handleChange} placeholder="Offer % from" type="text" />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Offer(%) To</label>
                                                    <input name="offer_to" className="form-control" onChange={handleChange} placeholder="Offer % to" type="text" />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">SEO Title</label>
                                                    <input name="seo_title" className="form-control" onChange={handleChange} placeholder="SEO Title" type="text" />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label  className="form-label" >Status <span className="text-danger">*</span></label>
                                                    <select
                                                        name="status"
                                                        className={`form-control ${errors.status ? "is-invalid" : ""}`}
                                                        onChange={(e) => setFormData({
                                                            ...formData,
                                                            status: e.target.value === "true"
                                                        })}
                                                        value={formData.status}
                                                    >
                                                        <option value="">--Choose--</option>
                                                        <option value="true">Active</option>
                                                        <option value="false">Inactive</option>
                                                    </select>
                                                    {errors.status && <small className="text-danger">{errors.status}</small>}

                                                </div>
                                                <div className="col-lg-12 mb-3">
                                                    <label className="form-label">SEO Description</label>
                                                    <textarea name="seo_description" className="form-control" onChange={handleChange} rows="2"></textarea>
                                                </div>

                                                <div className="col-lg-12 mb-3">
                                                    <label className="form-label">SEO Keywords</label>
                                                    <textarea name="seo_keywords" className="form-control" onChange={handleChange} rows="2"></textarea>
                                                </div>

                                                <div className="col-lg-12 text-center my-4">
                                                    <button type="submit" className="btn btn-success py-2 px-5 mx-1">SUBMIT</button>
                                                    <button type="button" className="btn btn-danger py-2 px-5" onClick={() => window.history.back()}>BACK</button>
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

export default CreatePromotion;
