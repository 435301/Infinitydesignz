import React from 'react';

const ViewFeatureSetModal = ({ show, onClose, featureSet }) => {
  if (!show || !featureSet) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">View Feature Set</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label fw-bold">Title:</label>
              <div className="col-sm-8">
                <p className="form-control-plaintext mb-0">{featureSet.title || 'N/A'}</p>
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label fw-bold">Priority:</label>
              <div className="col-sm-8">
                <p className="form-control-plaintext mb-0">{featureSet.priority ?? 'N/A'}</p>
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label fw-bold">Feature Type:</label>
              <div className="col-sm-8">
                <p className="form-control-plaintext mb-0">{featureSet.featureType?.name || 'N/A'}</p>
              </div>
            </div>

            <div className="mb-2 row align-items-center">
              <label className="col-sm-4 col-form-label fw-bold">Status:</label>
              <div className="col-sm-8">
                <span className={` ${featureSet.status ? 'text-success' : 'text-danger'}`}>
                  {featureSet.status ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-danger px-4" onClick={onClose}>Close</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewFeatureSetModal;
