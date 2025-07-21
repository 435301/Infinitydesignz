import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import ProductFilters from './productFilter';
import ProductFeatures from './productFeatures';
import AddProductImages from './productImage';
import AddProduct from '../../components/addProduct';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions/productAction';

const ProductPage = ({ createdProductId, selectedFeatureType }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('add');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [createdProductIdState, setCreatedProductId] = useState(null);
  const [createdProductInfo, setCreatedProductInfo] = useState(null);
  const { products = [] } = useSelector((state) => state.products);


  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch]);

  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const selectedProduct = products.find(p => p.id === createdProductInfo?.id);
 console.log('Selected Product:', selectedProduct);

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
                    {/* <button type="submit" className="btn btn-primary py-1">Submit</button> */}
                  </div>

                  <div className="card-block">
                    <Tabs
                      id="product-tabs"
                      activeKey={activeTab}
                      onSelect={(k) => setActiveTab(k)}
                      className="mb-3"
                    >
                      <Tab eventKey="add" title="Add Product">
                        <AddProduct onProductCreated={(productInfo) => {
                          setCreatedProductId(productInfo.id);
                          setCreatedProductInfo(productInfo);
                        }} />
                      </Tab>
                      <Tab eventKey="images" title="Product Images" disabled={!createdProductInfo}>
                        {createdProductInfo && (
                          <AddProductImages
                            createdProductId={createdProductInfo.id}
                            product={selectedProduct}
                          />
                        )}
                      </Tab>
                      <Tab eventKey="filters" title="Product Filters" disabled={!createdProductInfo}>
                        {createdProductInfo && (
                          <ProductFilters
                            createdProductId={createdProductInfo.id}
                            filterTypeId={createdProductInfo.filterTypeId}
                            filterType={createdProductInfo.filterType}
                          />
                        )}
                      </Tab>
                      <Tab eventKey="features" title="Product Features" disabled={!createdProductInfo}>

                        {createdProductInfo && (
                          <ProductFeatures
                            createdProductId={createdProductInfo.id}
                            featureTypeId={createdProductInfo.featureTypeId}
                            featureType={createdProductInfo.featureType}
                          />
                        )}
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