import React from "react";
import ProductCard from "./productcard";


const RelatedProducts = ({ currentProduct, products }) => {


  const relatedProducts = products
    .filter((item) => 
      item.id !== currentProduct.id &&
      item.gender === currentProduct.gender
    )
    .slice(0, 4);



  return (

    <section className="product-section">

      <div className="section-header">

        <h2>
          Related Products
        </h2>

      </div>


      <div className="product-grid">

        {relatedProducts.map((item) => (

          <ProductCard
            key={item.id}
            product={item}
            compact={true}
          />

        ))}

      </div>


    </section>

  );

};


export default RelatedProducts;