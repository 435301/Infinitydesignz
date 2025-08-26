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
  const [errors, setErrors] = useState({});

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
    let finalValue = value;
    if (name === "status") {
      finalValue = value === "true";
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.displayCount) newErrors.displayCount = "Display count is required";
    if (!formData.priority) newErrors.priority = "Priority is required";
    if (formData.status === "" || formData.status === null) {
      newErrors.status = "Status is required";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editData?.id) return;

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
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
               className={`form-control ${errors.title ? "is-invalid" : ""}`}
                type="text"
                value={formData.title}
                onChange={handleInputChange}
              />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>
            <div className="col-lg-4 mb-3">
              <label htmlFor="display_count" className="form-label">
                Display Count <span className="text-danger">*</span>
              </label>
              <input
                id="display_count"
                name="displayCount"
                className={`form-control ${errors.displayCount ? "is-invalid" : ""}`}
                type="number"
                value={formData.displayCount}
                onChange={handleInputChange}
              />
               {errors.displayCount && <div className="invalid-feedback">{errors.displayCount}</div>}
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
                 className={`form-control ${errors.priority ? "is-invalid" : ""}`}
                type="number"
                placeholder="Priority"
                value={formData.priority}
                onChange={handleInputChange}
                style={{ maxWidth: "100px" }}
              />
               {errors.priority && <div className="invalid-feedback">{errors.priority}</div>}
            </div>

            <div className="col-lg-6 mb-3">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                id="status"
                name="status"
                className={`form-control ${errors.status ? "is-invalid" : ""}`}
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="">- Select Status -</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
              {errors.status && <div className="invalid-feedback">{errors.status}</div>}
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
