import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListSubCategoryById, updateListSubCategory } from '../redux/actions/categoryAction';
import BASE_URL from '../config/config';

const EditListSubCategoryModal = ({ show, setShow, subCategoryId, refetchCategories }) => {
    const dispatch = useDispatch();
    const { singleCategory = null, categories = [] } = useSelector((state) => state.categories || {});


    const [form, setForm] = useState({
        title: '',
        parent_id: '',
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
        status: true,
    });

    const [appIcon, setAppIcon] = useState(null);
    const [webIcon, setWebIcon] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [errors, setErrors] = useState({});
    // const BASE_URL = '`http://68.183.89.229:4005'

    useEffect(() => {
        if (subCategoryId) {
            dispatch(fetchListSubCategoryById(subCategoryId));
        }
    }, [dispatch, subCategoryId]);

    useEffect(() => {
        if (singleCategory && singleCategory.id === subCategoryId) {
            setForm({
                title: singleCategory.title || '',
                parent_id: singleCategory.parent_id || '',
                seoTitle: singleCategory.seoTitle || '',
                seoDescription: singleCategory.seoDescription || '',
                seoKeywords: singleCategory.seoKeywords || '',
                status: !!singleCategory.status,
            });

            // Prefill image previews if needed (optional enhancement)
            if (singleCategory.appIcon) {
                setAppIcon({ file: null, preview: `${BASE_URL}${singleCategory.appIcon}` });
            }
            if (singleCategory.webImage) {
                setWebIcon({ file: null, preview: `${BASE_URL}${singleCategory.webImage}` });
            }
            if (singleCategory.mainImage) {
                setMainImage({ file: null, preview: `${BASE_URL}${singleCategory.mainImage}` });
            }
        }
    }, [singleCategory, subCategoryId]);


    const handleFileChange = (setter) => (e) => {
        const file = e.target.files[0];
        if (file) {
            setter({ file, preview: URL.createObjectURL(file) });
        }
    };

    const removeImage = (setter) => () => setter(null);

    // const handleChange = (e) => {
    //     const { name, value, type, checked } = e.target;
    //     setForm({ ...form, [name]: name === 'parent_id' ? parseInt(value) : type === 'checkbox' ? checked : value });


    // };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = name === 'parent_id' ? parseInt(value) : type === 'checkbox' ? checked : value;
        console.log(`Field ${name} changed to:`, newValue);
        setForm({ ...form, [name]: newValue });
        if (errors[name] && value.trim() !== '') {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!form.parent_id) newErrors.parent_id = 'Sub category is required';
        if (!form.title.trim()) newErrors.title = 'Title is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const data = new FormData();
        data.append('title', form.title);
        data.append('parent_id', form.parent_id);
        data.append('seoTitle', form.seoTitle);
        data.append('seoDescription', form.seoDescription);
        data.append('seoKeywords', form.seoKeywords);
        data.append('status', form.status ? true : false);
        if (appIcon?.file) data.append('appIcon', appIcon.file);
        if (webIcon?.file) data.append('webImage', webIcon.file);
        if (mainImage?.file) data.append('mainImage', mainImage.file);

        await dispatch(updateListSubCategory(subCategoryId, data));
        refetchCategories();
        setShow(false);
    };

    if (!show) return null;

    //   const subCategories = categories?.filter((c) => {
    //     const parent = categories.find((cat) => cat.id === c.parent_id);
    //     return parent?.parent_id === null;
    //   });
    const isSubCategoryLevel = (cat) => {
        const parent = categories.find((parent) => parent.id === cat.parent_id);
        return parent && parent.parent_id === null;
    };

    const subCategories = categories.filter(isSubCategoryLevel);

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit List Sub Category</h5>
                            <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                        </div>

                        <div className="modal-body">
                            <div className="row align-items-center">
                                <div className="col-lg-4 mb-3">
                                    <label className="form-label">Sub Category<span className="text-danger">*</span></label>
                                    <select className={`form-control ${errors.parent_id ? 'is-invalid' : ''}`} name="parent_id" value={form.parent_id?.toString()} onChange={handleChange} >
                                        <option value="">-- Select Sub Category --</option>
                                        {subCategories?.map((cat) => (
                                            <option key={cat.id} value={cat.id?.toString()}>{cat.title}</option>
                                        ))}
                                    </select>
                                    {errors.parent_id && <div className="invalid-feedback">{errors.parent_id}</div>}
                                </div>

                                <div className="col-lg-4 mb-3">
                                    <label className="form-label">Category Title<span className="text-danger">*</span></label>
                                    <input className={`form-control ${errors.title ? 'is-invalid' : ''}`} name="title" value={form.title} onChange={handleChange} />
                                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                                </div>

                                <ImageUpload label="App Icon" image={appIcon} onChange={handleFileChange(setAppIcon)} onRemove={removeImage(setAppIcon)} />
                                <ImageUpload label="Web Icon" image={webIcon} onChange={handleFileChange(setWebIcon)} onRemove={removeImage(setWebIcon)} />
                                <ImageUpload label="Main Image" image={mainImage} onChange={handleFileChange(setMainImage)} onRemove={removeImage(setMainImage)} />

                                <div className="col-lg-4 mb-3">
                                    <label className="form-label">SEO Title</label>
                                    <input className="form-control" name="seoTitle" value={form.seoTitle} onChange={handleChange} />
                                </div>

                                <div className="col-lg-4 mb-3">
                                    <label className="form-label">SEO Description</label>
                                    <input className="form-control" name="seoDescription" value={form.seoDescription} onChange={handleChange} />
                                </div>

                                <div className="col-lg-4 mb-3">
                                    <label className="form-label">SEO Keywords</label>
                                    <input className="form-control" name="seoKeywords" value={form.seoKeywords} onChange={handleChange} />
                                </div>

                                <div className="form-check ps-4 m-4">
                                    <input className="form-check-input" type="checkbox" name="status" checked={form.status} onChange={handleChange} />
                                    <label className="form-check-label">Active</label>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer justify-content-center">
                            <button type="submit" className="btn btn-success px-5">UPDATE</button>
                            <button type="button" className="btn btn-danger px-5" onClick={() => setShow(false)}>CANCEL</button>
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
        <input type="file" className="form-control" accept="image/*" onChange={onChange} />
        {image && (
            <div className="image-previews mt-2">
                <img src={image.preview} alt="Preview" width={100} height={100} className="rounded" />
                <button type="button" className="btn btn-sm btn-danger mt-1 mx-2" onClick={onRemove}>×</button>
            </div>
        )}
    </div>
);

export default EditListSubCategoryModal;
