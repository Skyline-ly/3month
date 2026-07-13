import React from "react";
import ProductCard from "./productcard";


const ProductSection = ({ title, products }) => {
  return (
    <section style={{ marginBottom: "60px" }}>
      <h2
        style={{
          padding: "20px 70px",
          color: "#fff",
          fontSize: "28px",
          letterSpacing: "1px",
        }}
      >
        {title}
      </h2>

      <div className="product-grid">
        {products?.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;