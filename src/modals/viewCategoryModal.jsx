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
        <Modal.Title>Category Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Title:</strong> {category.title}</p>
        <p><strong>Status:</strong>{' '}
          <span className={`badge text-light-${category.status ? 'primary' : 'danger'}`}>
            {category.status ? 'Active' : 'Inactive'}
          </span></p>
        <div className="d-flex gap-3 flex-wrap">
          <div>
            <p><strong>App Icon:</strong></p>
            <img src={`${BASE_URL}${category.appIcon}`} alt="App Icon" width="200" />
          </div>
          <div>
            <p><strong>Web Image:</strong></p>
            <img src={`${BASE_URL}${category.webImage}`} alt="Web Icon" width="200" />
          </div>
          <div>
            <p><strong>Main Image:</strong></p>
            <img src={`${BASE_URL}${category.mainImage}`} alt="Main" width="200" />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewCategoryModal;
