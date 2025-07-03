import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  BsBriefcase,
  BsBook,
  BsChevronDown,
  BsFolder,
  BsBasket,
  BsPerson,
  BsCartCheck,
  BsListUl,
  BsDot,
} from 'react-icons/bs';

const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [openMenus, setOpenMenus] = useState({});

  const menuPaths = {
    masterData: [
      '/create-brand',
      '/brand-mapping',
      '/admin/create-size',
      '/admin/size-mapping',
      '/admin/colors',
      '/admin/feature-type',
      '/admin/feature-set',
      '/admin/feature-list',
      '/admin/filter-type',
      '/admin/filter-set',
      '/admin/filter-list',
      '/admin/bulk-upload',
      '/admin/add-product',

    ],
    sizes: ['/admin/create-size', '/admin/size-mapping'],
    productFeatures: ['/admin/feature-type', '/admin/feature-set', '/admin/feature-list', '/admin/bulk-upload'],
    productFilters: ['/admin/filter-type', '/admin/filter-set', '/admin/filter-list'],
    categories: ['/admin/manage-category', '/admin/manage-subcategory', '/admin/list-subcategory'],
    products: ['/admin/add-product', '/admin/manage-product'],
    users: ['/manage-users'],
    orders: ['/orders'],
    coupons: ['/add-coupon', '/manage-coupons'],
    others: ['/contact', '/keywords'],
  };

  useEffect(() => {
    const newOpenMenus = {};
    Object.keys(menuPaths).forEach((menu) => {
      if (menuPaths[menu].some((path) => currentPath.startsWith(path))) {
        newOpenMenus[menu] = true;
      }
    });
    setOpenMenus((prev) => ({ ...prev, ...newOpenMenus }));
  }, [currentPath]);

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const isActiveMenu = (menu) => openMenus[menu];

  const renderNavLink = (to, label) => (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? 'active' : '')}
      style={navLinkStyle(isCollapsed)}
    >
      <BsDot style={iconDotStyle} />
      <span>{label}</span>
    </NavLink>
  );

  return (
    <aside style={asideStyle(isCollapsed)}>
      <section>
        <ul className="sidebar-menu" style={{ listStyle: 'none', padding: 0, margin: 0 }}>

          {/* Dashboard */}
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={navLinkStyle(isCollapsed)}
            >
              <BsBriefcase style={mainIconStyle(isCollapsed)} />
              <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Dashboard</span>
            </NavLink>
          </li>

          {/* Master Data */}
          <li>
            <div onClick={() => toggleMenu('masterData')} style={navLinkStyle(isCollapsed, true)}>
              <BsBook style={mainIconStyle(isCollapsed)} />
              <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Master Data</span>
              {!isCollapsed && <BsChevronDown style={{ marginLeft: 'auto' }} />}
            </div>
            {isActiveMenu('masterData') && !isCollapsed && (
              <ul className="subdropdown" style={{ paddingLeft: '20px', listStyle: 'none' }}>
                {renderNavLink('/create-brand', 'Create Brand')}
                {renderNavLink('/brand-mapping', 'Brand Mapping')}
                <li>
                  <div onClick={() => toggleMenu('sizes')} style={subLinkStyle(true)}>
                    <BsDot style={iconDotStyle} />
                    <span>Sizes</span>
                    <BsChevronDown style={{ marginLeft: 'auto' }} />
                  </div>
                  {isActiveMenu('sizes') && (
                    <ul style={{ paddingLeft: '20px', listStyle: 'none' }}>
                      {renderNavLink('/admin/create-size', 'Create Size')}
                      {renderNavLink('/admin/size-mapping', 'Size Mapping')}
                    </ul>
                  )}
                </li>
                {renderNavLink('/admin/colors', 'Colors')}

                {/* Product Features */}
                <li>
                  <div onClick={() => toggleMenu('productFeatures')} style={subLinkStyle(true)}>
                    <BsDot style={iconDotStyle} />
                    <span>Product Features</span>
                    <BsChevronDown style={{ marginLeft: 'auto' }} />
                  </div>
                  {isActiveMenu('productFeatures') && (
                    <ul style={{ paddingLeft: '20px', listStyle: 'none' }}>
                      {renderNavLink('/admin/feature-type', 'Feature Type')}
                      {renderNavLink('/admin/feature-set', 'Feature Set')}
                      {renderNavLink('/admin/feature-list', 'Feature List')}
                      {renderNavLink('/admin/bulk-upload', 'Bulk Upload')}
                    </ul>
                  )}
                </li>

                {/* ✅ Product Filters */}
                <li>
                  <div onClick={() => toggleMenu('productFilters')} style={subLinkStyle(true)}>
                    <BsDot style={iconDotStyle} />
                    <span>Product Filters</span>
                    <BsChevronDown style={{ marginLeft: 'auto' }} />
                  </div>
                  {isActiveMenu('productFilters') && (
                    <ul style={{ paddingLeft: '20px', listStyle: 'none' }}>
                      {renderNavLink('/admin/filter-type', 'Filter Type')}
                      {renderNavLink('/admin/filter-set', 'Filter Set')}
                      {renderNavLink('/admin/filter-list', 'Filter List')}
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>

          {/* Categories */}
          <li>
            <div onClick={() => toggleMenu('categories')} style={navLinkStyle(isCollapsed, true)}>
              <BsFolder style={mainIconStyle(isCollapsed)} />
              <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Categories</span>
              {!isCollapsed && <BsChevronDown style={{ marginLeft: 'auto' }} />}
            </div>
            {isActiveMenu('categories') && !isCollapsed && (
              <ul style={{ paddingLeft: '20px', listStyle: 'none' }}>
                {renderNavLink('/admin/manage-category', ' Categories')}
                {renderNavLink('/admin/manage-subcategory', 'Sub-categories')}
                {renderNavLink('/admin/list-subcategory', 'List Sub Categories')}
              </ul>
            )}
          </li>

          {/* Products */}
          <li>
            <div onClick={() => toggleMenu('products')} style={navLinkStyle(isCollapsed, true)}>
              <BsBasket style={mainIconStyle(isCollapsed)} />
              <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Products</span>
              {!isCollapsed && <BsChevronDown style={{ marginLeft: 'auto' }} />}
            </div>
            {isActiveMenu('products') && !isCollapsed && (
              <ul style={{ paddingLeft: '20px', listStyle: 'none' }}>
                {renderNavLink('/admin/add-product', 'Add Product')}
                {renderNavLink('/admin/manage-product', 'Manage Product')}
              </ul>
            )}
          </li>

          {/* Users */}
          <li>
            <div onClick={() => toggleMenu('users')} style={navLinkStyle(isCollapsed, true)}>
              <BsPerson style={mainIconStyle(isCollapsed)} />
              <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Users</span>
              {!isCollapsed && <BsChevronDown style={{ marginLeft: 'auto' }} />}
            </div>
            {isActiveMenu('users') && !isCollapsed && (
              <ul style={{ paddingLeft: '20px', listStyle: 'none' }}>
                {renderNavLink('/manage-users', 'Manage Users')}
              </ul>
            )}
          </li>

          {/* Orders */}
          <li>
            <div onClick={() => toggleMenu('orders')} style={navLinkStyle(isCollapsed, true)}>
              <BsCartCheck style={mainIconStyle(isCollapsed)} />
              <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Orders</span>
              {!isCollapsed && <BsChevronDown style={{ marginLeft: 'auto' }} />}
            </div>
            {isActiveMenu('orders') && !isCollapsed && (
              <ul style={{ paddingLeft: '20px', listStyle: 'none' }}>
                {renderNavLink('/orders', 'View Orders')}
              </ul>
            )}
          </li>

          {/* Coupons */}
          <li>
            <div onClick={() => toggleMenu('coupons')} style={navLinkStyle(isCollapsed, true)}>
              <BsBriefcase style={mainIconStyle(isCollapsed)} />
              <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Coupons</span>
              {!isCollapsed && <BsChevronDown style={{ marginLeft: 'auto' }} />}
            </div>
            {isActiveMenu('coupons') && !isCollapsed && (
              <ul style={{ paddingLeft: '20px', listStyle: 'none' }}>
                {renderNavLink('/add-coupon', 'Add Coupon')}
                {renderNavLink('/manage-coupons', 'Manage Coupons')}
              </ul>
            )}
          </li>

          {/* Sliders */}
          <li>
            <NavLink
              to="/sliders"
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={navLinkStyle(isCollapsed)}
            >
              <BsListUl style={mainIconStyle(isCollapsed)} />
              <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Sliders</span>
            </NavLink>
          </li>

          {/* Others */}
          <li>
            <div onClick={() => toggleMenu('others')} style={navLinkStyle(isCollapsed, true)}>
              <BsBriefcase style={mainIconStyle(isCollapsed)} />
              <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Others</span>
              {!isCollapsed && <BsChevronDown style={{ marginLeft: 'auto' }} />}
            </div>
            {isActiveMenu('others') && !isCollapsed && (
              <ul style={{ paddingLeft: '20px', listStyle: 'none' }}>
                {renderNavLink('/contact', 'Contact')}
                {renderNavLink('/keywords', 'Keywords')}
              </ul>
            )}
          </li>

          {/* Change Password */}
          <li>
            <NavLink
              to="/change-password"
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={navLinkStyle(isCollapsed)}
            >
              <BsListUl style={mainIconStyle(isCollapsed)} />
              <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Change Password</span>
            </NavLink>
          </li>
        </ul>
      </section>
    </aside>
  );
};

// Styles
const asideStyle = (isCollapsed) => ({
  width: isCollapsed ? '60px' : '295px',
  color: '#fff',
  minHeight: '100vh',
  position: 'fixed',
  paddingTop: '20px',
  background: 'rgb(13 167 158)',
  overflowY: 'auto',
  transition: 'width 0.3s ease',
  zIndex: 900,
});

const navLinkStyle = (isCollapsed, clickable = false) => ({
  display: 'flex',
  alignItems: 'center',
  padding: isCollapsed ? '10px' : '10px 15px',
  color: '#fff',
  fontSize: '14px',
  textDecoration: 'none',
  cursor: clickable ? 'pointer' : 'default',
  justifyContent: isCollapsed ? 'center' : 'flex-start',
});

const subLinkStyle = (clickable = false) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 15px',
  color: '#fff',
  fontSize: '14px',
  textDecoration: 'none',
  cursor: clickable ? 'pointer' : 'default',
});

const mainIconStyle = (isCollapsed) => ({
  marginRight: isCollapsed ? '0' : '10px',
  fontSize: '16px',
});

const iconDotStyle = {
  marginRight: '10px',
  fontSize: '16px',
};

export default Sidebar;
