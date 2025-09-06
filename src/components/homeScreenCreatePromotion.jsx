import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Search, ArrowRepeat, PencilSquare, Trash } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { createHomeCategoryPromotion, fetchHomeCategoryPromotions } from "../redux/actions/categoryPromotionAction";
import { useDispatch } from "react-redux";

const HomeScreenCreatePromotionModal = ({ show, handleClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: "",
        displayCount: "",
        image: null,
        priority: "",
        status: false,
        showTitle: false,
    });
    const [errors, setErrors] = useState({});
    console.log('')

    useEffect(() => {
        if (show) {
            setFormData({
                title: "",
                displayCount: "",
                image: null,
                priority: "",
                status: false,
                showTitle: false,
            });
            setErrors({});
        }
    }, [show]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (!name) return;
        let finalValue = value;
        if (name === "status") {
            finalValue = value === "true";
        }
        if (name === "displayCount" || name === "priority") {
            finalValue = value === "" ? "" : Number(value);
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
        if (formData.showTitle === "" || formData.showTitle === null) {
            newErrors.showTitle = "Show Title is required";
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const data = new FormData();
        data.append("title", formData.title);
         data.append("displayCount", String(Number(formData.displayCount ?? 0)));
        data.append("image", formData.image);
        data.append("priority", formData.priority);
        data.append("status", formData.status);
        data.append("showTitle", formData.showTitle);
        console.log('FormData:', Object.fromEntries(data));
        dispatch(createHomeCategoryPromotion(data)).then(() => {
            dispatch(fetchHomeCategoryPromotions());
            handleClose();
        });
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Create Promotion Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form
                    className="app-form"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                >
                    <div className="row">
                        <div className="col-lg-4 mb-3">
                            <label htmlFor="title" className="form-label">
                                Title <span className="text-danger">*</span>
                            </label>
                            <input
                                id="title"
                                name="title"
                                placeholder="Title"
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
                                placeholder="Display count"
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
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label htmlFor="images" className="form-label">
                                Priority<span className="text-danger">*</span>
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
                                Status<span className="text-danger">*</span>
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
                        <div className="col-lg-6 mb-3">
                            <label htmlFor="status" className="form-label">
                                Show Title<span className="text-danger">*</span>
                            </label>
                            <select
                                id="showTitle"
                                name="showTitle"
                                className={`form-control ${errors.showTitle ? "is-invalid" : ""}`}
                                value={formData.showTitle}
                                onChange={handleInputChange}
                            >
                                <option value="">- Select Status -</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                            {errors.showTitle && <div className="invalid-feedback">{errors.showTitle}</div>}
                        </div>
                    </div>
                    <div className="text-center my-3">
                        <Button variant="success" type="submit" className="px-4">
                            Submit
                        </Button>
                        <Button
                            variant="danger"
                            className="ms-2 px-4"
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default HomeScreenCreatePromotionModal;
