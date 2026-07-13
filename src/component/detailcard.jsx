import React, { useState } from "react";
import { addToCart } from "../utils/cart";

const DetailCard = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0] || null
  );

  if (!product) return null;

  return (
    <div className="detail-card">

    
      <div className="detail-image">
        <img
          src={selectedVariant?.image}
          alt={product.name}
        />
      </div>

      
      <div className="detail-info">

        <h1>{product.name}</h1>
        <p className="price">${product.price}</p>
        <p className="category">{product.category}</p>

        <p className="description">
          {product.details?.longDescription}
        </p>

     
        <div className="selector">
          <h3>Size</h3>
          <div className="options">
            {product.sizes?.map((size) => (
              <button
                key={size}
                className={`option ${
                  selectedSize === size ? "active" : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

       
        <div className="selector">
          <h3>Color</h3>
          <div className="color-options">
            {product.variants?.map((v) => (
              <button
                key={v.color}
                className={`color-circle ${
                  selectedVariant?.color === v.color ? "active" : ""
                }`}
                style={{ backgroundColor: v.hex }}
                onClick={() => setSelectedVariant(v)}
              />
            ))}
          </div>
        </div>

       
        <div className="section">
          <h3>Features</h3>
          <ul>
            {product.details?.features?.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>

      
        <div className="section">
          <h3>Fabric & Care</h3>
          <p>{product.details?.fabricAndCare}</p>
        </div>

       
        <div className="section">
          <h3>Shipping & Returns</h3>
          <p>{product.details?.shippingReturns}</p>
        </div>

    
        <button
          className="btn"
          onClick={() => {
            if (!selectedSize) {
              alert("Select a size first");
              return;
            }

            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              category: product.category,
              size: selectedSize,
              color: selectedVariant?.color,
              image: selectedVariant?.image || product.variants?.[0]?.image,
              quantity: 1,
            });

            alert("Product added to cart");
          }}
        >
          Add to Cart
        </button>
        <button>Buy</button>

      </div>
    </div>
  );
};

export default DetailCard;