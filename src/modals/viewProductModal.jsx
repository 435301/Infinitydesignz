import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import BASE_URL from '../config/config';

const ViewProductModal = ({ show, onClose, product }) => {
  if (!product) return null;

  const {
    title,
    sku,
    mainCategoryTitle,
    subCategoryTitle,
    listSubCategoryTitle,
    size,
    color,
    stock,
    status,
    created_at,
    images,
  } = product;

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>View Product Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-4 text-center">
            {images?.main?.url ? (
              <img
                src={`${BASE_URL}/uploads/products/${images.main.url}`}
                alt={title}
                className="img-fluid"
              />
            ) : (
              <div className="text-muted">No Image</div>
            )}
          </div>
          <div className="col-md-8">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <th>SKU</th>
                  <td>{sku}</td>
                </tr>
                <tr>
                  <th>Product Name</th>
                  <td>{title}</td>
                </tr>
                <tr>
                  <th>Main Category</th>
                  <td>{mainCategoryTitle || '-'}</td>
                </tr>
                <tr>
                  <th>Sub Category</th>
                  <td>{subCategoryTitle || '-'}</td>
                </tr>
                <tr>
                  <th>List Sub Category</th>
                  <td>{listSubCategoryTitle || '-'}</td>
                </tr>
                <tr>
                  <th>Size</th>
                  <td>{size?.title || '-'}</td>
                </tr>
                <tr>
                  <th>Color</th>
                  <td>
                    {color ? (
                      <span className="d-flex align-items-center">
                        <span
                          className="me-2 rounded-circle"
                          style={{
                            width: '16px',
                            height: '16px',
                            backgroundColor: color.hex_code || '#ccc',
                            border: '1px solid #000',
                          }}
                        ></span>
                        {color.label}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Stock</th>
                  <td>{stock}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>
                    <span className={`badge ${status ? 'bg-success' : 'bg-danger'}`}>
                      {status ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>Created Date</th>
                  <td>{new Date(created_at).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
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

export default ViewProductModal;
