import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import ProductFilters from './productFilter';
import ProductFeatures from './productFeatures';
import AddProductImages from './productImage';
import AddProduct from '../../components/addProduct';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';

const ProductPage = () => {
  const [activeTab, setActiveTab] = useState('add');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin onToggleSidebar={handleToggleSidebar} />
        <aside className="main-sidebar hidden-print">
          <Sidebar isCollapsed={isSidebarCollapsed} />
        </aside>
        <div
          className="content-wrapper py-3"
          style={{
            marginLeft: isSidebarCollapsed ? '60px' : '272px',
            padding: '20px',
            flex: 1,
            transition: 'margin-left 0.3s ease',
          }}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header py-3 d-flex justify-content-between align-items-center">
                    <h5 className="text-dark mb-0">Products</h5>
                    <button type="submit" className="btn btn-primary py-1">Submit</button>
                  </div>

                  <div className="card-block">
                    <Tabs
                      id="product-tabs"
                      activeKey={activeTab}
                      onSelect={(k) => setActiveTab(k)}
                      className="mb-3"
                    >
                      <Tab eventKey="add" title="Add Product">
                        <AddProduct />
                      </Tab>
                      <Tab eventKey="images" title="Product Images">
                        <AddProductImages />
                      </Tab>
                      <Tab eventKey="filters" title="Product Filters">
                        <ProductFilters />
                      </Tab>
                      <Tab eventKey="features" title="Product Features">
                        <ProductFeatures />
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;