import React, { useEffect, useState } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import Footer from '../../includes/footerAdmin';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useDispatch, useSelector} from 'react-redux';
import { fetchDashboardSummary } from '../../redux/actions/dashboardAction';

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const dispatch = useDispatch();

  const { loading, data, error } = useSelector((state) => state.dashboard);

  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  useEffect(() => {
    dispatch(fetchDashboardSummary(30));
  }, [dispatch]);

  const dashboardCards = data
    ? [
        {
          title: "TOTAL PRODUCTS",
          value: data.cards.products.total,
          items: [
            `In Stock: ${data.cards.products.inStock}`,
            `New: ${data.cards.products.new}`,
            `Out of Stock: ${data.cards.products.outOfStock}`,
          ],
          bg: "#fff3e0",
          color: "#ffa726",
          icon: "bi-box-seam",
        },
        {
          title: "TOTAL CATEGORIES",
          value: data.cards.categories.total,
          items: data.cards.categories.top.map((cat) => cat.title),
          bg: "#daf4f0",
          color: "#26a69a",
          icon: "bi-tags",
        },
        {
          title: "ORDERS",
          value: data.cards.orders.total,
          items: [
            `Pending: ${data.cards.orders.pending}`,
            `Delivered: ${data.cards.orders.delivered}`,
            `Cancelled: ${data.cards.orders.cancelled}`,
          ],
          bg: "#daf4f0",
          color: "#26a69a",
          icon: "bi-cart-check-fill",
        },
        {
          title: "VENDORS",
          value: "—", 
          items: ["Active", "Inactive", "New"],
          bg: "#eceff1",
          color: "#78909c",
          icon: "bi-people-fill",
        },
      ]
    : [];

  const products = data?.tables?.topSellingProducts || [];

  return (
    <div className="wrapper sidebar-mini fixed" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <HeaderAdmin onToggleSidebar={handleToggleSidebar} />
      <aside
        className="main-sidebar hidden-print"
        style={{
          width: isSidebarCollapsed ? "60px" : "250px",
          transition: "width 0.3s ease",
        }}
      >
        <Sidebar isCollapsed={isSidebarCollapsed} onClose={() => setIsSidebarCollapsed(true)} />
      </aside>

      <div
        className="content-wrapper mb-4"
        style={{
          marginLeft: isSidebarCollapsed ? "60px" : "272px",
          padding: "20px",
          flex: 1,
          transition: "margin-left 0.3s ease",
        }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="main-header">
              <h4 className="ps-3">Dashboard</h4>
            </div>
          </div>

          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}

          {!loading && data && (
            <>
              {/* Dashboard Cards */}
              <div className="row dashboard-header">
                {dashboardCards.map((card, index) => (
                  <div className="col-lg-3 col-md-6 dashboard-col" key={index}>
                    <div className="card dashboard-product">
                      <div className="dashboard-card-header">
                        <span className="dashboard-title">{card.title}</span>
                        <div className="dashboard-icon-wrapper" style={{ backgroundColor: card.bg }}>
                          <i className={`bi ${card.icon}`} style={{ color: card.color }}></i>
                        </div>
                      </div>
                      <h2 className="dashboard-value">{card.value}</h2>
                      <div className="dashboard-links">
                        {card.items.map((item, i) => (
                          <a href="#!" key={i} className={`dashboard-link link-${i}`}>
                            {item}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Top 5 Products Table */}
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <div className="card">
                    <div className="card-block custom-card-block">
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
                            {products.map((p, i) => (
                              <tr key={p.id}>
                                <td>{i + 1}</td>
                                <td>{p.title}</td>
                                <td>{p.category}</td>
                                <td>{p.sold}</td>
                                <td>{p.revenue}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="card">
                    <div className="card-block custom-card-block">
                      <h5 className="mb-3">Top 5 Vendors</h5>
                      <p>Vendors not provided yet</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default Dashboard;
