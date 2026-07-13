import React, { useEffect, useState } from 'react'
import { getApi } from '../server/api';
import ProductCard from '../component/productcard';

const Newarrival = () => {
    const [products,setProducts]=useState([]);
    useEffect(()=>{
        const load=async()=>{
            const data= await getApi();
            setProducts(data || []);
        };
        load();
    },[])
    const newarrival=products.filter((e)=>e.newArrival===true )
  return (
    <div className='product-grid'>
        {newarrival.map((e)=>(<ProductCard key={e.id} product={e}/>))}
    </div>
  )
}

export default Newarrival