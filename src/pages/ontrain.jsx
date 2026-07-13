import React, { useEffect, useState } from 'react'
import { getApi } from '../server/api';
import ProductCard from '../component/productcard';

const Ontrain = () => {
    const [products,setProducts]=useState([]);
    useEffect(()=>{
        const load=async()=>{
            const data= await getApi();
            setProducts(data || []);
        };
        load();
    },[])
    const onTrain=products.filter((e)=>e.onTrain===true)
  return (
    <div className='product-grid'>
        {onTrain.map((e)=>(<ProductCard key={e.id} product={e}/>))}
    </div>
  )
}

export default Ontrain