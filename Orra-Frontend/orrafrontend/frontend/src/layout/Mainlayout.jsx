import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Mainlayout = () => {
  return (
  <>
  
  <Navbar/> //fixed
  <Outlet/> //body
  <Footer/> //fixed
  </>
  )
}

export default Mainlayout