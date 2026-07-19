import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./productcard";

const ProductSection = ({ title, products, link }) => {
  const safeProducts = products || [];

  return (
    <section className="product-section">
      <div className="section-header">
        <div>
          <p className="section-kicker">Curated Selection</p>
          <h2>{title}</h2>
        </div>

        
      </div>

      <div className="product-grid">
        {safeProducts.length > 0 ? (
          safeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="empty-state">More styles are arriving soon.</p>
        )}
      </div>
      <Link to={link} className="see-more-btn">
          See More →
        </Link>
    </section>
  );
};

export default ProductSection;