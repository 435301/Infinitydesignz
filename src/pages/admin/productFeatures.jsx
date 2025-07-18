import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import axios from 'axios';
import BASE_URL from '../../config/config';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';


const ProductFeatures = () => {
  const { productId } = useParams();
  console.log('Product ID:', productId);
  const [product, setProduct] = useState(null);
  const [featureData, setFeatureData] = useState({});

  // Fetch product by ID
  useEffect(() => {
    if (productId) {
      axios
        .get(`${BASE_URL}/products/${productId}`)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => {
          console.error('Error fetching product:', err);
        });
    }
  }, [productId]);

  // Render dynamic inputs
  const renderDynamicFeatureInputs = () => {
    if (!product?.category?.featureType?.featureSets?.length) return null;

    return product.category.featureType.featureSets.map((set) => (
      <div key={set.id} className="mb-4">
        <h6 className="sub-heading mb-3">{set.title}</h6>
        <div className="row">
          {set.featureLists.map((feature) => (
            <div className="col-lg-6 mb-3" key={feature.id}>
              <label htmlFor={`feature-${feature.id}`} className="form-label">
                {feature.label}
              </label>
              <input
                type="text"
                id={`feature-${feature.id}`}
                name={`feature-${feature.id}`}
                className="form-control"
                value={featureData[feature.id] || ''}
                onChange={(e) =>
                  setFeatureData({
                    ...featureData,
                    [feature.id]: e.target.value,
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>
    ));
  };

  // Submit feature data
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      productId: parseInt(productId),
      features: Object.entries(featureData).map(([featureListId, value]) => ({
        featureListId: parseInt(featureListId),
        value,
      })),
    };

    axios
      .post(`${BASE_URL}/product-features`, payload)
      .then(() => {
        alert('Features saved successfully');
      })
      .catch((err) => {
        console.error('Error saving features:', err);
        alert('Failed to save features');
      });
  };

  return (
    <>
      <HeaderAdmin />
      <Sidebar />
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="page-header">
            <h3 className="page-title">Product Features</h3>
          </div>

          <div className="card">
            <div className="card-body">
              {product ? (
                <form onSubmit={handleSubmit} className="app-form">
                  {renderDynamicFeatureInputs()}

                  <div className="text-center mt-4">
                    <button type="submit" className="btn btn-primary py-2 px-5 me-2">
                      Save Features
                    </button>
                    <button type="reset" className="btn btn-secondary py-2 px-5">
                      Reset
                    </button>
                  </div>
                </form>
              ) : (
                <p>Loading product details...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFeatures;