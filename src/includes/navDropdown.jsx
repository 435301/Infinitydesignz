import React from "react";

const NavDropdown = ({ title, items = [] }) => {
  return (
    <div className="nav-item dropdown">
      <a
        href="#"
        className="nav-link dropdown-toggle"
        data-bs-toggle="dropdown"
      >
        {title}
      </a>
      <div className="dropdown-menu border-0 rounded-0 rounded-bottom m-0">
        {items.map((item, index) => (
          <a href={item.href} className="dropdown-item" key={index}>
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default NavDropdown;
