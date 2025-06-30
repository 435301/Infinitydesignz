import React from 'react';
import logo from '../img/logo.svg';
import avatar from '../img/avatar-1.png';
import '../css/admin/style.css';

const HeaderAdmin = () => {
  return (
    <header className="main-header-top hidden-print">
      <a href="/index" className="logo">
        <img src={logo} alt="Logo" />
      </a>

      <nav className="navbar navbar-static-top">
        {/* Sidebar toggle button */}
        <a href="#!" data-toggle="offcanvas" className="sidebar-toggle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-align-left"
          >
            <line x1="17" y1="10" x2="3" y2="10" />
            <line x1="21" y1="6" x2="3" y2="6" />
            <line x1="21" y1="14" x2="3" y2="14" />
            <line x1="17" y1="18" x2="3" y2="18" />
          </svg>
        </a>

        <ul className="top-nav lft-nav">
          <div className="search-bx mx-5 d-none d-md-block">
            <form>
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon3"
                />
                <div className="input-group-append">
                  <button className="btn" type="submit" id="button-addon3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-search"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </ul>

        <div className="navbar-custom-menu f-right">
          <ul className="top-nav">
            {/* Fullscreen Button */}
            <li className="dropdown notification-menu">
              <a href="/" className="btn-warning-light">
                <i className="icon-size-fullscreen"></i>
              </a>
            </li>

            {/* Notifications */}
            <li className="pc-rheader-submenu">
              <a
                href="#"
                className="waves-effect waves-light dropdown-toggle btn-info-light"
                data-bs-toggle="dropdown"
                title="Notifications"
              >
                <i className="icon-bell"></i>
              </a>
            </li>

            {/* Settings */}
            <li className="pc-rheader-submenu">
              <a
                href="#"
                data-toggle="control-sidebar"
                title="Setting"
                className="waves-effect full-screen waves-light btn-danger-light"
              >
                <i className="icon-settings"></i>
              </a>
            </li>

            {/* User Dropdown */}
            <li className="dropdown">
              <a
                href="#!"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                className="dropdown-toggle drop icon-circle drop-image"
              >
                <span>
                  <img
                    className="img-circle"
                    src={avatar}
                    style={{ width: '40px' }}
                    alt="User"
                  />
                </span>
              </a>
              <ul className="dropdown-menu settings-menu">
                <li>
                  <a href="#!">
                    <i className="icon-settings"></i> Settings
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-user"></i> Profile
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-envelope-open"></i> My Messages
                  </a>
                </li>
                <li className="p-0">
                  <div className="dropdown-divider m-0"></div>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-lock"></i> Lock Screen
                  </a>
                </li>
                <li>
                  <a href="/login1">
                    <i className="icon-logout"></i> Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default HeaderAdmin;
