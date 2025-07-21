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

  const handleChange = (e, filterListId) => {
    setFilters({ ...filters, [filterListId]: e.target.value });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    const payloadArray = Object.entries(filters).map(([filterListId]) => ({
      productId: createdProductId,
      filterListId: parseInt(filterListId),
    }));

    console.log('Submitting payload:', payloadArray);

    try {
      for (let payload of payloadArray) {
        await axios.post(`${BASE_URL}/product-filters`, payload);
      }
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
