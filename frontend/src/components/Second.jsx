import React from 'react'
import content from '../assets/content.png'
const Second = () => {
  return (
    <div className='h-screen w-full bg-black flex flex-col justify-center items-center'>
        <div className='hidden md:h-[40%] md:w-[90%]  md:flex md:justify-center md:items-center md:gap-20'>
                <div className='h-[90%] w-[15%] bg-black flex flex-col justify-center items-center'>
                    <img className='h-3/4 w-3/4' src={content}/>
                    <p className='text-white text-xl'>
                    Engaging Content
                    </p>
                </div>
                <div className='h-[90%] w-[15%] bg-black flex flex-col justify-center items-center'>
                    <img className='h-3/4 w-3/4' src={content}/>
                    <p className='text-white text-xl'>
                    Community Interaction

                    </p>
                </div>
                <div className='h-[90%] w-[15%] bg-black flex flex-col justify-center items-center'>
                    <img className='h-3/4 w-3/4' src={content}/>
                    <p className='text-white text-xl'>
                    Personalization
                    </p>
                </div>
                <div className='h-[90%] w-[15%] bg-black flex flex-col justify-center items-center'>
                    <img className='h-3/4 w-3/4' src={content}/>
                    <p className='text-white text-xl'>
                    Accessibility and Usability
                    </p>
                </div>
               
                
        </div>
        <div className='md:w-full md:flex md:justify-center md:items-center'>
            <img
            className='p-5 mt-10 md:w-[45%] md:h-[90%]'
            src='https://img.freepik.com/free-photo/close-up-person-working-home-night_23-2149090964.jpg?t=st=1717829734~exp=1717833334~hmac=f24470d0b400674d16b8512bff54cb7883bec13ed4f0de9dc60db380ab9b5f4c&w=996'/>
            <div className='hidden md:h-[45%] md:w-[50%] text-white md:flex md:flex-col md:justify-center md:ml-10 '>
                <p className='text-5xl'> create your own blogs </p>
                <p className='text-5xl'> and be informative for the</p>
                <p className='text-5xl'> reader and be popular </p>
            </div>
           <center> <div className='md:hidden text-4xl text-white w-1/2'>create your own blogs and be informative for the reader and be popular</div></center>
        </div>
        
    </div>
  )
}

export default Second