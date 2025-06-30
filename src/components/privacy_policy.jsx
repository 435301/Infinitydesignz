import React from "react";
import Header from "../includes/header";
import Footer from "../includes/footer";
import '../../src/css/styles.css';
import '../../src/css/bootstrap-icons.css';
import '';
//footerlinks
//headerlinks

export default function PrivacyPolicy() {
  return (
    <>
      <head>
        <title>Privacy Policy - Infinity Designz</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Privacy Policy for Infinity Designz" />
        <meta
          name="description"
          content="Learn how Infinity Designz collects, uses, and protects your personal information."
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
        />
      </head>

      <Header />

      {/* Breadcrumb */}
      <section className="bg-light py-3">
        <div className="container shop">
          <div className="row">
            <div className="col-lg-12">
              <a href="/">Home /</a>{" "}
              <a href="/details">
                <strong>Privacy-Policy</strong>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy */}
      <section className="privacy-policy">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: May 01, 2025</p>
          <p>
            This Privacy Policy describes how Koushikkarthik APPARELS Pvt Ltd...
          </p>
          {/* You can break down this content into smaller components if needed */}
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time...
          </p>

          <h2>How We Collect and Use Your Personal Information</h2>
          <p>To provide the Services, we collect personal information...</p>

          <h2>What Personal Information We Collect</h2>
          <p>The types of personal information we obtain...</p>

          <h2>Information We Collect Directly from You</h2>
          <ul>
            <li>Contact details including your name, address...</li>
            <li>Order information including billing/shipping address...</li>
            <li>Account information like username and password...</li>
            <li>Customer support information you provide...</li>
          </ul>

          <h2>Information We Collect about Your Usage</h2>
          <p>We may also automatically collect certain information...</p>

          <h2>Information We Obtain from Third Parties</h2>
          <ul>
            <li>Companies supporting our Site like Shopify</li>
            <li>Payment processors collecting payment info</li>
            <li>Tracking via pixels, cookies, beacons</li>
          </ul>

          <h2>How We Use Your Personal Information</h2>
          <ul>
            <li><strong>Providing Products and Services:</strong>...</li>
            <li><strong>Marketing and Advertising:</strong>...</li>
            <li><strong>Security and Fraud Prevention:</strong>...</li>
            <li><strong>Communicating with You:</strong>...</li>
          </ul>

          <h2>How We Disclose Personal Information</h2>
          <ul>
            <li>To vendors and service providers...</li>
            <li>With partners and affiliates...</li>
            <li>In legal situations or business transfers...</li>
          </ul>

          <h2>Third Party Websites and Links</h2>
          <p>We may link to other websites; their privacy policies apply.</p>

          <h2>Children's Data</h2>
          <p>Our services are not intended for children...</p>

          <h2>Security and Retention of Your Information</h2>
          <p>We take measures to protect your data but cannot guarantee absolute security.</p>

          <h2>Your Rights</h2>
          <ul>
            <li><strong>Right to Access / Know</strong></li>
            <li><strong>Right to Delete</strong></li>
            <li><strong>Right to Correct</strong></li>
            <li><strong>Right of Portability</strong></li>
            <li><strong>Restriction of Processing</strong></li>
            <li><strong>Withdrawal of Consent</strong></li>
            <li><strong>Appeal</strong></li>
            <li><strong>Managing Communication Preferences</strong></li>
          </ul>

          <h2>Complaints</h2>
          <p>If you're not satisfied with our handling of your data...</p>

          <h2>International Users</h2>
          <p>Your data may be stored or processed outside your country...</p>

          <h2>Contact</h2>
          <p>Have questions?</p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:info@infinitydesignz.com">info@infinitydesignz.com</a>
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            <a href="tel:9876543210">9876543210</a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
