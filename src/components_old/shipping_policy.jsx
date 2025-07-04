import React from 'react';
import Header from '../includes/header';
import Footer from '../includes/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../src/css/styles.css';
import '../../src/css/bootstrap-icons.css';
import '';
//headerlinks
//footerlinks
export default function ShippingPolicy() {
  return (
    <>
      <Header />

      {/* Breadcrumb Section */}
      <section className="bg-light py-3">
        <div className="container shop">
          <div className="row">
            <div className="col-lg-12">
              <a href="/">Home /</a>{' '}
              <a href="/details">
                <strong>Shipping Policy</strong>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Policy Content */}
      <section className="terms-of-service py-4">
        <div className="container">
          <h2>Shipping policy</h2>
          <p>At Infinity Designz, we aim to provide efficient delivery services to our customers across India.</p>

          <h2>Delivery Timeframes</h2>
          <p>
            All items purchased from our store are shipped pan India and typically delivered within 5–8 business days
            from the date of order placement.
          </p>

          <h2>Possible Delays</h2>
          <p>
            While we strive to ensure timely delivery, please understand that occasional delays may occur due to
            unforeseen circumstances beyond our control. We appreciate your patience and understanding in such
            situations.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
