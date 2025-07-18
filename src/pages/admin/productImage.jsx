import React, { useState } from 'react';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';

const AddProductImages = () => {
  const [singlePreviews, setSinglePreviews] = useState({});
  const [multiplePreviews, setMultiplePreviews] = useState({});

  const handleSingleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSinglePreviews((prev) => ({
          ...prev,
          [key]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMultipleImageChange = (e, key) => {
    const files = Array.from(e.target.files);
    const previews = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        previews.push(reader.result);
        if (previews.length === files.length) {
          setMultiplePreviews((prev) => ({
            ...prev,
            [key]: previews,
          }));
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
  };

  const handleRemoveMultiple = (key, index) => {
    setMultiplePreviews((prev) => {
      const updated = [...(prev[key] || [])];
      updated.splice(index, 1);
      return {
        ...prev,
        [key]: updated,
      };
    });
  };

  const handleReset = () => {
    setSinglePreviews({});
    setMultiplePreviews({});
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
                onReset={handleReset}
              >
                {[
                  { label: 'Main Product', id: 'product' },
                  { label: 'Variant 1', id: 'variant1' },
                  { label: 'Variant 2', id: 'variant2' },
                  { label: 'Variant 3', id: 'variant3' },
                ].map((section, index) => (
                  <div key={index}>
                    <h6 className="sub-heading">{section.label} Images</h6>
                    <div className="row">
                      <div className="col-lg-4 col-md-6 mb-3">
                        <label className="form-label">{section.label} Image</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={(e) => handleSingleImageChange(e, `${section.id}Single`)}
                        />
                        {singlePreviews[`${section.id}Single`] && (
                          <div className="image-preview" style={{ display: 'block' }}>
                            <img src={singlePreviews[`${section.id}Single`]} alt="Preview" />
                            <button
                              type="button"
                              className="remove-image"
                              onClick={() => handleRemoveSingle(`${section.id}Single`)}
                            >
                              ×
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="col-lg-8 col-md-6 mb-3">
                        <label className="form-label">
                          Upload Multiple {section.label} Images
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleMultipleImageChange(e, `${section.id}Multiple`)}
                        />
                        <div className="multiple-image-preview">
                          {(multiplePreviews[`${section.id}Multiple`] || []).map((img, i) => (
                            <div className="image-preview" style={{ display: 'block' }} key={i}>
                              <img src={img} alt="Preview" />
                              <button
                                type="button"
                                className="remove-image"
                                onClick={() => handleRemoveMultiple(`${section.id}Multiple`, i)}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

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

export default AddProductImages;