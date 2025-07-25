import React from 'react';
import "../css/user/userstyle.css";
import { Link } from 'react-router-dom';
import RetailFreeShipping from '../../src/img/retail-free-shipping.svg';
import Retail247 from '../../src/img/retail-247.svg';
import RetailPayment from '../../src/img/retail-payment.svg';
import RetailDeliveryMan from '../../src/img/retail-delivery-man.svg';
import Play from '../../src/img/play.png';
import App from '../../src/img/app.png';
import Payment from '../../src/img/payment.png';
import Shipping from '../../src/img/shipping.png';
import BackToTopButton from './backTopUpBottom';



export default function Footer() {
  return (
    <>

    <BackToTopButton/>
    <footer className="py-3">
      {/* Row 1: Top Icons */}
      <div className="container py-4 my-2 footer-top border-bottom border-secondary">
        <div className="row text-md-start align-items-center justify-content-between">
          <FooterIcon
            img={RetailFreeShipping}
            heading="Free Shipping"
            text="No one rejects, dislikes."
          />
          <FooterIcon
            img={Retail247}
            heading="24/7 Support"
            text="It has survived not only."
          />
          <FooterIcon
            img={RetailPayment}
            heading="Online Payment"
            text="All the Lorem Ipsum on."
          />
          <FooterIcon
            img={RetailDeliveryMan}
            heading="Fast Delivery"
            text="All the Lorem Ipsum on."
          />
        </div>
      </div>

      {/* Row 2: Main Footer */}
      <div className="container py-2 footer-middle">
        <div className="row text-md-start">
          {/* About */}
          <div className="col-md-4 mb-4">
            <h6 className="footer-heading mb-3">About Infinity Designz</h6>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
            <div className="d-flex justify-content-center justify-content-md-start gap-2 mt-3">
              <img src={Play} alt="Google Play" height="40" />
              <img src={App} alt="App Store" height="40" />
            </div>
          </div>

          {/* Company Links */}
          <div className="col-md-2 mb-4">
            <h6 className="footer-heading mb-3">Company</h6>
            <ul className="list-unstyled small">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/termsandconditions">Terms Of Use</Link></li>
              <li><Link to="/privacy_policy">Privacy Policy</Link></li>
              <li><Link to="/return_policy">Return Policy</Link></li>
            </ul>
          </div>

          {/* Important Links */}
          <div className="col-md-2 mb-4">
            <h6 className="footer-heading mb-3">Important Links</h6>
            <ul className="list-unstyled small">
              <li><a href="#">Explore Gift Cards</a></li>
              <li><a href="#">Buy in Bulk</a></li>
              <li><a href="#">Discover Our Brands</a></li>
              <li><a href="#">Check Out Bonhomie</a></li>
              <li><a href="#">Find a Store</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-1"></div>
          <div className="col-md-3 mb-4">
            <h6 className="footer-heading mb-3">Contact us</h6>
            <ul className="list-unstyled small">
              <li className="mb-2 d-flex">
                <i className="bi bi-geo-alt-fill me-2 text-white"></i>
                <p className="text-white">141, First Floor, 12 St Roots Terrace, Los Angeles 90010.</p>
              </li>
              <li className="mb-2 d-flex">
                <i className="bi bi-telephone-fill me-2 text-white"></i>
                <p className="text-white">Call: +91–123 456 7890</p>
              </li>
              <li className="d-flex">
                <i className="bi bi-envelope-fill me-2 text-white"></i>
                <p className="text-white">info@infinitydesignz.com</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Row 3: Payments, Shipping, Social */}
      <div className="container py-2 border-bottom border-secondary">
        <div className="row align-items-center text-center text-md-start">
          <div className="col-md-4 mb-3">
            <h6 className="footer-subheading mb-4">Payment System:</h6>
            <div className="d-flex justify-content-center justify-content-md-start gap-2 flex-wrap">
              <img src={Payment} alt="Payment Methods" />
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <h6 className="footer-subheading mb-4">Shipping System:</h6>
            <div className="d-flex justify-content-center justify-content-md-start gap-2 flex-wrap">
              <img src={Shipping} alt="Shipping Methods" />
            </div>
          </div>

          <div className="col-md-1"></div>
          <div className="col-md-3 mb-3">
            <h6 className="footer-subheading mb-4">Our Social Links:</h6>
            <div className="d-flex justify-content-center justify-content-md-start gap-3 footer-social-icons">
              <a href="#" className="fs-5"><i className="bi bi-facebook"></i></a>
              <a href="#" className="fs-5"><i className="bi bi-x"></i></a>
              <a href="#" className="fs-5"><i className="bi bi-youtube"></i></a>
              <a href="#" className="fs-5"><i className="bi bi-linkedin"></i></a>
              <a href="#" className="fs-5"><i className="bi bi-telegram"></i></a>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Copyright */}
      <div className="container py-3 px-3 copyright">
        <div className="row align-items-center">
          <div className="col-md-6 text-start">
            <p>Copyright 2025 © infinitydesignz. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-end pt pt">
            <Link to="/privacy_policy" className="text-decoration-none mx-2">Privacy Policy</Link>
            <span>|</span>
            <Link to="/termsandconditions" className="text-decoration-none mx-2">Terms and Conditions</Link>
            <span>|</span>
            <Link to="/return_policy" className="text-decoration-none mx-2">Returns Policy</Link>
          </div>
        </div>
      </div>
    </footer>
        </>
  );
}

function FooterIcon({ img, heading, text }) {
  return (
    <div className="col-12 col-md-3 d-flex align-items-center gap-3 justify-content-center border-md-end mb-3 mb-md-0">
      <img src={img} alt={heading} width="50" />
      <div>
        <h6 className="footer-heading mb-1">{heading}</h6>
        <p className="mb-0">{text}</p>
      </div>
    </div>
  );
}
