import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/actions/categoryAction";
import "../../src/css/user/header.css";
import "../../src/css/user/userstyle.css";
import "../../src/css/user/adminHeader.css";
import "../../src/css/user/bootstrap.min.css";
import Logo from '../../src/img/logo.svg';
import MiniLogo from '../../src/img/mini-logo.png';
import Search from '../../src/img/search.svg';
import Favourite from '../../src/img/favorite.svg';
import AccountBox from '../../src/img/account_box.svg';
import ShoppingCart from '../../src/img/shopping_cart.svg';
import MenuImg from '../../src/img/menu-img.webp';
import { isLoggedIn } from "../utils/auth";
import { addKeyword, fetchKeywords } from "../redux/actions/searchKeywordsAction";

const PRODUCTS_FILTERS_KEY = "productsFilters";
const saveProductsFilters = (filters) => { try { sessionStorage.setItem(PRODUCTS_FILTERS_KEY, JSON.stringify(filters)); } catch {} };
export const clearProductsFilters = () => { try { sessionStorage.removeItem(PRODUCTS_FILTERS_KEY); } catch {} };

// --- NEW: slug helper ---
const slugify = (str = "") =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

function useOutsideClick(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

function groupCategories(categories) {
  const grouped = {};
  for (const cat of categories) {
    const parent = cat.parentId || 'root';
    if (!grouped[parent]) grouped[parent] = [];
    grouped[parent].push(cat);
  }
  return grouped;
}

const PromoColumn = React.memo(({ parentTitle }) => (
  <div className="col-md-3 col-lg-2 d-none d-md-block promo-column">
    <h3 className="promo-heading">Sink Into Comfort</h3>
    <p className="promo-subheading">Explore {parentTitle}</p>
    <img src={MenuImg} className="w-100" alt="Promo" loading="lazy" />
  </div>
));

const MegaMenuColumn = React.memo(({ parent, children, groupedCategories }) => (
  <div className="nav-item dropdown mega-dropdown" key={parent.id}>
    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
      {parent.title}
    </a>
    <div className="dropdown-menu mega-menu p-1 border-0 rounded-0 m-0">
      <div className="container">
        <div className="row">
          {children.map((child) => {
            const subChildren = groupedCategories[child.id] || [];

            const baseFilters = {
              ...(parent?.id && { mainCategoryId: parent.id }),
              ...(child?.id && { subCategoryId: child.id }),
              searchStr: '',
              color: '',
              size: '',
              filterListIds: '',
              minPrice: '',
              maxPrice: '',
              sort: '',
              page: 1,
              pageSize: 24,
            };

            return (
              <div className="col-md-3 col-lg-2 col-6" key={child.id}>
                <h3>
                  {/* Child link becomes /products/{parent-slug}/{child-slug}-{childId} */}
                  <Link
                    to={`/products/${slugify(parent.title)}/${slugify(child.title)}-${child.id}`}
                    state={baseFilters}
                    className="subcategory-link"
                    onClick={() => saveProductsFilters(baseFilters)}
                  >
                    {child.title}
                  </Link>
                </h3>

                {/* Sub-children as /products/{parent-slug}/{child-slug}/{sub-slug}-{subId} */}
                {subChildren.length > 0 &&
                  subChildren.map((sub) => {
                    const subFilters = {
                      ...baseFilters,
                      ...(sub?.id && { listSubCatId: sub.id }),
                    };
                    return (
                      <Link
                        key={sub.id}
                        to={`/products/${slugify(parent.title)}/${slugify(child.title)}/${slugify(sub.title)}-${sub.id}`}
                        state={subFilters}
                        className="dropdown-item"
                        onClick={() => saveProductsFilters(subFilters)}
                      >
                        {sub.title}
                      </Link>
                    );
                  })}
              </div>
            );
          })}
          <PromoColumn parentTitle={parent.title} />
        </div>
      </div>
    </div>
  </div>
));

export default function Header() {
  const [searchParams] = useSearchParams(); // (kept; used elsewhere if needed)
  const dispatch = useDispatch();
  const { categories = [] } = useSelector((state) => state.categories || {});
  const wishlistItems = useSelector((state) => state.whishlist?.items || []);
  const wishlistCount = wishlistItems.length;
  const userCartItems = useSelector((state) => state.cart?.items);
  const guestCartItems = useSelector((state) => state.guestCart?.items);
  const cartCount = isLoggedIn() ? (userCartItems?.length || 0) : (guestCartItems?.length || 0);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const keywords = useSelector((state) => state.keywords.items || []);
  const filteredSuggestions = keywords.map((k) => k.keyword);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchKeywords({ page: 1, take: 10, search: "" }));
  }, [dispatch]);

  useOutsideClick(inputRef, () => setShowSuggestions(false));

  const groupedCategories = React.useMemo(() => groupCategories(categories), [categories]);

  const renderMegaMenuColumns = React.useCallback(() => {
    const topLevel = groupedCategories["root"] || [];
    return topLevel.map((parent) => {
      const children = groupedCategories[parent.id] || [];
      return (
        <MegaMenuColumn
          key={parent.id}
          parent={parent}
          children={children}
          groupedCategories={groupedCategories}
        />
      );
    });
  }, [groupedCategories]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const filters = { searchStr: query.trim(), page: 1, pageSize: 24 };
    dispatch(addKeyword(query.trim()));
    saveProductsFilters(filters);
    navigate("/products", { state: filters });
    setShowSuggestions(false);
  };

  return (
    <>
      {/* Top Section */}
      <div className="container-fluid px-5 py-2 border-bottom cart wow fadeIn" data-wow-delay="0.1s">
        <div className="container">
          <div className="row align-items-center top-bar">
            <div className="col-lg-3 col-md-12">
              <a href="/" className="navbar-brand m-0 p-0" onClick={clearProductsFilters}>
                <img src={Logo} alt="Logo" loading="lazy" />
              </a>
            </div>

            <div className="col-lg-5 col-md-4 my-3 position-relative" ref={inputRef}>
              <form className="d-flex" onSubmit={handleSearch} autoComplete="off">
                <input
                  type="text"
                  className="form-control1 search-input"
                  placeholder="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  aria-label="Search"
                />
                <button className="btn btn-light" type="submit" aria-label="Search">
                  <img src={Search} style={{ height: 25 }} alt="search" loading="lazy" />
                </button>
              </form>

              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="suggestions-dropdown" id="suggestions" style={{ display: "block" }}>
                  <div className="suggestions-header">Popular Searches</div>
                  <div className="suggestions-grid" id="suggestionsGrid">
                    {filteredSuggestions.map((item, idx) => (
                      <div
                        key={idx}
                        className="suggestion-item"
                        onClick={() => {
                          setShowSuggestions(false);
                          const filters = { searchStr: item, page: 1, pageSize: 24 };
                          saveProductsFilters(filters);
                          navigate("/products", { state: filters });
                        }}
                        tabIndex={0}
                        role="button"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setShowSuggestions(false);
                            const filters = { searchStr: item, page: 1, pageSize: 24 };
                            saveProductsFilters(filters);
                            navigate("/products", { state: filters });
                          }
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="col-lg-4 Wishlist col-md-8 text-end d-flex justify-content-end align-items-center gap-4">
              <a href="/wishlist" className="text-decoration-none text-dark">
                <span style={{ position: "relative", display: "inline-block" }}>
                  <img src={Favourite} alt="wishlist" loading="lazy" />
                  {wishlistCount > 0 && (
                    <span
                      className="badge rounded-pill text-white"
                      style={{ backgroundColor: "rgb(212, 14, 0)", position: "absolute", top: -8, right: -8, fontSize: "0.65rem", padding: "2px 6px" }}
                    >
                      {wishlistCount}
                    </span>
                  )}
                </span>
                Wishlist
              </a>
              <a href="/profile" className="text-decoration-none text-dark">
                <img src={AccountBox} style={{ height: 18 }} alt="account" loading="lazy" /> My Account
              </a>
              <a href="/cart" className="text-decoration-none text-dark">
                <span style={{ position: "relative", display: "inline-block" }}>
                  <img src={ShoppingCart} alt="cart" loading="lazy" />
                  {cartCount > 0 && (
                    <span className="badge rounded-pill text-white" style={{ backgroundColor: "rgb(212, 14, 0)", position: "absolute", top: -8, right: -8, fontSize: "0.65rem", padding: "2px 6px" }}>
                      {cartCount}
                    </span>
                  )}
                </span>
                My Cart
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid px-5 py-2 cart wow fadeIn" data-wow-delay="0.1s">
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top py-lg-0 wow fadeIn" data-wow-delay="0.1s">
          <a href="#" className="navbar-brand ms-3 d-lg-none">MENU</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <i className="bi bi-list" style={{ fontSize: "1.5rem" }}></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav mx-auto p-3 p-lg-0 d-flex justify-content-center">
              <a href="/" className="navbar-brand sticky-logo" onClick={clearProductsFilters}>
                <img src={MiniLogo} alt="Logo" style={{ maxHeight: 40, width: "100%" }} loading="lazy" />
              </a>
              {renderMegaMenuColumns()}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
