import React, { useState, useEffect, useRef } from 'react';
import {
  BsFullscreen,
  BsBell,
  BsGear,
  BsPerson,
  BsEnvelopeOpen,
  BsLock,
  BsBoxArrowRight,
  BsSearch
} from 'react-icons/bs';
import logo from '../img/logo.svg';
import avatar from '../img/avatar-1.png';
import { useNavigate } from 'react-router-dom';

const HeaderAdmin = ({ onToggleSidebar = () => { } }) => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault(); 
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(window.innerWidth <= 767);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    const newCollapsedState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newCollapsedState);
    onToggleSidebar(newCollapsedState);
  };

  const handleDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen);
  const handleDropdownItemClick = () => setIsDropdownOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 767;
      setIsSidebarCollapsed(isMobile);
      onToggleSidebar(isMobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [onToggleSidebar]);

  return (
    <>
      <style>{`
        .header-admin {
          background: #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
          position: fixed;
          width: 100%;
          z-index: 1000;
          display: flex;
          align-items: center;
          padding: 0 15px;
          height: 70px;
        }
        .header-logo {
          padding: 10px;
        }
        .nav-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .sidebar-toggle {
          padding: 10px;
          cursor: pointer;
          color: #0da79e;
          transition: transform 0.3s ease;
          margin:14px;
        }
        .sidebar-toggle svg {
          transition: transform 0.3s ease;
        }
        .nav-icons, .nav-icons ul {
          display: flex;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-icons li {
          padding: 0 10px;
        }
        .icon-btn {
          padding: 8px;
          border-radius: 4px;
          display: flex;
          align-items: center;
        }
        .icon-btn.fullscreen { background: #fff3cd; color: #f4a300; }
        .icon-btn.bell { background: #e8e8e8; color: #9b59b6; }
        .icon-btn.gear { background: #f8d7da; color: #e74c3c; }
        .search-bx {
          position: relative;
        }
        .search-bx input {
          border-radius: 4px;
          padding: 8px 30px 8px 10px;
        }
        .search-bx svg {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 16px;
          color: #6c757d;
        }
        .dropdown-menu.settings-menu {
          position: absolute;
          background: #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          border-radius: 4px;
          min-width: 150px;
          right: 0;
          top: 100%;
          z-index: 1000;
        }
        .dropdown-menu.settings-menu li {
          padding: 0;
        }
        .dropdown-menu.settings-menu li + li {
          border-top: 1px solid #e5e5e5;
        }
        .dropdown-menu.settings-menu a {
          display: flex;
          align-items: center;
          padding: 8px 15px;
          color: #333;
          text-decoration: none;
        }
        .dropdown-menu.settings-menu a svg {
          margin-right: 5px;
          font-size: 18px;
        }
        .avatar-img {
          width: 40px;
          border-radius: 50%;
        }
      `}</style>

      <header className="header-admin">
        <a className="header-logo" href="/admin/dashboard">
          <img src={logo} alt="Logo" />
        </a>

        <nav className="nav-container">
          <a
            href="#!"
            className="sidebar-toggle"
            onClick={handleToggle}
            aria-label="Toggle sidebar"
            style={{ transform: isSidebarCollapsed ? 'rotate(90deg)' : 'rotate(0deg)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="17" y1="10" x2="3" y2="10" />
              <line x1="21" y1="6" x2="3" y2="6" />
              <line x1="21" y1="14" x2="3" y2="14" />
              <line x1="17" y1="18" x2="3" y2="18" />
            </svg>
          </a>

          <ul className="nav-icons">
            <li className="d-none d-md-block">
              {/* <div className="search-bx">
                <input type="search" placeholder="Search" />
                <BsSearch />
              </div> */}
            </li>
          </ul>

          <div className="nav-icons">
            <ul>
              <li>
                <a href="#!" className="icon-btn fullscreen"><BsFullscreen /></a>
              </li>
              <li>
                <a href="#!" className="icon-btn bell"><BsBell /></a>
              </li>
              <li>
                <a href="#!" className="icon-btn gear"><BsGear /></a>
              </li>
              <li className="dropdown" ref={dropdownRef}>
                <a href="#!" onClick={handleDropdownToggle} className="icon-btn">
                  <img src={avatar} alt="User" className="avatar-img" />
                </a>
                <ul className="dropdown-menu settings-menu" style={{ display: isDropdownOpen ? 'block' : 'none' }}>
                  <li><a href="#!" onClick={handleDropdownItemClick}><BsGear /> Settings</a></li>
                  <li><a href="#!" onClick={handleDropdownItemClick}><BsPerson /> Profile</a></li>
                  <li><a href="#!" onClick={handleDropdownItemClick}><BsEnvelopeOpen /> My Messages</a></li>
                  <li></li>
                  <li><a href="#!" onClick={handleDropdownItemClick}><BsLock /> Lock Screen</a></li>
                  <li><a href="/admin/login" onClick={handleLogout}><BsBoxArrowRight /> Logout</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default HeaderAdmin;
