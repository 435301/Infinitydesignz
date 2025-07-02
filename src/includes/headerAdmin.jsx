import React, { useState, useEffect, useRef } from 'react';
import { BsFullscreen, BsBell, BsGear, BsPerson, BsEnvelopeOpen, BsLock, BsBoxArrowRight } from 'react-icons/bs';
import logo from '../img/logo.svg';
import avatar from '../img/avatar-1.png';

const HeaderAdmin = ({ onToggleSidebar }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    onToggleSidebar(!isSidebarCollapsed);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownItemClick = () => {
    setIsDropdownOpen(false); // Close dropdown when an item is clicked
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header
      style={{
        background: '#fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        position: 'fixed',
        width: '100%',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        padding: '0 15px',
        height: '70px',
      }}
    >
      <a href="/index" style={{ padding: '10px' }}>
        <img src={logo} alt="Logo" style={{ height: '40px' }} />
      </a>

      <nav
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <a
          href="#!"
          onClick={handleToggle}
          style={{
            padding: '10px',
            cursor: 'pointer',
            color: '#0da79e',
          }}
        >
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
            style={{
              transform: isSidebarCollapsed ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
          >
            <line x1="17" y1="10" x2="3" y2="10" />
            <line x1="21" y1="6" x2="3" y2="6" />
            <line x1="21" y1="14" x2="3" y2="14" />
            <line x1="17" y1="18" x2="3" y2="18" />
          </svg>
        </a>

      <ul style={{ display: 'flex', alignItems: 'center', listStyle: 'none', margin: 0, padding: 0 }}>
  <li>
    <div className='search-bx' style={{ position: 'relative' }}>
      <input
        type="search"
        placeholder="Search"
        style={{
          // space for the icon inside
          borderRadius: '4px',
        }}
      />
      <i
        className="bi bi-search"
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '16px',
          color: '#6c757d'
        }}
      ></i>
    </div>
  </li>
</ul>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ul className=''
            style={{
              display: 'flex',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              alignItems: 'center',
            }}
          >            <li style={{ padding: '0 10px' }}>
              <a
                href="#!"
                style={{
                  padding: '8px',
                  background: '#fff3cd',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <BsFullscreen style={{ color: '#f4a300', fontSize: '18px' }} />
              </a>
            </li>

            <li style={{ padding: '0 10px' }}>
              <a
                href="#!"
                style={{
                  padding: '8px',
                  background: '#e8e8e8',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <BsBell style={{ color: '#9b59b6', fontSize: '18px' }} />
              </a>
            </li>

            <li style={{ padding: '0 10px' }}>
              <a
                href="#!"
                style={{
                  padding: '8px',
                  background: '#f8d7da',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <BsGear style={{ color: '#e74c3c', fontSize: '18px' }} />
              </a>
            </li>

            <li style={{ position: 'relative' }} ref={dropdownRef}>
              <a
                href="#!"
                onClick={handleDropdownToggle}
                style={{
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={avatar}
                  style={{ width: '40px', borderRadius: '50%' }}
                  alt="User"
                />
              </a>
              <ul className='dropdown-menu settings-menu'
                style={{
                
                  display: isDropdownOpen ? 'block' : 'none',
                }}
              >
                <li>
                  <a
                    href="#!"
                    onClick={handleDropdownItemClick}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 15px',
                      color: '#333',
                      textDecoration: 'none',
                    }}
                  >
                    <BsGear style={{ fontSize: '18px', marginRight: '5px' }} /> Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    onClick={handleDropdownItemClick}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 15px',
                      color: '#333',
                      textDecoration: 'none',
                    }}
                  >
                    <BsPerson style={{ phosphorSize: '18px', marginRight: '5px' }} /> Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    onClick={handleDropdownItemClick}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 15px',
                      color: '#333',
                      textDecoration: 'none',
                    }}
                  >
                    <BsEnvelopeOpen style={{ fontSize: '18px', marginRight: '5px' }} /> My Messages
                  </a>
                </li>
                <li style={{ padding: '0 15px' }}>
                  <div style={{ borderTop: '1px solid #e5e5e5', margin: '5px 0' }}></div>
                </li>
                <li>
                  <a
                    href="#!"
                    onClick={handleDropdownItemClick}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 15px',
                      color: '#333',
                      textDecoration: 'none',
                    }}
                  >
                    <BsLock style={{ fontSize: '18px', marginRight: '5px' }} /> Lock Screen
                  </a>
                </li>
                <li>
                  <a
                    href="/login1"
                    onClick={handleDropdownItemClick}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 15px',
                      color: '#333',
                      textDecoration: 'none',
                    }}
                  >
                    <BsBoxArrowRight style={{ fontSize: '18px', marginRight: '5px' }} /> Logout
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