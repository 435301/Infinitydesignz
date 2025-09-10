import React from "react";
import '../css/user/userstyle.css';
import '../css/user/bootstrap-icons.css';
import '../css/user/bootstrap.min.css';

const PromoSection = ({ heading, promos }) => {
  return (
    <div className="container py-4">
      <div className="promo-wrapper">
        <h2 className="promo-header">{heading}</h2>
        <div className="row g-3">
          {promos.map((promo, index) => (
            <div
              key={`promo-${index}`}
              className={
                index < 2 ? "col-12 col-md-6" : "col-12 col-md-4"
              }
            >
              <div className="promo-card">
                <div className="promo-img-wrapper">
                  <a href={promo.link}>
                  <img src={promo.image} alt={promo.alt} className="promo-img" />
                  </a>
                </div>
                {/* <div className={`promo-overlay ${promo.overlayPosition}`}>
                  <div>
                    <h3 className={`promo-title ${promo.titlePosition}`}>
                      <span>{promo.titleLine1}</span>
                      <br />
                      <span>{promo.titleLine2}</span>
                    </h3>
                    <p className="promo-text">
                      {promo.text.split("\n").map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                  <a href={promo.link} className="promo-button">
                    Shop Now
                  </a>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default PromoSection;
