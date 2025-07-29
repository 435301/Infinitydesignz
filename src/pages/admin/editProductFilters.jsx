import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../config/config';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../redux/actions/productAction';

import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import { toast } from 'react-toastify';

const EditProductFilters = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product } = useSelector((state) => state.products || {});
  const filterSets = product?.category?.filterType?.filterSets || [];

  const [formValues, setFormValues] = useState({});

  // Fetch product details
  useEffect(() => {
    if (id) dispatch(fetchProductById(id));
  }, [id, dispatch]);

  // Fetch saved filters
  useEffect(() => {
    const fetchSavedFilters = async () => {
      if (!id || filterSets.length === 0) return;

      try {
        const response = await axios.get(`${BASE_URL}/product-filters/${id}`);
        const savedFilters = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];

        const filled = {};
        savedFilters.forEach((item) => {
          filled[item.filterListId] = item.label;
        });

        setFormValues(filled);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };

    fetchSavedFilters();
  }, [id, filterSets]);

  const handleChange = (e, filterListId) => {
    const { value } = e.target;
    setFormValues((prev) => ({ ...prev, [filterListId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const payload = Object.entries(formValues).map(([filterListId, label]) => ({
    //   filterListId: Number(filterListId),
    //   label,
     
    // }));

     const payload = Object.entries(formValues)
      .filter(([_, value]) => value) 
      .map(([filterSetId, filterListId]) => ({
         productId: Number(id),
        filterListId: parseInt(filterListId),
      }));

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${BASE_URL}/product-filters`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      toast.success('Product filters saved successfully!');
    } catch (error) {
      console.error('Error saving product filters:', error);
      toast.error('Failed to save product filters.');
    }
  };

  const handleSetChange = (e, setId) => {
    const { value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [setId]: value,
    }));
  };

  return (
    <div className="container mt-4">
      <div className="card">
       <div className="card-body">
  {filterSets.length === 0 ? (
    <div className="text-center text-muted py-5">
      <p className="mb-0">No filters found for this Product</p>
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      {filterSets.map((set) => (
        <div key={set.id} className="mb-4">
          <h6 className="mb-3 text-dark">{set.title}</h6>
          <div className="mb-3">
            <select
              className="form-control"
              value={formValues[set.id] || ''}
              onChange={(e) => handleSetChange(e, set.id)}
            >
              <option value="">-- Select --</option>
              {(set.filterLists || []).map((filter) => (
                <option key={filter.id} value={filter.id}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}

      <div className="text-center mt-4">
        <button type="submit" className="btn btn-primary px-4">
          Save Filters
        </button>
      </div>
    </form>
  )}
</div>

      </div>
    </div>
  );
};

export default EditProductFilters;