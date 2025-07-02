import React, { useEffect, useState } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import Footer from '../../includes/footerAdmin';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  useEffect(() => {
    import('../../css/admin/style.css');
  }, []);

  const dashboardCards = [
    {
      title: 'TOTAL PRODUCTS',
      value: '12,480',
      items: ['In Stock', 'New', 'Out of Stock'],
      bg: '#fff3e0',
      color: '#ffa726',
      icon: 'bi-box-seam',
    },
    {
      title: 'TOTAL CATEGORIES',
      value: '38',
      items: ['Chairs', 'Sofas', 'Tables'],
      bg: '#daf4f0',
      color: '#26a69a',
      icon: 'bi-tags',
    },
    {
      title: 'ORDERS',
      value: '8,214',
      items: ['Pending', 'Delivered', 'Returned'],
      bg: '#daf4f0',
      color: '#26a69a',
      icon: 'bi-cart-check-fill',
    },
    {
      title: 'VENDORS',
      value: '156',
      items: ['Active', 'Inactive', 'New'],
      bg: '#eceff1',
      color: '#78909c',
      icon: 'bi-people-fill',
    },
  ];

  const products = [
    ['Ergonomic Office Chair', 'Chairs', '1,250', '₹62,500'],
    ['Luxury Sofa Set', 'Sofas', '870', '₹174,000'],
    ['Wooden Dining Table', 'Tables', '640', '₹96,000'],
    ['Modern Bed Frame', 'Beds', '510', '₹102,000'],
    ['Study Desk', 'Desks', '445', '₹44,500'],
  ];

  const vendors = [
    ['Urban Living', 'Mumbai', 320, 'Active'],
    ['Comfort House', 'Bangalore', 275, 'Active'],
    ['Classic Interiors', 'Delhi', 198, 'Pending'],
    ['WoodCraft', 'Pune', 162, 'Inactive'],
    ['Furniture Mart', 'Hyderabad', 154, 'Active'],
  ];

  return (
    <div
      className="wrapper sidebar-mini fixed"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <HeaderAdmin onToggleSidebar={handleToggleSidebar} />
      <aside
        className="main-sidebar hidden-print"
        style={{
          width: isSidebarCollapsed ? '60px' : '250px',
          transition: 'width 0.3s ease',
        }}
      >
        <Sidebar isCollapsed={isSidebarCollapsed} />
      </aside>

      <div
        className="content-wrapper mb-4"
        style={{
          marginLeft: isSidebarCollapsed ? '60px' : '250px',
          padding: '20px',
          flex: 1,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <div className="container-fluid">
          {/* Dashboard Header */}
          <div className="row" >
            <div className="main-header">
              <h4 className='ps-3'>Dashboard</h4>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="row dashboard-header" style={{ padding: '0 10px' }}>
            {dashboardCards.map((card, index) => (
              <div className="col-lg-3 col-md-6" key={index} style={{ padding: '10px' }}>
                <div
                  className="card dashboard-product"
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    padding: '15px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#878a99', fontWeight: '500' }}>{card.title}</span>
                    <div style={{ backgroundColor: card.bg, padding: '5px' }}>
                      <i className={`bi ${card.icon}`} style={{ color: card.color, fontSize: '20px' }}></i>
                    </div>
                  </div>
                  <h2 style={{ fontSize: '24px', margin: '10px 0' }}>{card.value}</h2>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {card.items.map((item, i) => (
                      <a
                        href="#"
                        key={i}
                        style={{
                          fontSize: '14px',
                          color: ['#a65926', '#118b21', '#e70c0c'][i],
                          textDecoration: 'none',
                        }}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Top 5 Products & Vendors */}
          <div className="row">
            {/* Products Table */}
            <div className="col-sm-6">
              <div className="card">
                <div className="card-block" style={{ padding: '15px' }}>
                  <h5 className="mb-3">Top 5 Selling Products</h5>
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>S No</th>
                          <th>Product Name</th>
                          <th>Category</th>
                          <th>Sold</th>
                          <th>Revenue</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((row, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{row[0]}</td>
                            <td>{row[1]}</td>
                            <td>{row[2]}</td>
                            <td>{row[3]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Vendors Table */}
            <div className="col-sm-6">
              <div className="card">
                <div className="card-block" style={{ padding: '15px' }}>
                  <h5 className="mb-3">Top 5 Vendors</h5>
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>S No</th>
                          <th>Vendor Name</th>
                          <th>Location</th>
                          <th>Products</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vendors.map((vendor, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{vendor[0]}</td>
                            <td>{vendor[1]}</td>
                            <td>{vendor[2]}</td>
                            <td>
                              <span
                                className={`badge bg-${
                                  vendor[3] === 'Active' ? 'success' : vendor[3] === 'Inactive' ? 'danger' : 'warning'
                                }`}
                              >
                                {vendor[3]}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;