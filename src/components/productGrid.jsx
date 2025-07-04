import React from "react";
import ProductCard from '../components/productCard';

const ProductList = ({ products }) => {
  return (
    <div className="col-lg-12 mb-3 sg">
    <div className="Fabric pb-4">
       <div className="container"> 
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))} 
        </div>
      </div></div>
    </div>
  );
};

export default ProductList;
