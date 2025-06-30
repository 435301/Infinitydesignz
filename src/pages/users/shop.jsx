import React, { useState, useEffect } from "react";
import Header from "../../includes/header";
import Footer from "../../includes/footer";
import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../css/style.css';
import '../../css/bootstrap-icons.css';
import '../../css/bootstrap.min.css';
import FilterSidebar from "../../components/filterSideBar";
import Product1 from '../../img/image-11.png';
import Product2 from '../../img/image-10.png';
import Product3 from '../../img/image-7.png';
import Product4 from '../../img/image-8.png';
import Product5 from '../../img/image-9.png';
import Img3 from '../../img/img3.png';
import Img2 from '../../img/img3.png';
import Star from '../../img/star.svg';
import Star1 from '../../img/star1.svg';
import Icon from '../../img/icon.svg';
import Prbg1 from '../../img/prbg1.png';
import Prbg2 from '../../img/prbg2.png';
import bgImage from '../../img/prbg3.png';
import Sofa from '../../img/sofa.png';
import Bed from '../../img/bed.png';
import Mattress from '../../img/mattress.png';
import WardRobes from '../../img/wardrobes.png';
import Dining from '../../img/dining.png';
import AccImg from '../../img/acc-img.png';
import Img1 from '../../img/img1.png';
import ProductGrid from "../../components/profuctGrid";
import ProductCard from "../../components/productCard";
import ProductList from "../../components/productGrid";
import FurnitureGrid from "../../components/furnitureGrid";
import HelpSection from "../../components/helpSection";
import CustomAccordion from "../../components/customAccordian";
import CallbackForm from "../../components/callbackForm";
import NewArrivals from "../../components/newArrivalsShop";

