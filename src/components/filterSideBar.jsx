// import React from "react";
// import { Link } from "react-router-dom";

// const FilterGroup = ({ title, options }) => (
//   <div className="filter-group">
//     <h5>{title}</h5>
//     {options.map((opt, index) => (
//       <label key={index} className="checkbox-label">
//         <input type="checkbox" defaultChecked={opt.checked} />
//         <span>{opt.label}</span>
//       </label>
//     ))}
//   </div>
// );

// const FilterSidebar = ({ isMobile = false, onClearFilters, groups }) => (
//   <div className={`filter-section ${isMobile ? 'mobile-filter' : 'desktop-filter'}`}>
//     <div className="filter-header">
//       <h4>Filter</h4>
//       <Link to="#" onClick={onClearFilters}>Clear all</Link>
//     </div>
//     {groups.map((group, idx) => (
//       <FilterGroup key={idx} title={group.title} options={group.options} />
//     ))}
//   </div>
// );

// export default FilterSidebar;


import React, { useState } from 'react';
import '../css/user/filterSidebar.css';

const FilterSidebar = ({ accordionFilters = [], standardFilters = {} }) => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="filter-sidebar">

 
      {accordionFilters.map((group, idx) => (
        <div key={idx} className="filter-group">
          <div className="filter-header" onClick={() => toggleAccordion(idx)}>
            <span>{group.title}</span>
            <span className="toggle-icon">{activeAccordion === idx ? '-' : '+'}</span>
          </div>
          {activeAccordion === idx && (
            <div className="filter-options">
              {group.options.map((option, i) => (
                <div key={i} className="filter-option">
                  <label>
                    <input type="checkbox" checked={option.checked || false} onChange={() => {}} />
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Colors */}
      {standardFilters.colors?.length > 0 && (
        <div className="filter-section mt-4">
          <h6>Colors</h6>
          <div className="color-options d-flex flex-wrap">
            {standardFilters.colors.map((color, index) => (
              <div key={index} className="color-swatch" style={{ backgroundColor: color.hex_code }} title={color.label}></div>
            ))}
          </div>
        </div>
      )}

      {/* Brands */}
      {standardFilters.brands?.length > 0 && (
        <div className="filter-section mt-4">
          <h6>Brands</h6>
          {standardFilters.brands.map((brand, index) => (
            <div key={index} className="filter-option">
              <label>
                <input type="checkbox" />
                {brand.name}
              </label>
            </div>
          ))}
        </div>
      )}

      {/* Sizes */}
      {standardFilters.sizes?.length > 0 && (
        <div className="filter-section mt-4">
          <h6>Sizes</h6>
            {standardFilters.sizes.map((size, index) => (
               <div key={index} className="filter-option">
              <label>
                <input type="checkbox" />
                {size.title}
              </label>
            </div>
            ))}
          </div>
      )}
    </div>
  );
};

export default FilterSidebar;




