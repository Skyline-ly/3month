import React, { useEffect, useState } from 'react'
import { getApi } from '../server/api'
import ProductCard from '../component/productcard'

const Women = () => {
    const [product,setProduct]=useState([])
    useEffect(()=>{
        const loadData=async()=>{
            const data=await getApi()
            setProduct(data||[])
        }
        loadData()

    },[])
    const womenProduct=product.filter((product)=>(product.gender?.toLowerCase()==="women"))
  return (
    <div className='product-grid'>{
        womenProduct.map((e)=>(<ProductCard key={e.id} product={e}/>))
        }</div>
  )
}

export default Women