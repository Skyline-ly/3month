import React, { useEffect, useState } from "react";
import { getApi } from "../server/api";
import ProductCard from "../component/productcard";

const Kid = () => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getApi();
      setProduct(data || []);
    };
    load();
  }, []);

  const kidProducts = products.filter(
    (product) => product.gender?.toLowerCase() === "kids"
  );

  return (
    <div className="product-grid">
      {kidProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Kid;