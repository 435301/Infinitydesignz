import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { BsSearch, BsArrowClockwise, BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../../redux/actions/brandAction';
import PaginationComponent from '../../includes/pagination';
import { toast } from 'react-toastify';
import BASE_URL from '../../config/config';


const ManageBrands = () => {
  const dispatch = useDispatch();
  const { brands = [] } = useSelector((state) => state.brands || {})
  console.log('brands', brands)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
   const [selectedRows, setSelectedRows] = useState([]);
      const [selectedIds, setSelectedIds] = useState([]);
      const[selectAll, setSelectAll] = useState(false)


  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch])

  const filteredBrands = brands.filter((brand) => {

    const name = brand.name.toLowerCase();
    const matchesSearch = name.includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter
      ? (statusFilter === 'active' ? brand.status === true : brand.status === false)
      : true;

    return matchesSearch && matchesStatus;
  });


  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredBrands.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredBrands.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

    const handleBulkStatusUpdate = async (newStatus) => {
    if (selectedRows.length === 0) {
      toast.warning("Please select at least one sub-subcategory.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${BASE_URL}/common/bulk-update-status`, {
        entity:"brands",
        ids: selectedRows,
        status: newStatus,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(`Status updated to ${newStatus ? 'Active' : 'Inactive'}`);
      dispatch(fetchBrands());
      setSelectedRows([]);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Bulk status update failed');
    }
  };

  const handleRowCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

    const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      const ids = currentRows.map((brand) => brand.id);
      setSelectedIds(ids);
    }
    setSelectAll(!selectAll);
  };

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
            <h4>Brands</h4>
          </div>

          <div className="container-fluid manage">
            {/* Filter and Add Brand Section */}
            <div className="card mb-3">
              <div className="card-block manage-btn">
                <div className="row g-3 align-items-center">
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search By Brand"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <select
                      className="form-control"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="">- Select Status -</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="col-md-2 d-flex gap-2">

                    <button className="btn btn-success" onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('');
                    }}>
                      <BsArrowClockwise style={{ fontSize: '18px' }} />
                    </button>
                  </div>
                  <div className="col-md-4 text-end">
                    <a href="/addBrand" className="btn btn-primary" type="button">
                      + Add New
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Brands Table Section */}
            <div className="card">
              <div className="card-block">
                <div className="row mb-3">
                  <div className="col-lg-6">
                    <h5>Brands</h5>
                  </div>
                  <div className="col-md-6 text-end">
                    <button className="btn btn-success me-1"  disabled={selectedRows.length === 0}
                      onClick={() => handleBulkStatusUpdate(true)}>Active</button>
                    <button className="btn btn-danger"  disabled={selectedRows.length === 0}
                      onClick={() => handleBulkStatusUpdate(false)}>In Active</button>

                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-striped table-hover table-lg align-middle mb-0">
                    <thead>
                      <tr>
                        <th>
                         <input
                      type="checkbox"
                      checked={
                        selectedRows.length === brands.length &&
                        brands.length > 0
                      }
                      onChange={handleSelectAll}
                    />
                        </th>
                        <th>S.No</th>
                        <th>Brands</th>
                        <th>Logo URL</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRows.map((brand, index) => (
                        <tr key={brand.id}>
                          <td>
                           <input
                          type="checkbox"
                          checked={selectedRows.includes(brand.id)}
                          onChange={() => handleRowCheckboxChange(brand.id)}
                        />
                          </td>
                          <td>{index + 1}</td>
                          <td>{brand.name}</td>
                          <td>{brand.logo_url}</td>
                          <td>
                            <span
                              className={`badge ${brand.status ?
                                'text-light-primary'
                                : 'text-light-danger'
                                }`}
                            >
                              {brand.status ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>
                            <a
                              href={`/create-brand-edit/${brand.id}`}
                              className="btn btn-light-success icon-btn b-r-4 me-1"
                              title="Edit"
                            >
                              <BsPencilSquare style={{ color: 'green', fontSize: '18px' }} />
                            </a>
                            <button
                              type="button"
                              className="btn btn-light-danger icon-btn b-r-4 delete-btn"
                              title="Delete"
                            >
                              <BsTrash style={{ color: 'red', fontSize: '18px' }} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
            <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBrands;
