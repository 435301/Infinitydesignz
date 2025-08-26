import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  updateHomeCategoryPromotion,
  fetchHomeCategoryPromotions,
} from "../redux/actions/categoryPromotionAction";
import BASE_URL from "../config/config";

const HomeScreenEditPromotionModal = ({ show, handleClose, editData }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    displayCount: "",
    image: null,
    priority: "",
    status: false,
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || "",
        displayCount: editData.displayCount || "",
        image: null, 
        priority: editData.priority || "",
        status: editData.status ? true : false,
      });
    }
  }, [editData, show]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!name) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editData?.id) return;

    const data = new FormData();
    data.append("title", formData.title);
    data.append("displayCount", formData.displayCount);
    if (formData.image) data.append("image", formData.image);
    data.append("priority", formData.priority);
    data.append("status", formData.status);
    dispatch(updateHomeCategoryPromotion(editData.id, data));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Promotion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="app-form" encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-4 mb-3">
              <label htmlFor="title" className="form-label">
                Title <span className="text-danger">*</span>
              </label>
              <input
                id="title"
                name="title"
                className="form-control"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-lg-4 mb-3">
              <label htmlFor="display_count" className="form-label">
                Display Count <span className="text-danger">*</span>
              </label>
              <input
                id="display_count"
                name="displayCount"
                className="form-control"
                type="number"
                value={formData.displayCount}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-lg-6 mb-3">
              <label htmlFor="images" className="form-label">
                Image
              </label>
              <input
                id="images"
                name="image"
                className="form-control"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {editData?.imageUrl && (
                <img
                  src={`${BASE_URL}${editData.imageUrl}`}
                  alt="Preview"
                  style={{ width: "50px", height: "50px", marginTop: "8px" }}
                />
              )}
            </div>

            <div className="col-lg-6 mb-3">
              <label htmlFor="priority" className="form-label">
                Priority
              </label>
              <input
                id="priority"
                name="priority"
                className="form-control"
                type="number"
                placeholder="Priority"
                value={formData.priority}
                onChange={handleInputChange}
                style={{ maxWidth: "100px" }}
              />
            </div>

            <div className="col-lg-6 mb-3">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="form-control"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="text-center my-3">
            <Button variant="success" type="submit" className="px-4">
              Update
            </Button>
            <Button variant="danger" className="ms-2 px-4" onClick={handleClose}>
              Close
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default HomeScreenEditPromotionModal;
