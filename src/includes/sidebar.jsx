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
  BsTag,
} from 'react-icons/bs';

const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [openMenus, setOpenMenus] = useState({});

  const menuPaths = {
    masterData: [
      '/admin/create-brand',
      '/admin/brand-mapping',
      '/admin/create-size',
      '/admin/size-mapping',
      '/admin/colors',
      '/admin/feature-type',
      '/admin/feature-set',
      '/admin/feature-list',
      '/admin/filter-type',
      '/admin/filter-set',
      '/admin/filter-list',
    ],
    productFeatures: ['/admin/feature-type', '/admin/feature-set', '/admin/feature-list'],
    productFilters: ['/admin/filter-type', '/admin/filter-set', '/admin/filter-list'],
    categories: ['/admin/manage-category', '/admin/manage-subcategory', '/admin/list-subcategory'],
    products: ['/admin/add-product', '/admin/manage-product', '/admin/bulk-upload'],
    users: ['/admin/manage-users'],
    orders: ['/admin/orders'],
    offers: ['/admin/offers', '/create-coupon'],
    sliders: ['/admin/sliders', '/admin/manage-sliders'],
    // coupons: ['/admin/add-coupon', '/admin/manage-coupons'],
    others: ['/admin/contact', '/admin/keywords', 'admin/subscriberslist'],
    promotions: [
      '/admin/home-screen-promotion-category',
      '/admin/home-screen-create-promotion',
      '/admin/menu-promotion-category',
      '/admin/menu-create-promotion',
      '/admin/sub-menu-promotion-category',
      '/admin/sub-menu-create-promotion',
    ],
    webPromotion: ['/admin/home-screen-promotion-category', '/admin/home-screen-create-promotion'],
    appPromotion: ['/admin/menu-promotion-category', '/admin/menu-create-promotion'],
    appHomePromotions: ['/admin/sub-menu-promotion-category', '/admin/sub-menu-create-promotion'],
  };

  const childToParent = {
    productFeatures: 'masterData',
    productFilters: 'masterData',
    webPromotion: 'promotions',
    appPromotion: 'promotions',
    appHomePromotions: 'promotions',
  };

  useEffect(() => {
    const newOpenMenus = {};
    Object.keys(menuPaths).forEach((menu) => {
      if (menuPaths[menu].some((path) => currentPath.startsWith(path))) {
        newOpenMenus[menu] = true;
        if (childToParent[menu]) {
          newOpenMenus[childToParent[menu]] = true;
        }
      }
    });
    setOpenMenus((prev) => ({ ...prev, ...newOpenMenus }));
  }, [currentPath]);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .sidebar-scrollbar::-webkit-scrollbar {
        width: 8px;
      }
      .sidebar-scrollbar::-webkit-scrollbar-track {
        background: #0da79e;
      }
      .sidebar-scrollbar::-webkit-scrollbar-thumb {
        background-color: #0da79e;
        border-radius: 10px;
        border: 2px solid #0da79e;
      }
      .sidebar-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: #0da79e #0da79e;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => {
      const updated = {
        ...prev,
        [menu]: !prev[menu],
      };
      if (!prev[menu] && childToParent[menu]) {
        updated[childToParent[menu]] = true;
      }
      return updated;
    });
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
    <aside className="sidebar-scrollbar" style={asideStyle(isCollapsed)}>
      <section style={{ height: '100%' }}>
        <ul className="sidebar-menu mb-4" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
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
                {renderNavLink('/admin/create-brand', 'Brand')}
                {renderNavLink('/admin/create-size', 'Sizes')}
                {renderNavLink('/admin/colors', 'Colors')}
                <li>
                  <div onClick={() => toggleMenu('productFeatures')} style={subLinkStyle(true)}>
                    <BsDot style={iconDotStyle} />
                    <span>Product Features</span>
                    <BsChevronDown style={{ marginLeft: 'auto' }} />
                  </div>
                  {isActiveMenu('productFeatures') && (
                    <ul className="subdropdown" style={{ paddingLeft: '20px', listStyle: 'none' }}>
                      {renderNavLink('/admin/feature-type', 'Feature Type')}
                      {renderNavLink('/admin/feature-set', 'Feature Set')}
                      {renderNavLink('/admin/feature-list', 'Feature List')}
                    </ul>
                  )}
                </li>
                <li>
                  <div onClick={() => toggleMenu('productFilters')} style={subLinkStyle(true)}>
                    <BsDot style={iconDotStyle} />
                    <span>Product Filters</span>
                    <BsChevronDown style={{ marginLeft: 'auto' }} />
                  </div>
                  {isActiveMenu('productFilters') && (
                    <ul className="subdropdown" style={{ paddingLeft: '20px', listStyle: 'none' }}>
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
              <ul className="subdropdown" style={{ paddingLeft: '20px', listStyle: 'none' }}>
                {renderNavLink('/admin/manage-category', 'Categories')}
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
              <ul className="subdropdown" style={{ paddingLeft: '20px', listStyle: 'none' }}>
                {renderNavLink('/admin/add-product', 'Add Product')}
                {renderNavLink('/admin/manage-product', 'Manage Product')}
                {renderNavLink('/admin/bulk-upload', 'Bulk Upload')}

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
              <ul className="subdropdown" style={{ paddingLeft: '20px', listStyle: 'none' }}>
                {renderNavLink('/admin/manage-users', 'Manage Users')}
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
              <ul className="subdropdown" style={{ paddingLeft: '20px', listStyle: 'none' }}>
                {renderNavLink('/admin/orders', 'View Orders')}
              </ul>
            )}
          </li>

          {/* Offers */}
          <li>
            <NavLink
              to="/admin/offers"
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={navLinkStyle(isCollapsed)}
            >
              <BsListUl style={mainIconStyle(isCollapsed)} />
              <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Offers</span>
            </NavLink>
          </li>

          {/* Coupons */}
          {/* <li>
            <div onClick={() => toggleMenu('coupons')} style={navLinkStyle(isCollapsed, true)}>
              <BsBriefcase style={mainIconStyle(isCollapsed)} />
              <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Coupons</span>
              {!isCollapsed && <BsChevronDown style={{ marginLeft: 'auto' }} />}
            </div>
            {isActiveMenu('coupons') && !isCollapsed && (
              <ul className="subdropdown" style={{ paddingLeft: '20px', listStyle: 'none' }}>
                {renderNavLink('/admin/add-coupon', 'Add Coupon')}
                {renderNavLink('/admin/manage-coupons', 'Manage Coupons')}
              </ul>
            )}
          </li> */}

          {/* Promotions */}
          <li>
            <div onClick={() => toggleMenu('promotions')} style={navLinkStyle(isCollapsed, true)}>
              <BsTag style={mainIconStyle(isCollapsed)} />
              <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Promotions</span>
              {!isCollapsed && <BsChevronDown style={{ marginLeft: 'auto' }} />}
            </div>
            {isActiveMenu('promotions') && !isCollapsed && (
              <ul className="subdropdown" style={{ paddingLeft: '20px', listStyle: 'none' }}>
                <li>
                  <div onClick={() => toggleMenu('webPromotion')} style={subLinkStyle(true)}>
                    <BsDot style={iconDotStyle} />
                    <span>Web Promotion</span>
                    <BsChevronDown style={{ marginLeft: 'auto' }} />
                  </div>
                  {isActiveMenu('webPromotion') && (
                    <ul className="subdropdown" style={{ paddingLeft: '20px', listStyle: 'none' }}>
                      {renderNavLink('/admin/home-screen-promotion-category', 'Promotion Category')}
                      {renderNavLink('/admin/home-screen-create-promotion', 'Promotion')}
                    </ul>
                  )}
                </li>
                <li>
                  <div onClick={() => toggleMenu('appPromotion')} style={subLinkStyle(true)}>
                    <BsDot style={iconDotStyle} />
                    <span>App Promotion</span>
                    <BsChevronDown style={{ marginLeft: 'auto' }} />
                  </div>
                  {isActiveMenu('appPromotion') && (
                    <ul className="subdropdown" style={{ paddingLeft: '20px', listStyle: 'none' }}>
                      {renderNavLink('/admin/menu-promotion-category', 'Promotion Category')}
                      {renderNavLink('/admin/menu-create-promotion', 'Create Promotion')}
                    </ul>
                  )}
                </li>
                <li>
                  <div onClick={() => toggleMenu('appHomePromotions')} style={subLinkStyle(true)}>
                    <BsDot style={iconDotStyle} />
                    <span>App Home Promotions</span>
                    <BsChevronDown style={{ marginLeft: 'auto' }} />
                  </div>
                  {isActiveMenu('appHomePromotions') && (
                    <ul className="subdropdown" style={{ paddingLeft: '20px', listStyle: 'none' }}>
                      {renderNavLink('/admin/sub-menu-promotion-category', 'Promotion Category')}
                      {renderNavLink('/admin/sub-menu-create-promotion', 'Create Promotion')}
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>

          {/* Sliders */}
          <li>
            <NavLink
              to="/admin/sliders"
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
              <ul className="subdropdown" style={{ paddingLeft: '20px', listStyle: 'none' }}>
                {renderNavLink('/admin/subscriberslist', 'subscriberslist')}

                {renderNavLink('/admin/contact', 'Contact')}
                {renderNavLink('/admin/keywords', 'Keywords')}
              </ul>
            )}
          </li>

          {/* Change Password */}
          <li>
            <NavLink
              to="/admin/change-password"
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
  width: isCollapsed ? '60px' : '275px',
  color: '#fff',
  height: '100vh',
  position: 'fixed',
  paddingTop: '20px',
  paddingBottom: '20px',
  background: 'rgb(13 167 158)',
  overflowY: 'auto',
  transition: 'width 0.3s ease',
  zIndex: 900,
  left: 0,
});

const navLinkStyle = (isCollapsed, clickable = false) => ({
  display: 'flex',
  alignItems: 'center',
  padding: isCollapsed ? '10px' : '5px 15px',
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