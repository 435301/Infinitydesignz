import React from "react";

const NewArrivals = ({ title, images }) => {
  return (
    <section className="bg-light">
      <div className="container py-5 bg-light">
        <h2 className="fw-medium mb-4" style={{ fontSize: "28px", color: "#000" }}>
          {title}
        </h2>
        <div className="row g-3">
          {images.map((img, idx) => (
            <div className="col-12" key={idx}>
              <div className="card border-0 bg-transparent">
                <img
                  src={img.src}
                  className="img-fluid rounded-4 w-100"
                  alt={img.alt || `Image ${idx + 1}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
