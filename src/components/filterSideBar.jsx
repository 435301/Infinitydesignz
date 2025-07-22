import React, { useState, useEffect } from 'react';
import '../css/user/filterSidebar.css';

const FilterSidebar = ({ accordionFilters = [], standardFilters = {} }) => {
  const [filters, setFilters] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(null);

  useEffect(() => {
    setFilters(accordionFilters);
  }, [accordionFilters]);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleCheckboxChange = (groupIdx, optionIdx) => {
    const updatedFilters = [...filters];
    updatedFilters[groupIdx].options[optionIdx].checked = !updatedFilters[groupIdx].options[optionIdx].checked;
    setFilters(updatedFilters);
  };

  return (
    <div className="filter-sidebar">
      {filters.length === 0 ? (
        <p>Loading filters...</p>
      ) : (
        filters.map((group, idx) => (
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
                      <input
                        type="checkbox"
                        checked={option.checked || false}
                        onChange={() => handleCheckboxChange(idx, i)}
                      />
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}

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
