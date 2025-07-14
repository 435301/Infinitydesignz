import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { BsSearch, BsArrowClockwise, BsEye, BsPencilSquare, BsTrash } from 'react-icons/bs';
import AddFeatureSetModal from '../../components/addFeatureSetModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeatureSets } from '../../redux/actions/featureSetAction';
import PaginationComponent from '../../includes/pagination';
import EditFeatureSetModal from '../../components/editFeatureSetModal';

const ManageFeatureSet = () => {
  const dispatch = useDispatch();
  const { featureSets = [] } = useSelector((state) => state.featureSets);
  console.log('featuresets', featureSets)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const[selectedFeatureSet,setSelectedFeatureSet] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  useEffect(() => {
    dispatch(fetchFeatureSets());
  }, [dispatch]);

  const filteredFeatureSets = featureSets?.filter((featureSet) => {
    const title = featureSet.title.toLowerCase();
    const matchesSearch = title.includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredFeatureSets.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredFeatureSets.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(featureSets.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const groupedFeatureSets = currentRows.reduce((acc, item) => {
    const groupName = item.featureType?.name || 'Unknown';
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(item);
    return acc;
  }, {});


  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin onToggleSidebar={handleToggleSidebar} />
        <aside className="main-sidebar hidden-print">
          <Sidebar isCollapsed={isSidebarCollapsed} />
        </aside>

        <div
          className="content-wrapper mb-4"
          style={{
            marginLeft: isSidebarCollapsed ? '60px' : '295px',
            padding: '20px',
            flex: 1,
            transition: 'margin-left 0.3s ease',
          }}
        >
          <div className="main-header" style={{ marginTop: '0px' }}>
            <h5>Feature Set</h5>
          </div>

          <div className="container-fluid manage">
            {/* Search and Filters */}
            <div className="card mb-3">
              <div className="card-block manage-btn">
                <div className="row g-3 align-items-center">
                  <div className="col-md-3">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Search By Title" value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                  </div>

                  <div className="col-md-2 d-flex gap-2">

                    <button className="btn btn-success" onClick={() => setSearchTerm('')}>
                      <BsArrowClockwise style={{ fontSize: '18px' }} />
                    </button>
                  </div>
                  <div className="col-md-4 text-end">
                    <button className="btn btn-primary" onClick={() => setShowModal(true)} type="button">
                      + Create Feature Set
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Set List */}
            <div className="card">
              <div className="card-block">
                <div className="row mb-3">
                  {/* <div className="col-lg-6 d-flex align-items-center">
                    <h3 className="me-2">{featureSets?.featureType?.name}</h3>
                    <span className="badge">{featureSets.length}</span>
                  </div> */}
                  {Object.entries(groupedFeatureSets).map(([featureTypeName, items]) => (
                    <div key={featureTypeName} className="mb-4">
                      <div className="col-lg-6 d-flex align-items-center">
                        <h5 className="mb-2">{featureTypeName}</h5>
                      </div>
                      <div className="feature-row">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="feature-item d-flex justify-content-between align-items-center mb-2 p-2 border rounded"
                          >
                            <div className="d-flex align-items-center">
                              <input
                                type="checkbox"
                                checked={selectedRows.includes(item.id)}
                                onChange={() => handleRowCheckboxChange(item.id)}
                                className="me-2"
                              />
                              <strong>{item.title}</strong>
                             
                            </div>

                            <div className="d-flex gap-2">
                              <button className="btn btn-sm " title="View" >
                                <BsEye />
                              </button>
                              <button className="btn btn-sm btn-outline-primary" title="Edit"  onClick={() => {
                                setSelectedFeatureSet(item);
                                setEditModalVisible(true);
                              }}>
                                <BsPencilSquare />
                              </button>
                              <button className="btn btn-sm btn-outline-danger" title="Delete" >
                                <BsTrash />
                              </button>
                              
                            </div>
                             <span className="badge ms-2">{item.priority}</span>
                          </div>

                        ))}
                      </div>
                    </div>
                  ))}

                </div>



                <button className="btn btn-primary mt-3">Set Priority</button>
              </div>
            </div>
            <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            {showModal && <AddFeatureSetModal show={showModal} onClose={() => setShowModal(false)} />}
            {editModalVisible && <EditFeatureSetModal show={editModalVisible} onClose={() => setEditModalVisible(false)} featureSet={selectedFeatureSet} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageFeatureSet;
