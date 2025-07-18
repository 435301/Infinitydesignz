import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import ProductFilters from './productFilter';
import ProductFeatures from './productFeatures';
import AddProductImages from './productImage';
import AddProduct from '../../components/addProduct';

const ProductPage = () => {
  const [activeTab, setActiveTab] = useState('add');

  return (
    <div className="container-fluid mt-4">
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
  );
};

export default ProductPage;
