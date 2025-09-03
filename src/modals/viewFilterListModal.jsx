import React from 'react';

const ViewFilterListModal = ({ show, onClose, filterList}) => {
  if (!show || !filterList) return null;

  return (
    <div className="modal fade show d-block new-1" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">View Filter List</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Title:</label>
              <div>{filterList.label || 'N/A'}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Priority:</label>
              <div>{filterList.priority ?? 'N/A'}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Feature Type:</label>
              <div>{filterList.filterTypeName || 'N/A'}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Feature Set:</label>
              <div>{filterList?.filterSet?.title || 'N/A'}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Status:</label>
              <div>{filterList.status ? 'Active' : 'Inactive'}</div>
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

export default ViewFilterListModal;
