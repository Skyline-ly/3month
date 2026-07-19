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

  const men = products.filter((p) => p.gender?.toLowerCase() === "men");
  const women = products.filter((p) => p.gender?.toLowerCase() === "women");
  const kids = products.filter((p) => p.gender?.toLowerCase() === "kids");
  const newArrival = products.filter((p) => p.newArrival === true);
  const onTrain = products.filter((e) => e.onTrain === true);

  return (
    <div>
      <Banner />
      <ProductSection title="Men" products={men} />
      <ProductSection title="Women" products={women} />
      <ProductSection title="Kids" products={kids} />
      <ProductSection title="New Arrivals" products={newArrival} />
      <ProductSection title="On Trend" products={onTrain} />
    </div>
  );
};

export default Home;