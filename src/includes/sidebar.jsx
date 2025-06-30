import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './assets/css/style.css'; // adjust path as needed

const Sidebar = () => {
  const location = useLocation();
  const currentPage = location.pathname.split('/').pop();

  // Utility to check if current page matches one from a group
  const isActiveGroup = (pages) => pages.includes(currentPage);

  return (
    <aside className="main-sidebar hidden-print">
      <section className="sidebar" id="sidebar-scroll">
        <ul className="sidebar-menu">

          {/* Dashboard */}
          <li className={`treeview ${currentPage === 'index' ? 'active' : ''}`}>
            <NavLink className="waves-effect waves-dark" to="/index">
              <i className="icon-briefcase"></i> <span>Dashboard</span>
            </NavLink>
          </li>

          {/* Master Data */}
          <li className={`treeview ${
            isActiveGroup([
              'create-brand', 'brand-mapping',
              'create-size', 'size-mapping',
              'manage-colors',
              'feature-type', 'feature-set', 'feature-list',
              'filter-type', 'filter-set', 'filter-list'
            ]) ? 'active' : ''
          }`}>
            <a className="waves-effect waves-dark" href="#!">
              <i className="icon-book-open"></i><span> Master Data</span><i className="icon-arrow-down"></i>
            </a>
            <ul className="treeview-menu">
              {/* Brands */}
              <li className="treeview">
                <a className="waves-effect waves-dark" href="#!"><i className="ti-control-record"></i> Brands <i className="icon-arrow-down"></i></a>
                <ul className="treeview-menu">
                  <li className={currentPage === 'create-brand' ? 'active' : ''}>
                    <NavLink to="/create-brand" className="waves-effect waves-dark">
                      <i className="ti-control-record"></i> Brands
                    </NavLink>
                  </li>
                  <li className={currentPage === 'brand-mapping' ? 'active' : ''}>
                    <NavLink to="/brand-mapping" className="waves-effect waves-dark">
                      <i className="ti-control-record"></i> Brand Manage
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Sizes */}
              <li className="treeview">
                <a className="waves-effect waves-dark" href="#!"><i className="ti-control-record"></i> Sizes <i className="icon-arrow-down"></i></a>
                <ul className="treeview-menu">
                  <li className={currentPage === 'create-size' ? 'active' : ''}>
                    <NavLink to="/create-size" className="waves-effect waves-dark">
                      <i className="ti-control-record"></i> Create Size
                    </NavLink>
                  </li>
                  <li className={currentPage === 'size-mapping' ? 'active' : ''}>
                    <NavLink to="/size-mapping" className="waves-effect waves-dark">
                      <i className="ti-control-record"></i> Size Mapping
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Colors */}
              <li className={currentPage === 'colors' ? 'active' : ''}>
                <NavLink to="/colors" className="waves-effect waves-dark">
                  <i className="ti-control-record"></i> Colors
                </NavLink>
              </li>

              {/* Product Features */}
              <li className="treeview">
                <a className="waves-effect waves-dark" href="#!">
                  <i className="ti-control-record"></i> Product Features <i className="icon-arrow-down"></i>
                </a>
                <ul className="treeview-menu">
                  <li className={currentPage === 'feature-type' ? 'active' : ''}>
                    <NavLink to="/feature-type" className="waves-effect waves-dark">
                      <i className="ti-control-record"></i> Feature Type
                    </NavLink>
                  </li>
                  <li className={currentPage === 'feature-set' ? 'active' : ''}>
                    <NavLink to="/feature-set" className="waves-effect waves-dark">
                      <i className="ti-control-record"></i> Feature Set
                    </NavLink>
                  </li>
                  <li className={currentPage === 'feature-list' ? 'active' : ''}>
                    <NavLink to="/feature-list" className="waves-effect waves-dark">
                      <i className="ti-control-record"></i> Feature List
                    </NavLink>
                  </li>
                  <li className={currentPage === 'bulk-upload' ? 'active' : ''}>
                    <NavLink to="/bulk-upload" className="waves-effect waves-dark">
                      <i className="ti-control-record"></i> Bulk Upload
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Product Filters */}
              <li className="treeview">
                <a className="waves-effect waves-dark" href="#!"><i className="ti-control-record"></i> Product Filter <i className="icon-arrow-down"></i></a>
                <ul className="treeview-menu">
                  <li className={currentPage === 'filter-type' ? 'active' : ''}>
                    <NavLink to="/filter-type" className="waves-effect waves-dark"><i className="ti-control-record"></i> Filter Type</NavLink>
                  </li>
                  <li className={currentPage === 'filter-set' ? 'active' : ''}>
                    <NavLink to="/filter-set" className="waves-effect waves-dark"><i className="ti-control-record"></i> Filter Set</NavLink>
                  </li>
                  <li className={currentPage === 'filter-list' ? 'active' : ''}>
                    <NavLink to="/filter-list" className="waves-effect waves-dark"><i className="ti-control-record"></i> Filter List</NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          {/* Add more menus below in same pattern... */}

          {/* Change Password */}
          <li className={`treeview ${currentPage === 'change-password' ? 'active' : ''}`}>
            <NavLink to="/change-password" className="waves-effect waves-dark">
              <i className="icon-list"></i> <span>Change Password</span>
            </NavLink>
          </li>
        </ul>
      </section>
    </aside>
  );
};

export default Sidebar;
