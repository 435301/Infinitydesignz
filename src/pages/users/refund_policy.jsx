import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../includes/header';
import Footer from '../includes/footer';
import '../../src/css/user/userstyle.css';
import '../../src/css/user/bootstrap-icons.css';

export default function RefundPolicy() {
  return (
    <>
      <Header />
      <div>
        {/* Breadcrumb Section */}
        <section className="bg-light py-3">
          <div className="container shop">
            <div className="row">
              <div className="col-lg-12">
                <a href="/">Home /</a> <a href="/refund-policy"><strong>Refund Policy</strong></a>
              </div>
            </div>
          </div>
        </section>

        {/* Refund Policy Section */}
        <section className="terms-of-service py-5">
          <div className="container">
            <h2>Refund Process</h2>

            <h3>Mode Of Refund Payment</h3>
            <p>
              Once the item is cancelled, the refund is processed after the product has been picked up
              from the delivery location.
            </p>
            <p>
              You can choose to get your refund either in the original mode of payment (Credit Card,
              Debit Card, Net Banking, Digital Wallets or UPI Account) or to your Infinity Designz
              Wallet.
            </p>
            <p>
              If you have availed EMI option - in case of full refund the amount is credited to your
              original mode of payment. However, in case of partial refunds, the refund is initiated
              through NEFT transaction to your bank account so that the remaining EMI is not lapsed*.
            </p>
            <p>
              Any cashback earned on the order prior to the cancellation will be deducted from Infinity
              Designz credits. If the same cashback has been used completely or partially to place
              another order, the cashback amount will be deducted from the refund amount of the cancelled
              product.
            </p>
            <p>
              *There can be variations depending on the T&Cs of the financial service provider and time
              at which return is sought.
            </p>

            <h2 className="mt-4">Refund Timelines</h2>

            <p><strong>Infinity Designz Wallet - Within 24 Hours</strong></p>
            <p>
              The fastest way to get refunds is into your Infinity Designz Wallet. You can use 100% of
              refund credits in your Infinity Designz Wallet for your next purchase. The Infinity Designz
              Refund credits are valid for 3 years and are non-transferrable.
            </p>

            <p><strong>Original Mode Of Payment</strong></p>
            <p>
              Once the refund is initiated, the refund amount gets credited to your selected mode of
              payment in 7-10 business days. The refund timeline for various modes is provided below.
            </p>

            <ul>
              <li>Credit Card/Debit Card/Net Banking/UPI Account - 4-5 Business Days</li>
              <li>Offline (NEFT) - 7-10 Business Days</li>
              <li>Infinity Designz Wallet (Refund Credits) - Within 24 Hours</li>
            </ul>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
