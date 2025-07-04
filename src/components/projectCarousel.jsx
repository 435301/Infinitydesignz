import React from "react";
import Sale1 from '../img/sale-1.png';
import Sale2 from '../img/sale-2.png';
import Sale3 from '../img/sale-3.png';
import Sale4 from '../img/sale-4.png';
import '../css/user/carousel.css';

export default function SaleCarousel() {
  return (
    <div className="container my-5">
      <div className="carousel-scroll-wrapper">
        <div className="sale-item">
          <img src={Sale1} alt="Sofa" />
        </div>
        <div className="sale-item">
          <img src={Sale2} alt="Sofa" />
        </div>
        <div className="sale-item">
          <img src={Sale3} alt="Sofa" />
        </div>
        <div className="sale-item">
          <img src={Sale4} alt="Sofa" />
        </div>
        <div className="sale-item">
          <img src={Sale2} alt="Sofa" />
        </div>
      </div>
    </div>
  );
}
