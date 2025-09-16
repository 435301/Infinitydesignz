import React, { useEffect, useMemo, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import "../../css/user/userstyle.css";
import "../../css/admin/icofont.css";
import Header from "../../includes/header";
import Footer from "../../includes/footer";
import ProductCard from "../../components/productCard";
import axios from "axios";
import BASE_URL from "../../config/config";
import { useSelector } from "react-redux";
import FilterSidebar from "../../components/filterSideBar";

const PRODUCTS_FILTERS_KEY = "productsFilters";

// helpers
const num = (v, def = null) => {
  if (v === null || v === undefined || v === "") return def;
  const n = Number(v);
  return Number.isFinite(n) ? n : def;
};

// extract ID from "slug-123"
const extractIdFromSlug = (seg) => {
  if (!seg) return null;
  const parts = seg.split("-");
  const last = parts[parts.length - 1];
  const n = Number(last);
  return Number.isFinite(n) ? n : null;
};
const toSlug = (title = "") =>
  String(title)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const makeSlug = (title, id) => `${toSlug(title)}-${id}`;


const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
const [sortOrder, setSortOrder] = useState("newest");
  const [searchParams] = useSearchParams();
  const { state: navState } = useLocation();
  const { main, sub, leaf } = useParams();

  const categories = useSelector((s) => s.categories.categories || []);

  // quick lookup
  const byId = useMemo(() => {
    const m = {};
    categories.forEach((c) => (m[c.id] = c));
    return m;
  }, [categories]);

  // extract ids from slugs
  let mainCategoryId = extractIdFromSlug(main);
  let subCategoryId = extractIdFromSlug(sub);
  let listSubCatId = extractIdFromSlug(leaf);

  // derive missing parents from tree
  if (listSubCatId && byId[listSubCatId]) {
    const child = byId[listSubCatId];
    if (!subCategoryId && child.parentId) subCategoryId = child.parentId;
    if (subCategoryId && byId[subCategoryId] && !mainCategoryId) {
      const subNode = byId[subCategoryId];
      if (subNode.parentId) mainCategoryId = subNode.parentId;
    }
  } else if (subCategoryId && byId[subCategoryId] && !mainCategoryId) {
    const subNode = byId[subCategoryId];
    if (subNode.parentId) mainCategoryId = subNode.parentId;
  }

  // merge filters
  const filters = useMemo(() => {
    const defaults = {
      searchStr: "",
      color: "",
      size: "",
      filterListIds: "",
      priceRanges: "",
      minPrice: "",
      maxPrice: "",
      sort: "",
      page: 1,
      pageSize: 24,
      discountPctMin: "",
      discountPctMax: "",
    };

    const fromUrl = {};
    [
      "brandId",
      "searchStr",
      "color",
      "size",
      "filterListIds",
      "priceRanges",
      "minPrice",
      "maxPrice",
      "sort",
      "page",
      "pageSize",
      "discountPctMin",
      "discountPctMax",
    ].forEach((k) => {
      const v = searchParams.get(k);
      if (v !== null) fromUrl[k] = v;
    });

    let fromSession = {};
    try {
      const raw = sessionStorage.getItem(PRODUCTS_FILTERS_KEY);
      if (raw) fromSession = JSON.parse(raw) || {};
    } catch { }

    const fromState = navState || {};
    const derivedIds = {
      ...(mainCategoryId ? { mainCategoryId } : {}),
      ...(subCategoryId ? { subCategoryId } : {}),
      ...(listSubCatId ? { listSubCatId } : {}),
    };

    return { ...defaults, ...fromUrl, ...fromSession, ...fromState, ...derivedIds };
  }, [searchParams, navState, mainCategoryId, subCategoryId, listSubCatId]);

  // updater for sidebar
  const onChangeFilters = (patch) => {
    const next = { ...filters, ...patch };
    try {
      sessionStorage.setItem(PRODUCTS_FILTERS_KEY, JSON.stringify(next));
    } catch { }
    // stay on same slug path
    const segments = [
      main,
      sub,
      leaf,
    ].filter(Boolean);
    navigate(`/products${segments.length ? "/" + segments.join("/") : ""}`, {
      state: next,
      replace: true,
    });
  };

  const getCategoryTitle = (id) =>
    (id ? byId[id]?.title : null) || "Unknown";

  const breadcrumbItems = useMemo(() => {
    const items = [{ label: "Home", link: "/" }];

    // Search mode
    if (filters.searchStr && filters.searchStr.trim() !== "") {
      items.push({ label: "Search" });
      items.push({ label: filters.searchStr.trim() });
      return items;
    }

    // Use current URL segments for *previous* parts (no ids),
    // and add id only for the clicked segment.
    // main, sub, leaf come from useParams()
    if (mainCategoryId) {
      const mainWithId = makeSlug(byId[mainCategoryId]?.title || "", mainCategoryId);
      items.push({
        label: getCategoryTitle(mainCategoryId),
        link: `/products/${mainWithId}`, // Luxury → /products/luxury-000
      });
    }

    if (subCategoryId) {
      const subWithId = makeSlug(byId[subCategoryId]?.title || "", subCategoryId);
      const mainSegment = main || toSlug(byId[mainCategoryId]?.title || "");
      items.push({
        label: getCategoryTitle(subCategoryId),
        link: `/products/${mainSegment}/${subWithId}`, // Home Office → /products/luxury/home-office-009
      });
    }

    if (listSubCatId) {
      // Leaf: NO LINK on category page
      items.push({
        label: getCategoryTitle(listSubCatId),
        // no link here: Office Chairs → plain text (current page)
      });
    }

    return items;
    // include `main` so changes in URL segment reflect correctly
  }, [filters.searchStr, byId, mainCategoryId, subCategoryId, listSubCatId, main]);

  useEffect(() => {
    setProducts([]);

    const queryString = new URLSearchParams(
      Object.fromEntries(
        Object.entries(filters).filter(
          ([, v]) => v !== "" && v !== null && v !== undefined
        )
      )
    ).toString();

    axios
      .get(`${BASE_URL}/products/search?${queryString}`)
      .then((res) => {
        const rawProducts = res.data?.items || [];

        const minPrice = num(filters.minPrice, 0);
        const maxPrice = num(filters.maxPrice, Infinity);
        const discMin = num(filters.discountPctMin, 0);
        const discMax = num(filters.discountPctMax, Infinity);
        const colorIds = filters.color
          ? String(filters.color)
            .split(",")
            .map((c) => Number(c))
            .filter((n) => !Number.isNaN(n))
          : [];

        const inRange = (sellingPrice, discountPct) =>
          sellingPrice >= minPrice &&
          sellingPrice <= maxPrice &&
          discountPct >= discMin &&
          discountPct <= discMax;

        const filtered = rawProducts.flatMap((product) => {
          const productDiscount = product.productDiscountPercent || 0;

          const matchesColor =
            colorIds.length === 0 ||
            colorIds.includes(product.colorId) ||
            (product.variants || []).some((v) =>
              colorIds.includes(v.colorId)
            );
          if (!matchesColor) return [];

          const productInRange = inRange(
            product.sellingPrice,
            productDiscount
          );

          const variantsInRange = (product.variants || []).filter(
            (v) =>
              inRange(v.sellingPrice, v.discountPercent || 0) &&
              (colorIds.length === 0 || colorIds.includes(v.colorId))
          );

          if (productInRange && variantsInRange.length > 0) {
            if (colorIds.length > 0) {
              return variantsInRange.map((variant) => ({
                ...product,
                variantId: variant.id,
                isVariant: true,
                _variant: variant,
                mrp: variant.mrp,
                sellingPrice: variant.sellingPrice,
                discountPct: variant.badgeDiscountPercent || 0,
              }));
            }
            const mainProductEntry = {
              ...product,
              isVariant: false,
              discountPct: productDiscount,
            };
            const variantEntries = variantsInRange.map((variant) => ({
              ...product,
              variantId: variant.id,
              isVariant: true,
              _variant: variant,
              mrp: variant.mrp,
              sellingPrice: variant.sellingPrice,
              discountPct: variant.badgeDiscountPercent || 0,
            }));
            return [mainProductEntry, ...variantEntries];
          } else if (!productInRange && variantsInRange.length > 0) {
            return variantsInRange.map((variant) => ({
              ...product,
              variantId: variant.id,
              isVariant: true,
              _variant: variant,
              mrp: variant.mrp,
              sellingPrice: variant.sellingPrice,
              discountPct: variant.badgeDiscountPercent || 0,
            }));
          } else if (productInRange && variantsInRange.length === 0) {
            return [
              { ...product, isVariant: false, discountPct: productDiscount },
            ];
          }
          return [];
        });
        setProducts(filtered);
      })
      .catch((err) => console.error("GET: Failed to fetch products", err));
  }, [filters]);

  // --- Sorting function ---
const sortedProducts = useMemo(() => {
  let sorted = [...products];
  if (sortOrder === "price-low-high") {
    sorted.sort((a, b) => a.sellingPrice - b.sellingPrice);
  } else if (sortOrder === "price-high-low") {
    sorted.sort((a, b) => b.sellingPrice - a.sellingPrice);
  } else if (sortOrder === "newest") {
    sorted.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  return sorted;
}, [products, sortOrder]);

  const groupByListSubCategory = (items) => {
    const grouped = {};
    items.forEach((p) => {
      const key = p?.category?.title || "Others";
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(p);
    });
    return grouped;
  };

  return (
    <>
      <Header />
      <section className="section-index py-3 breadcrumb-all" style={{ backgroundColor: "#f4f4f4" }}>
        <div className="container shop">
          <div className="row">
            <div className="col-lg-12">
              <div>
                {breadcrumbItems.map((item, index) => (
                  <span key={index}>
                    {item.link ? (
                      <Link to={item.link}>{item.label}</Link>
                    ) : (
                      <strong>{item.label}</strong>
                    )}
                    {index < breadcrumbItems.length - 1 && (
                      <span className="mx-2">{">"}</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="terms-of-service">
        <div className="container">
          {/* <h2>Products</h2> */}
          <div className="row align-items-center mb-4 mt-4">
            {/* Left side: Category title + item count */}
            <div className="col-lg-6 col-md-6 col-12">
              {subCategoryId && (
                <div className="mb-4 mt-4">
                  <h5 className="product-title py-2">
                    {listSubCatId
                      ? getCategoryTitle(listSubCatId)
                      : getCategoryTitle(subCategoryId)}{" "}
                    ({products.length} item{products.length !== 1 ? "s" : ""})
                  </h5>
                </div>
              )}
            </div>
            <div className="col-lg-6 col-md-6 col-12 text-lg-end text-md-end text-start">

              <div class="product-sorting d-flex align-items-center justify-content-lg-end mb-3">
                <label for="sort" class="sort-label me-2">Sort by:</label>
                <form action="#" method="get">
                  <select id="sort" name="sort" className="form-select custom-select sort"  value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="recommended" selected>Newest</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="price-low-high">Price: Low to High</option>
                  </select>
                </form>
              </div>
            </div>
          </div>

          <div className="row">
            {listSubCatId !== null && (
              <div className="col-lg-3 pb-5">
                <FilterSidebar filters={filters} onChangeFilters={onChangeFilters} />
              </div>
            )}

            <div
              className={
                listSubCatId ? "col-lg-9 mb-3 sg" : "col-lg-12 mb-3 sg"
              }
            >
              <div className="Fabric pb-4">
                {sortedProducts.length > 0 ? (
                  subCategoryId && !listSubCatId ? (
                    Object.entries(groupByListSubCategory(sortedProducts)).map(
                      ([listSubCatTitle, subProducts]) => (
                        <div key={listSubCatTitle} className="mb-5">
                          <h6 className="mb-3 product-title">{listSubCatTitle}</h6>
                          <div className="row row-cols-1 row-cols-md-4 g-4">
                            {subProducts.map((product) => (
                              <ProductCard
                                key={`${product.id}-${product.variantId || "base"}`}
                                product={product}
                                variant={product._variant}
                              />
                            ))}
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <div className="row row-cols-1 row-cols-md-4">
                      {sortedProducts.map((product) => (
                        <ProductCard
                          size="medium"
                          key={`${product.id}-${product.variantId || "base"}`}
                          product={product}
                          variant={product._variant}
                        />
                      ))}
                    </div>
                  )
                ) : (
                  <p className="text-center ">No products found for this category.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProductsPage;
