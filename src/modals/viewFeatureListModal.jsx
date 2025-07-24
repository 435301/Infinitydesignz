import React from 'react';

const ViewFeatureListModal = ({ show, onClose, featureList }) => {
  if (!show || !featureList) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">View Feature List</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row mb-2">
              <div className="col-sm-4 fw-semibold text-dark">Title:</div>
              <div className="col-sm-8">{featureList.label || 'N/A'}</div>
            </div>

            <div className="row mb-2">
              <div className="col-sm-4 fw-semibold text-dark">Priority:</div>
              <div className="col-sm-8">{featureList.priority ?? 'N/A'}</div>
            </div>

            <div className="row mb-2">
              <div className="col-sm-4 fw-semibold text-dark">Feature Type:</div>
              <div className="col-sm-8">{featureList.featureTypeName || 'N/A'}</div>
            </div>

            <div className="row mb-2">
              <div className="col-sm-4 fw-semibold text-dark">Feature Set:</div>
              <div className="col-sm-8">{featureList?.featureSet?.title || 'N/A'}</div>
            </div>

            <div className="row mb-2 align-items-center">
              <div className="col-sm-4 fw-semibold text-dark">Status:</div>
              <div className="col-sm-8">
                <span className={` ${featureList.status ? 'text-success' : 'text-danger'}`}>
                  {featureList.status ? 'Active' : 'Inactive'}
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

export default ViewFeatureListModal;
