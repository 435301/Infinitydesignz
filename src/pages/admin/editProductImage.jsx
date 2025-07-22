import React, { useState, useEffect } from 'react';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import axios from 'axios';
import BASE_URL from '../../config/config';

const EditProductImages = ({ product }) => {
  const createdProductId = product?.id;
  console.log('Created Product ID:', createdProductId);
  const variants = product?.variants || [];
  console.log('Product Variants:', variants);

  const [singlePreviews, setSinglePreviews] = useState({});
  const [multiplePreviews, setMultiplePreviews] = useState({});
  const [filesMap, setFilesMap] = useState({});

  const handleSingleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSinglePreviews((prev) => ({ ...prev, [key]: reader.result }));
        setFilesMap((prev) => ({ ...prev, [key]: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMultipleImageChange = (e, key) => {
    const files = Array.from(e.target.files);
    const previews = [];
    const selectedFiles = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        previews.push(reader.result);
        selectedFiles.push(file);
        if (previews.length === files.length) {
          setMultiplePreviews((prev) => ({ ...prev, [key]: previews }));
          setFilesMap((prev) => ({ ...prev, [key]: selectedFiles }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveSingle = (key) => {
    setSinglePreviews((prev) => {
      const newState = { ...prev };
      delete newState[key];
      return newState;
    });
    setFilesMap((prev) => {
      const newState = { ...prev };
      delete newState[key];
      return newState;
    });
  };

  const handleRemoveMultiple = (key, index) => {
    setMultiplePreviews((prev) => {
      const updated = [...(prev[key] || [])];
      updated.splice(index, 1);
      return { ...prev, [key]: updated };
    });

    setFilesMap((prev) => {
      const updated = [...(prev[key] || [])];
      updated.splice(index, 1);
      return { ...prev, [key]: updated };
    });
  };

  const handleReset = () => {
    setSinglePreviews({});
    setMultiplePreviews({});
    setFilesMap({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Main Product
    if (filesMap['productSingle']) {
      formData.append('main_image', filesMap['productSingle']);
    }
    if (filesMap['productMultiple']) {
      filesMap['productMultiple'].forEach((file) =>
        formData.append('multiple_images', file)
      );
    }

    // Variants
    variants.forEach((variant) => {
      const singleKey = `variant_${variant.id}_Single`;
      const multipleKey = `variant_${variant.id}_Multiple`;

      if (filesMap[singleKey]) {
        formData.append(`variant_${variant.id}_main`, filesMap[singleKey]);
      }
      if (filesMap[multipleKey]) {
        filesMap[multipleKey].forEach((file) =>
          formData.append(`variant_${variant.id}_multiple`, file)
        );
      }
    });

    try {
      const response = await axios.post(
        `${BASE_URL}/images/${createdProductId}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      alert('Images uploaded successfully!');
      console.log(response.data);
      handleReset();
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Image upload failed.');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header py-3">
              <h5 className="text-dark mb-0">Add Product Images</h5>
            </div>
            <div className="card-block">
              <form
                className="app-form mt-3"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                onReset={handleReset}
              >
                {/* Main Product Section */}
                <div>
                  <h6 className="sub-heading">Main Product Images</h6>
                  <div className="row">
                    {/* Single Main Image */}
                    <div className="col-lg-4 col-md-6 mb-3">
                      <label className="form-label">Main Product Image</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => handleSingleImageChange(e, 'productSingle')}
                      />
                      {singlePreviews['productSingle'] && (
                        <div className="image-preview" style={{ display: 'block' }}>
                          <img src={singlePreviews['productSingle']} alt="Preview" />
                          <button
                            type="button"
                            className="remove-image"
                            onClick={() => handleRemoveSingle('productSingle')}
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Multiple Main Images */}
                    <div className="col-lg-8 col-md-6 mb-3">
                      <label className="form-label">Upload Multiple Product Images</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleMultipleImageChange(e, 'productMultiple')}
                      />
                      <div className="multiple-image-preview">
                        {(multiplePreviews['productMultiple'] || []).map((img, i) => (
                          <div className="image-preview" key={i}>
                            <img src={img} alt="Preview" />
                            <button
                              type="button"
                              className="remove-image"
                              onClick={() => handleRemoveMultiple('productMultiple', i)}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dynamic Variant Sections */}
                {variants.map((variant) => {
                  const variantLabel = `${variant.size?.title || ''} / ${variant.color?.label || ''}`;
                  const singleKey = `variant_${variant.id}_Single`;
                  const multipleKey = `variant_${variant.id}_Multiple`;

                  return (
                    <div key={variant.id}>
                      <h6 className="sub-heading">Variant: {variantLabel}</h6>
                      <div className="row">
                        {/* Single Variant Image */}
                        <div className="col-lg-4 col-md-6 mb-3">
                          <label className="form-label">Main Image</label>
                          <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={(e) => handleSingleImageChange(e, singleKey)}
                          />
                          {singlePreviews[singleKey] && (
                            <div className="image-preview" style={{ display: 'block' }}>
                              <img src={singlePreviews[singleKey]} alt="Preview" />
                              <button
                                type="button"
                                className="remove-image"
                                onClick={() => handleRemoveSingle(singleKey)}
                              >
                                ×
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Multiple Variant Images */}
                        <div className="col-lg-8 col-md-6 mb-3">
                          <label className="form-label">Upload Multiple Images</label>
                          <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleMultipleImageChange(e, multipleKey)}
                          />
                          <div className="multiple-image-preview">
                            {(multiplePreviews[multipleKey] || []).map((img, i) => (
                              <div className="image-preview" key={i}>
                                <img src={img} alt="Preview" />
                                <button
                                  type="button"
                                  className="remove-image"
                                  onClick={() => handleRemoveMultiple(multipleKey, i)}
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Submit / Reset Buttons */}
                <div className="row">
                  <div className="col-lg-12 text-center my-4">
                    <button type="submit" className="btn btn-primary py-2 px-5 me-2">
                      Upload Images
                    </button>
                    <button type="reset" className="btn btn-secondary py-2 px-5">
                      Reset
                    </button>
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

export default EditProductImages;
