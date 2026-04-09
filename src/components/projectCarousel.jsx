import React from "react";
import '../css/user/carousel.css';


export default function SaleCarousel({ promotions = [] }) {
  if (!promotions.length) return null; 

  return (
    <div className="container my-4">
      <div className="carousel-scroll-wrapper">
        {promotions.map((promo) => (
          <div className="sale-item" key={promo.id}>
            <a href={promo.link}>
              <img src={promo.image} alt={promo.title} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

