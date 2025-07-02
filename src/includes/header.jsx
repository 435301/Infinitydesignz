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

export default function Header() {

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

const dropdownData = [
  {
    title: "Sofas & Seating",
    items: [
      { label: "Features", href: "feature.html" },
      { label: "Our Team", href: "team.html" },
      { label: "Testimonial", href: "testimonial.html" },
      { label: "404 Page", href: "404.html" },
    ],
  },
  {
    title: "Mattresses",
    items: [
      { label: "Features", href: "feature.html" },
      { label: "Our Team", href: "team.html" },
      { label: "Testimonial", href: "testimonial.html" },
      { label: "404 Page", href: "404.html" },
    ],
  },
  {
    title: "Home Decor",
    items: [
      { label: "Features", href: "feature.html" },
      { label: "Our Team", href: "team.html" },
      { label: "Testimonial", href: "testimonial.html" },
      { label: "404 Page", href: "404.html" },
    ],
  },
  {
    title: "Lamps & Lighting",
    items: [
      { label: "Features", href: "feature.html" },
      { label: "Our Team", href: "team.html" },
      { label: "Testimonial", href: "testimonial.html" },
      { label: "404 Page", href: "404.html" },
    ],
  },
  {
    title: "Kitchen & Dining",
    items: [
      { label: "Features", href: "feature.html" },
      { label: "Our Team", href: "team.html" },
      { label: "Testimonial", href: "testimonial.html" },
      { label: "404 Page", href: "404.html" },
    ],
  },
  {
    title: "Luxury",
    items: [
      { label: "Features", href: "feature.html" },
      { label: "Our Team", href: "team.html" },
      { label: "Testimonial", href: "testimonial.html" },
      { label: "404 Page", href: "404.html" },
    ],
  },
  {
    title: "Modular",
    items: [
      { label: "Features", href: "feature.html" },
      { label: "Our Team", href: "team.html" },
      { label: "Testimonial", href: "testimonial.html" },
      { label: "404 Page", href: "404.html" },
    ],
  },
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
              <a href="/wishlist.php" className="text-decoration-none text-dark">
                <span style={{ position: "relative", display: "inline-block" }}>
                  <img src={Favourite} alt="wishlist" />
                  <span className="badge rounded-pill text-white" style={{ backgroundColor: "rgb(212, 14, 0)", position: "absolute", top: -8, right: -8, fontSize: "0.65rem", padding: "2px 6px" }}>
                    2
                  </span>
                </span>
                Wishlist
              </a>
              <a href="/profile.php" className="text-decoration-none text-dark">
                <img src={AccountBox} style={{ height: 18 }} alt="account" /> My Account
              </a>
              <a href="/cart.php" className="text-decoration-none text-dark">
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
            <a href="/" className="navbar-brand sticky-logo">
              <img src={MiniLogo} alt="Logo" style={{ maxHeight: 40, width: "100%" }} />
            </a>

            {/* Example nav item */}
            <div className="nav-item dropdown mega-dropdown">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                Furniture
              </a>
              <div className="dropdown-menu mega-menu p-1 border-0 rounded-0 m-0" style={{alignItems:"center"}}>
                <div className="container">
                  <div className="row" >
                    {/* Column 1: Sofas */}
                    <div className="col-md-3 col-lg-2 col-6">
                      <h3>Sofas</h3>
                      {[
                        "3 Seater Sofas",
                        "2 Seater Sofas",
                        "1 Seater Sofas",
                        "Solo Sets",
                        "Sectional Sofas",
                        "LHS Sectionals",
                        "RHS Sectionals",
                        "Corner Sofas",
                      ].map((item, index) => (
                        <Link key={index} to="/shop.php" className="dropdown-item">
                          {item}
                        </Link>
                      ))}
                    </div>

                    {/* Column 2: Recliners */}
                    <div className="col-md-3 col-lg-2 col-6 menu-bg">
                      <h3>Recliners</h3>
                      {[
                        "1 Seater Recliners",
                        "2 Seater Recliners",
                        "3 Seater Recliners",
                        "Recliner Sets",
                        "Chaise Loungers",
                        "Sofa Chairs",
                        "Wing Chairs",
                      ].map((item, index) => (
                        <Link key={index} to="/shop.php" className="dropdown-item">
                          {item}
                        </Link>
                      ))}
                    </div>

                    {/* Column 3: Accent Chairs */}
                    <div className="col-md-3 col-lg-2 col-6">
                      <h3>Accent Chairs</h3>
                      {[
                        "Arm Chairs",
                        "Rocking Chairs",
                        "Folding Chairs",
                        "Iconic Chairs",
                        "Cafe Chairs",
                        "Office Chairs",
                        "Ergonomic Chairs",
                        "Executive Chairs",
                      ].map((item, index) => (
                        <Link key={index} to="/shop.php" className="dropdown-item">
                          {item}
                        </Link>
                      ))}
                    </div>

                    {/* Column 4: Dining Chairs */}
                    <div className="col-md-3 col-lg-2 col-6 menu-bg">
                      <h3>Dining Chairs</h3>
                      {[
                        "Bar Seating",
                        "Bar Stools & Bar Table Sets",
                        "Plastic Chairs",
                        "Table & Chair Sets",
                        "Settees & Benches",
                        "Settees",
                        "Benches",
                        "Recliners",
                      ].map((item, index) => (
                        <Link key={index} to="/shop.php" className="dropdown-item">
                          {item}
                        </Link>
                      ))}
                    </div>

                    {/* Column 5: Top Brands */}
                    <div className="col-md-3 col-lg-2 col-6">
                      <h3>Top Brands</h3>
                      {[
                        "Febonic",
                        "Trend Furniture",
                        "Durian",
                        "Godrej Interio",
                        "Sleepyhead",
                        "Wakeup India",
                        "Duroflex",
                        "Royaloak",
                      ].map((brand, index) => (
                        <Link key={index} to="/shop.php" className="dropdown-item">
                          {brand}
                        </Link>
                      ))}
                    </div>
                    <div className="col-md-3 col-lg-2 col-6">
                      <h3>Accent Chairs</h3>
                      {[
                        "Arm Chairs",
                        "Rocking Chairs",
                        "Folding Chairs",
                        "Iconic Chairs",
                        "Cafe Chairs",
                        "Office Chairs",
                        "Ergonomic Chairs",
                        "Executive Chairs",
                      ].map((item, index) => (
                        <Link key={index} to="/shop.php" className="dropdown-item">
                          {item}
                        </Link>
                      ))}
                    </div>

                    {/* Column 4: Dining Chairs */}
                    <div className="col-md-3 col-lg-2 col-6 menu-bg">
                      <h3>Dining Chairs</h3>
                      {[
                        "Bar Seating",
                        "Bar Stools & Bar Table Sets",
                        "Plastic Chairs",
                        "Table & Chair Sets",
                        "Settees & Benches",
                        "Settees",
                        "Benches",
                        "Recliners",
                      ].map((item, index) => (
                        <Link key={index} to="/shop.php" className="dropdown-item">
                          {item}
                        </Link>
                      ))}
                    </div>

                    {/* Column 5: Top Brands */}
                    <div className="col-md-3 col-lg-2 col-6">
                      <h3>Top Brands</h3>
                      {[
                        "Febonic",
                        "Trend Furniture",
                        "Durian",
                        "Godrej Interio",
                        "Sleepyhead",
                        "Wakeup India",
                        "Duroflex",
                        "Royaloak",
                      ].map((brand, index) => (
                        <Link key={index} to="/shop.php" className="dropdown-item">
                          {brand}
                        </Link>
                      ))}
                    </div>

                    {/* Column 6: Promo Column */}
                    <div className="col-md-3 col-lg-2 d-none d-md-block promo-column">
                      <h3 className="promo-heading">Sink Into Comfort</h3>
                      <p className="promo-subheading">Explore 3-Seater Sofas</p>
                      <img src={MenuImg} className="w-100" alt="Promotional Image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                Sofas & Seating
              </a>
              <div className="dropdown-menu border-0 rounded-0 rounded-bottom m-0">
                <a href="feature.html" className="dropdown-item">Features</a>
                <a href="team.html" className="dropdown-item">Our Team</a>
                <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                <a href="404.html" className="dropdown-item">404 Page</a>
              </div>
            </div>

            <div class="nav-item dropdown">
              <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Mattresses</a>
              <div class="dropdown-menu border-0 rounded-0 rounded-bottom m-0">
                <a href="feature.html" class="dropdown-item">Features</a>
                <a href="team.html" class="dropdown-item">Our Team</a>
                <a href="testimonial.html" class="dropdown-item">Testimonial</a>
                <a href="404.html" class="dropdown-item">404 Page</a>
              </div>
            </div>

            <div class="nav-item dropdown">
              <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Home Decor</a>
              <div class="dropdown-menu border-0 rounded-0 rounded-bottom m-0">
                <a href="feature.html" class="dropdown-item">Features</a>
                <a href="team.html" class="dropdown-item">Our Team</a>
                <a href="testimonial.html" class="dropdown-item">Testimonial</a>
                <a href="404.html" class="dropdown-item">404 Page</a>
              </div>
            </div>

            <div class="nav-item dropdown">
              <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Lamps & Lighting</a>
              <div class="dropdown-menu border-0 rounded-0 rounded-bottom m-0">
                <a href="feature.html" class="dropdown-item">Features</a>
                <a href="team.html" class="dropdown-item">Our Team</a>
                <a href="testimonial.html" class="dropdown-item">Testimonial</a>
                <a href="404.html" class="dropdown-item">404 Page</a>
              </div>
            </div>

            <div class="nav-item dropdown">
              <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Kitchen & Dining</a>
              <div class="dropdown-menu border-0 rounded-0 rounded-bottom m-0">
                <a href="feature.html" class="dropdown-item">Features</a>
                <a href="team.html" class="dropdown-item">Our Team</a>
                <a href="testimonial.html" class="dropdown-item">Testimonial</a>
                <a href="404.html" class="dropdown-item">404 Page</a>
              </div>
            </div>

            <div class="nav-item dropdown">
              <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Luxury</a>
              <div class="dropdown-menu border-0 rounded-0 rounded-bottom m-0">
                <a href="feature.html" class="dropdown-item">Features</a>
                <a href="team.html" class="dropdown-item">Our Team</a>
                <a href="testimonial.html" class="dropdown-item">Testimonial</a>
                <a href="404.html" class="dropdown-item">404 Page</a>
              </div>
            </div>

            <div class="nav-item dropdown">
              <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Modular</a>
              <div class="dropdown-menu border-0 rounded-0 rounded-bottom m-0">
                <a href="feature.html" class="dropdown-item">Features</a>
                <a href="team.html" class="dropdown-item">Our Team</a>
                <a href="testimonial.html" class="dropdown-item">Testimonial</a>
                <a href="404.html" class="dropdown-item">404 Page</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
