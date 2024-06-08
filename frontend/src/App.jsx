import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import './App.css'
import Second from './components/Second'
import Third from './components/Third'
const App = () => {
  return (
    <div className='h-screen w-full'>
      <Navbar/> 
      <hr/>
      <Hero/>
      <hr/>
      <Second/>
      <hr/>
      <Third/>
    </div>
  )
}

export default App