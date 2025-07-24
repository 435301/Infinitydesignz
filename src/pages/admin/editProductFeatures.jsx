import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BASE_URL from '../../config/config';
import { fetchProductById } from '../../redux/actions/productAction';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import { toast } from 'react-toastify';

const EditProductFeatures = () => {
  const { id } = useParams(); // Product ID from URL
  const dispatch = useDispatch();

  const { product } = useSelector((state) => state.products || {});
  const featureSets = product?.category?.featureType?.featureSets || [];

  const [formValues, setFormValues] = useState({});

  // Fetch product details on load
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  // Fetch saved features from API
  useEffect(() => {
    const fetchSavedFeatures = async () => {
      if (!id || featureSets.length === 0) return;

      try {
        const response = await axios.get(`${BASE_URL}/product-features/${id}`);
        const savedFeatures = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];

        const filled = {};
        savedFeatures.forEach((item) => {
          filled[item.featureListId] = item.value;
        });

        setFormValues(filled);
      } catch (error) {
        console.error('Error fetching product features:', error);
      }
    };

    fetchSavedFeatures();
  }, [id, featureSets]);

  const handleChange = (e, featureListId) => {
    const { value } = e.target;
    setFormValues((prev) => ({ ...prev, [featureListId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


     const payload = Object.entries(formValues)
    .filter(([, value]) => value?.trim() !== '')
    .map(([featureListId, value]) => ({
      productId: Number(id),
      featureListId: parseInt(featureListId),
      value: value.trim()
    }));

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${BASE_URL}/product-features`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      toast.success('Product features saved successfully!');
    } catch (error) {
      console.error('Error saving product features:', error);
      toast.error('Failed to save product features.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {featureSets.map((set) => (
              <div key={set.id}>
                <h6 className="mb-3 text-dark">{set.title}</h6>
                {(set.featureLists || []).map((feature) => (
                <div
  className="mb-3"
  key={feature.id}
  style={{
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  }}
>
  <label
    className="form-label"
    style={{
      minWidth: '120px',
      marginRight: '10px',
      marginBottom: 0, // Prevent label from taking extra height
    }}
  >
    {feature.label}
  </label>
  <input
    type="text"
    className="form-control"
    style={{ flex: 1 }}
    value={formValues[feature.id] || ''}
    onChange={(e) => handleChange(e, feature.id)}
  />
</div>

                ))}
              </div>
            ))}

            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary px-4">
                Save Features
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductFeatures;
