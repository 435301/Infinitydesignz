// src/includes/ViewSubCategoryModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import BASE_URL from '../config/config';

// const BASE_URL = 'http://68.183.89.229:4005';

const ViewSubCategoryModal = ({ show, onClose, subCategory }) => {
  if (!subCategory) return null;

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>View Sub Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row mb-3">
          <div className="col-md-6 mb-1 d-flex">
            <strong>Title:</strong> <div>{subCategory.title || 'N/A'}</div>
          </div>
          <div className="col-md-6 mb-1 d-flex">
            <strong>Parent Category:</strong> <div>{subCategory.category || 'N/A'}</div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6 mb-1 d-flex">
            <strong>SEO Title:</strong> <div>{subCategory.seoTitle || 'N/A'}</div>
          </div>
          <div className="col-md-6 mb-1 d-flex">
            <strong>SEO Description:</strong> <div>{subCategory.seoDescription || 'N/A'}</div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6 mb-1 d-flex">
            <strong>SEO Keywords:</strong> <div>{subCategory.seoKeywords || 'N/A'}</div>
          </div>
          <div className="col-md-6 mb-1 d-flex">
            <strong>Status:</strong>
            <div>
              <span className={` text-${subCategory.status ? 'success' : 'danger'}`}>
                {subCategory.status ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4 ">
            <p><strong>App Icon:</strong></p>
            {subCategory?.appIcon ? (
              <img src={`${BASE_URL}${subCategory.appIcon}`} alt="App Icon" className="img-fluid rounded shadow-sm" />
            ) : (
              <span>N/A</span>
            )}
          </div>
          <div className="col-md-4 ">
            <p><strong>Web Image:</strong></p>
            {subCategory?.webImage ? (
              <img src={`${BASE_URL}${subCategory.webImage}`} alt="Web Image" className="img-fluid rounded shadow-sm" />
            ) : (
              <span>N/A</span>
            )}
          </div>
          <div className="col-md-4 ">
            <p><strong>Main Image:</strong></p>
            {subCategory?.mainImage ? (
              <img src={`${BASE_URL}${subCategory.mainImage}`} alt="Main Image" className="img-fluid rounded shadow-sm" />
            ) : (
              <span>N/A</span>
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

export default ViewSubCategoryModal;
