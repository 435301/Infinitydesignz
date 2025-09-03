import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { createProductPromotion } from '../redux/actions/productionPromotionAction';

const CreatePromotionModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      payload.append(key, formData[key]);
    });

    dispatch(createProductPromotion(payload));
    handleClose(); // close modal after submit
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl" backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Promotion</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form className="app-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-12 mb-3">
              <h6 className="text-info mb-0">Promotion Basic Details</h6>
              <hr />
            </div>

            <div className="col-lg-4 mb-3">
              <label className="form-label">Title <span className="text-danger">*</span></label>
              <input name="title" className="form-control" onChange={handleChange} placeholder="Title" type="text" />
            </div>

            <div className="col-lg-4 mb-3">
              <label className="form-label">Priority</label>
              <select name="priority" className="form-control" onChange={handleChange}>
                <option value="">Please select position</option>
                <option value="1">Top</option>
                <option value="2">Middle</option>
                <option value="3">Bottom</option>
              </select>
            </div>

            <div className="col-lg-4 mb-3">
              <label className="form-label">Display Position <span className="text-danger">*</span></label>
              <select name="display_position" className="form-control" onChange={handleChange}>
                <option value="">--Choose--</option>
                <option value="homepage">Homepage</option>
                <option value="product_page">Product Page</option>
              </select>
            </div>

            <div className="col-lg-4 mb-3">
              <label className="form-label">Image <span className="text-danger">*</span></label>
              <input name="app_icon" type="file" className="form-control" onChange={handleChange} accept="image/*" />
            </div>

            <div className="col-lg-12 mb-3 mt-4">
              <h6 className="text-info">Promotion Based On</h6>
              <hr />
            </div>

            <div className="col-lg-4 mb-3">
              <label className="form-label">Menu <span className="text-danger">*</span></label>
              <select name="menu" className="form-control" onChange={handleChange}>
                <option value="">--Choose Menu--</option>
              </select>
            </div>

            <div className="col-lg-4 mb-3">
              <label className="form-label">Sub Menu <span className="text-danger">*</span></label>
              <select name="sub_menu" className="form-control" onChange={handleChange}>
                <option value="">--Choose Sub Menu--</option>
              </select>
              <div className="mt-1 menus-1" style={{ fontSize: '10px' }}>
                <a href="#">Create Sub Menu</a> | <a href="#">Create Brand</a>
              </div>
            </div>

            <div className="col-lg-4 mb-3">
              <label className="form-label">List Sub Menu <span className="text-danger">*</span></label>
              <select name="list_sub_menu" className="form-control" onChange={handleChange}>
                <option value="">--Choose List Sub Menu--</option>
              </select>
              <div className="mt-1" style={{ fontSize: '10px' }}>
                <a href="#">Create List Sub Menu</a>
              </div>
            </div>

            <div className="col-lg-4 mb-3">
              <label className="form-label">Brand</label>
              <input name="brand" className="form-control" onChange={handleChange} placeholder="Enter brand" type="text" />
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
              <label className="form-label">Status</label>
              <select name="status" className="form-control" onChange={handleChange}>
                <option value="">- Select Status -</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="col-lg-12 mb-3">
              <label className="form-label">SEO Description</label>
              <textarea name="seo_description" className="form-control" onChange={handleChange} rows="1"></textarea>
            </div>

            <div className="col-lg-12 mb-3">
              <label className="form-label">SEO Keywords</label>
              <textarea name="seo_keywords" className="form-control" onChange={handleChange} rows="1"></textarea>
            </div>
          </div>

          <div className="col-lg-12 text-center my-4">
            <button type="submit" className="btn btn-danger py-2 px-5">SUBMIT</button>
            <Button variant="secondary" className="py-2 px-5" onClick={handleClose}>CLOSE</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreatePromotionModal;
