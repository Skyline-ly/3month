import React from 'react'
import { useState } from 'react'

const Shot = () => {
    const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [products, setProducts] = useState([]);

  async function searchProducts() {

    const response = await fetch(
      `http://localhost:5000/products?minPrice=${minPrice}&maxPrice=${maxPrice}`
    );

    const data = await response.json();

    setProducts(data);
  }


  return (
    <div>

      <h1>Product Search</h1>

      <input
        placeholder="Min price"
        value={minPrice}
        onChange={(e)=>setMinPrice(e.target.value)}
      />

      <input
        placeholder="Max price"
        value={maxPrice}
        onChange={(e)=>setMaxPrice(e.target.value)}
      />

      <button onClick={searchProducts}>
        Search
      </button>


      {
        products.map(product => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))
      }

    </div>
  );
}


export default Shot