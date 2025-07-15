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
            <div className="mb-3">
              <label className="form-label">Title:</label>
              <div>{featureSet.title || 'N/A'}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Priority:</label>
              <div>{featureSet.priority ?? 'N/A'}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Feature Type:</label>
              <div>{featureSet.featureType?.name || 'N/A'}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Status:</label>
              <div>{featureSet.status ? 'Active' : 'Inactive'}</div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary px-4" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFeatureSetModal;
