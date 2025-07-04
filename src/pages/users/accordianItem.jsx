import React from "react";

const AccordionItem = ({ id, title, content, isOpen }) => {
  return (
    <div className="accordion-item border-bottom">
      <h2 className="accordion-header">
        <button
          className={`accordion-button ${!isOpen ? "collapsed" : ""}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${id}`}
        >
          {title}
        </button>
      </h2>
      <div
        id={id}
        className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
        data-bs-parent="#accordionCustom"
      >
        <div className="accordion-body">{content}</div>
      </div>
    </div>
  );
};

export default AccordionItem;
