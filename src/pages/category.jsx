import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApi } from "../server/api";
import ProductCard from "../component/productcard";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const { gender, category } = useParams();

  useEffect(() => {
    const load = async () => {
      const data = await getApi();
      setProducts(data || []);
    };
    load();
  }, []);

  const normalizedGender = (gender || "").toLowerCase();
  const normalizedCategory = (category || "").toLowerCase();
  const isCategorySpecial =
    normalizedCategory === "new-arrival" || normalizedCategory === "on-trend";

  const genderLabel =
    normalizedGender === "kid" || normalizedGender === "kids"
      ? "Kid"
      : normalizedGender
      ? normalizedGender.charAt(0).toUpperCase() + normalizedGender.slice(1)
      : "";

  let filteredProducts = products;

  if (normalizedGender) {
    filteredProducts = filteredProducts.filter((product) => {
      if (normalizedGender === "kid" || normalizedGender === "kids") {
        return product.gender?.toLowerCase() === "kids";
      }
      return product.gender?.toLowerCase() === normalizedGender;
    });
  }

  if (normalizedCategory) {
    if (normalizedCategory === "new-arrival") {
      filteredProducts = filteredProducts.filter((product) => product.newArrival);
    } else if (normalizedCategory === "on-trend") {
      filteredProducts = filteredProducts.filter((product) => product.onTrain);
    } else {
      filteredProducts = filteredProducts.filter(
        (product) => product.category?.toLowerCase() === normalizedCategory
      );
    }
  }

  const pageTitle = normalizedCategory
    ? isCategorySpecial
      ? `${genderLabel ? `${genderLabel} / ` : ""}${
          normalizedCategory === "new-arrival" ? "New Arrival" : "On Trend"
        }`
      : normalizedCategory.replace(/-/g, " ")
    : genderLabel || "All Products";

  return (
    <div>
      <h2 style={{ padding: "40px 70px 0", color: "#060606", fontSize: "28px" }}>
        {pageTitle}
      </h2>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
