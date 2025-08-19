import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/admin/style.css';
import '../css/admin/icofont.css';
import HeaderAdmin from '../includes/headerAdmin';
import Sidebar from '../includes/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../redux/actions/orderAction';
import BASE_URL from '../config/config';
import CancelOrderModal from '../modals/cancelOrderModal';

const OrderDetailsPage = () => {
    const dispatch = useDispatch();
    const { orderId } = useParams();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const { orderById: order, loading, error } = useSelector((state) => state.orderByIdState);



    useEffect(() => {
        if (orderId) {
            dispatch(fetchOrderById(orderId));
        }
    }, [orderId, dispatch]);

    const handleToggleSidebar = (collapsed) => {
        setIsSidebarCollapsed(collapsed);
    };

    if (loading) return <div className="p-4">Loading order details...</div>;
    if (error) return <div className="p-4 text-danger">Error: {error}</div>;
    if (!order) return <div className="p-4">No order found.</div>;

    const address = order.address || {};
    const payment = order.payment || {};
    const priceSummary = order.priceSummary || {};

    const handleCancelClick = (orderId) => {
        setSelectedOrderId(orderId);
        setShowCancelModal(true);
    };

    const handleCancelConfirm = () => {
        if (selectedOrderId) {
            //   dispatch(cancelOrderById(selectedOrderId));
        }
        setShowCancelModal(false);
        setSelectedOrderId(null);
    };

    return (
        <div className="sidebar-mini fixed">
            <div className="wrapper">
                <HeaderAdmin onToggleSidebar={handleToggleSidebar} />
                <aside className="main-sidebar hidden-print">
                    <Sidebar isCollapsed={isSidebarCollapsed} />
                </aside>

                <div
                    className="content-wrapper mb-4"
                    style={{
                        marginLeft: isSidebarCollapsed ? '60px' : '272px',
                        padding: '20px',
                        flex: 1,
                        transition: 'margin-left 0.3s ease',
                    }}
                >
                    <h5>Order Details - #{order.id}</h5>

                    {/* Order Summary */}
                    <div className="card my-3">
                        <div className="card-block">
                            <div className="order-details-section d-flex justify-content-between mb-3">
                                {/* Shipping Address */}
                                <div className="p-2 border-right" style={{ width: '33%' }}>
                                    <h6>SHIPPING ADDRESS</h6>
                                    <p>
                                        {address.name}<br />
                                        {address.flatNumber}, {address.buildingName}<br />
                                        {address.addressLine1}, {address.addressLine2}<br />
                                        {address.city}, {address.state} - {address.pincode}<br />
                                        Phone: {address.phone}
                                    </p>
                                </div>

                                {/* Payment Method */}
                                <div className="p-2 border-right" style={{ width: '33%' }}>
                                    <h6>PAYMENT METHOD</h6>
                                    <p>
                                        {payment.method}<br />
                                        Status: {payment.status}<br />
                                        Transaction ID: {payment.transactionId || 'N/A'}
                                    </p>
                                </div>

                                {/* Price Summary */}
                                <div className="p-2" style={{ width: '33%' }}>
                                    <h6>ORDER SUMMARY</h6>
                                    <p>
                                        Total MRP: ₹{priceSummary.totalMRP}<br />
                                        Discount on MRP: ₹{priceSummary.discountOnMRP}<br />
                                        Coupon Discount: ₹{priceSummary.couponDiscount}<br />
                                        Platform Fee: ₹{priceSummary.platformFee}<br />
                                        Shipping Fee: ₹{priceSummary.shippingFee}<br />
                                        <strong>Final Payable: ₹{priceSummary.finalPayable}</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Items Table */}
                    <div className="card">
                        <div className="card-block">
                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Brand</th>
                                            <th>Color</th>
                                            <th>Size</th>
                                            <th>Qty</th>
                                            <th>Price</th>
                                            <th>Total</th>
                                            <th>Delivery Date</th>
                                            <th>Product Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.items && order.items.length > 0 ? (
                                            order.items.map((item, index) => {
                                                const product = item.product || item.variant || {};
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <img
                                                                src={`${BASE_URL}/uploads/products/${product.imageUrl}`}
                                                                alt={product.imageAlt || 'Product'}
                                                                style={{ width: '50px' }}
                                                            />
                                                        </td>
                                                        <td>{product.title}</td>
                                                        <td>{product.brand}</td>
                                                        <td>{product.color}</td>
                                                        <td>{product.size}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>₹{product.price}</td>
                                                        <td>₹{item.total}</td>
                                                        <td>09-Oct-2023</td>
                                                        <td>
                                                            <span>Order Placed</span>
                                                            <div className="action-buttons">
                                                                <button type="button" className="action-btn approve-btn action-rounded">
                                                                    <i className="ti-check"></i> Approve
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="action-btn cancel-btn action-rounded"
                                                                    onClick={() => handleCancelClick(order.id)}
                                                                >
                                                                    <i className="ti-close"></i> Cancel Order
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="text-center">No items found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <CancelOrderModal
                        show={showCancelModal}
                        onHide={() => setShowCancelModal(false)}
                        onConfirm={handleCancelConfirm}
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPage;
