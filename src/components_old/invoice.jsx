import React from "react";
import "../../src/css/invoice.css";
import '../../src/css/style.css';
import '../../src/css/bootstrap-icons.css';
import Logo from '../../src/img/logo.svg';


const InvoicePage = () => {
  return (
    <div className="invoice-container">
      <div className="header">
        <img src={Logo} className="logo" alt="Pepperfry Logo" />
        <div style={{ textAlign: "right" }}>
          <strong style={{ fontSize: "16px" }}>RETAIL INVOICE</strong>
          <br />
          <strong>TAURUS INC</strong>
          <br />
          Bheemakkanahalli Village Solibele Hobli,
          <br />
          Hoskote Taluka, Bengaluru Urban, Karnataka, 562114
          <br />
          <strong>GSTIN:</strong> 29AGQPS1020A1ZN
          <br />
          <strong>Invoice No:</strong> TAKA20210006235
          <br />
          <strong>Order No:</strong> 306920770-FN1593708-P-WH5046
          <br />
          <strong>Invoice Date:</strong> 27th Jan, 2021
        </div>
      </div>

      <div className="address-section">
        <div className="address-box">
          <strong>Billing Address</strong>
          <br />
          Mahtab Alam
          <br />
          Road 13, Near Dar-al-Arqam Public School, Haroon Nagar
          <br />
          Sector 2, Patna, Bihar, 801505
          <br />
          <strong>Contact:</strong> 8507062705
        </div>
        <div className="address-box">
          <strong>Shipping Address</strong>
          <br />
          Mahtab Alam
          <br />
          Road 13, Near Dar-al-Arqam Public School, Haroon Nagar Sector 2,
          <br />
          Patna, Bihar, 801505
          <br />
          <strong>Contact:</strong> 8507062705
        </div>
      </div>

      <table className="table">
        <thead>
          <tr className="bold">
            <th>ITEM ID</th>
            <th>ITEM DESCRIPTION</th>
            <th>QTY</th>
            <th>UNIT PRICE</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>FN1593708-P-WH5046</td>
            <td>
              Nakamura Study Table with Cabinet in Wenge Finish - Mintwud By
              Pepperfry
              <br />
              <strong>HSN:</strong> 94036000 &nbsp;&nbsp;&nbsp;{" "}
              <strong>State Code:</strong> BR
            </td>
            <td>1</td>
            <td className="right">₹ 4,660.17</td>
            <td className="right">₹ 4,660.17</td>
          </tr>
        </tbody>
      </table>

      <table className="summary-table">
        <tbody>
          <tr>
            <td className="right">Discount (-)</td>
            <td className="right">₹ 847.46</td>
          </tr>
          <tr>
            <td className="right">Taxable Value</td>
            <td className="right">₹ 3,812.71</td>
          </tr>
          <tr>
            <td className="right">IGST at 18%</td>
            <td className="right">₹ 686.29</td>
          </tr>
          <tr className="bold">
            <td className="right">Total (Inclusive of All Taxes)</td>
            <td className="right">₹ 4,499.00</td>
          </tr>
        </tbody>
      </table>

      <div className="payment-section">
        <table className="payment-table">
          <thead>
            <tr className="bold">
              <th colSpan="2">Payment Receipt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Amount Paid (Inclusive of Taxes)</td>
              <td className="right">₹ 4,499.00</td>
            </tr>
            <tr>
              <td>Amount Due On Delivery</td>
              <td className="right">₹ 0.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="disclaimer">
        <strong>Disclaimer:</strong>
        <br />
        1. This invoice is generated and issued on behalf of and under the
        instructions of the Merchant mentioned in this invoice.
        <br />
        2. Pepperfry only facilitates the sale; all warranties and liabilities
        rest with the Merchant.
        <br />
        3. Goods are intended for end-user consumption, not resale.
        <br />
        4. Reverse charges do not apply.
      </div>
    </div>
  );
};

export default InvoicePage;
