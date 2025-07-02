import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const isActiveMenu = (menu) => openMenus[menu];

  return (
    <aside style={{
      width: isCollapsed ? '60px' : '265px',
      color: '#fff',
      minHeight: '100vh',
      position: 'fixed',
      paddingTop: '20px',
      background: 'rgb(13 167 158)',
      overflowY: 'auto',
      transition: 'width 0.3s ease',
      zIndex: 900
    }}>
      <section>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li>
            <NavLink to="/admin/dashboard" style={{
              display: 'flex',
              alignItems: 'center',
              padding: isCollapsed ? '10px' : '10px 15px',
              color: '#fff',
              fontSize: '14px',
              textDecoration: 'none',
              justifyContent: isCollapsed ? 'center' : 'flex-start'
            }}>
              <BsBriefcase style={{ marginRight: isCollapsed ? '0' : '10px', fontSize: '16px' }} />
              <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <div onClick={() => toggleMenu('masterData')} style={{
              display: 'flex',
              alignItems: 'center',
              padding: isCollapsed ? '10px' : '10px 15px',
              color: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
              justifyContent: isCollapsed ? 'center' : 'flex-start'
            }}>
              <BsBook style={{ marginRight: isCollapsed ? '0' : '10px', fontSize: '16px' }} />
              <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Master Data</span>
              {!isCollapsed && <BsChevronDown style={{ marginLeft: 'auto' }} />}
            </div>
            {isActiveMenu('masterData') && !isCollapsed && (
              <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                <li>
                  <div onClick={() => toggleMenu('brands')} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 15px',
                    color: '#fff',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}>
                    <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                    <span>Brands</span>
                    <BsChevronDown style={{ marginLeft: 'auto' }} />
                  </div>
                  {isActiveMenu('brands') && (
                    <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                      <li>
                        <NavLink to="/create-brand" style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '10px 15px',
                          color: '#fff',
                          fontSize: '14px',
                          textDecoration: 'none'
                        }}>
                          <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                          <span>Create Brand</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/brand-mapping" style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '10px 15px',
                          color: '#fff',
                          fontSize: '14px',
                          textDecoration: 'none'
                        }}>
                          <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                          <span>Brand Mapping</span>
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>

                <li>
                  <div onClick={() => toggleMenu('sizes')} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 15px',
                    color: '#fff',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}>
                    <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                    <span>Sizes</span>
                    <BsChevronDown style={{ marginLeft: 'auto' }} />
                  </div>
                  {isActiveMenu('sizes') && (
                    <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                      <li>
                        <NavLink to="/create-size" style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '10px 15px',
                          color: '#fff',
                          fontSize: '14px',
                          textDecoration: 'none'
                        }}>
                          <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                          <span>Create Size</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/size-mapping" style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '10px 15px',
                          color: '#fff',
                          fontSize: '14px',
                          textDecoration: 'none'
                        }}>
                          <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                          <span>Size Mapping</span>
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>

                <li>
                  <NavLink to="/colors" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 15px',
                    color: '#fff',
                    fontSize: '14px',
                    textDecoration: 'none'
                  }}>
                    <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                    <span>Colors</span>
                  </NavLink>
                </li>

                <li>
                  <div onClick={() => toggleMenu('features')} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 15px',
                    color: '#fff',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}>
                    <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                    <span>Product Features</span>
                    <BsChevronDown style={{ marginLeft: 'auto' }} />
                  </div>
                  {isActiveMenu('features') && (
                    <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                      <li>
                        <NavLink to="/feature-type" style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '10px 15px',
                          color: '#fff',
                          fontSize: '14px',
                          textDecoration: 'none'
                        }}>
                          <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                          <span>Feature Type</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/feature-set" style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '10px 15px',
                          color: '#fff',
                          fontSize: '14px',
                          textDecoration: 'none'
                        }}>
                          <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                          <span>Feature Set</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/feature-list" style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '10px 15px',
                          color: '#fff',
                          fontSize: '14px',
                          textDecoration: 'none'
                        }}>
                          <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                          <span>Feature List</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/bulk-upload" style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '10px 15px',
                          color: '#fff',
                          fontSize: '14px',
                          textDecoration: 'none'
                        }}>
                          <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                          <span>Bulk Upload</span>
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>

                <li>
                  <div onClick={() => toggleMenu('filters')} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 15px',
                    color: '#fff',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}>
                    <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                    <span>Product Filter</span>
                    <BsChevronDown style={{ marginLeft: 'auto' }} />
                  </div>
                  {isActiveMenu('filters') && (
                    <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                      <li>
                        <NavLink to="/filter-type" style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '10px 15px',
                          color: '#fff',
                          fontSize: '14px',
                          textDecoration: 'none'
                        }}>
                          <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                          <span>Filter Type</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/filter-set" style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '10px 15px',
                          color: '#fff',
                          fontSize: '14px',
                          textDecoration: 'none'
                        }}>
                          <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                          <span>Filter Set</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/filter-list" style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '10px 15px',
                          color: '#fff',
                          fontSize: '14px',
                          textDecoration: 'none'
                        }}>
                          <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                          <span>Filter List</span>
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>

          <li>
            <div onClick={() => toggleMenu('categories')} style={{
              display: 'flex',
              alignItems: 'center',
              padding: isCollapsed ? '10px' : '10px 15px',
              color: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
              justifyContent: isCollapsed ? 'center' : 'flex-start'
            }}>
              <BsFolder style={{ marginRight: isCollapsed ? '0' : '10px', fontSize: '16px' }} />
              <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Categories</span>
              {!isCollapsed && <BsChevronDown style={{ marginLeft: 'auto' }} />}
            </div>
            {isActiveMenu('categories') && !isCollapsed && (
              <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                <li>
                  <NavLink to="/admin/manage-category" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 15px',
                    color: '#fff',
                    fontSize: '14px',
                    textDecoration: 'none'
                  }}>
                    <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                    <span>Manage Categories</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/manage-subcategory" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 15px',
                    color: '#fff',
                    fontSize: '14px',
                    textDecoration: 'none'
                  }}>
                    <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                    <span>Sub-categories</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/list-subcategory" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 15px',
                    color: '#fff',
                    fontSize: '14px',
                    textDecoration: 'none'
                  }}>
                    <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                    <span>List Sub Categories</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li>
            <div onClick={() => toggleMenu('products')} style={{
              display: 'flex',
              alignItems: 'center',
              padding: isCollapsed ? '10px' : '10px 15px',
              color: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
              justifyContent: isCollapsed ? 'center' : 'flex-start'
            }}>
              <BsBasket style={{ marginRight: isCollapsed ? '0' : '10px', fontSize: '16px' }} />
              <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Products</span>
              {!isCollapsed && <BsChevronDown style={{ marginLeft: 'auto' }} />}
            </div>
            {isActiveMenu('products') && !isCollapsed && (
              <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                <li>
                  <NavLink to="/add-product" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 15px',
                    color: '#fff',
                    fontSize: '14px',
                    textDecoration: 'none'
                  }}>
                    <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                    <span>Add Product</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/manage-product" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 15px',
                    color: '#fff',
                    fontSize: '14px',
                    textDecoration: 'none'
                  }}>
                    <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                    <span>Manage Product</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li>
            <div onClick={() => toggleMenu('users')} style={{
              display: 'flex',
              alignItems: 'center',
              padding: isCollapsed ? '10px' : '10px 15px',
              color: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
              justifyContent: isCollapsed ? 'center' : 'flex-start'
            }}>
              <BsPerson style={{ marginRight: isCollapsed ? '0' : '10px', fontSize: '16px' }} />
              <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Users</span>
              {!isCollapsed && <BsChevronDown style={{ marginLeft: 'auto' }} />}
            </div>
            {isActiveMenu('users') && !isCollapsed && (
              <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                <li>
                  <NavLink to="/manage-users" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 15px',
                    color: '#fff',
                    fontSize: '14px',
                    textDecoration: 'none'
                  }}>
                    <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                    <span>Manage Users</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li>
            <div onClick={() => toggleMenu('orders')} style={{
              display: 'flex',
              alignItems: 'center',
              padding: isCollapsed ? '10px' : '10px 15px',
              color: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
              justifyContent: isCollapsed ? 'center' : 'flex-start'
            }}>
              <BsCartCheck style={{ marginRight: isCollapsed ? '0' : '10px', fontSize: '16px' }} />
              <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Orders</span>
              {!isCollapsed && <BsChevronDown style={{ marginLeft: 'auto' }} />}
            </div>
            {isActiveMenu('orders') && !isCollapsed && (
              <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                <li>
                  <NavLink to="/orders" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 15px',
                    color: '#fff',
                    fontSize: '14px',
                    textDecoration: 'none'
                  }}>
                    <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                    <span>View Orders</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li>
            <div onClick={() => toggleMenu('coupons')} style={{
              display: 'flex',
              alignItems: 'center',
              padding: isCollapsed ? '10px' : '10px 15px',
              color: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
              justifyContent: isCollapsed ? 'center' : 'flex-start'
            }}>
              <BsBriefcase style={{ marginRight: isCollapsed ? '0' : '10px', fontSize: '16px' }} />
              <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Coupons</span>
              {!isCollapsed && <BsChevronDown style={{ marginLeft: 'auto' }} />}
            </div>
            {isActiveMenu('coupons') && !isCollapsed && (
              <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                <li>
                  <NavLink to="/add-coupon" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 15px',
                    color: '#fff',
                    fontSize: '14px',
                    textDecoration: 'none'
                  }}>
                    <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                    <span>Add Coupon</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/manage-coupons" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 15px',
                    color: '#fff',
                    fontSize: '14px',
                    textDecoration: 'none'
                  }}>
                    <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                    <span>Manage Coupons</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li>
            <NavLink to="/sliders" style={{
              display: 'flex',
              alignItems: 'center',
              padding: isCollapsed ? '10px' : '10px 15px',
              color: '#fff',
              fontSize: '14px',
              textDecoration: 'none',
              justifyContent: isCollapsed ? 'center' : 'flex-start'
            }}>
              <BsListUl style={{ marginRight: isCollapsed ? '0' : '10px', fontSize: '16px' }} />
              <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Sliders</span>
            </NavLink>
          </li>

          <li>
            <div onClick={() => toggleMenu('others')} style={{
              display: 'flex',
              alignItems: 'center',
              padding: isCollapsed ? '10px' : '10px 15px',
              color: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
              justifyContent: isCollapsed ? 'center' : 'flex-start'
            }}>
              <BsBriefcase style={{ marginRight: isCollapsed ? '0' : '10px', fontSize: '16px' }} />
              <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Others</span>
              {!isCollapsed && <BsChevronDown style={{ marginLeft: 'auto' }} />}
            </div>
            {isActiveMenu('others') && !isCollapsed && (
              <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                <li>
                  <NavLink to="/contact" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 15px',
                    color: '#fff',
                    fontSize: '14px',
                    textDecoration: 'none'
                  }}>
                    <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                    <span>Contact</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/keywords" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 15px',
                    color: '#fff',
                    fontSize: '14px',
                    textDecoration: 'none'
                  }}>
                    <BsDot style={{ marginRight: '10px', fontSize: '16px' }} />
                    <span>Keywords</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li>
            <NavLink to="/change-password" style={{
              display: 'flex',
              alignItems: 'center',
              padding: isCollapsed ? '10px' : '10px 15px',
              color: '#fff',
              fontSize: '14px',
              textDecoration: 'none',
              justifyContent: isCollapsed ? 'center' : 'flex-start'
            }}>
              <BsListUl style={{ marginRight: isCollapsed ? '0' : '10px', fontSize: '16px' }} />
              <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Change Password</span>
            </NavLink>
          </li>
        </ul>
      </section>
    </aside>
  );
};

export default Sidebar;