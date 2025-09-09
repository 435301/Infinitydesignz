import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import "../css/user/filterSidebar.css";
import BASE_URL from "../config/config";

/**
 * Optional props:
 *  - filters: current filters (source of truth)
 *  - onChangeFilters(next): update callback (keeps URL clean)
 * If not provided, falls back to URL params (legacy behavior).
 */
const FilterSidebar = ({ filters: propsFilters, onChangeFilters }) => {
  const [facetData, setFacetData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const toStr = (v) =>
    v === null || v === undefined ? "" : Array.isArray(v) ? v.join(",") : String(v);
  const toArr = (s) =>
    (typeof s === "string" ? s.split(",") : [])
      .map((x) => x.trim())
      .filter(Boolean);

  // Use category IDs from props when available; else URL
  const identity = useMemo(() => {
    const fromProps = {
      ...(propsFilters?.mainCategoryId && { mainCategoryId: String(propsFilters.mainCategoryId) }),
      ...(propsFilters?.subCategoryId && { subCategoryId: String(propsFilters.subCategoryId) }),
      ...(propsFilters?.listSubCatId && { listSubCatId: String(propsFilters.listSubCatId) }),
    };
    if (Object.keys(fromProps).length) return fromProps;

    const sp = {};
    if (searchParams.get("mainCategoryId")) sp.mainCategoryId = searchParams.get("mainCategoryId");
    if (searchParams.get("subCategoryId")) sp.subCategoryId = searchParams.get("subCategoryId");
    if (searchParams.get("listSubCatId")) sp.listSubCatId = searchParams.get("listSubCatId");
    return sp;
  }, [propsFilters, searchParams]);

  // Current filter values for checked states
  const current = useMemo(() => {
    const base = {
      mainCategoryId: "",
      subCategoryId: "",
      listSubCatId: "",
      brandId: "",
      searchStr: "",
      color: "",
      size: "",
      filterListIds: "",
      priceRanges: "",
      minPrice: "",
      maxPrice: "",
      sort: "",
      page: "",
      pageSize: "",
      discountPctMin: "",
      discountPctMax: "",
    };

    if (propsFilters) {
      return {
        ...base,
        ...Object.fromEntries(Object.entries(propsFilters).map(([k, v]) => [k, toStr(v)])),
      };
    }
    const out = { ...base };
    Object.keys(base).forEach((k) => {
      const v = searchParams.get(k);
      if (v !== null) out[k] = v;
    });
    return out;
  }, [propsFilters, searchParams]);

  // Fetch facets (colors, price buckets, sidebar sets, discounts)
  useEffect(() => {
    const qs = new URLSearchParams(identity).toString();
    if (!qs) return;
    axios
      .get(`${BASE_URL}/filters?${qs}`)
      .then((res) => setFacetData(res.data || {}))
      .catch((err) => console.error("Failed to fetch filters", err));
  }, [identity]);

  // Apply change via props (preferred) or URL fallback
  const applyChange = (patch) => {
    if (onChangeFilters) {
      onChangeFilters({ ...propsFilters, ...patch });
      return;
    }
    const next = new URLSearchParams(searchParams);
    Object.entries(patch).forEach(([k, v]) => {
      if (v === "" || v === null || v === undefined) next.delete(k);
      else next.set(k, Array.isArray(v) ? v.join(",") : String(v));
    });
    setSearchParams(next);
  };

  const handleFilterChange = (filterType, value) => {
    const curVals = toArr(current[filterType]);
    const isSelected = curVals.includes(value);

    if (filterType === "priceRanges") {
      const updated = isSelected ? curVals.filter((v) => v !== value) : [...curVals, value];
      const buckets = facetData?.price?.buckets || [];
      const selected = buckets.filter((b) => updated.includes(b.key));

      const patch = {
        priceRanges: updated.length ? updated.join(",") : "",
        page: "",
      };

      if (updated.length === 0) {
        patch.minPrice = "";
        patch.maxPrice = "";
      } else {
        const mins = selected
          .map((b) => b.min)
          .filter((v) => v != null && !Number.isNaN(Number(v)))
          .map(Number);
        const maxs = selected
          .map((b) => b.max)
          .filter((v) => v != null && !Number.isNaN(Number(v)))
          .map(Number);
        patch.minPrice = mins.length ? Math.min(...mins) : "";
        patch.maxPrice = maxs.length ? Math.max(...maxs) : "";
      }

      applyChange(patch);
      return;
    }

    if (filterType === "discountPctMin") {
      // value might be "disc_10" or "10" depending on API — normalize to just the number string
      const numeric = String(value).replace(/^disc_/, "");
      applyChange({
        discountPctMin: current.discountPctMin === numeric ? "" : numeric,
        page: "",
      });
      return;
    }

    // multi-selects: color, size, filterListIds, etc.
    const nextVals = isSelected ? curVals.filter((v) => v !== value) : [...curVals, value];
    applyChange({ [filterType]: nextVals.length ? nextVals.join(",") : "", page: "" });
  };

  const clearFilters = () => {
    applyChange({
      color: "",
      size: "",
      filterListIds: "",
      priceRanges: "",
      minPrice: "",
      maxPrice: "",
      discountPctMin: "",
      discountPctMax: "",
      page: "",
    });
  };

  if (!facetData) return null;

  const isChecked = (type, k) => toArr(current[type]).includes(String(k));

  // ---------- FIXED: discount radio checked state ----------
  const renderDiscountFilterSection = (title, items, filterType) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="filter-section">
        <h6>{title}</h6>
        {items.map((item) => {
          // option could be { key: "disc_10", label: "10% and above" } or { id: 10 }
          const raw = String(item.id ?? item.key ?? item.value ?? "");
          const numeric = raw.replace(/^disc_/, ""); // normalize to "10", "20", ...
          const checked = current[filterType] === numeric;

          return (
            <div key={raw} className="filter-option">
              <label className="radio-label">
                <input
                  type="radio"
                  name="discountPctMin"
                  checked={checked}
                  onChange={() => handleFilterChange(filterType, raw)}
                />
                 <span className="ms-2">{item.label}</span>
              </label>
            </div>
          );
        })}
      </div>
    );
  };
  // --------------------------------------------------------

  return (
    <div className="filter-sidebar">
      <div className="filter-header px-3 pt-3">
        <h4 className="text-dark">Filter</h4>
        <a className="mb-3" onClick={clearFilters} style={{ cursor: "pointer" }}>
          Clear all
        </a>
      </div>

      {/* Category-specific sets */}
      {facetData.sidebar?.length > 0 &&
        facetData.sidebar.map((group) => (
          <div key={group.id} className="filter-section">
            {/* <h5>{group.name}</h5> */}
            {group.sets.map((set) => (
              <div key={set.id} className="filter-subgroup">
                <h5>{set.title}</h5>
                {set.lists.map((option) => (
                  <div key={option.id} className="filter-option">
                    <label className={`checkbox-label ${isChecked("filterListIds", option.id) ? "checked-label" : ""
                      }`}>
                      <input
                        type="checkbox"
                        checked={isChecked("filterListIds", option.id)}
                        onChange={() =>
                          handleFilterChange("filterListIds", String(option.id))
                        }
                      />
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}

      {/* Discounts as radio */}
      {renderDiscountFilterSection("Discount", facetData.discountRanges, "discountPctMin")}

      {/* Colors */}
      {facetData.colors?.length > 0 && (
        <div className="filter-section">
          <h6>Colors</h6>
          {facetData.colors.map((color) => (
            <div key={color.id} className="filter-option">
              <label className="checkbox-label d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={isChecked("color", color.id)}
                  onChange={() => handleFilterChange("color", String(color.id))}
                />
                <span
                  style={{
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
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

      {/* Price buckets */}
      {facetData.price?.buckets?.some((b) => b.count > 0) && (
        <div className="filter-section mt-4">
          <h6>Price</h6>
          {facetData.price.buckets.map((bucket) =>
            bucket.count > 0 ? (
              <div key={bucket.key} className="filter-option">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={isChecked("priceRanges", bucket.key)}
                    onChange={() =>
                      handleFilterChange("priceRanges", String(bucket.key))
                    }
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
