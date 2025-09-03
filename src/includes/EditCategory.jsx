import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editCategory } from '../redux/actions/categoryAction';
import { toast } from 'react-toastify';
import BASE_URL from '../config/config';

const EditCategoryModal = ({ show, setShow, category }) => {
  const dispatch = useDispatch();

  const [categoryTitle, setCategoryTitle] = useState('');
  const [appIcon, setAppIcon] = useState(null);
  const [webIcon, setWebIcon] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [status, setStatus] = useState(false);
  const [errors, setErrors] = useState({});
  const [showInHomeTabs, setshowInHomeTabs] = useState(true);

  const buildImageUrl = (path) => {
    if (!path) return null;
    return `${BASE_URL.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
  };

  useEffect(() => {
    if (category) {
      setCategoryTitle(category.title || '');
      setAppIcon(category.appIcon ? { file: null, preview: buildImageUrl(category.appIcon) } : null);
      setWebIcon(category.webImage ? { file: null, preview: buildImageUrl(category.webImage) } : null);
      setMainImage(category.mainImage ? { file: null, preview: buildImageUrl(category.mainImage) } : null);
      setStatus(!!category.status);
    }
  }, [category]);

  const handleFileChange = (setter) => (e) => {
    const file = e.target.files[0];
    if (file) setter({ file, preview: URL.createObjectURL(file) });
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    if (name === 'status' && type === 'checkbox') {
      setStatus(checked);
    }
    else if (name === "showInHomeTabs") {
      setshowInHomeTabs(value === "true");
    }
  };

  const removeImage = (setter) => () => setter(null);

  const validate = () => {
    const newErrors = {};
    if (!categoryTitle.trim()) {
      newErrors.categoryTitle = 'Category Title is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setCategoryTitle(value);
    if (errors.categoryTitle && value.trim()) {
      setErrors((prev) => ({ ...prev, categoryTitle: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append('title', categoryTitle);
    formData.append('status', status ? true : false);
    formData.append('showInHomeTabs', showInHomeTabs ? true : false);
    if (appIcon?.file) formData.append('appIcon', appIcon.file);
    if (webIcon?.file) formData.append('webImage', webIcon.file);
    if (mainImage?.file) formData.append('mainImage', mainImage.file);

    dispatch(editCategory(category.id, formData));
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block new-1" tabIndex="-1" >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form className="app-form" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Edit Category</h5>
              <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-4 mb-3">
                  <label className="form-label">
                    Category Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.categoryTitle ? 'is-invalid' : ''}`}
                    value={categoryTitle}
                    onChange={handleTitleChange}
                  />
                  {errors.categoryTitle && (
                    <div className="invalid-feedback">{errors.categoryTitle}</div>
                  )}
                </div>

                <ImageUpload
                  label="App Icon"
                  image={appIcon}
                  onChange={handleFileChange(setAppIcon)}
                  onRemove={removeImage(setAppIcon)}
                />
                <ImageUpload
                  label="Web Icon"
                  image={webIcon}
                  onChange={handleFileChange(setWebIcon)}
                  onRemove={removeImage(setWebIcon)}
                />
                <ImageUpload
                  label="Main Image"
                  image={mainImage}
                  onChange={handleFileChange(setMainImage)}
                  onRemove={removeImage(setMainImage)}
                />

                <div className="col-lg-4 mb-3">
                  <label className="form-label">Show in Home tabs</label>
                  <select
                    name="showInHomeTabs"
                    className="form-control"
                    value={showInHomeTabs ? "true" : "false"}
                    onChange={handleChange}
                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
                <div className="form-check ps-4 m-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="status"
                    checked={status}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Active</label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-success px-4">Update</button>
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
    <input type="file" className="form-control" accept="image/*" onChange={onChange} />
    {image?.preview && (
      <div className="image-previews mt-2">
        <img
          src={image.preview}
          alt="Preview"
          width={100}
          height={100}
          className="rounded border"
          onError={(e) => {
            e.target.src = '/default-image.jpg'; // Optional fallback
          }}
        />
        <button type="button" className="btn btn-sm btn-danger mt-1 mx-2" onClick={onRemove}>
          &times;
        </button>
      </div>
    )}
  </div>
);

export default EditCategoryModal;
