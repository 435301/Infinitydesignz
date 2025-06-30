import React from "react";
import '../../src/css/style.css';
import '../../src/css/bootstrap-icons.css';
import '../css/bootstrap.min.css';

const PromoSection = ({ heading, promos }) => {
    return (
        <div className="container py-4">
            <div className="promo-wrapper">
                <h2 className="promo-header">{heading}</h2>
                <div className="row">
                    {promos.map((promo, index) => (
                        <div className="col-12 col-md-6" key={`promo-${index}`}>
                            <div className="promo-card">
                                <img src={promo.image} alt={promo.alt} />
                                <div className={`promo-overlay ${promo.overlayPosition}`}>
                                    <div>
                                        <h3 className={`promo-title ${promo.titlePosition}`}>
                                            <span>{promo.titleLine1}</span><br /><span>{promo.titleLine2}</span>
                                        </h3>
                                        <p className="promo-text">{promo.text.split('\n').map((line, index) => (
                                            <React.Fragment key={index}>
                                                {line}
                                                <br />
                                            </React.Fragment>
                                        ))} </p>
                                    </div>
                                    <a href={promo.link} className="promo-button">Shop Now</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PromoSection;
