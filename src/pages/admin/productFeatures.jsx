import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import axios from 'axios';
import BASE_URL from '../../config/config';

const ProductFeatures = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [featureValues, setFeatureValues] = useState({});

  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = [];

    products.forEach((product) => {
      product.featureSets.forEach((set) => {
        set.featureLists.forEach((feature) => {
          const inputKey = `${product.id}-${feature.id}`;
          const value = featureValues[inputKey];
          if (value) {
            dataToSend.push({
              productId: product.id,
              featureListId: feature.id,
              value,
            });
          }
        });
      });
    });

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${BASE_URL}/products`, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      alert('Features updated successfully!');
    } catch (err) {
      console.error('Error submitting features:', err);
      alert('Failed to update features.');
    }
  };

  useEffect(() => {
    const fetchProductsAndFeatures = async () => {
      try {
        const token = localStorage.getItem('token');
        const productRes = await axios.get(`${BASE_URL}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const productList = productRes.data;

        const enrichedProducts = await Promise.all(
          productList.map(async (product) => {
            const categoryId = product?.category?.id;
            if (!categoryId) return { ...product, featureSets: [] };

            try {
              const categoryRes = await axios.get(`${BASE_URL}/categories/${categoryId}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              const featureSets = categoryRes?.data?.featureType?.featureSets || [];
              return { ...product, featureSets };
            } catch (err) {
              console.error(`Failed to fetch feature sets for category ${categoryId}`, err);
              return { ...product, featureSets: [] };
            }
          })
        );

        setProducts(enrichedProducts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load product features.');
        setLoading(false);
      }
    };

    fetchProductsAndFeatures();
  }, []);

  const renderInput = (label, productId, featureId) => {
    const inputKey = `${productId}-${featureId}`;
    return (
      <div className="col-lg-6 mb-3" key={inputKey}>
        <label htmlFor={inputKey} className="form-label">{label}</label>
        <input
          type="text"
          id={inputKey}
          name={inputKey}
          className="form-control"
          value={featureValues[inputKey] || ''}
          placeholder={`Enter ${label}`}
          onChange={(e) =>
            setFeatureValues((prev) => ({
              ...prev,
              [inputKey]: e.target.value,
            }))
          }
        />
      </div>
    );
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
            transition: 'margin-left 0.3s ease',
          }}
        >
          <div className="section-nav mb-3 d-flex gap-3">
            <a href="/admin/add-product">Add Product</a>
            <a href="/admin/product-image">Product Images</a>
            <a href="/admin/product-filter">Product Filters</a>
            <a href="#" className="active">Product Features</a>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header py-3">
                    <h5 className="text-dark mb-0">Product Features</h5>
                  </div>

                  <div className="card-block">
                    {loading ? (
                      <p>Loading...</p>
                    ) : error ? (
                      <p className="text-danger">{error}</p>
                    ) : products.length === 0 ? (
                      <p>No product data found.</p>
                    ) : (
                      <form onSubmit={handleSubmit} className="app-form">
                        <div className="row">
                          {products.map((product) => (
                            <div key={product.id} className="col-lg-12 mb-4">
                              <h6 className="text-primary mb-3">
                                {product.title} (SKU: {product.sku})
                              </h6>

                              {product.featureSets.length === 0 ? (
                                <p className="text-muted">No feature sets found for this product.</p>
                              ) : (
                                product.featureSets.map((set) => (
                                  <div key={set.id} className="mb-4 border p-3 rounded shadow-sm">
                                    <h6 className="sub-heading mb-3">{set.title}</h6>
                                    <div className="row">
                                      {set.featureLists?.map((feature) =>
                                        renderInput(feature.label, product.id, feature.id)
                                      )}
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          ))}
                          <div className="col-lg-12 text-center my-4">
                            <button type="submit" className="btn btn-primary py-2 px-5 me-2">
                              Update Features
                            </button>
                            <button type="reset" className="btn btn-secondary py-2 px-5">
                              Reset
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
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

export default ProductFeatures;
