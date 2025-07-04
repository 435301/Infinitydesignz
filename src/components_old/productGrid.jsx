import React from "react";
import ProductCard from './productCard';

const ProductList = ({ products }) => {
  return (
    <div className="col-lg-9 mb-3 sg">
      <div className="Fabric pb-4">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))} 
        </div>
      </div>
    </div>
  );
};

export default ProductList;
