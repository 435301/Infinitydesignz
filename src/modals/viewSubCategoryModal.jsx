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
          <div className="col-md-6">
            <strong>Title:</strong> {subCategory.title}
          </div>
          <div className="col-md-6">
            <strong>Parent Category:</strong> {subCategory.category || 'N/A'}
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-6">
            <strong>SEO Title:</strong> {subCategory.seoTitle || 'N/A'}
          </div>
          <div className="col-md-6">
            <strong>SEO Description:</strong> {subCategory.seoDescription || 'N/A'}
          </div>
        </div>
        
        <div className="row mb-2">
          <div className="col-md-6">
            <strong>SEO Keywords:</strong> {subCategory.seoKeywords || 'N/A'}
          </div>
           <div className="col-md-6">
            <strong>Status:</strong>{' '}
            <span className={`badge text-light-${subCategory.status ? 'primary' : 'danger'}`}>
              {subCategory.status ? 'Active' : 'Inactive'}
            </span>
          </div>
           <div className="row mb-3">
          <div className="d-flex gap-3 flex-wrap">
          <div>
            <p><strong>App Icon:</strong></p>
            <img src={`${BASE_URL}${subCategory.appIcon}`} alt="App Icon" width="200" height='200' />
          </div>
          <div>
            <p><strong>Web Image:</strong></p>
            <img src={`${BASE_URL}${subCategory.webImage}`} alt="Web Icon" width="200" height='200' />
          </div>
          <div>
            <p><strong>Main Image:</strong></p>
            <img src={`${BASE_URL}${subCategory.mainImage}`} alt="Main" width="200"  height='200' />
          </div>
        </div>
         
          
        </div>
         
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewSubCategoryModal;
