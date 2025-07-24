// src/includes/ViewCategoryModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import BASE_URL from '../config/config';

// const BASE_URL = 'http://68.183.89.229:4005';

const ViewCategoryModal = ({ show, onClose, category }) => {
  if (!category) return null;
  console.log('cat', category)
  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-semibold">Category Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <p className="mb-1"><strong>Title:</strong> {category.title}</p>
          <p className="mb-1">
            <strong>Status:</strong>{' '}
            <span className={` text-${category.status ? 'success' : 'danger'}`}>
              {category.status ? 'Active' : 'Inactive'}
            </span>
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-4 ">
            <p className="fw-medium">App Icon</p>
            {category?.appIcon ? (
              <img
                src={`${BASE_URL}${category.appIcon}`}
                alt="App Icon"
                className="img-fluid rounded shadow"
              />
            ) : (
              <span className="text-muted">N/A</span>
            )}
          </div>

          <div className="col-md-4 text-center">
            <p className="fw-medium">Web Image</p>
            {category?.webImage ? (
              <img
                src={`${BASE_URL}${category.webImage}`}
                alt="Web Image"
                className="img-fluid rounded shadow"
              />
            ) : (
              <span className="text-muted">N/A</span>
            )}
          </div>

          <div className="col-md-4 text-center">
            <p className="fw-medium">Main Image</p>
            {category?.mainImage ? (
              <img
                src={`${BASE_URL}${category.mainImage}`}
                alt="Main Image"
                className="img-fluid rounded shadow"
              />
            ) : (
              <span className="text-muted">N/A</span>
            )}
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>

  );
};

export default ViewCategoryModal;
