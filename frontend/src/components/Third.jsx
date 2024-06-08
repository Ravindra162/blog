import React from 'react'
import earth from '../assets/earth.png'
const Third = () => {
  return (
    <div className='h-screen w-full bg-black flex justify-center items-center relative'>
        <img className='h-[16em] w-[16em] md:h-[35em] md:w-[35em] md:p-10 rotate-animation' src={earth}/>
        <div className='absolute h-[100px] w-1/3 bottom-[20%] flex justify-center items-center text-3xl text-white'>
        Make your blogs spread the world
        </div>
    </div>
  )
}

export default Third