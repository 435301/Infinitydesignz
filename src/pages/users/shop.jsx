import React, { useState, useEffect } from "react";
import Header from "../../includes/header";
import Footer from "../../includes/footer";
import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../css/user/userstyle.css';
import '../../css/user/bootstrap-icons.css';
import '../../css/user/bootstrap.min.css';
import FilterSidebar from "../../components/filterSideBar";
import ProductList from "../../components/productGrid";
import FurnitureGrid from "../../components/furnitureGrid";
import HelpSection from "../../components/helpSection";
import CustomAccordion from "../../components/customAccordian";
import CallbackForm from "../../components/callbackForm";
import NewArrivals from "../../components/newArrivalSection";
import axios from 'axios';
import BASE_URL from '../../config/config';
import { useLocation } from 'react-router-dom';
import AccImg from '../../img/acc-img.png';
import bgImage from '../../img/prbg3.png';
import Loader from "../../includes/loader";


const ProductTopBar = React.memo(() => {
    const location = useLocation();
    const params = React.useMemo(() => new URLSearchParams(location.search), [location.search]);
    const listSubCategoryId = params.get('listSubCategoryId');

    const [products, setProducts] = useState([]);
    const [accordionFilters, setAccordionFilters] = useState([]);
    const [standardFilters, setStandardFilters] = useState({ colors: [], brands: [], sizes: [] });
    const [sortOption, setSortOption] = useState('recommended');
    const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch products and filters
    useEffect(() => {
        let ignore = false;
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${BASE_URL}/products/search`);
                let data = res.data;
                if (listSubCategoryId) {
                    const subCatId = parseInt(listSubCategoryId, 10);
                    data = data.filter(product => product.listSubCategoryId === subCatId);
                }

                if (ignore) return;

                setProducts(data);

                // Use Sets for uniqueness and reduce iterations
                const colorMap = new Map();
                const brandSet = new Set();
                const sizeSet = new Set();
                const accordion = [];

                data.forEach(product => {
                    product.category?.filterType?.filterSets?.forEach(set => {
                        accordion.push({
                            title: set.title,
                            options: set.filterLists.map(list => ({ label: list.label, checked: false }))
                        });
                    });

                    product.category?.featureType?.featureSets?.forEach(set => {
                        accordion.push({
                            title: set.title,
                            options: set.featureLists.map(list => ({ label: list.label, checked: false }))
                        });
                    });

                    if (product.color?.label && product.color?.hex_code) {
                        colorMap.set(product.color.label, product.color.hex_code);
                    }
                    if (product.brand?.name) {
                        brandSet.add(product.brand.name);
                    }
                    if (product.size?.title) {
                        sizeSet.add(product.size.title);
                    }

                    product.variants?.forEach(variant => {
                        if (variant.color?.label && variant.color?.hex_code) {
                            colorMap.set(variant.color.label, variant.color.hex_code);
                        }
                        if (variant.size?.title) {
                            sizeSet.add(variant.size.title);
                        }
                    });
                });

                setAccordionFilters(accordion);
                setStandardFilters({
                    colors: Array.from(colorMap.entries()).map(([label, hex_code]) => ({ label, hex_code })),
                    brands: Array.from(brandSet).map(name => ({ name })),
                    sizes: Array.from(sizeSet).map(title => ({ title }))
                });
            } catch (err) {
                // Optionally handle error UI
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
        return () => { ignore = true; };
    }, [listSubCategoryId]);

    // Responsive filter sidebar
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMobileFilterOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleSortChange = React.useCallback((e) => {
        setSortOption(e.target.value);
    }, []);

    const toggleMobileFilter = React.useCallback(() => setMobileFilterOpen(open => !open), []);
    const closeMobileFilter = React.useCallback(() => setMobileFilterOpen(false), []);
    const handleClearFilters = React.useCallback((e) => {
        e.preventDefault();
        // Implement filter clearing logic here
    }, []);
    const handleFormSubmit = React.useCallback((data) => {
        alert(`Name: ${data.name}, Mobile: ${data.mobile}`);
    }, []);

    // Memoize static data
    const arrivals = React.useMemo(() => [
        { src: AccImg, alt: "New Arrival 1" },
    ], []);
    const helpItems = React.useMemo(() => [
        { image: '', title: "Sofa", alt: "Sofa" },
        { image: '', title: "Bed", alt: "Bed" },
        { image: '', title: "Mattress", alt: "Mattress" },
        { image: '', title: "Wardrobes", alt: "Wardrobes" },
        { image: '', title: "Dining table", alt: "Dining Table" },
    ], []);
    const accordionData = React.useMemo(() => [
        {
            id: "collapseOne",
            title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer...",
        },
    ], []);

    return (
        <>
            <Header />
            <section className="bg-light py-3">
                <div className="container shop">
                    <div className="row">
                        <div className="col-lg-12">
                            <Link to="/" className="link">Home /</Link>{' '}
                            <Link to="/details" className="link"><strong>Top-Wear</strong></Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="top-bar">
                <div className="container pt-3">
                    <div className="row align-items-center">
                        <div className="col-lg-9">
                            <h6 className="product-title">Products <span className="item-count">({products.length} items)</span></h6>
                        </div>
                        <div className="col-lg-3 text-lg-end">
                            <div className="product-sorting d-flex align-items-center justify-content-lg-end mb-3"></div>
                                <label htmlFor="sort" className="sort-label me-2">Sort by:</label>
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
            </section>

            <section className="shop_grid_area py-3">
                <div className="container top-bars">
                    <div className="mobile-filter-toggle">
                        <button className="btn btn-outline-dark" id="filterToggleBtn" onClick={toggleMobileFilter}>Filter</button>
                    </div>

                    <div className={`mobile-filter-overlay ${isMobileFilterOpen ? "active" : ""}`} onClick={closeMobileFilter} />

                    <div className={`mobile-filter-sidebar ${isMobileFilterOpen ? "active" : ""}`} id="filterSidebar"></div>
                        <FilterSidebar isMobile={true} accordionFilters={accordionFilters} standardFilters={standardFilters} />
                    </div>

                    <div className="row"></div>
                        <div className="col-12 col-md-4 col-lg-3 mb-3"></div>
                            {/* <FilterSidebar isMobile={false} accordionFilters={accordionFilters} standardFilters={standardFilters} onClearFilters={handleClearFilters} /> */}
                        {loading ? (
                            <Loader />
                        ) : (
                            <ProductList products={products} />
                        )}
            </section>

            {/* <NewArrivals title="New Arrivals" images={arrivals} /> */}
            {/* <FurnitureGrid furniture={products} /> */}

            <div className="py-5">
                <HelpSection title="Need Help Buying?" items={helpItems} />
            </div>

            <section className="info-section">
                <div className="container">
                    <div className="row align-items-center g-4">
                        <div className="col-lg-4">
                            <div className="intro-text">
                                <h1>Lorem Ipsum is simply dummy text of the printing</h1>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
                                <Link to="#" className="contact-link">Reach Us</Link>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="visual-box">
                                <img src={AccImg} className="w-100" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <CustomAccordion items={accordionData} />
                        </div>
                    </div>
                </div>
            </section>

            <div className="container my-5">
                <div className="callback-container d-flex flex-column flex-md-row justify-content-between align-items-center" style={{ backgroundImage: `url(${bgImage})` }}></div>
                    <div className="info-block mb-4 mb-md-0" style={{ maxWidth: "40%" }}>
                        <h2 className="callback-heading">Lorem Ipsum is simply</h2>
                        <p className="callback-text text-start">
                            Lorem Ipsum is simply dummy text of <br /> the printing and typesetting industry.
                        </p>
                    </div>
                    <CallbackForm onSubmit={handleFormSubmit} />
                </div>
            <Footer />
        </>
    );
});

export default ProductTopBar;
