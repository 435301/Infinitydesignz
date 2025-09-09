import React from "react";
import Sale1 from '../img/sale-1.png';
import Sale2 from '../img/sale-2.png';
import Sale3 from '../img/sale-3.png';
import Sale4 from '../img/sale-4.png';
import '../css/user/carousel.css';
import { useNavigate } from "react-router-dom";

export default function SaleCarousel({ promotions = [] }) {
  if (!promotions.length) return null; 

  return (
    <div className="container my-5">
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

