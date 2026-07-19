import React, { useEffect, useState } from "react";
import { getApi } from "../server/api";
import Banner from "../component/banner";
import ProductSection from "../component/productsection";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getApi();
      setProducts(data || []);
    };

    load();
  }, []);

  const men = products
    .filter((p) => p.gender?.toLowerCase() === "men")
    .slice(0, 6);

  const women = products
    .filter((p) => p.gender?.toLowerCase() === "women")
    .slice(0, 6);

  const kids = products
    .filter((p) => p.gender?.toLowerCase() === "kids")
    .slice(0, 6);

  const newArrival = products
    .filter((p) => p.newArrival === true)
    .slice(0, 6);

  const onTrend = products
    .filter((p) => p.onTrain === true)
    .slice(0, 6);

  return (
    <>
      <Banner />

      <ProductSection
        title="Men"
        products={men}
        link="/products/men"
      />

      <ProductSection
        title="Women"
        products={women}
        link="products/women"
      />

      <ProductSection
        title="Kids"
        products={kids}
        link="products/kids"
      />

      <ProductSection
        title="New Arrivals"
        products={newArrival}
        link="/products/new-arrival"
      />

      <ProductSection
        title="On Trend"
        products={onTrend}
        link="/products/on-trend"
      />
    </>
  );
};

export default Home;