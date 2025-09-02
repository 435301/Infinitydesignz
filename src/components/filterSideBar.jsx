import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
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

        const minPrice = Math.min(
          ...selectedBuckets.map((b) => b.min).filter((v) => v != null && !isNaN(v))
        );

        const maxValues = selectedBuckets
          .map((b) => b.max)
          .filter((v) => v != null && !isNaN(v));

        currentParams.set("priceRanges", updatedValues.join(","));
        currentParams.set("minPrice", minPrice);

        if (maxValues.length > 0) {
          currentParams.set("maxPrice", Math.max(...maxValues));
        } else {
          currentParams.delete("maxPrice");
        }
      }
    }else if (filterType === "discountPctMin") {
      // Transform value to remove "disc_" prefix
      const numericValue = value.replace(/^disc_/, '');
      console.log(`Transformed discount value: ${value} -> ${numericValue}`);
      if (currentParams.get("discountPctMin") === numericValue) {
        currentParams.delete("discountPctMin");
      } else {
        currentParams.set("discountPctMin", numericValue);
      }
    }
    else {
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

  const clearFilters = () => {
    const currentParams = new URLSearchParams(searchParams);
    ["color", "size", "filterListIds", "priceRanges", "minPrice", "maxPrice","discountPctMin"].forEach((key) => {
      currentParams.delete(key);
    });
    setSearchParams(currentParams);
  };

  if (!filters) return null;



   const renderDiscountFilterSection = (title, items, filterType) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="filter-section">
        <h6>{title}</h6>
        {/* {items.map((item) => (
          
          <div key={item.id || item.key} className="filter-option">
            <label className="radio-label">
              <input
                type="radio"
                name="discountPctMin"
                checked={searchParams.get(filterType) === String(item.id?? item.key)}
                onChange={() => handleFilterChange(filterType, String(item.id ?? item.key))}
              />
              {item.label}
            </label>
          </div>
        ))} */}
         {items.map((item) => {
        const value = String(item.id ?? item.key); // always string
        return (
          <div key={value} className="filter-option">
            <label className="radio-label">
              <input
                type="radio"
                name="discountPctMin"
                value={value}
                checked={searchParams.get(filterType) === value}
                onChange={() => handleFilterChange(filterType, value)}
              />
              {item.label}
            </label>
          </div>
        );
      })}
      </div>
    );
  };

  return (
    <div className="filter-sidebar">
      {/* Clear Filters Button */}
      <div class="filter-header px-3 pt-3">
        <h4 className="text-dark">Filter</h4>
        <a className=" mb-3" onClick={clearFilters}>
          Clear Filters
        </a>                        </div>


      {/* Sidebar filters (category-specific like Size, Dimensions) */}
      {filters.sidebar?.length > 0 &&
        filters.sidebar.map((group) => (
          <div key={group.id} className="filter-section">
            <h5>{group.name}</h5>
            {group.sets.map((set) => (
              <div key={set.id} className="filter-subgroup">
                <h5>{set.title}</h5>
                {set.lists.map((option) => (
                  <div key={option.id} className="filter-option">
                    <label className="checkbox-label">
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
      {renderDiscountFilterSection("Discount", filters.discountRanges, "discountPctMin")}

      {/* Colors */}
      {/* {renderFilterSection("Colors", filters.colors, "color","label")} */}
      {filters.colors?.length > 0 && (
        <div className="filter-section">
          <h6>Colors</h6>
          {filters.colors.map((color) => (
            <div key={color.id} className="filter-option">
              <label className="checkbox-label d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={searchParams.get("color")?.split(",").includes(color.id.toString()) || false}
                  onChange={() => handleFilterChange("color", color.id.toString())}
                />
                <span
                  style={{
                    display: "inline-block",
                    width: "16px",
                    height: "16px",
                    backgroundColor: color.hex_code,
                    border: "1px solid #ccc",
                    marginRight: "6px",
                    borderRadius: "50%",
                  }}
                ></span>
                {color.label}
              </label>
            </div>
          ))}
        </div>
      )}


      {/* Materials */}
      {/* {renderFilterSection("Materials", filters.materials, "material")} */}

      {/* Price Buckets */}
      {filters.price?.buckets?.some((bucket) => bucket.count > 0) && (
        <div className="filter-section mt-4">
          <h6>Price</h6>
          {filters.price.buckets.map((bucket) =>
            bucket.count > 0 ? (
              <div key={bucket.key} className="filter-option">
                <label className="checkbox-label">
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