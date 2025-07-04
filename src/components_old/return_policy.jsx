import React from 'react';
import Header from '../includes/header';
import Footer from '../includes/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../src/css/styles.css';
import '../../src/css/bootstrap-icons.css';
//headerlinks
//footerlinks

export default function ReturnPolicy() {
  return (
    <>
      <Header />

      {/* Breadcrumb Section */}
      <section className="bg-light py-3">
        <div className="container shop">
          <div className="row">
            <div className="col-lg-12">
              {/* Breadcrumb navigation */}
              <a href="/">Home /</a>{' '}
              <a href="/details">
                <strong>Return Policy</strong>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Return Policy Content */}
      <section className="terms-of-service py-4">
        <div className="container">
          <h2>We have a 30 day return</h2>
          <p>
            We have a 30 day return policy, which means you have 3 days after receiving your item to request a return.
          </p>
          <p>
            To be eligible for a return, your item must be in the same condition that you received it, unworn or unused,
            with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.
          </p>
          <p>
            To start a return, you can contact us at{' '}
            <a href="mailto:info@infinitydesignz.com">info@infinitydesignz.com</a>. Unboxing video is must for all the
            returns.
          </p>
          <p>
            If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where
            to send your package. Items sent back to us without first requesting a return will not be accepted.
          </p>
          <p>
            You can always contact us for any return question at{' '}
            <a href="mailto:info@infinitydesignz.com">info@infinitydesignz.com</a>
          </p>

          <h2>Damages and issues</h2>
          <p>
            Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if
            you receive the wrong item, so that we can evaluate the issue and make it right.
          </p>

          <h2>Exchanges</h2>
          <p>
            The fastest way to ensure you get what you want is to return the item you have, and once the return is
            accepted, make a separate purchase for the new item.
          </p>

          <h2>Refunds</h2>
          <p>
            We will notify you once we’ve received and inspected your return, and let you know if the refund was
            approved or not. If approved, you’ll be automatically refunded on your original payment method within 10
            business days. Please remember it can take some time for your bank or credit card company to process and
            post the refund too. If more than 15 business days have passed since we’ve approved your return, please
            contact us at <a href="mailto:info@infinitydesignz.com">info@infinitydesignz.com</a>.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
