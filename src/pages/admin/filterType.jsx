import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import { fetchProducts } from '../../redux/actions/productAction';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';

const ProductFilters = () => {
  const dispatch = useDispatch();
  const { products = [] } = useSelector((state) => state.products || {});
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState({
    fabric: '',
    design: '',
    occasion: '',
    type: '',
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleToggleSidebar = (collapsed) => setIsSidebarCollapsed(collapsed);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected Filters:', filters);
  };

  const handleReset = () => {
    setFilters({
      fabric: '',
      design: '',
      occasion: '',
      type: '',
    });
  };

  const getUniqueOptions = (field) => {
    const uniqueValues = [...new Set(products.map((product) => product[field]).filter(Boolean))];
    return uniqueValues;
  };

  const filterConfig = [
    { id: 'fabric', label: 'Fabric', options: getUniqueOptions('fabric') },
    { id: 'design', label: 'Design', options: getUniqueOptions('design') },
    { id: 'occasion', label: 'Occasion', options: getUniqueOptions('occasion') },
    { id: 'type', label: 'Type', options: getUniqueOptions('type') },
  ];

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
          <div className="section-nav">
            <a href='/admin/add-product'>Add Product</a>
            <a href='/admin/add-image'>Product Images</a>
            <a href="" className='active'>Product Filters</a>
            <a href="/admin/product-features">Product Features</a>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-block py-3">
                    <form className="app-form mt-3" onSubmit={handleSubmit} onReset={handleReset}>
                      {filterConfig.map((filter, idx) => (
                        <div className="row mb-3 justify-content-center" key={idx}>
                          <div className="col-lg-3 col-md-3">
                            <label htmlFor={filter.id} className="form-label">{filter.label}</label>
                          </div>
                          <div className="col-lg-3">
                            <select
                              id={filter.id}
                              name={filter.id}
                              className="form-control"
                              value={filters[filter.id]}
                              onChange={handleChange}
                            >
                              <option value="">Choose {filter.label}</option>
                              {filter.options.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))}

                      <div className="row">
                        <div className="col-lg-12 text-center">
                          <button type="submit" className="btn btn-primary py-2 px-5 me-2">Update Filters</button>
                          <button type="reset" className="btn btn-reset py-2 px-5">Reset</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
    </div >
  );
};

export default ProductFilters;
