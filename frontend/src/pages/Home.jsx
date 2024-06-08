import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import '../App.css'
import Second from '../components/Second'
import Third from '../components/Third'
import Fourth from '../components/Fourth'
import Footer from '../components/Footer'
const Home = () => {
  return (
    <div className='h-screen w-full'>
      <Navbar/> 
      <hr/>
      <Hero/>
      <hr/>
      <Second/>
      <hr/>
      <Third/>
      <hr/>
      <Fourth/>
      <hr/>
      <Footer/>
    </div>
  )
}

export default Home