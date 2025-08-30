import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListSubCategoryById, updateListSubCategory } from '../redux/actions/categoryAction';
import BASE_URL from '../config/config';

const EditListSubCategoryModal = ({ show, setShow, subCategoryId, refetchCategories }) => {
    const dispatch = useDispatch();
    const { singleCategory = null, categories = [] } = useSelector((state) => state.categories || {});


    const [form, setForm] = useState({
        title: '',
        parentId: '',
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
        status: true,
        showInNeedHelpBuying: true,
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
                parentId: singleCategory.parentId || '',
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
    //     setForm({ ...form, [name]: name === 'parentId' ? parseInt(value) : type === 'checkbox' ? checked : value });


    // };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = name === 'parentId' ? parseInt(value) : type === 'checkbox' ? checked : value;
        console.log(`Field ${name} changed to:`, newValue);
        setForm({ ...form, [name]: newValue });
        if (errors[name] && value.trim() !== '') {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!form.parentId) newErrors.parentId = 'Sub category is required';
        if (!form.title.trim()) newErrors.title = 'Title is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const data = new FormData();
        data.append('title', form.title);
        data.append('parentId', form.parentId);
        data.append('seoTitle', form.seoTitle);
        data.append('seoDescription', form.seoDescription);
        data.append('seoKeywords', form.seoKeywords);
        data.append('status', form.status ? true : false);
        if (appIcon?.file) data.append('appIcon', appIcon.file);
        if (webIcon?.file) data.append('webImage', webIcon.file);
        if (mainImage?.file) data.append('mainImage', mainImage.file);
        data.append('showInNeedHelpBuying', form.showInNeedHelpBuying);

        await dispatch(updateListSubCategory(subCategoryId, data));
        refetchCategories();
        setShow(false);
    };

    if (!show) return null;

    //   const subCategories = categories?.filter((c) => {
    //     const parent = categories.find((cat) => cat.id === c.parentId);
    //     return parent?.parentId === null;
    //   });
    const isSubCategoryLevel = (cat) => {
        const parent = categories.find((parent) => parent.id === cat.parentId);
        return parent && parent.parentId === null;
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
                                    <select className={`form-control ${errors.parentId ? 'is-invalid' : ''}`} name="parentId" value={form.parentId?.toString()} onChange={handleChange} >
                                        <option value="">-- Select Sub Category --</option>
                                        {subCategories?.map((cat) => (
                                            <option key={cat.id} value={cat.id?.toString()}>{cat.title}</option>
                                        ))}
                                    </select>
                                    {errors.parentId && <div className="invalid-feedback">{errors.parentId}</div>}
                                </div>

                                <div className="col-lg-4 mb-3">
                                    <label className="form-label">Category Title<span className="text-danger">*</span></label>
                                    <input className={`form-control ${errors.title ? 'is-invalid' : ''}`} name="title" value={form.title} onChange={handleChange} />
                                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                                </div>

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
                                <div className="col-lg-4 mb-3">
                                    <label className="form-label">Need Help Frontend Display</label>
                                    <select
                                        name="showInNeedHelpBuying"
                                        className="form-control"
                                        value={form.showInNeedHelpBuying ? "true" : "false"}  
                                        onChange={(e) =>
                                            handleChange({
                                                target: {
                                                    name: "showInNeedHelpBuying",
                                                    value: e.target.value === "true", 
                                                },
                                            })
                                        }
                                    >
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                </div>

                                <ImageUpload label="App Icon" image={appIcon} onChange={handleFileChange(setAppIcon)} onRemove={removeImage(setAppIcon)} />
                                <ImageUpload label="Web Icon" image={webIcon} onChange={handleFileChange(setWebIcon)} onRemove={removeImage(setWebIcon)} />
                                <ImageUpload label="Main Image" image={mainImage} onChange={handleFileChange(setMainImage)} onRemove={removeImage(setMainImage)} />


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
