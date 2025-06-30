import React from "react";
import AccordionItem from "./accordianItem";

const CustomAccordion = ({ items }) => {
  return (
    <div className="accordion faq-list" id="accordionCustom">
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          content={item.content}
          isOpen={index === 2} // make the 3rd one open by default (like your HTML)
        />
      ))}
    </div>
  );
};

export default CustomAccordion;
