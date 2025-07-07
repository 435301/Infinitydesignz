import React, { useState } from 'react';
import '../css/admin/style.css';
import AddCategoryModal from './addCategory';
import { useDispatch, useSelector } from 'react-redux';
import { listSubCategory } from '../redux/actions/categoryAction';

const AddListSubCategoryModal = ({ show, setShow }) => {
    const dispatch = useDispatch();
    const [menu, setMenu] = useState('');
    const [subMenu, setSubMenu] = useState('');

    const [title, setTitle] = useState('');
    const [seoTitle, setSeoTitle] = useState('');
    const [seoDescription, setSeoDescription] = useState('');
    const [seoKeywords, setSeoKeywords] = useState('');
    const [appIcon, setAppIcon] = useState(null);
    const [webIcon, setWebIcon] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [status, setStatus] = useState(false);
    const [errors, setErrors] = useState({});

    const { categories } = useSelector(state => state.categories || {});

    const handleFileChange = (setter) => (e) => {
        const file = e.target.files[0];
        if (file) {
            setter({ file, preview: URL.createObjectURL(file) });
        }
    };
    const removeImage = (setter) => () => {
        setter(null);
    };

    const validate = () => {
        const newErrors = {}
        if (!title.trim()) {
            newErrors.title = 'Category Title is required';
        }
        if (!menu) {
            newErrors.menu = 'Menu has to be selected';
        }
        if (!subMenu) {
            newErrors.subMenu = 'SubMenu has to be selected';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);

        if (errors.title && value.trim()) {
            setErrors((prev) => ({ ...prev, title: null }));
        }
    };

    const handleMenuChange = (e) => {
        const selectedId = e.target.value;
        const numericId = selectedId ? Number(selectedId) : '';
        setMenu(numericId);
        setSubMenu('');

        if (errors.menu && selectedId.trim()) {
            setErrors((prev) => ({ ...prev, menu: null }));
        }
    };


    const handleSubMenuChange = (e) => {
        const value = e.target.value;
        setSubMenu(value);

        if (errors.subMenu && value.trim()) {
            setErrors((prev) => ({ ...prev, subMenu: null }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        const formData = new FormData();

        formData.append('title', title);
        formData.append('status', status ? true : false)
        formData.append('parent_id', subMenu); // <-- This is important
        formData.append('seoTitle', seoTitle);
        formData.append('seoDescription', seoDescription);
        formData.append('seoKeywords', seoKeywords);

        if (appIcon?.file) formData.append('appIcon', appIcon.file);
        if (webIcon?.file) formData.append('webImage', webIcon.file);
        if (mainImage?.file) formData.append('mainImage', mainImage.file);
        dispatch(listSubCategory(formData));
        setShow(false);
    };

    if (!show) return null;

    const parentCategories = categories.filter(c => c.parent_id === null);
    const subCategories = categories.filter(c => c.parent_id === Number(menu));

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <form className="app-form" onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="modal-header">
                            <h5 className="modal-title">Create List Sub Category</h5>
                            <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                        </div>

                        <div className="modal-body">
                            <div className="row align-items-center">
                                <div className="col-lg-4 mb-3">
                                    <label className="form-label">Menu<span className="text-danger">*</span></label>
                                    <select
                                        className={`form-control ${errors.menu ? 'is-invalid' : ''}`}
                                        value={menu || ''}
                                        onChange={handleMenuChange}
                                    >
                                        <option value="">-- Select Category --</option>
                                        {parentCategories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.title}</option>
                                        ))}
                                    </select>
                                    {errors.menu && (
                                        <div className="invalid-feedback">{errors.menu}</div>
                                    )}
                                </div>

                                <div className="col-lg-4 mb-3">
                                    <label className="form-label">Sub Category<span className="text-danger">*</span></label>
                                    <select
                                        className={`form-control ${errors.subMenu ? 'is-invalid' : ''}`}
                                        value={subMenu || ''}
                                        onChange={handleSubMenuChange}
                                    >
                                        <option value="">-- Select Sub Category --</option>
                                        {subCategories.map(sub => (
                                            <option key={sub.id} value={sub.id}>{sub.title}</option>
                                        ))}
                                    </select>
                                    {errors.subMenu && (
                                        <div className="invalid-feedback">{errors.subMenu}</div>
                                    )}
                                </div>


                                <div className="col-lg-4 mb-3">
                                    <label className="form-label">Category Title<span className="text-danger">*</span></label>
                                    <input
                                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                        type="text"
                                        value={title}
                                        onChange={handleTitleChange}
                                        placeholder="Enter Menu Title"
                                    // required
                                    />
                                    {errors.title && (
                                        <div className="invalid-feedback">{errors.title}</div>
                                    )}
                                </div>

                                <ImageUpload label="App Icon (100x100)" image={appIcon} onChange={handleFileChange(setAppIcon)} onRemove={removeImage(setAppIcon)} />
                                <ImageUpload label="Web Icon (100x100)" image={webIcon} onChange={handleFileChange(setWebIcon)} onRemove={removeImage(setWebIcon)} />

                                <div className="col-lg-4 mb-3">
                                    <label className="form-label">Main Image</label>
                                    <input className="form-control" type="file" accept="image/*" onChange={handleFileChange(setMainImage)} />
                                </div>

                                <div className="col-lg-4 mb-3">
                                    <label className="form-label">SEO Title</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={seoTitle}
                                        onChange={(e) => setSeoTitle(e.target.value)}
                                        placeholder="Enter SEO Title"
                                    />
                                </div>

                                <div className="col-lg-4 mb-3">
                                    <label className="form-label">SEO Description</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={seoDescription}
                                        onChange={(e) => setSeoDescription(e.target.value)}
                                        placeholder="Enter SEO Description"
                                    />
                                </div>

                                <div className="col-lg-4 mb-3">
                                    <label className="form-label">SEO Keywords</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={seoKeywords}
                                        onChange={(e) => setSeoKeywords(e.target.value)}
                                        placeholder="Enter SEO Keywords"
                                    />
                                </div>
                                <div className="form-check ps-4 m-4">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="status"
                                        checked={status}
                                        onChange={(e) => setStatus(e.target.checked)}
                                    />
                                    <label className="form-check-label">Active</label>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer justify-content-center">
                            <button type="submit" className="btn btn-success px-5">SUBMIT</button>
                            <button type="button" className="btn btn-danger px-5" onClick={() => setShow(false)}>BACK</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const ImageUpload = ({ label, image, onChange, onRemove }) => (
    <div className="col-lg-4 col-md-6 mb-3">
        <label className="form-label">{label}</label>
        <div className="image-upload-container">
            <input type="file" className="form-control" accept="image/*" onChange={onChange} />
            {image && (
                <div className="image-preview mt-2">
                    <img src={image.preview} alt="Preview" width={100} height={100} className="rounded" />
                    <button type="button" className="remove-image btn btn-sm btn-danger mt-1" onClick={onRemove}>×</button>
                </div>
            )}
        </div>
    </div>
);

export default AddListSubCategoryModal;
