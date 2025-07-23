import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, fetchProducts } from '../../redux/actions/productAction';
import EditProductFeatures from './editProductFeatures';
import EditProductFilters from './editProductFilters';
import EditProductImages from './editProductImage';
import EditProduct from '../../components/editProduct';
import { useParams } from 'react-router-dom';

const EditProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('edit');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const { productById: createdProductInfo } = useSelector((state) => state.products); 
  const { products = [] } = useSelector((state) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  const selectedProduct = products.find(p => p.id === createdProductInfo?.id) || createdProductInfo;

  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin onToggleSidebar={setIsSidebarCollapsed} />
        <aside className="main-sidebar hidden-print">
          <Sidebar isCollapsed={isSidebarCollapsed} />
        </aside>

        <div className="content-wrapper py-3" style={{ marginLeft: isSidebarCollapsed ? '60px' : '272px', padding: '20px', flex: 1, transition: 'margin-left 0.3s ease' }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header py-3 d-flex justify-content-between align-items-center">
                    <h5 className="text-dark mb-0">Edit Product</h5>
                  </div>

                  <div className="card-block">
                    <Tabs
                      id="product-tabs"
                      activeKey={activeTab}
                      onSelect={(k) => setActiveTab(k)}
                      className="mb-3"
                    >
                      <Tab eventKey="edit" title="Edit Product">
                        <EditProduct
                          product={createdProductInfo}
                          
                        />
                      </Tab>
                      <Tab eventKey="images" title="Product Images" >
                          <EditProductImages
                            product={selectedProduct}
                          />
                        {/* )} */}
                      </Tab>
                      <Tab eventKey="filters" title="Product Filters" >
                        {/* {createdProductInfo && ( */}
                          <EditProductFilters
                            // createdProductId={createdProductInfo.id}
                            // filterTypeId={createdProductInfo.filterTypeId}
                            // filterType={createdProductInfo.filterType}
                          />
                        {/* )} */}
                      </Tab>
                      <Tab eventKey="features" title="Product Features">
                       
                          <EditProductFeatures
                            
                          />
                        
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

export default EditProductPage;