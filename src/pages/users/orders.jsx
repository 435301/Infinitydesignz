import React, { useEffect, useState } from "react";
import '../../css/user/userstyle.css';
import '../../css/user/bootstrap-icons.css';
import '../../css/user/bootstrap.min.css';
import P1 from '../../img/p1.png';
import AdBanner from '../../img/ad-banner.png';
import Header from "../../includes/header";
import Footer from "../../includes/footer";
import { Link } from "react-router-dom";
import RelatedProductsCarousel from "../users/RelatedProductsCarousel";
import BASE_URL from "../../config/config";
import { fetchOrders } from "../../redux/actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../utils/auth";
// Replace with your footer component

const orders = [
  {
    id: 1,
    image: P1,
    title: "ANDRES FABRIC 2 SEATER SOFA IN SANDY BROWN COLOUR",
    warranty: "36-MONTH WARRANTY AVAILABLE",
    size: "L",
    qty: 1,
    payment: "Paid Online",
    price: 2405,
    mrp: 33679,
    delivery: "13 Aug",
    status: "In-Progress",
    canCancel: true,
    address: "Chaitanya Nelluri, Flat no 63 Balaji homes plot no 201-203, Nizampet, Hyderabad - 500090, TELANGANA..."
  },
  {
    id: 2,
    image: P1,
    title: "ANDRES FABRIC 2 SEATER SOFA IN SANDY BROWN COLOUR",
    warranty: "36-MONTH WARRANTY AVAILABLE",
    size: "L",
    qty: 1,
    payment: "COD (Cash on Delivery)",
    price: 2405,
    mrp: 33679,
    delivery: "13 Aug",
    status: "Delivered",
    deliveryDate: "15 Apr 2025",
    rateable: true
  },
  {
    id: 3,
    image: P1,
    title: "ANDRES FABRIC 2 SEATER SOFA IN SANDY BROWN COLOUR",
    warranty: "36-MONTH WARRANTY AVAILABLE",
    size: "L",
    qty: 1,
    payment: "Paid Online",
    price: 2405,
    mrp: 33679,
    delivery: "13 Aug",
    status: "Cancelled",
    refundedDate: "12 Apr 2025"
  }
];

const sampleProducts = [
  {
    title: "Andres Fabric 3 Seater Sofa In Sandy Brown Colour",
    price: "₹37,999",
    originalPrice: "MRP ₹48,999",
    discount: "22% off",
    image: require('../../img/img3.png'),
    rating: "4.4",
    reviews: "24K",
    warranty: "36-Month Warranty Available",
    emi: "EMI starting from ₹1,825/month",
    shipping: "Express Shipping in 1 day"
  },
  {
    title: "Andres Fabric 3 Seater Sofa In Sandy Brown Colour",
    price: "₹37,999",
    originalPrice: "MRP ₹48,999",
    discount: "22% off",
    image: require('../../img/img3.png'),
    rating: "4.4",
    reviews: "24K",
    warranty: "36-Month Warranty Available",
    emi: "EMI starting from ₹1,825/month",
    shipping: "Express Shipping in 1 day"
  },
  {
    title: "Andres Fabric 3 Seater Sofa In Sandy Brown Colour",
    price: "₹37,999",
    originalPrice: "MRP ₹48,999",
    discount: "22% off",
    image: require('../../img/img3.png'),
    rating: "4.4",
    reviews: "24K",
    warranty: "36-Month Warranty Available",
    emi: "EMI starting from ₹1,825/month",
    shipping: "Express Shipping in 1 day"
  },
];


