import React from 'react';

const ViewFilterSetModal = ({ show, onClose, filterSet }) => {
  if (!show || !filterSet) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">View Filter Set</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Title:</label>
              <div>{filterSet.title || 'N/A'}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Priority:</label>
              <div>{filterSet.priority ?? 'N/A'}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Feature Type:</label>
              <div>{filterSet.filterType?.name || 'N/A'}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Status:</label>
              <div>{filterSet.status ? 'Active' : 'Inactive'}</div>
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

export default ViewFilterSetModal;
