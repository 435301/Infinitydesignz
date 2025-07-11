// src/modals/ViewProductModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import BASE_URL from '../config/config';

const ViewProductModal = ({ show, onClose, product }) => {
    if (!product) return null;
     const imageUrl = product.mainCategory?.mainImage
        ? `${BASE_URL}/uploads/categories/${product.mainCategory.mainImage}`
        : null;

    return (
        <Modal show={show} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>View Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                     {imageUrl && (
                        <div className="col-md-4 mb-3">
                            <img
                                src={imageUrl}
                                alt={product.title}
                                className="img-fluid"
                                style={{ borderRadius: '5px', border: '1px solid #ddd' }}
                            />
                        </div>
                    )}
                    <div className="col-md-4">
                        <strong>SKU:</strong> <p>{product.sku}</p>
                        <strong>Title:</strong> <p>{product.title}</p>
                        <strong>Model:</strong> <p>{product.model || '-'}</p>
                        <strong>Weight:</strong> <p>{product.weight || '-'}</p>
                        <strong>SLA:</strong> <p>{product.sla || '-'}</p>
                        <strong>Delivery Charges:</strong> <p>{product.deliveryCharges || '-'}</p>
                    </div>
                    <div className="col-md-4">
                        <strong>Stock:</strong> <p>{product.stock}</p>
                        <strong>MRP:</strong> <p>{product.mrp}</p>
                        <strong>Selling Price:</strong> <p>{product.sellingPrice}</p>
                        <strong>Size:</strong> <p>{product.size?.title || '-'}</p>
                        <strong>Color:</strong>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: product.color?.hex_code || '#ccc',
                                    marginRight: '10px',
                                    display: 'inline-block'
                                }}
                            ></span>
                            <span>{product.color?.label || '-'}</span>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <strong>Category:</strong> <p>{product.mainCategory?.title || '-'}</p>
                        <strong>Sub Category:</strong> <p>{product.subCategory?.title || '-'}</p>
                        <strong>List Sub Category:</strong> <p>{product.listSubCategory?.title || '-'}</p>
                        <strong>Status:</strong> <p>{product.status ? 'Active' : 'Inactive'}</p>
                        <strong>Created:</strong> <p>{new Date(product.created_at).toLocaleString()}</p>
                    </div>
                </div>
                <hr />
                <strong>Description:</strong>
                <div
                    dangerouslySetInnerHTML={{ __html: product.description || '<p>-</p>' }}
                    style={{ backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '4px' }}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewProductModal;
