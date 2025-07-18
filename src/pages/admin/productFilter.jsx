import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import axios from 'axios';
import BASE_URL from '../../config/config';

const ProductFilters = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [products, setProducts] = useState([]);
  const [filterValues, setFilterValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleToggleSidebar = (collapsed) => setIsSidebarCollapsed(collapsed);

  const handleChange = (productId, filterSetId, value) => {
    const key = `${productId}-${filterSetId}`;
    setFilterValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = [];

    products.forEach((product) => {
      product.filterSets.forEach((set) => {
        const key = `${product.id}-${set.id}`;
        const value = filterValues[key];
        if (value) {
          dataToSend.push({
            productId: product.id,
            filterSetId: set.id,
            value,
          });
        }
      });
    });

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${BASE_URL}/product-filters`, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      alert('Filters updated successfully!');
    } catch (err) {
      console.error('Error submitting filters:', err);
      alert('Failed to update filters.');
    }
  };

  const handleReset = () => {
    setFilterValues({});
  };

  useEffect(() => {
    const fetchProductsAndFilters = async () => {
      try {
        const token = localStorage.getItem('token');
        const productRes = await axios.get(`${BASE_URL}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const productList = productRes.data;

        const enrichedProducts = await Promise.all(
          productList.map(async (product) => {
            const categoryId = product?.category?.id;
            let filterSets = [];

            if (categoryId) {
              try {
                const categoryRes = await axios.get(`${BASE_URL}/categories/${categoryId}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                filterSets = categoryRes?.data?.filterType?.filterSets || [];
              } catch (err) {
                console.error(`Failed to fetch filters for category ${categoryId}`, err);
              }
            }

            // Fetch saved filter values for this product
            let savedFilters = [];
            try {
              const savedFilterRes = await axios.get(`${BASE_URL}/product-filters/${product.id}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              savedFilters = savedFilterRes.data || [];
            } catch (err) {
              console.warn(`No saved filters for product ${product.id}`, err);
            }

            // Pre-fill filterValues
            const allValues = {};
            savedFilters.forEach(({ filterListId, value }) => {
              const key = `${product.id}-${filterListId}`;
              allValues[key] = value;
            });

            // Batch update state only once
            setFilterValues((prev) => ({
              ...prev,
              ...allValues,
            }));


            return { ...product, filterSets };
          })
        );

        setProducts(enrichedProducts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load product filters.');
        setLoading(false);
      }
    };

    fetchProductsAndFilters();
  }, []);

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


          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-block py-3">
                    {loading ? (
                      <p>Loading...</p>
                    ) : error ? (
                      <p className="text-danger">{error}</p>
                    ) : (
                      <form className="app-form mt-3" onSubmit={handleSubmit} onReset={handleReset}>
                        {products.map((product) => (
                          <div key={product.id} className="mb-4 border-bottom pb-4">
                          
                             { product.filterSets.map((set) => {
                                const inputKey = `${product.id}-${set.id}`;
                                const options = set.filterLists?.map((fl) => fl.label) || [];

                                return (
                                  <div key={set.id} className="row mb-3 justify-content-center">
                                    <div className="col-lg-3 col-md-3">
                                      <label htmlFor={inputKey} className="form-label">
                                        {set.title}
                                      </label>
                                    </div>
                                    <div className="col-lg-3">
                                      <select
                                        id={inputKey}
                                        name={inputKey}
                                        className="form-control"
                                        value={filterValues[inputKey] || ''}
                                        onChange={(e) =>
                                          handleChange(product.id, set.id, e.target.value)
                                        }
                                        required
                                      >
                                        <option value="">Choose {set.title}</option>
                                        {options.map((opt, idx) => (
                                          <option key={idx} value={opt}>
                                            {opt}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                );
                              })
                          
                    }
                          </div>
                        ))}

                        <div className="row">
                          <div className="col-lg-12 text-center">
                            <button type="submit" className="btn btn-primary py-2 px-5 me-2">
                              Update Filters
                            </button>
                            <button type="reset" className="btn btn-reset py-2 px-5">
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
      </div >
    </div >
  );
};

export default ProductFilters;
