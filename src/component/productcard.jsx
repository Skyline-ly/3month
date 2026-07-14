import React from "react";
import { Link, useLocation } from "react-router-dom";
import { addToCart } from "../utils/cart";

const ProductCard = ({ product, compact = false }) => {
  const location = useLocation();
  const currentPath = location.pathname.replace(/\/$/, "");
  const isProductsListingPath = /^\/products(\/[^\/]+){1,2}$/.test(currentPath);
  const productLink = isProductsListingPath
    ? `${currentPath}/detail/${product.id}`
    : `/product/${product.id}`;

  const defaultSize = product.sizes?.[0] || "";
  const defaultVariant = product.variants?.[0] || {};

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      size: defaultSize,
      color: defaultVariant.color,
      image: defaultVariant.image,
      quantity: 1,
    });
    alert(`${product.name} added to cart`);
  };

  return (
    <div className="product-card">
      <Link to={productLink} className="product-link">
        <img
          src={product.variants?.[0]?.image || "/placeholder.png"}
          alt={product.name}
        />

        <div className="product-info">
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      </Link>

      {!compact && (
        <button className="btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;