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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('title', title);
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
                                    <label className="form-label">Menu</label>
                                    <select
                                        className="form-control"
                                        value={menu || ''}
                                        onChange={e => {
                                            const selectedId = e.target.value;
                                            setMenu(selectedId ? Number(selectedId) : '');
                                            setSubMenu('');
                                        }}
                                    >
                                        <option value="">-- Select Category --</option>
                                        {parentCategories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.title}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-lg-4 mb-3">
                                    <label className="form-label">Sub Category</label>
                                    <select
                                        className="form-control"
                                        value={subMenu || ''}
                                        onChange={e => setSubMenu(Number(e.target.value))}
                                    >
                                        <option value="">-- Select Sub Category --</option>
                                        {subCategories.map(sub => (
                                            <option key={sub.id} value={sub.id}>{sub.title}</option>
                                        ))}
                                    </select>
                                </div>


                                <div className="col-lg-4 mb-3">
                                    <label className="form-label">Category Title</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter Menu Title"
                                        required
                                    />
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
