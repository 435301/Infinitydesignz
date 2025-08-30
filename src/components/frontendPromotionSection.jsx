import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PromoSection from "./PromoSection";
import NewArrivalsSection from "./newArrivalSection";
import { fetchFrontendPromotions } from "../redux/actions/productionPromotionAction";
import BASE_URL from "../config/config";
import '../css/user/userstyle.css';
import SaleCarousel from "./projectCarousel";
import ProductCard from "./productCard";

// Deals UI (new)
const DealsSection = ({ title, images }) => (
    <div className="container py-5">
        <h2 className="h2_heading text-start mb-3">{title}</h2>
        <div className="row g-3">
            {images.map((img, idx) => {
                if (idx === 0) {
                    // First image -> full width
                    return (
                        <div key={idx} className="col-12">
                            <img src={img.src} alt={img.alt} className="w-100 rounded" />
                        </div>
                    );
                } else {
                    // Remaining -> half width
                    return (
                        <div key={idx} className="col-12 col-md-6 deals-image-wrapper" >
                            <img src={img.src} alt={img.alt} className="w-100 rounded deals-image" />
                        </div>
                    );
                }
            })}
        </div>
    </div>
);

const ProductPromotionGrid = ({ products }) => (
    <div className="container Fabric pb-4">
        <div className="row row-cols-1 row-cols-md-4 g-4">
            {products.map((product) => {
                const discount = Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100);
                const mainImage = product.images?.find((img) => img.isMain)?.url || product.images?.[0]?.url;

                return (
                    <div key={product.id} className="col-lg-3 p-2">
                        <div className="card h-100 position-relative">
                            {discount > 0 && <div className="discount-badge">{discount}% off</div>}
                            <img
                                src={`${BASE_URL}/uploads/products/${mainImage}`}
                                className="card-img-top"
                                alt={product.title}
                            />

                            <div className="card-body">
                                <h6 className="card-title">{product.title}</h6>
                                <p className="card-text">
                                    <strong>₹{product.sellingPrice.toLocaleString()}</strong>{" "}
                                    <del>MRP ₹{product.mrp.toLocaleString()}</del>
                                </p>

                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
);


const FrontendPromotionsSection = () => {
    const dispatch = useDispatch();
    const { promotions, loading, error } = useSelector((state) => state.frontendPromotions);
    console.log('promotions', promotions)

    useEffect(() => {
        dispatch(fetchFrontendPromotions(8, true));
    }, [dispatch]);

    if (loading) return <p>Loading promotions...</p>;
    if (error) return <p>Error loading promotions.</p>;
    //   if (!items?.length) return null;

    return (
        <div className="container my-5">
            {promotions.map((block) => {
                switch (block.title.toLowerCase()) {
                    case "new arrivals":
                        return (
                            <div key={block.id} className="mb-1">
                                <NewArrivalsSection
                                    key={block.id}
                                    title={block.title}
                                    cards={block.promotions.map((promo, index) => ({
                                        type: "imageOnly",
                                        image: `${BASE_URL}${promo.imageUrl}`,
                                        alt: promo.title,
                                        fullWidth: index === 0,
                                        text: promo.title,
                                        buttonText: "Shop Now",
                                        link: `/category/${promo.categoryId}`,
                                        bgColor: "#fff",
                                    }))}
                                />
                                {block.productPromotionList?.length > 0 && (
                                    <div className="container Fabric pb-4">
                                        <div className="row row-cols-1 row-cols-md-4  mt-4">
                                            {block.productPromotionList.map((product) => (
                                                <ProductCard key={product.id} product={product} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                        );

                    case "deals of the day":
                        return (
                            <div key={block.id} className="mb-1">
                                <DealsSection
                                    key={block.id}
                                    title={block.title}
                                    images={block.promotions.map((promo) => ({
                                        src: `${BASE_URL}${promo.imageUrl}`,
                                        alt: promo.title,
                                    }))}
                                />
                                {block.productPromotionList?.length > 0 && (
                                    <div className="container Fabric pb-4">
                                        <div className="row row-cols-1 row-cols-md-4  mt-4">
                                            {block.productPromotionList.map((product) => (
                                                <ProductCard key={product.id} product={product} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );

                    case "trending":
                        return (
                            <div key={block.id} className="mb-1">
                                <PromoSection
                                    key={block.id}
                                    heading={block.title}
                                    promos={block.promotions.map((promo) => ({
                                        image: `${BASE_URL}${promo.imageUrl}`,

                                        overlayPosition: "promo-overlay-left",

                                        text: `${promo.minPrice} - ${promo.maxPrice}`,
                                        link: `/category/${promo.categoryId}`,
                                    }))}
                                />
                                {block.productPromotionList?.length > 0 && (
                                    <div className="container Fabric pb-4">
                                        <div className="row row-cols-1 row-cols-md-4  mt-4">
                                            {block.productPromotionList.map((product) => (
                                                <ProductCard key={product.id} product={product} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );

                    case "offers":
                        return (
                            <SaleCarousel
                                key={block.id}
                                promotions={block.promotions.map((promo) => ({
                                    id: promo.id,
                                    image: `${BASE_URL}${promo.imageUrl}`,
                                    title: promo.title,
                                    link: `/category/${promo.categoryId}`,
                                }))}
                            />
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default FrontendPromotionsSection;
