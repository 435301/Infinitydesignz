import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../config/config';

const ProductFeatures = ({ createdProductId }) => {
  console.log('createdProductId', createdProductId);
  const [featureSets, setFeatureSets] = useState([]);
  const [formData, setFormData] = useState({});
  

  useEffect(() => {
    if (createdProductId) {
      axios.get(`${BASE_URL}/products/${createdProductId}`)
        .then((res) => {
          const product = res.data;
          console.log('res',res.data.features)
          const sets = product.category?.featureType?.featureSets || [];
          setFeatureSets(sets);
          const initialForm = {};
          sets.forEach((set) => {
            set.featureLists.forEach((feature) => {
              initialForm[feature.label] = ''; 
            });
          });

          setFormData(initialForm);
        })
        .catch((err) => {
          console.error('Error fetching product features:', err);
        });
    }
  }, [createdProductId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!createdProductId) {
    console.error('No product ID available to associate features with.');
    return;
  }
  const payload = [];

  featureSets.forEach(set => {
    set.featureLists.forEach(feature => {
      const value = formData[feature.label] || '';
      payload.push({
        productId: createdProductId,
        featureListId: feature.id, 
        value: value
      });
    });
  });

  console.log('Submitting payload:', payload);

  try {
    await axios.post(`${BASE_URL}/products`, payload);
    alert('Features updated successfully!');
  } catch (error) {
    console.error('Error submitting features:', error);
    alert('Failed to update features.');
  }
};


  const renderInput = (label) => (
    <div className="col-lg-6 mb-3" key={label}>
      <label htmlFor={label} className="form-label">{label}</label>
      <input
        type="text"
        id={label}
        name={label}
        className="form-control"
        value={formData[label] || ''}
        onChange={handleChange}
        placeholder={`Enter ${label}`}
      />
    </div>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header py-3">
              <h5 className="text-dark mb-0">Product Features</h5>
            </div>
            <div className="card-block">
              <form onSubmit={handleSubmit} className="app-form">
                <div className="row">
                  {featureSets.map((set) => (
                    <div className="col-lg-6" key={set.id}>
                      <h6 className="sub-heading mb-3">{set.title}</h6>
                      <div className="row">
                        {set.featureLists.map((feature) => renderInput(feature.label))}
                      </div>
                    </div>
                  ))}
                  <div className="col-lg-12 text-center my-4">
                    <button type="submit" className="btn btn-primary py-2 px-5 me-2">Update Features</button>
                    <button type="reset" className="btn btn-secondary py-2 px-5">Reset</button>
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

export default ProductFeatures;
