import React, { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Approute from './route/approute'
import Banner from './component/banner'
import Navbar from './component/navbar'
import Footer from './component/footer'

const App = () => {

  return (
   <>
   <Navbar/>
   <Approute/>
   <Footer/>
   </>
  )
}

export default App