import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import axios from 'axios';
import BASE_URL from '../../config/config';
import { toast } from 'react-toastify';

const ProductFilters = ({ createdProductId, filterTypeId, filterType }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState({});

  const handleToggleSidebar = (collapsed) => setIsSidebarCollapsed(collapsed);

  useEffect(() => {
    if (filterType?.filterSets) {
      const initialState = {};
      filterType.filterSets.forEach(set => {
        initialState[set.id] = '';
      });
      setFilters(initialState);
    }
  }, [filterType]);

  const handleChange = (e, filterSetId) => {
    setFilters({ ...filters, [filterSetId]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payloadArray = Object.entries(filters)
      .filter(([_, value]) => value)
      .map(([filterSetId, filterListId]) => ({
        productId: createdProductId,
        filterListId: parseInt(filterListId),
      }));

    console.log('Submitting payload:', payloadArray);

    try {
      await axios.post(`${BASE_URL}/product-filters`, payloadArray);
      toast.success('Filters submitted successfully!');
    } catch (error) {
      console.error('Submission failed:', error);
      toast.error('Failed to submit filters.');
    }
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
            <div class="card-header py-3"><h5 class="text-dark mb-0">Product Filters</h5></div>
            <div className="card-block py-3">
              {filterType?.length === 0 ? (
                <div className="text-center text-muted py-5">
                  <p className="mb-0">No filters found for this Product</p>
                </div>
              ) : (
                <form className="app-form mt-3" onSubmit={handleSubmit} onReset={handleReset}>

                  {filterType?.filterSets?.map((filterSet, idx) => (
                    <div className="row mb-2 justify-content-center" key={idx}>
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
                            <option key={list.id} value={list.id}>{list.label}</option>
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
