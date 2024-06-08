import React, { useState } from 'react'
import blogger from '../assets/blogger.png'
import Footer from '../components/Footer'
const Register = () => {
    const [username,setUsername] = useState('anonymus')
    const [email,setEmail] = useState('anonymous@gmail.com')
    const [password,setPassword] = useState('anonymous@123')
  return (
    <div className='h-screen w-full bg-black flex flex-col justify-center items-center'>
        <img className='h-[90px] md:h-[140px]' src={blogger}/>
        <div className='h-[520px] w-[80%] md:w-[50%] flex flex-col justify-center items-center gap-10'>
            <div className='h-[50px] w-full rounded-lg'>
            <label className='text-white text-2xl'>
                username
            </label>
            <input
            onChange={(e)=>setUsername(e.target.value)}
            className='h-[50px] w-full rounded-lg text-2xl' type='text'/>
            
            </div>
            <div className='h-[50px] w-full rounded-lg'>
            <label className='text-white text-2xl'>
                E-mail
            </label>
            <input
            onChange={(e)=>setEmail(e.target.value)}
            className='h-[50px] w-full rounded-lg text-2xl' type='text'/>
            
            </div>
            <div className='h-[50px] w-full rounded-lg'>
            <label className='text-white text-2xl'>
                Password
            </label>
            <input
            onChange={(e)=>setPassword(e.target.value)}
            className='h-[50px] w-full rounded-lg text-2xl' type='password'/>
            
            </div> 
            <button className='h-[50px] w-[90px] bg-green-300 rounded-lg text-black mt-10'>
                Sign Up
            </button> 
            
         </div>
         <Footer/>
    </div>
  )
}

export default Register
