import React, { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Approute from './route/approute'
import Banner from './component/banner'
import Navbar from './component/navbar'

const App = () => {

  return (
   <>
   <Navbar/>
   <Approute/>
   </>
  )
}

export default App