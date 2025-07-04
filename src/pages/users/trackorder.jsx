import React from "react";
import { Container, Row, Col, Button, Carousel, Card } from "react-bootstrap";
import "../../src/css/style.css";
import "../../src/css/trackOrder.css";
import { useNavigate } from "react-router-dom";
import Footer from "../includes/footer";
import Header from "../includes/header";
import '../../src/css/bootstrap-icons.css';
import AdBanner from '../../src/img/ad-banner.png';
import Img3 from '../../src/img/img3.png';
import Star from '../../src/img/star.svg';
import Star1 from '../../src/img/star1.svg';
//headerlinks
//footerlinks

export default function TrackOrderPage() {
  const navigate = useNavigate();

  return (
    <>
    <Header/>
      {/* Breadcrumb Section */}
      <section className="bg-light py-3">
        <Container className="shop">
          <Row>
            <Col lg={12}>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="#">My Account</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/orders">Orders</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Track Order
                  </li>
                </ol>
              </nav>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Track Order Section */}
      <section className="py-5">
        <Container className="shop">
          <Row>
            {/* Sidebar */}
            <Col md={2} className="sidebar d-flex flex-column gap-2">
              <a href="/profile">Profile</a>
              <a href="/orders" className="active">
                Orders
              </a>
              <a href="/wishlist">Wishlist</a>
              <a href="/addressbook">Address Book</a>
            </Col>

            {/* Main Content */}
            <Col md={7}>
              <Row>
                <Col md={12}>
                  <section className="track-detail-section">
                    <div className="track-detail-card p-4">
                      <div className="track-content">
                        <i className="bi bi-truck track-icon"></i>
                        <h3 className="mb-2">Track Your Order</h3>
                        <Container>
                          <Row>
                            <Col className="hh-grayBox pt45 pb20">
                              <div className="d-flex justify-content-between flex-md-row flex-column">
                                <div className="order-tracking completed">
                                  <span className="is-complete"></span>
                                  <p>
                                    Ordered
                                    <br />
                                    <span>May 5, 2025</span>
                                  </p>
                                </div>
                                <div className="order-tracking completed">
                                  <span className="is-complete"></span>
                                  <p>
                                    Shipped
                                    <br />
                                    <span>May 7, 2025</span>
                                  </p>
                                </div>
                                <div className="order-tracking">
                                  <span className="is-complete"></span>
                                  <p>
                                    Delivered
                                    <br />
                                    <span>May 10, 2025</span>
                                  </p>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Container>

                        <div className="track-details mx-auto card p-4 mb-4" style={{ maxWidth: "500px" }}>
                          <p className="mb-2">
                            <strong>Order Summary:</strong> Modern Sofa (1), Coffee Table (1)
                          </p>
                          <p className="mb-2">
                            <strong>Shipping Address:</strong> madhapur, Hyderabad, India
                          </p>
                          <p className="mb-2">
                            <strong>Estimated Delivery:</strong> May 10, 2025
                          </p>
                          <p className="mb-2">
                            <strong>Carrier:</strong> Bluedot Logistics
                          </p>
                          <p className="mb-0">
                            <strong>Need Help?</strong> Contact us at <a href="mailto:support@furniture.com">support@furniture.com</a> or call <a href="tel:+1234567890">+1-234-567-890</a>.
                          </p>
                        </div>

                        <div className="d-flex flex-column align-items-center gap-3">
                          <Button variant="outline-primary" className="px-5" onClick={() => navigate("/cart")}>View Order Details</Button>
                          <Button variant="outline-primary" className="px-5" onClick={() => navigate("/")}>Back to Home</Button>
                        </div>
                      </div>
                    </div>
                  </section>
                </Col>
              </Row>
            </Col>

            {/* Advertisement and Carousel */}
            <Col md={3}>
              <div className="ad-banner mb-4">
                <img src={AdBanner} alt="Special Sale" className="img-fluid" />
              </div>
              <div className="related-products py-4">
                <h4>Related Products</h4>
                <Carousel interval={null}>
                  {[1, 2].map((item, idx) => (
                    <Carousel.Item key={idx}>
                      <Card className="h-100 position-relative">
                        <div className="discount-badge">22% off</div>
                        <div className="wishlist-icon">
                          <img src={Icon} alt="Wishlist" />
                        </div>
                        <Card.Img variant="top" src={Img3} alt="Sofa" />
                        <Card.Body>
                          <Card.Title>Andres Fabric 3 Seater Sofa In Sandy Brown Colour</Card.Title>
                          <p>
                            <strong>₹37,999</strong> <del>MRP ₹48,999</del>
                          </p>
                          <div className="rating d-flex align-items-center mb-2">
                            {[...Array(4)].map((_, i) => (
                              <img key={i} src={Star} className="me-2" alt="star" />
                            ))}
                            <img src={Star1} className="me-2" alt="half-star" />
                            <span>4.4 | 24K</span>
                          </div>
                          <p className="emi-text">
                            36-Month Warranty Available
                            <br />
                            EMI starting from ₹1,825/month
                            <br />
                            Express Shipping in 1 day
                          </p>
                        </Card.Body>
                      </Card>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer/>
    </>
  );
}
