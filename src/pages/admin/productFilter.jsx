import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';

const ProductFilters = ({ createdProductId, filterTypeId, filterType }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState({});

  const handleToggleSidebar = (collapsed) => setIsSidebarCollapsed(collapsed);

  // Initialize filter state based on incoming filterType
  useEffect(() => {
    if (filterType?.filterSets) {
      const initialState = {};
      filterType.filterSets.forEach(set => {
        initialState[set.id] = ''; // using filterSet.id as key
      });
      setFilters(initialState);
    }
  }, [filterType]);

  const handleChange = (e, filterSetId) => {
    setFilters({ ...filters, [filterSetId]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Filter Data Submitted:', {
      productId: createdProductId,
      filterTypeId: filterTypeId,
      filters,
    });

    // Example API call using axios (uncomment if needed)
    /*
    axios.post(`${BASE_URL}/products/filters`, {
      productId: createdProductId,
      filterTypeId,
      filters
    })
    .then(response => console.log('Saved:', response.data))
    .catch(error => console.error('Error:', error));
    */
  };

  const handleReset = () => {
    if (filterType?.filterSets) {
      const resetState = {};
      filterType.filterSets.forEach(set => {
        resetState[set.id] = '';
      });
      setFilters(resetState);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-block py-3">
              <form className="app-form mt-3" onSubmit={handleSubmit} onReset={handleReset}>
                {filterType?.filterSets?.map((filterSet, idx) => (
                  <div className="row mb-3 justify-content-center" key={idx}>
                    <div className="col-lg-3 col-md-3">
                      <label htmlFor={`filter-${filterSet.id}`} className="form-label">{filterSet.title}</label>
                    </div>
                    <div className="col-lg-3">
                      <select
                        id={`filter-${filterSet.id}`}
                        name={`filter-${filterSet.id}`}
                        className="form-control"
                        value={filters[filterSet.id] || ''}
                        onChange={(e) => handleChange(e, filterSet.id)}
                        required
                      >
                        <option value="">Choose {filterSet.title}</option>
                        {filterSet.filterLists?.map((list) => (
                          <option key={list.id} value={list.label}>{list.label}</option>
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
  );
};

export default ProductFilters;
