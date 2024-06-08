import React from 'react'

const Hero = () => {
  return (
    <div className='h-[91%] w-full flex justify-center md:justify-between  items-center' id='hero-container'>
        <div className='h-[80%] md:h-[40%] w-[90%] md:w-[40%] bg-[#00000060] md:mx-10 rounded-xl flex flex-col justify-center p-5'>
            <p className='text-5xl text-black font-bold my-2'>Blogger ,</p>
            <p className='text-4xl text-white'>Platform that </p>
            <p className='text-3xl text-white'>means information</p>

        </div>
    </div>
  )
}

export default Hero
