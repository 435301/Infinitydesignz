import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../config/config';

const ProductFilters = ({ createdProductId }) => {
  console.log('createdProductId', createdProductId);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [filterSets, setFilterSets] = useState([]);
  const [filterValues, setFilterValues] = useState({});

  const handleToggleSidebar = (collapsed) => setIsSidebarCollapsed(collapsed);

  useEffect(() => {
    if (createdProductId) {
      axios.get(`${BASE_URL}/products/${createdProductId}`)
        .then((res) => {
          const product = res.data;
          const filterType = product.category?.filterType;
          const sets = filterType?.filterSets || [];
          const initialValues = {};
          sets.forEach((set) => {
            set.filterLists.forEach((filter) => {
              initialValues[filter.label] = '';
            });
          });

          setFilterSets(sets);
          setFilterValues(initialValues);
        })
        .catch((err) => {
          console.error('Failed to fetch product filter data:', err);
        });
    }
  }, [createdProductId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Filters:', filterValues);
    // axios.post('/api/filters/update', { createdProductId, filters: filterValues });
  };

  const handleReset = () => {
    const resetValues = {};
    Object.keys(filterValues).forEach((key) => (resetValues[key] = ''));
    setFilterValues(resetValues);
  };

  const renderDropdown = (label) => (
    <div className="row mb-3 justify-content-center" key={label}>
      <div className="col-lg-3 col-md-3">
        <label htmlFor={label} className="form-label">{label}</label>
      </div>
      <div className="col-lg-3">
        <select
          id={label}
          name={label}
          className="form-control"
          value={filterValues[label] || ''}
          onChange={handleChange}
          required
        >
          <option value="">Choose {label}</option>
          {/* Replace this with real options via API or constants */}
          {['Option 1', 'Option 2', 'Option 3'].map((opt) => (
            <option key={opt} value={opt.toLowerCase()}>{opt}</option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-block py-3">
              <form className="app-form mt-3" onSubmit={handleSubmit} onReset={handleReset}>
                {filterSets.map((set) => (
                  <div key={set.id}>
                    <h6 className="sub-heading mb-3">{set.title}</h6>
                    {set.filterLists.map((filter) => renderDropdown(filter.label))}
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
  );
};

export default ProductFilters;
