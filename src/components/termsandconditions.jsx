import React from "react";
import Header from "../includes/header";
import Footer from "../includes/footer";
import { Link } from "react-router-dom";
import "../../src/css/style.css";
import '../../src/css/bootstrap-icons.css';

const TermsOfService = () => {
  return (
    <>
      <Header />

      {/* Breadcrumb */}
      <section className="bg-light py-3">
        <div className="container shop">
          <div className="row">
            <div className="col-lg-12">
              <Link to="/">Home /</Link> <strong>Terms and Conditions</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Section */}
      <section className="terms-of-service">
        <div className="container">
          <h1>Terms of Service</h1>
          <p className="last-updated">Last updated: May 01, 2025</p>

          <h2>Overview</h2>
          <p>
            This website, Infinity Designz, is operated by Koushikkarthik APPARELS Pvt Ltd. Throughout the site, the
            terms “Infinity Designz”, “we”, “us” and “our” refer to Koushikkarthik APPARELS Pvt Ltd. Koushikkarthik APPARELS
            Pvt Ltd offers this website, including all information, tools, and Services available from this site to you,
            the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.
          </p>
          <p>
            By visiting our site and/or purchasing something from us, you engage in our “Service” and agree to be bound by
            the following terms and conditions (“Terms of Service”, “Terms”)...
          </p>

          {/* Repeat for all sections... */}

          <h2>Section 5 - Products or Services</h2>
          <p>
            Certain products or Services may be available exclusively online through the website. These products or
            Services may have limited quantities and are subject to return or exchange only according to our <Link to="/refund-policy">Refund Policy</Link>.
          </p>

          {/* ... All other sections ... */}

          <h2>Section 20 - Contact Information</h2>
          <div className="contact-info">
            <p>Questions about the Terms of Service should be sent to us at:</p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:info@infinitydesignz.com">info@infinitydesignz.com</a>
            </p>
            <p>
              <strong>Phone:</strong> <a href="tel:9876543210">9876543210</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default TermsOfService;