const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const { orders = [], loading, error } = useSelector((state) => state.order);
  const latestOrder = orders.length > 0 ? orders[0] : null;
  const [latestOrderDetails, setLatestOrderDetails] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    const fetchFullOrder = async () => {
      if (orders.length > 0) {
        const latestOrder = orders[0];
        try {
          const res = await fetch(`${BASE_URL}/orders/${latestOrder.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getToken()}`,
            },
          });

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const fullOrder = await res.json();
          setLatestOrderDetails(fullOrder);
        } catch (err) {
          console.error("Error fetching order details:", err);
        }
      }
    };

    fetchFullOrder();
  }, [orders]);

  return (
    <>
      <Header />
      <section className="breadcrumb-section">
        <div className="container">
          <Link href="#" className="orders-acc"><strong>My Account</strong></Link>
        </div>
      </section>

      <section className="orders-section mt-4">
        <div className="container">
          <div className="row">
            <aside className="col-md-2 sidebars">
              <Link to="/profile">Profile</Link>
              <Link to="/orders" className="active">Orders</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/addressbook">Address book</Link>
            </aside>

            <main className="col-md-7">
              {latestOrderDetails ? (
                <div key={latestOrderDetails.id} className="order-block">
                  {latestOrderDetails.items.map((item) => {
                    const productData = item.variant || item.product || {};
                    return (
                      <div className="order-item" key={item.id}>
                        <div className="order-image">
                          <img
                            src={
                              productData.imageUrl
                                ? `${BASE_URL}/uploads/products/${productData.imageUrl}`
                                : "/placeholder.jpg"
                            }
                            alt={productData.imageAlt || productData.title || "Product"}
                            className="order-item-img"
                          />
                        </div>

                        <div className="order-details">
                          <h5>{productData.title || "Product"}</h5>
                          <p className="warranty">{productData.warranty || ""}</p>

                          <div className="order-meta">
                            <span className="separator">
                              Size: {productData.size || "N/A"}
                            </span>
                            <span className="separator">
                              Qty: {String(item.quantity).padStart(2, "0")}
                            </span>
                            <span>
                              Payment Status:{" "}
                              <strong>{latestOrderDetails.payment?.method || "N/A"}</strong>
                            </span>
                          </div>

                          <div className="order-price">
                            <span className="current-price">
                              ₹{item.total?.toLocaleString() || 0}
                            </span>
                            <del className="mrp">
                              MRP: ₹
                              {(item.product?.mrp ?? item.variant?.mrp ?? 0).toLocaleString()}
                            </del>
                          </div>

                          <div className="order-info">
                            <span>
                              <i className="bi bi-truck"></i> Estimated delivery by{" "}
                              {latestOrderDetails.estimatedDelivery || "N/A"}
                            </span>
                            <span>
                              <i className="bi bi-arrow-return-right"></i> Easy 14 days
                              return & exchange available
                            </span>
                          </div>

                          <div className="order-status">
                            <div className="status">
                              <span>
                                Status:{" "}
                                <span
                                  className={`status ${latestOrderDetails?.payment?.status?.toLowerCase()}`}
                                >
                                  {latestOrderDetails?.payment?.status || "N/A"}
                                </span>
                              </span>
                            </div>

                            {latestOrderDetails?.payment?.status === "In-Progress" && (
                              <button className="action-btn">Cancel Order</button>
                            )}

                            {latestOrderDetails?.payment?.status === "Delivered" && (
                              <div className="rate-review">
                                <span>Rate & Review:</span>
                                <div className="stars">
                                  {[...Array(5)].map((_, i) => (
                                    <i key={i} className="bi bi-star"></i>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* 
                {latestOrderDetails?.payment?.status === "Delivered" && order.deliveryDate && (
                  <p className="delivery-date">On {order.deliveryDate}</p>
                )}
                {latestOrderDetails?.payment?.status === "Cancelled" && order.refundedDate && (
                  <p className="refunded">Refunded on: {order.refundedDate}</p>
                )} 
                */}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {latestOrderDetails?.address && (
                    <div className="delivery-address">
                      <strong>Deliver to:</strong> <br />
                      <span className="name">{latestOrderDetails.address.name}</span> <br />
                      <span className="address-line">
                        {latestOrderDetails.address.flatNumber},{" "}
                        {latestOrderDetails.address.buildingName}
                      </span>
                      <br />
                      <span className="address-line">
                        {latestOrderDetails.address.addressLine1},{" "}
                        {latestOrderDetails.address.addressLine2}
                      </span>
                      <br />
                      <span className="address-line">
                        {latestOrderDetails.address.city},{" "}
                        {latestOrderDetails.address.state} -{" "}
                        {latestOrderDetails.address.pincode}
                      </span>
                      <br />
                      <span className="phone">
                        Phone: {latestOrderDetails.address.phone}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                !loading && <p>No latest order found</p>
              )}
            </main>


            <aside className="col-md-3 ads-related">
              <div className="ad-banner">
                <img src={AdBanner} alt="Special Sale" />
              </div>
              <div className="related-products">
                <h4>Related Products</h4>
                <RelatedProductsCarousel products={sampleProducts} />
              </div>
            </aside>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MyOrdersPage;
