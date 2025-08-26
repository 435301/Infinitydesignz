import React from "react";
import { Modal, Button } from "react-bootstrap";
import BASE_URL from "../config/config";

const HomeScreenViewPromotionModal = ({ show, handleClose, viewData }) => {
  if (!viewData) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>View Promotion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Title:</strong> {viewData.title}
            </div>
            <div className="col-md-6">
              <strong>Display Count:</strong> {viewData.displayCount}
            </div>
          </div>
            <div className="col-md-6">
              <strong>Priority:</strong> {viewData.priority}
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Status:</strong>{" "}
              {viewData.status ? (
                <span className="badge bg-success">Active</span>
              ) : (
                <span className="badge bg-danger">Inactive</span>
              )}
            </div>
            <div className="col-md-6">
              <strong>Image:</strong>
              <br />
              {viewData.imageUrl && (
                <img
                  src={`${BASE_URL}${viewData.imageUrl}`}
                  alt={viewData.title}
                  style={{ maxWidth: "120px", borderRadius: "6px" }}
                />
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

export default HomeScreenViewPromotionModal;