const ProductTopBar = () => {
    const [sortOption, setSortOption] = useState('recommended');

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        // You can call API or filter items based on `sortOption` here
    };
    const handleClear = () => {
        // Optional: clear filters before navigating
        console.log('Clearing filters before navigating');
    };

    const handleFormSubmit = (data) => {
        alert(`Name: ${data.name}, Mobile: ${data.mobile}`);
    };

    const handleClearFilters = (e) => {
        e.preventDefault();
        console.log("Clear all filters");
    };

    const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);

    const toggleMobileFilter = () => setMobileFilterOpen(!isMobileFilterOpen);
    const closeMobileFilter = () => setMobileFilterOpen(false);
    // Auto-close mobile filter on window resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileFilterOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const filterGroups = [
        {
            title: "Sofa Model",
            options: [
                { label: "3 Seater", checked: true },
                { label: "3+2 Seater", checked: true },
                { label: "3+1+1 Seater", checked: true },
                { label: "2 Seater", checked: false },
                { label: "2+2 Seater", checked: false },
            ],
        },
        {
            title: "Sofa Type",
            options: [
                { label: "L Shape", checked: true },
                { label: "Recliner", checked: true },
                { label: "Sofa cum bed", checked: false },
            ],
        },
        {
            title: "Price",
            options: [
                { label: "Rs. 199 to Rs. 2149 (22499)", checked: true },
                { label: "Rs. 2149 to Rs. 4099 (2733)", checked: true },
            ],
        },
        {
            title: "Color",
            options: [
                { label: <><span className="color-dot color-red"></span>Red</>, checked: true },
                { label: <><span className="color-dot color-green"></span>Green</>, checked: true },
                { label: <><span className="color-dot color-blue"></span>Blue</>, checked: true },
                { label: <><span className="color-dot color-navy"></span>Navy Blue</>, checked: false },
            ],
        },
        {
            title: "Discount Range",
            options: [
                { label: "10% and above", checked: false },
                { label: "20% and above", checked: false },
                { label: "30% and above", checked: false },
                { label: "40% and above", checked: false },
                { label: "50% and above", checked: false },
            ],
        },
        {
            title: "Material",
            options: [
                { label: "Material_1", checked: false },
                { label: "Material_2", checked: false },
                { label: "Material_3", checked: false },
                { label: "Material_4", checked: false },
                { label: "Material_5", checked: false },
            ],
        },
    ];


    const products = Array(9).fill({
        image: Img1,
        discount: "22% off",
        title: "Andres Fabric 3 Seater Sofa In Sandy Brown Colour",
        price: "₹37,999",
        mrp: "₹48,999",
        rating: [Star, Star, Star, Star, Star1],
        reviews: "4.4 | 24K",
        icon: Icon,
    });



    const yourProductArray = [
        {
            discount: "22% off",
            icon: Icon,
            image: Img1,
            title: "Andres Fabric 3 Seater Sofa In Sandy Brown Colour",
            price: "₹37,999",
            mrp: "₹48,999",
            rating: [
                Star,
                Star,
                Star,
                Star,
                Star1,
            ],
            reviews: "4.4 | 24K",
        },
        {
            discount: "22% off",
            icon: Icon,
            image: Img1,
            title: "Andres Fabric 3 Seater Sofa In Sandy Brown Colour",
            price: "₹37,999",
            mrp: "₹48,999",
            rating: [
                Star,
                Star,
                Star,
                Star,
                Star1,
            ],
            reviews: "4.4 | 24K",
        },
        {
            discount: "22% off",
            icon: Icon,
            image: Img1,
            title: "Andres Fabric 3 Seater Sofa In Sandy Brown Colour",
            price: "₹37,999",
            mrp: "₹48,999",
            rating: [
                Star,
                Star,
                Star,
                Star,
                Star1,
            ],
            reviews: "4.4 | 24K",
        },
        {
            discount: "22% off",
            icon: Icon,
            image: Img1,
            title: "Andres Fabric 3 Seater Sofa In Sandy Brown Colour",
            price: "₹37,999",
            mrp: "₹48,999",
            rating: [
                Star,
                Star,
                Star,
                Star,
                Star1,
            ],
            reviews: "4.4 | 24K",
        },
        {
            discount: "22% off",
            icon: Icon,
            image: Img1,
            title: "Andres Fabric 3 Seater Sofa In Sandy Brown Colour",
            price: "₹37,999",
            mrp: "₹48,999",
            rating: [
                Star,
                Star,
                Star,
                Star,
                Star1,
            ],
            reviews: "4.4 | 24K",
        },
        {
            discount: "22% off",
            icon: Icon,
            image: Img1,
            title: "Andres Fabric 3 Seater Sofa In Sandy Brown Colour",
            price: "₹37,999",
            mrp: "₹48,999",
            rating: [
                Star,
                Star,
                Star,
                Star,
                Star1,
            ],
            reviews: "4.4 | 24K",
        },
        {
            discount: "22% off",
            icon: Icon,
            image: Img1,
            title: "Andres Fabric 3 Seater Sofa In Sandy Brown Colour",
            price: "₹37,999",
            mrp: "₹48,999",
            rating: [
                Star,
                Star,
                Star,
                Star,
                Star1,
            ],
            reviews: "4.4 | 24K",
        },
        {
            discount: "22% off",
            icon: Icon,
            image: Img1,
            title: "Andres Fabric 3 Seater Sofa In Sandy Brown Colour",
            price: "₹37,999",
            mrp: "₹48,999",
            rating: [
                Star,
                Star,
                Star,
                Star,
                Star1,
            ],
            reviews: "4.4 | 24K",
        },
        {
            discount: "22% off",
            icon: Icon,
            image: Img1,
            title: "Andres Fabric 3 Seater Sofa In Sandy Brown Colour",
            price: "₹37,999",
            mrp: "₹48,999",
            rating: [
                Star,
                Star,
                Star,
                Star,
                Star1,
            ],
            reviews: "4.4 | 24K",
        },

    ];

    const furnitureArray = [
        {
            id: 1,
            image: Product1,
            alt: "Modern Chair",
            name: "Product Name",
            description: "Short Description",
            priceNew: "Rs 1649",
            priceOld: "Rs 2999",
            discount: "(45% off)",
        },
        {
            id: 2,
            image: Product2,
            alt: "Modern Chair",
            name: "Product Name",
            description: "Short Description",
            priceNew: "Rs 1649",
            priceOld: "Rs 2999",
            discount: "(45% off)",
        },
        {
            id: 3,
            image: Product3,
            alt: "Modern Chair",
            name: "Product Name",
            description: "Short Description",
            priceNew: "Rs 1649",
            priceOld: "Rs 2999",
            discount: "(45% off)",
        }, {
            id: 4,
            image: Product4,
            alt: "Modern Chair",
            name: "Product Name",
            description: "Short Description",
            priceNew: "Rs 1649",
            priceOld: "Rs 2999",
            discount: "(45% off)",
        }, {
            id: 5,
            image: Product5,
            alt: "Modern Chair",
            name: "Product Name",
            description: "Short Description",
            priceNew: "Rs 1649",
            priceOld: "Rs 2999",
            discount: "(45% off)",
        },

    ];

    const helpItems = [
        { image: Sofa, title: "Sofa", alt: "Sofa" },
        { image: Bed, title: "Bed", alt: "Bed" },
        { image: Mattress, title: "Mattress", alt: "Mattress" },
        { image: WardRobes, title: "Wardrobes", alt: "Wardrobes" },
        { image: Dining, title: "Dining table", alt: "Dining Table" },
    ];

    const accordionData = [
        {
            id: "collapseOne",
            title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            content:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer...",
        },
        {
            id: "collapseTwo",
            title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            content:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer...",
        },
        {
            id: "collapseThree",
            title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            content:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer...",
        },
        {
            id: "collapseFour",
            title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            content:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer...",
        },
    ];

   const arrivals = [
    { src: Prbg1, alt: "New Arrival 1" },
  ];

   
    return (
        <>
            <Header />
            {/* <!-- Breadcrumb Section --> */}
            <section className="bg-light py-3">
                <div className="container shop">
                    <div className="row">
                        <div className="col-lg-12">
                            {/* Breadcrumb navigation */}
                            <Link to="/" className="link">Home /</Link>{' '}
                            <Link to="/details" className="link">
                                <strong >Top-Wear</strong>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Top Bar Section with Product Title and Sorting --> */}
            <section className="top-bar">
                <div className="container pt-3">
                    <div className="row align-items-center">
                        <div className="col-lg-9">
                            {/* Product category title and item count */}
                            <h6 className="product-title">
                                Sofa <span className="item-count">(839 items)</span>
                            </h6>
                        </div>
                        <div className="col-lg-3 text-lg-end">
                            {/* Sorting dropdown */}
                            <div className="product-sorting d-flex align-items-center justify-content-lg-end mb-3">
                                <label htmlFor="sort" className="sort-label me-2 ">Sort by:</label>
                                <select
                                    id="sort"
                                    name="sort"
                                    className="form-select1 custom-select"
                                    value={sortOption}
                                    onChange={handleSortChange}
                                >
                                    <option value="recommended">Recommended</option>
                                    <option value="highest-rated">Highest Rated</option>
                                    <option value="newest">Newest</option>
                                    <option value="price-high-low">Price: $$ - $</option>
                                    <option value="price-low-high">Price: $ - $$</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* <!-- Shop Grid Section with Filters and Products --> */}
            <section className="shop_grid_area py-3">
                <div className="container top-bars">
                    <div className="mobile-filter-toggle">
                        <button className="btn btn-outline-dark" id="filterToggleBtn" onClick={toggleMobileFilter}>Filter</button>
                    </div>

                    <div className={`mobile-filter-overlay ${isMobileFilterOpen ? "active" : ""}`}
                        onClick={closeMobileFilter}>

                    </div>

                    <div className={`mobile-filter-sidebar ${isMobileFilterOpen ? "active" : ""}`} id="filterSidebar">
                        <FilterSidebar isMobile={true} groups={filterGroups} onClearFilters={handleClearFilters} />
                    </div>

                    <div className="row">
                        <div className="col-12 col-md-4 col-lg-3 mb-3">
                            <FilterSidebar isMobile={false} groups={filterGroups} onClearFilters={handleClearFilters} />
                        </div>
                        <ProductList products={products} />
                    </div>
                </div>
            </section>


            {/* <!-- New Arrivals --> */}
            {/* <section className="bg-light">
                <div className="container py-5 bg-light">
                    <h2 className="fw-medium mb-4" style={{ fontSize: '28px', color: '#000' }}>
                        New Arrivals
                    </h2>
                    <div className="row g-3">
                        <div className="col-12 col-sm-12 col-md-12">
                            <div className="card border-0 bg-transparent">
                                <img
                                    src={Prbg1}
                                    className="img-fluid rounded-4 w-100"
                                    alt="Image 1"
                                />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12">
                            <div className="card border-0 bg-transparent">
                                <img
                                    src={Prbg2}
                                    className="img-fluid rounded-4 w-100"
                                    alt="Image 2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
            </section> */}

         <NewArrivals title="New Arrivals" images={arrivals}/>


            {/* <!-- Products Section --> */}

            <FurnitureGrid furniture={furnitureArray} />

            {/* <!-- Products Section --> */}
            <div className="py-5">
                <HelpSection title="Need Help Buying?" items={helpItems} />
            </div>

            <section className="info-section">
                <div className="container">
                    <div className="row align-items-center g-4">

                        {/* Left Content */}
                        <div className="col-lg-4">
                            <div className="intro-text">
                                <h1>Lorem Ipsum is simply dummy text of the printing</h1>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                                </p>
                                {/* Replace href with React Router's Link if using routing */}
                                <Link to="#" className="contact-link">Reach Us</Link>
                            </div>
                        </div>

                        {/* Middle Image Box */}
                        <div className="col-lg-3">
                            <div className="visual-box">
                                <img src={AccImg} className="w-100" alt="" />
                            </div>
                        </div>

                        {/* Right Accordion */}
                        <div className="col-lg-5">
                            <CustomAccordion items={accordionData} />
                        </div>

                    </div>
                </div>
            </section>


            <div className="container my-5">
                <div className="callback-container d-flex flex-column flex-md-row justify-content-between align-items-center" style={{ backgroundImage: `url(${bgImage})` }}>
                    <div className="info-block mb-4 mb-md-0" style={{ maxWidth: "40%" }}>
                        <h2 className="callback-heading">Lorem Ipsum is simply</h2>
                        <p className="callback-text text-start">
                            Lorem Ipsum is simply dummy text of <br /> the printing and typesetting industry.
                        </p>
                    </div>

                    <CallbackForm onSubmit={handleFormSubmit} />

                </div>
            </div>
            <Footer />
        </>
    )
}

export default ProductTopBar;















