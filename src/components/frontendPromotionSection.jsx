import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PromoSection from "./PromoSection";
import NewArrivalsSection from "./newArrivalSection";
import { fetchFrontendPromotions } from "../redux/actions/productionPromotionAction";
import BASE_URL from "../config/config";
import '../css/user/userstyle.css';
import SaleCarousel from "./projectCarousel";

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


const FrontendPromotionsSection = () => {
    const dispatch = useDispatch();
    const { promotions, loading, error } = useSelector((state) => state.frontendPromotions);
    console.log('promotions', promotions)

    useEffect(() => {
        dispatch(fetchFrontendPromotions(8));
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
                        );

                    case "deals of the day":
                        return (
                            <DealsSection
                                key={block.id}
                                title={block.title}
                                images={block.promotions.map((promo) => ({
                                    src: `${BASE_URL}${promo.imageUrl}`,
                                    alt: promo.title,
                                }))}
                            />
                        );

                    case "trending":
                        return (
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
