import React from "react";
import { Link } from "react-router-dom";

const FilterGroup = ({ title, options }) => (
  <div className="filter-group">
    <h5>{title}</h5>
    {options.map((opt, index) => (
      <label key={index} className="checkbox-label">
        <input type="checkbox" defaultChecked={opt.checked} />
        <span>{opt.label}</span>
      </label>
    ))}
  </div>
);

const FilterSidebar = ({ isMobile = false, onClearFilters, groups }) => (
  <div className={`filter-section ${isMobile ? 'mobile-filter' : 'desktop-filter'}`}>
    <div className="filter-header">
      <h4>Filter</h4>
      <Link to="#" onClick={onClearFilters}>Clear all</Link>
    </div>
    {groups.map((group, idx) => (
      <FilterGroup key={idx} title={group.title} options={group.options} />
    ))}
  </div>
);

export default FilterSidebar;



