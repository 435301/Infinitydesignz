import React from "react";
import '../../src/css/user/userstyle.css';
import '../../src/css/user/bootstrap-icons.css';
import '../css/user/bootstrap.min.css';

const NewArrivalsSection = ({ title = "New Arrivals", cards = [] }) => {
  return (
    <div className="container my-5 new">
      <h2 className="fw-bold h2_heading mb-4 text-start">{title}</h2>
      <div className="row g-4">
        {Array.isArray(cards) && cards.length > 0 ? (
          cards.map((card, index) => (
            <div
              className={`col-md-${card.fullWidth ? 6 : 3}`}
              key={`new-card-${index}`}
            >
              {card.type === "imageOnly" ? (
                <img src={card.image} alt={card.alt} className="w-100" />
              ) : (
                <div className="card-wrapper position-relative overflow-hidden rounded-3 mb-3">
                  <img src={card.image} className="img-fluid" alt={card.alt} />
                  <div className={`card-overlay ${card.bgClass || ''}`}>
                    <div className="overlay-content p-3">
                      <h6 className="lorem-text fw-bold mb-1 text-start">
                        {card.text}
                      </h6>
                    </div>
                    <div className="text-end">
                      <a href={card.link || "#"} className="btn btn-light fw-bold">
                        {card.buttonText || "SHOP NOW"}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No new arrivals available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrivalsSection;
