import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailCard from "../component/detailcard";
import RelatedProducts from "../component/relatedproduct";


function Detail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);

        const found = data.products.find(
          (item) => String(item.id) === String(id)
        );

        setProduct(found || null);
      });
  }, [id]);


  if (!product) return <h2>Loading...</h2>;


  return (
    <div className="detail-page">

      <DetailCard product={product} />

      <RelatedProducts
        currentProduct={product}
        products={products}
      />

    </div>
  );
}

export default Detail;