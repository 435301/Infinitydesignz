import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/admin/style.css';
import '../css/admin/icofont.css';

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const isActiveMenu = (menu) => openMenu === menu;

  return (
    <aside className="main-sidebar hidden-print">
      <section className="sidebar" id="sidebar-scroll">
        <ul className="sidebar-menu">

          {/* Dashboard */}
          <li>
            <NavLink to="/dashboard" className="waves-effect waves-dark">
              <i className="icon-briefcase" /> <span>Dashboard</span>
            </NavLink>
          </li>

          {/* Master Data */}
          <li className={`treeview ${isActiveMenu('masterData') ? 'active' : ''}`}>
            <a onClick={() => toggleMenu('masterData')} className="waves-effect waves-dark" href="#!">
              <i className="icon-book-open" /><span> Master Data</span>
              <i className="icon-arrow-down" style={{ float: 'right' }} />
            </a>
            {isActiveMenu('masterData') && (
              <ul className="treeview-menu">

                {/* Brands */}
                <li>
                  <a onClick={() => toggleMenu('brands')} className="waves-effect waves-dark" href="#!">
                    <i className="ti-control-record" /> Brands
                    <i className="icon-arrow-down" style={{ float: 'right' }} />
                  </a>
                  {isActiveMenu('brands') && (
                    <ul className="treeview-menu">
                      <li><NavLink to="/create-brand"><i className="ti-control-record" /> Brands</NavLink></li>
                      <li><NavLink to="/brand-mapping"><i className="ti-control-record" /> Brand Manage</NavLink></li>
                    </ul>
                  )}
                </li>

                {/* Sizes */}
                <li>
                  <a onClick={() => toggleMenu('sizes')} className="waves-effect waves-dark" href="#!">
                    <i className="ti-control-record" /> Sizes
                    <i className="icon-arrow-down" style={{ float: 'right' }} />
                  </a>
                  {isActiveMenu('sizes') && (
                    <ul className="treeview-menu">
                      <li><NavLink to="/create-size"><i className="ti-control-record" /> Create Size</NavLink></li>
                      <li><NavLink to="/size-mapping"><i className="ti-control-record" /> Size Mapping</NavLink></li>
                    </ul>
                  )}
                </li>

                {/* Colors & Features */}
                <li><NavLink to="/colors"><i className="ti-control-record" /> Colors</NavLink></li>
                <li>
                  <a onClick={() => toggleMenu('features')} className="waves-effect waves-dark" href="#!">
                    <i className="ti-control-record" /> Product Features
                    <i className="icon-arrow-down" style={{ float: 'right' }} />
                  </a>
                  {isActiveMenu('features') && (
                    <ul className="treeview-menu">
                      <li><NavLink to="/feature-type"><i className="ti-control-record" /> Feature Type</NavLink></li>
                      <li><NavLink to="/feature-set"><i className="ti-control-record" /> Feature Set</NavLink></li>
                      <li><NavLink to="/feature-list"><i className="ti-control-record" /> Feature List</NavLink></li>
                      <li><NavLink to="/bulk-upload"><i className="ti-control-record" /> Bulk Upload</NavLink></li>
                    </ul>
                  )}
                </li>

                {/* Product Filters */}
                <li>
                  <a onClick={() => toggleMenu('filters')} className="waves-effect waves-dark" href="#!">
                    <i className="ti-control-record" /> Product Filter
                    <i className="icon-arrow-down" style={{ float: 'right' }} />
                  </a>
                  {isActiveMenu('filters') && (
                    <ul className="treeview-menu">
                      <li><NavLink to="/filter-type"><i className="ti-control-record" /> Filter Type</NavLink></li>
                      <li><NavLink to="/filter-set"><i className="ti-control-record" /> Filter Set</NavLink></li>
                      <li><NavLink to="/filter-list"><i className="ti-control-record" /> Filter List</NavLink></li>
                    </ul>
                  )}
                </li>

              </ul>
            )}
          </li>

          {/* Categories */}
          <li className={`treeview ${isActiveMenu('categories') ? 'active' : ''}`}>
            <a onClick={() => toggleMenu('categories')} className="waves-effect waves-dark" href="#!">
              <i className="icon-folder" /><span> Categories</span>
              <i className="icon-arrow-down" style={{ float: 'right' }} />
            </a>
            {isActiveMenu('categories') && (
              <ul className="treeview-menu">
                <li><NavLink to="/admin/manage-category"><i className="ti-control-record" /> Categories</NavLink></li>
                <li><NavLink to="/admin/manage-subcategory"><i className="ti-control-record" /> Sub-categories</NavLink></li>
                <li><NavLink to="/admin/list-subcategory"><i className="ti-control-record" /> List Sub Categories</NavLink></li>
              </ul>
            )}
          </li>

          {/* Products */}
          <li className={`treeview ${isActiveMenu('products') ? 'active' : ''}`}>
            <a onClick={() => toggleMenu('products')} className="waves-effect waves-dark" href="#!">
              <i className="icon-basket" /><span> Products</span>
              <i className="icon-arrow-down" style={{ float: 'right' }} />
            </a>
            {isActiveMenu('products') && (
              <ul className="treeview-menu">
                <li><NavLink to="/add-product"><i className="ti-control-record" /> Add Product</NavLink></li>
                <li><NavLink to="/manage-product"><i className="ti-control-record" /> Manage Product</NavLink></li>
              </ul>
            )}
          </li>

          {/* Users */}
          <li className={`treeview ${isActiveMenu('users') ? 'active' : ''}`}>
            <a onClick={() => toggleMenu('users')} className="waves-effect waves-dark" href="#!">
              <i className="icon-user" /><span> Users</span>
              <i className="icon-arrow-down" style={{ float: 'right' }} />
            </a>
            {isActiveMenu('users') && (
              <ul className="treeview-menu">
                <li><NavLink to="/manage-users"><i className="ti-control-record" /> Manage Users</NavLink></li>
              </ul>
            )}
          </li>

          {/* Orders */}
          <li className={`treeview ${isActiveMenu('orders') ? 'active' : ''}`}>
            <a onClick={() => toggleMenu('orders')} className="waves-effect waves-dark" href="#!">
              <i className="icon-basket-loaded" /><span> Orders</span>
              <i className="icon-arrow-down" style={{ float: 'right' }} />
            </a>
            {isActiveMenu('orders') && (
              <ul className="treeview-menu">
                <li><NavLink to="/orders"><i className="ti-control-record" /> View Orders</NavLink></li>
              </ul>
            )}
          </li>

          {/* Coupons */}
          <li className={`treeview ${isActiveMenu('coupons') ? 'active' : ''}`}>
            <a onClick={() => toggleMenu('coupons')} className="waves-effect waves-dark" href="#!">
              <i className="icon-briefcase" /><span> Coupons</span>
              <i className="icon-arrow-down" style={{ float: 'right' }} />
            </a>
            {isActiveMenu('coupons') && (
              <ul className="treeview-menu">
                <li><NavLink to="/add-coupon"><i className="ti-control-record" /> Add Coupon</NavLink></li>
                <li><NavLink to="/manage-coupons"><i className="ti-control-record" /> Manage Coupons</NavLink></li>
              </ul>
            )}
          </li>

          {/* Sliders */}
          <li>
            <NavLink to="/sliders" className="waves-effect waves-dark">
              <i className="icon-list" /><span> Sliders</span>
            </NavLink>
          </li>

          {/* Others */}
          <li className={`treeview ${isActiveMenu('others') ? 'active' : ''}`}>
            <a onClick={() => toggleMenu('others')} className="waves-effect waves-dark" href="#!">
              <i className="icon-briefcase" /><span> Others</span>
              <i className="icon-arrow-down" style={{ float: 'right' }} />
            </a>
            {isActiveMenu('others') && (
              <ul className="treeview-menu">
                <li><NavLink to="/contact"><i className="ti-control-record" /> Contact</NavLink></li>
                <li><NavLink to="/keywords"><i className="ti-control-record" /> Key Words</NavLink></li>
              </ul>
            )}
          </li>

          {/* Change Password */}
          <li>
            <NavLink to="/change-password" className="waves-effect waves-dark">
              <i className="icon-list" /><span> Change Password</span>
            </NavLink>
          </li>

        </ul>
      </section>
    </aside>
  );
};

export default Sidebar;
