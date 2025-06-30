import React from "react";
import FurnitureItem from './furnitureItem';

const FurnitureGrid = ({ furniture }) => {
    const itemsPerRow = 5;
  return (
    <section className="furniture-wrapper my-1">
      <div className="container">
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-0">
          {furniture.map((product, index) => {
            // Don't apply border-end on every 5th item
            const isLastInRow = (index + 1) % itemsPerRow === 0;
            return (
              <FurnitureItem
                key={product.id}
                product={product}
                isBordered={!isLastInRow}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FurnitureGrid;
