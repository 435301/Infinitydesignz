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
import { useParams,useLocation } from 'react-router-dom';

const EditProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('edit');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // existing selectors
  const { productById: createdProductInfo } = useSelector((state) => state.products); 
  console.log('createdProductInfo',createdProductInfo)
  const { products = [], product: currentProduct } = useSelector((state) => state.products);
  console.log('products',products)
  const [updatedVariantIds, setUpdatedVariantIds] = useState([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  // When switching to Images tab, refetch to ensure we have the latest variants
  useEffect(() => {
    if (activeTab === 'images' && id) {
      dispatch(fetchProductById(id));
    }
  }, [activeTab, id, dispatch]);

  const selectedProduct = products.find(p => p.id === parseInt(id));
  console.log('selectedProduct:', selectedProduct);

  // Use the freshest product available for both tabs
  const productForTabs = createdProductInfo || currentProduct || selectedProduct;

  // Force Images tab to remount when variant count changes or after edits
  const imagesTabKey = `img-${id}-${(productForTabs?.variants?.length || 0)}-${updatedVariantIds?.length || 0}-${activeTab}`;

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
                          product={productForTabs}
                          setUpdatedVariantIds={setUpdatedVariantIds}
                        />
                      </Tab>

                      <Tab eventKey="images" title="Product Images">
                        <EditProductImages
                          key={imagesTabKey}
                          product={productForTabs}
                          updatedVariantIds={updatedVariantIds}
                        />
                      </Tab>

                      <Tab eventKey="filters" title="Product Filters">
                        <EditProductFilters/>
                      </Tab>

                      <Tab eventKey="features" title="Product Features">
                        <EditProductFeatures/>
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
