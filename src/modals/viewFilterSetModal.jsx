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
            <div className="row mb-3">
              <div className="col-4 fw-semibold text-dark">Title:</div>
              <div className="col-8">{filterSet.title || 'N/A'}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 fw-semibold text-dark">Priority:</div>
              <div className="col-8">{filterSet.priority ?? 'N/A'}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 fw-semibold text-dark">Feature Type:</div>
              <div className="col-8">{filterSet.filterType?.name || 'N/A'}</div>
            </div>

            <div className="row mb-2">
              <div className="col-4 fw-semibold text-dark">Status:</div>
              <div className="col-8">
                <span className={filterSet.status ? 'text-success' : 'text-danger'}>
                  {filterSet.status ? 'Active' : 'Inactive'}
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

export default ViewFilterSetModal;
