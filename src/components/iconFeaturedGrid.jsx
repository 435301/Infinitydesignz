import React from "react";
import '../../src/css/style.css';
import '../../src/css/bootstrap-icons.css';
import '../css/bootstrap.min.css';

const IconFeatureGrid = ({ features }) => {
  return (
    <div className="row mt-4">
      {features.map((feature, index) => (
        <div
          className={`col-md-4 ${index < 2 ? "col-6" : "col-12"} d-flex align-items-center`}
          key={index}
        >
          <div className="icon-box me-2">
            {feature.icon}
          </div>
          <strong className="d-block">
            {feature.label.split("<br />").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </strong>
        </div>
      ))}
    </div>
  );
};

export default IconFeatureGrid;
