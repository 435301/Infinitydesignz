
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import BASE_URL from '../config/config';


const ViewListSubCategoryModal = ({ show, onClose, subCategory }) => {
  if (!subCategory) return null;

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>View List Sub Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row mb-3">
          <div className="col-md-6">
            <strong>Title:</strong> {subCategory.title}
          </div>
          <div className="col-md-6">
            <strong>Sub Category:</strong> {subCategory.subCategory || 'N/A'}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <strong>Main Category:</strong> {subCategory.category || 'N/A'}
          </div>
          <div className="col-md-6">
            <strong>Status:</strong>{' '}
            <span className={` text-${subCategory.status ? 'primary' : 'danger'}`}>
              {subCategory.status ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        <div className="row mb-3 ">
          <div className="col-md-4">
            <strong>App Icon:</strong><br />
            {subCategory?.appIcon ? (
              <img src={`${BASE_URL}${subCategory.appIcon}`} alt="App Icon" width="200" height="200" />

            ) : (
              <span>N/A</span>
            )}
          </div>
          <div className="col-md-4">
            <strong>Web Icon:</strong><br />
            {subCategory?.webImage ? (
              <img src={`${BASE_URL}${subCategory.webImage}`} alt="Web Icon" width="200" height="200" />

            ) : (
              <span>N/A</span>
            )
            }


          </div>
          <div className="col-md-4">
            <strong>Main Image:</strong><br />
            {subCategory?.mainImage ? (
              <img src={`${BASE_URL}${subCategory.mainImage}`} alt="Main" width="200" height="200" />

            ) : (
              <span>N/A</span>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewListSubCategoryModal;
