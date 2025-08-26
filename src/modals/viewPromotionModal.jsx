import React from "react";
import { Modal, Button } from "react-bootstrap";
import BASE_URL from "../config/config";

const ViewPromotionModal = ({ show, handleClose, promotion }) => {
  if (!promotion) return null;

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>View Product Promotion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6 mb-3">
            <strong>Title:</strong>
            <p>{promotion.title}</p>
          </div>
          <div className="col-md-6 mb-3">
            <strong>Brand:</strong>
            <p>{promotion.brand?.name || "-"}</p>
          </div>
          <div className="col-md-6 mb-3">
            <strong>Priority:</strong>
            <p>{promotion.priority}</p>
          </div>
          <div className="col-md-6 mb-3">
            <strong>Category:</strong>
            <p>{promotion.category.title}</p>
          </div>
          <div className="col-md-6 mb-3">
            <strong>Status:</strong>
            {promotion.status ? (
                <span className="badge bg-success">Active</span>
              ) : (
                <span className="badge bg-danger">Inactive</span>
              )}
          </div>
         
          <div className="col-md-12 mb-3">
            <strong>Image:</strong>
            <div>
              {promotion.imageUrl ? (
                <img
                  src={`${BASE_URL}${promotion.imageUrl}`}
                  alt="Promotion"
                  style={{ width: "120px", borderRadius: "8px" }}
                />
              ) : (
                <p>No image</p>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewPromotionModal;
