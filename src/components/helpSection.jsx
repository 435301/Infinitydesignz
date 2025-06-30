import React from "react";
import '../../src/css/style.css';
import '../../src/css/bootstrap-icons.css';
import '../css/bootstrap.min.css';

const HelpSection = ({ title, items }) => {
  return (
    <section className="help-section">
      <div className="container">
        <h2 className="help-title text-start">{title}</h2>
        <div className="help-grid">
          {items.map((item, index) => (
            <div className="help-card" key={`help-${index}`}>
              <div className="help-card-img-wrapper">
                <img src={item.image} alt={item.alt} />
                <div className="help-card-overlay">
                  <div className="help-card-title">{item.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
