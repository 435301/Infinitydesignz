import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import "../css/user/filterSidebar.css";
import BASE_URL from "../config/config";

const FilterSidebar = () => {
  const [filters, setFilters] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const queryString = new URLSearchParams({
    ...(searchParams.get("mainCategoryId") && { mainCategoryId: searchParams.get("mainCategoryId") }),
    ...(searchParams.get("subCategoryId") && { subCategoryId: searchParams.get("subCategoryId") }),
    ...(searchParams.get("listSubCatId") && { listSubCatId: searchParams.get("listSubCatId") }),
  }).toString();

  useEffect(() => {
    if (!queryString) return;

    axios
      .get(`${BASE_URL}/filters?${queryString}`)
      .then((res) => {
        setFilters(res.data || {});
      })
      .catch((err) => {
        console.error("Failed to fetch filters", err);
      });
  }, [queryString]);


  const handleFilterChange = (filterType, value) => {
    const currentParams = new URLSearchParams(searchParams);
    if (filterType === "priceRanges") {
      const currentValues = currentParams.get("priceRanges")?.split(",").filter(Boolean) || [];
      let updatedValues = currentValues;

      if (currentValues.includes(value)) {
        updatedValues = currentValues.filter((v) => v !== value);
      } else {
        updatedValues.push(value);
      }

      if (updatedValues.length === 0) {
        currentParams.delete("priceRanges");
        currentParams.delete("minPrice");
        currentParams.delete("maxPrice");
      } else {
        const selectedBuckets = filters.price.buckets.filter((bucket) =>
          updatedValues.includes(bucket.key)
        );
        const minPrice = Math.min(...selectedBuckets.map((b) => b.min));
        const maxPrice = Math.max(...selectedBuckets.map((b) => b.max));
        currentParams.set("priceRanges", updatedValues.join(",")); 
        currentParams.set("minPrice", minPrice);
        currentParams.set("maxPrice", maxPrice);
      }
    } else {
      const currentValues = currentParams.get(filterType)?.split(",").filter(Boolean) || [];
      if (currentValues.includes(value)) {
        const updatedValues = currentValues.filter((v) => v !== value);
        if (updatedValues.length > 0) {
          currentParams.set(filterType, updatedValues.join(","));
        } else {
          currentParams.delete(filterType);
        }
      } else {
        currentValues.push(value);
        currentParams.set(filterType, currentValues.join(","));
      }
    }

    setSearchParams(currentParams);
  };

  // Clear all filters
  const clearFilters = () => {
    const currentParams = new URLSearchParams(searchParams);
    ["color", "size", "filterListIds", "priceRanges", "minPrice", "maxPrice"].forEach((key) => {
      currentParams.delete(key);
    });
    setSearchParams(currentParams);
  };

  if (!filters) return null;

  const renderFilterSection = (title, items, filterType, labelKey = "label") => {
    if (!items || items.length === 0) return null;
    return (
      <div className="filter-section mt-4">
        <h6>{title}</h6>
        {items.map((item) => (
          <div key={item.id || item.key} className="filter-option">
            <label>
              <input
                type="checkbox"
                checked={searchParams.get(filterType)?.split(",").includes(item.id?.toString() || item.key) || false}
                onChange={() => handleFilterChange(filterType, item.id?.toString() || item.key)}
              />
              {item[labelKey]}
            </label>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="filter-sidebar">
      {/* Clear Filters Button */}
      <button className="btn btn-secondary mb-3" onClick={clearFilters}>
        Clear Filters
      </button>

      {/* Sidebar filters (category-specific like Size, Dimensions) */}
      {filters.sidebar?.length > 0 &&
        filters.sidebar.map((group) => (
          <div key={group.id} className="filter-section mt-4">
            <h6>{group.name}</h6>
            {group.sets.map((set) => (
              <div key={set.id} className="filter-subgroup">
                <strong>{set.title}</strong>
                {set.lists.map((option) => (
                  <div key={option.id} className="filter-option">
                    <label>
                      <input
                        type="checkbox"
                        checked={searchParams.get("filterListIds")?.split(",").includes(option.id.toString()) || false}
                        onChange={() => handleFilterChange("filterListIds", option.id.toString())}
                      />
                      {option.label} 
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}

      {/* Discounts */}
      {renderFilterSection("Discount", filters.discountRanges, "discount")}

      {/* Colors */}
      {renderFilterSection("Colors", filters.colors, "color")}

      {/* Materials */}
      {/* {renderFilterSection("Materials", filters.materials, "material")} */}

      {/* Price Buckets */}
      {filters.price?.buckets?.some((bucket) => bucket.count > 0) && (
        <div className="filter-section mt-4">
          <h6>Price</h6>
          {filters.price.buckets.map((bucket) =>
            bucket.count > 0 ? (
              <div key={bucket.key} className="filter-option">
                <label>
                  <input
                    type="checkbox"
                    checked={searchParams.get("priceRanges")?.split(",").includes(bucket.key) || false}
                    onChange={() => handleFilterChange("priceRanges", bucket.key)}
                  />
                  {bucket.label} 
                </label>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;