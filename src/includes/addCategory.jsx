import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../redux/actions/categoryAction';
import '../css/admin/style.css';

const AddCategoryModal = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const [categoryTitle, setCategoryTitle] = useState('');
  const [appIcon, setAppIcon] = useState(null);
  const [webIcon, setWebIcon] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [status, setStatus] = useState(false);
  const handleFileChange = (setter) => (e) => {
    const file = e.target.files[0];
    if (file) {
      setter({ file, preview: URL.createObjectURL(file) });
    }
  };

  const removeImage = (setter) => () => setter(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', categoryTitle);
    formData.append('status', status ? 1 : 0);
    if (appIcon?.file) formData.append('appIcon', appIcon.file);
    if (webIcon?.file) formData.append('webImage', webIcon.file);
    if (mainImage?.file) formData.append('mainImage', mainImage.file);

    dispatch(addCategory(formData));
    setShow(false);
  };

  // console.log('Sending Status:', status ? 1 : 0);

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form className="app-form" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="modal-header">
              <h5 className="modal-title">Create a Category</h5>
              <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-lg-4 mb-3">
                  <label htmlFor="category_title" className="form-label">
                    Category Title <span className="text-danger">*</span>
                  </label>
                  <input
                    id="category_title"
                    name="category_title"
                    placeholder="Enter Menu Title"
                    className="form-control"
                    type="text"
                    value={categoryTitle}
                    onChange={(e) => setCategoryTitle(e.target.value)}
                    required
                  />
                </div>


                <ImageUpload label="App Icon (100x100)" image={appIcon} onChange={handleFileChange(setAppIcon)} onRemove={removeImage(setAppIcon)} />
                <ImageUpload label="Web Icon (100x100)" image={webIcon} onChange={handleFileChange(setWebIcon)} onRemove={removeImage(setWebIcon)} />
                <ImageUpload label="Main Image (100x100)" image={mainImage} onChange={handleFileChange(setMainImage)} onRemove={removeImage(setMainImage)} />
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

            <div className="modal-footer">
              <button type="submit" className="btn btn-success px-4">Submit</button>
              <button type="button" className="btn btn-danger px-4" onClick={() => setShow(false)}>Close</button>
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

export default AddCategoryModal;
