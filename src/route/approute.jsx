import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home'
import Detail from '../pages/detail'
import CategoryPage from '../pages/category'
import Men from '../pages/men'
import Women from '../pages/women'
import Kid from '../pages/kid'
import Cart from '../pages/cart'


const Approute = () => {
  return(
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products/:gender/:category/detail/:id' element={<Detail/>}/>
        <Route path='/products/:gender/detail/:id' element={<Detail/>}/>
        <Route path='/products/men' element={<Men/>}/>
        <Route path='/products/women' element={<Women/>}/>
        <Route path='/products/kid' element={<Kid/>}/>
        <Route path='/products/new-arrival' element={<CategoryPage/>}/>
        <Route path='/products/on-trend' element={<CategoryPage/>}/>
        <Route path='/products/:gender/:category' element={<CategoryPage/>}/>
        <Route path='/products/:gender' element={<CategoryPage/>}/>
        <Route path='/product/:id' element={<Detail/>}/>
        <Route path='/cart' element={<Cart/>}/>
    </Routes>
  )
}

export default Approute