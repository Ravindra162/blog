import React from 'react'

const Fourth = () => {
  return (
    <div className='h-screen w-full bg-black flex flex-col justify-center items-center gap-10'>
        <div className='h-[90px] w-[50%] text-white text-5xl flex justify-center items-center'>
            <u>Developers</u>
        </div>
        <div className='h-1/3 w-[85%] flex justify-center items-center p-10 gap-20'>
            <img className='h-[240px] w-[240px] rounded-full' src='https://cdn.pixabay.com/photo/2022/12/01/04/42/man-7628305_640.jpg'/>
            <div>
            <p className='text-4xl text-white'>Narendra Kumar</p>
            <h1 className='text-4xl text-green-400'> - UI/UX Design and Frontend Developer</h1>
            </div>
        </div>
        <div className='h-1/3 w-[85%]  flex justify-center items-center p-10 gap-20'>
            <div>
            <p className='text-4xl text-white'>Taraka Ravindra</p>
            <h1 className='text-4xl text-blue-500'> - Full stack Developer</h1>
            </div>
            <img className='h-[240px] w-[240px] rounded-full' src='https://cdn.pixabay.com/photo/2024/05/30/12/49/man-8798457_960_720.jpg'/>
            
        </div>
    </div>
  )
}

export default Fourth
