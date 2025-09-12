// src/components/viewCouponModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ViewCouponModal = ({ show, onHide, coupon }) => {
    const { categories = [] } = useSelector((state) => state.categories || {});
    const{brands=[]} = useSelector((state) => state.brands || {});
    if (!coupon) return null;

    const getCategoryTitle = (id) => {
        const category = categories.find((cat) => cat.id === id);
        return category ? category.title : '-';
    };

    const getBrandTitle =(id) =>{
      const brand = brands.find((brand) => brand.id === id);
      return brand ? brand.name : '-';
    } 

    const menuTitle = getCategoryTitle(coupon.menuId);
    const subMenuTitle = getCategoryTitle(coupon.subMenuId);
    const listSubMenuTitle = getCategoryTitle(coupon.listSubMenuId);
    const brandTitle = getBrandTitle(coupon.brandId);

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>View Coupon Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-6 mb-3"><strong>Coupon Code:</strong> {coupon.code}</div>
                    <div className="col-md-6 mb-3"><strong>Type:</strong> {coupon.type}</div>
                    <div className="col-md-6 mb-3"><strong>Price Type:</strong> {coupon.priceType}</div>
                    <div className="col-md-6 mb-3"><strong>Value:</strong> {coupon.value}</div>
                    <div className="col-md-6 mb-3"><strong>Min Order:</strong> {coupon.minOrderAmount}</div>
                    <div className="col-md-6 mb-3"><strong>Status:</strong> {coupon.status ? 'Active' : 'Inactive'}</div>
                    <div className="col-md-6 mb-3">
                        <strong>From Date:</strong> {new Date(coupon.fromDate).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                        })}
                    </div>
                    <div className="col-md-6 mb-3">
                        <strong>To Date:</strong> {new Date(coupon.toDate).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                        })}
                    </div>

                    {coupon.menuId && (
                        <div className="col-md-6 mb-3"><strong>Menu:</strong> {menuTitle}</div>
                    )}
                    {coupon.subMenuId && (
                        <div className="col-md-6 mb-3"><strong>Sub Menu ID:</strong> {subMenuTitle}</div>
                    )}
                    {coupon.listSubMenuId && (
                        <div className="col-md-6 mb-3"><strong>List Sub Menu ID:</strong> {listSubMenuTitle}</div>
                    )}
                    {coupon.brandId && (
                        <div className="col-md-6 mb-3"><strong>Brand ID:</strong> {brandTitle}</div>
                    )}
                    {coupon.url && (
                        <div className="col-md-12 mb-3"><strong>URL:</strong> {coupon.url}</div>
                    )}
                    {coupon.priceRange && (
                        <div className="col-md-12 mb-3"><strong>Price Range:</strong> {coupon.priceRange}</div>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewCouponModal;
