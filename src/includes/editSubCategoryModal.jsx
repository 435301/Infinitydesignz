import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSubCategory, fetchSubCategoryById } from '../redux/actions/categoryAction';

const EditSubCategoryModal = ({ show, setShow, subCategoryId, refetchCategories }) => {
  const dispatch = useDispatch();
  const { subCategory } = useSelector((state) => state.categories || {});

  const [form, setForm] = useState({
    parent_id: '',
    title: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    status: true,
  });

  const [appIcon, setAppIcon] = useState(null);
  const [webIcon, setWebIcon] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (subCategoryId) {
      dispatch(fetchSubCategoryById(subCategoryId));
    }
  }, [subCategoryId]);

useEffect(() => {
  if (subCategory) {
    setForm({
      parent_id: subCategory.parent_id || '',
      title: subCategory.title || '',
      seoTitle: subCategory.seoTitle || '',
      seoDescription: subCategory.seoDescription || '',
      seoKeywords: subCategory.seoKeywords || '',
      status: subCategory.status ?? true,
    });

    // Pre-fill image previews
    const BASE_URL = 'http://68.183.89.229:4005/uploads/categories';
    setAppIcon(subCategory.appIcon ? { preview: `${BASE_URL}/${subCategory.appIcon}` } : null);
    setWebIcon(subCategory.webImage ? { preview: `${BASE_URL}/${subCategory.webImage}` } : null);
    setMainImage(subCategory.mainImage ? { preview: `${BASE_URL}/${subCategory.mainImage}` } : null);
  }
}, [subCategory]);


  const handleFileChange = (setter) => (e) => {
    const file = e.target.files[0];
    if (file) {
      setter({ file, preview: URL.createObjectURL(file) });
    }
  };

  const removeImage = (setter) => () => {
    setter(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', form.title);
    data.append('parent_id', form.parent_id);
    data.append('seoTitle', form.seoTitle);
    data.append('seoDescription', form.seoDescription);
    data.append('seoKeywords', form.seoKeywords);
   data.append('status', form.status ? 1 : 0);

    if (appIcon?.file) data.append('appIcon', appIcon.file);
    if (webIcon?.file) data.append('webImage', webIcon.file);
    if (mainImage?.file) data.append('mainImage', mainImage.file);

    await dispatch(updateSubCategory(subCategoryId, data));
    refetchCategories();
    setShow(false);
  };

  const { categories } = useSelector((state) => state.categories || {});

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <form className="app-form" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="modal-header">
              <h5 className="modal-title">Edit Sub Category</h5>
              <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
            </div>
            <div className="modal-body">
              <div className="row align-items-center">
                <div className="col-lg-4 mb-3">
                  <label className="form-label">Parent Category</label>
                  <select className="form-control" name="parent_id" value={form.parent_id} onChange={handleChange} required>
                    <option value="">-- Select Parent --</option>
                    {categories.filter(c => c.parent_id === null).map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.title}</option>
                    ))}
                  </select>
                </div>

                <div className="col-lg-4 mb-3">
                  <label className="form-label">Category Title</label>
                  <input className="form-control" name="title" value={form.title} onChange={handleChange} required />
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
      <div className="image-preview mt-2">
        <img src={image.preview} alt="Preview" width={100} height={100} className="rounded" />
        <button type="button" className="btn btn-sm btn-danger mt-1" onClick={onRemove}>×</button>
      </div>
    )}
  </div>
);

export default EditSubCategoryModal;
