import React from "react";
import '../../css/style.css';
import '../../css/bootstrap-icons.css';
import '../../css/bootstrap.min.css';
import P1 from '../../img/p1.png';
import AdBanner from '../../img/ad-banner.png';
import Header from "../../includes/header";
import Footer from "../../includes/footer";
import { Link } from "react-router-dom";
import RelatedProductsCarousel from "../../components/RelatedProductsCarousel";
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
  return (
    <>
      <Header />
      <section className="breadcrumb-section">
        <div className="container">
          <Link href="#" className="orders-acc"><strong>My Account</strong></Link>
        </div>
      </section>

      <section className="orders-section">
        <div className="container">
          <div className="row">
            <aside className="col-md-2 sidebar">
              <Link to="/profile">Profile</Link>
              <Link to="/orders" className="active">Orders</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/addressbook">Address book</Link>
            </aside>

            <main className="col-md-7">
              {orders.map((order, idx) => (
                <div key={order.id} className="order-block">
                  <div className="order-item">
                    <div class="order-image">
                      <img src={order.image} alt="Product" className="order-item-img" />
                    </div>
                    
                    <div className="order-details">
                      <h5>{order.title}</h5>
                      <p className="warranty">{order.warranty}</p>
                      <div className="order-meta">
                        <span className="separator">Size: {order.size}</span>
                        <span className="separator">Qty: {String(order.qty).padStart(2, "0")}</span>
                        <span>Payment Status: <strong>{order.payment}</strong></span>
                      </div>
                      <div className="order-price">
                        <span className="current-price">₹{order.price.toLocaleString()}</span>
                        <del class="mrp">MRP: ₹{order.mrp.toLocaleString()}</del>
                      </div>
                      <div className="order-info">
                        <span><i class="bi bi-truck"></i> Estimated delivery by {order.delivery}</span>
                        <span><i class="bi bi-arrow-return-right"></i> Easy 14 days return & exchange available</span>
                      </div>
                      <div className="order-status">
                         <div class="status">
                           <span>Status: <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></span>
                         </div>
                       
                        {order.status === "In-Progress" && (
                          <button className=" action-btn">Cancel Order</button>
                        )}
                        {order.status === "Delivered" && (
                          <div className="rate-review">
                            <span>Rate & Review:</span>
                            <div className="stars">
                              {[...Array(5)].map((_, i) => (
                                <i key={i} className="bi bi-star"></i>
                              ))}
                            </div>
                          </div>
                        )}
                        {order.status === "Delivered" && order.deliveryDate && (
                          <p className="delivery-date">On {order.deliveryDate}</p>
                        )}
                        {order.status === "Cancelled" && order.refundedDate && (
                          <p className="refunded">Refunded on: {order.refundedDate}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {order.address && (
                    <div className="delivery-address">
                      <strong>Deliver to:</strong> {order.address}
                    </div>
                  )}
                  {idx < orders.length - 1 && <hr />}
                </div>
              ))}
            </main>

            <aside className="col-md-3 ads-related">
              <div className="ad-banner">
                <img src={AdBanner} alt="Special Sale" />
              </div>
              <div className="related-products">
                <h4>Related Products</h4>
                <RelatedProductsCarousel products={sampleProducts}/>
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
