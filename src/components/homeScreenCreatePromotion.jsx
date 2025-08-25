import React, { useState } from "react";
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
        status: "active",
    });

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
        const data = new FormData();
        data.append("title", formData.title);
        data.append("display_count", formData.displayCount);
        data.append("image", formData.image);
        data.append("priority", formData.priority);
        data.append("status", formData.status); 
    console.log('FormData:', Object.fromEntries(data)); 
    dispatch(createHomeCategoryPromotion(data)).then(() => {
        dispatch(fetchHomeCategoryPromotions());
        handleClose();
    });
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Create Promotion</Modal.Title>
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
                                placeholder="Display count"
                                className="form-control"
                                type="text"
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
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label htmlFor="images" className="form-label">
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
                                <option value="" disabled>
                                    - Select Status -
                                </option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
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
