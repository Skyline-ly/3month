import React from 'react'
import { useState ,useEffect} from 'react'
import { getApi } from '../server/api'
import ProductCard from '../component/productcard'

const Men = () => {
   const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getApi();
      setProducts(data || []);
    };
    load();
  }, []);
  const menproducts = products.filter((product) => product.gender?.toLowerCase() === "men");

  return (
    <div className="product-grid">
      {menproducts.map(e=>(<ProductCard key={e.id} product={e}/>))}
       

    </div>
  );
}

export default Men