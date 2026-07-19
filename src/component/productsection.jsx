import React from "react";
import ProductCard from "./productcard";

const ProductSection = ({ title, products }) => {
  const safeProducts = products || [];

  return (
    <section className="product-section">
      <div className="section-header">
        <div>
          <p className="section-kicker">Curated selection</p>
          <h2>{title}</h2>
        </div>
       
      </div>

      <div className="product-grid">
        {safeProducts.length > 0 ? (
          safeProducts.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <p className="empty-state">More styles are arriving soon.</p>
        )}
      </div>
    </section>
  );
};

export default ProductSection;