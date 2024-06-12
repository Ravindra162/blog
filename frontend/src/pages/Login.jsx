import React, { useState } from 'react'
import blogger from '../assets/blogger.png'
import Footer from '../components/Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const navigate = useNavigate()
    const [userDetails,setUserDetails] = useState('anonymus')
    const [password,setPassword] = useState('anonymous@123')
    const loginHandler = () =>{
            axios.post('https://blog-l9ra.onrender.com/users/login',{userDetails,password})
            .then(response=>{
                if(response.data.message==='login successfull'){
                    alert("login successful")
                    localStorage.setItem('token',response.data.token)
                    navigate('/user')
                }
                else if(response.data.message==='incorrect password'){
                    alert("incorrect password")
                }
                else{
                    alert("Error occured")
                }
            }).catch(err=>{
                alert(err.response.data.message)
            })
    }
  return (
    <div className='h-screen w-full bg-black flex flex-col justify-center items-center'>
        <img className='h-[90px] md:h-[140px]' src={blogger}/>
        <div className='h-[520px] w-[80%] md:w-[50%] flex flex-col justify-center items-center gap-20'>
            <div className='h-[50px] w-full rounded-lg'>
            <label className='text-white text-2xl'>
                username / E-mail
            </label>
            <input
            onChange={(e)=>setUserDetails(e.target.value)}
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
            <button
            onClick={loginHandler}
            className='h-[50px] w-[90px] bg-green-300 rounded-lg text-black'>
                Login
            </button> 
            
         </div>
         <Footer/>
    </div>
  )
}

export default Login
