import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/css/user/header.css";
import "../../src/css/user/userstyle.css";
import Logo from '../../src/img/logo.svg';
import Search from '../../src/img/search.svg';
import Favourite from '../../src/img/favorite.svg';
import AccountBox from '../../src/img/account_box.svg';
import ShoppingCart from '../../src/img/shopping_cart.svg';
import MiniLogo from '../../src/img/mini-logo.png';
import '../../src/css/user/bootstrap.min.css';
import { Link } from "react-router-dom";
import MenuImg from '../../src/img/menu-img.webp'
import { NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from "../redux/actions/categoryAction";


export default function Header() {
  const dispatch = useDispatch();
  const {categories =[]} = useSelector((state)=> state.categories || {});

 useEffect(()=>{
  dispatch(fetchCategories())
 }, [dispatch]);

 const groupByParent = (categories) => {
  const grouped = {};
  categories.forEach(cat => {
    const parent = cat.parent_id || 'root';
    if (!grouped[parent]) grouped[parent] = [];
    grouped[parent].push(cat);
  });
  return grouped;
};
const renderMenu = (parentId, grouped) => {
  const children = grouped[parentId] || [];
  return (
    <ul className="dropdown-menu border-0 rounded-0 rounded-bottom m-0 show">
      {children.map(child => (
        <li key={child.id} className="dropdown-submenu">
          <Link to={`/shop.php?category=${child.id}`} className="dropdown-item">
            {child.title}
          </Link>
          {grouped[child.id] && grouped[child.id].length > 0 && renderMenu(child.id, grouped)}
        </li>
      ))}
    </ul>
  );
};

const groupedCategories = groupByParent(categories);


  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const suggestionsList = [
    "4 Door Wardrobes",
    "4 seater dining table set",
    "Centre Tab",
    "Sofa Cum Beds",
    "TV Units",
    "Writing Tables",
    "study table",
  ];




  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search.jsx?query=${encodeURIComponent(query.trim())}`);
    }
  };

  const filteredSuggestions = suggestionsList.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  { console.log("Filtered:", filteredSuggestions) }


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar.sticky-top");
      if (window.scrollY > 50) {
        navbar?.classList.add("sticky");
      } else {
        navbar?.classList.remove("sticky");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    
      {/* Brand & Contact */}
      <div className="container-fluid px-5 py-2 border-bottom cart wow fadeIn" data-wow-delay="0.1s">
        <div className="container">
          <div className="row align-items-center top-bar">
            <div className="col-lg-3 col-md-12">
              <a href="/" className="navbar-brand m-0 p-0">
                <img src={Logo} alt="Logo" />
              </a>
            </div>
            {/* Search Bar  */}
            <div className="col-lg-5 col-md-4 my-3 position-relative" ref={inputRef}>
              <form className="d-flex" onSubmit={handleSearch}>
                <input
                  type="text"
                  className="form-control1 search-input"
                  placeholder="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                />
                <button className="btn btn-light" type="submit">
                  <img src={Search} style={{ height: 25 }} alt="search" />
                </button>
              </form>
              {/* Suggestions Dropdown */}
              {showSuggestions && (
                <div className="suggestions-dropdown" id="suggestions" style={{ display: "block" }} >
                  <div className="suggestions-header">Popular Searches</div>
                  <div className="suggestions-grid" id="suggestionsGrid">
                    {filteredSuggestions.map((item, idx) => (
                      <div
                        key={idx}
                        className="suggestion-item"
                        onClick={() => navigate(`/shop.jsx?query=${encodeURIComponent(item)}`)}
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
                  <img src={Favourite} alt="wishlist" />
                  <span className="badge rounded-pill text-white" style={{ backgroundColor: "rgb(212, 14, 0)", position: "absolute", top: -8, right: -8, fontSize: "0.65rem", padding: "2px 6px" }}>
                    2
                  </span>
                </span>
                Wishlist
              </a>
              <a href="/profile" className="text-decoration-none text-dark">
                <img src={AccountBox} style={{ height: 18 }} alt="account" /> My Account
              </a>
              <a href="/cart" className="text-decoration-none text-dark">
                <span style={{ position: "relative", display: "inline-block" }}>
                  <img src={ShoppingCart} alt="cart" />
                  <span className="badge rounded-pill text-white" style={{ backgroundColor: "rgb(212, 14, 0)", position: "absolute", top: -8, right: -8, fontSize: "0.65rem", padding: "2px 6px" }}>
                    4
                  </span>
                </span>
                My Cart
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top py-lg-0 wow fadeIn" data-wow-delay="0.1s">
        <a href="#" className="navbar-brand ms-3 d-lg-none">MENU</a>
        <button className="navbar-toggler me-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav mx-auto p-3 p-lg-0 d-flex justify-content-center">
            <Link href="/" className="navbar-brand sticky-logo">
              <img src={MiniLogo} alt="Logo" style={{ maxHeight: 40, width: "100%" }} />
            </Link>
           {groupedCategories['root']?.map((topLevel) => (
              <div key={topLevel.id} className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                  {topLevel.title}
                </a>
                {renderMenu(topLevel.id, groupedCategories)}
              </div>
            ))}
            
          </div>
        </div>
      </nav>
    </>
  );
}
