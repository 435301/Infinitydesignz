import React, { useState } from 'react';
import axios from 'axios';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import BASE_URL from '../../config/config';
import { toast } from 'react-toastify';

const EditProductFeatures = ({ createdProductId, featureTypeId, featureType }) => {
  const [formValues, setFormValues] = useState({});

  const handleChange = (featureListId, value) => {
    setFormValues(prev => ({
      ...prev,
      [featureListId]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payloadArray = Object.entries(formValues).map(([featureListId, value]) => ({
      productId: createdProductId,
      featureListId: parseInt(featureListId),
      value
    }));

    console.log('Submitting payload:', payloadArray);

    try {
      for (let payload of payloadArray) {
        await axios.post(`${BASE_URL}/product-features`, payload);
      }
      toast.success('Features submitted successfully!');
    } catch (error) {
      console.error('Submission failed:', error);
      toast.error('Failed to submit features.');
    }
  };

  const renderInput = (label, featureListId) => (
    <div className="col-lg-6 mb-3" key={featureListId}>
      <label htmlFor={`feature-${featureListId}`} className="form-label">{label}</label>
      <input
        type="text"
        id={`feature-${featureListId}`}
        name={`feature-${featureListId}`}
        className="form-control"
        placeholder={`Enter ${label}`}
        value={formValues[featureListId] || ''}
        onChange={(e) => handleChange(featureListId, e.target.value)}
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
                  {(featureType?.featureSets || []).map((set) => (
                    <div className="col-lg-6 mb-4" key={set.id}>
                      <h6 className="sub-heading mb-3">{set.title}</h6>
                      <div className="row">
                        {(set.featureLists || []).map((feature) =>
                          renderInput(feature.label, feature.id)
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="col-lg-12 text-center my-4">
                  <button type="submit" className="btn btn-primary py-2 px-5 me-2">Update Features</button>
                  <button type="reset" className="btn btn-secondary py-2 px-5">Reset</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductFeatures;
