import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
export default function Login() {
  const navigate = useNavigate()
  const [userDetails,setUserDetails] = useState('')
  const [password,setPassword] = useState('')
  function Login(e){
   e.preventDefault()
   axios.post('http://localhost:3000/users/login',{userDetails,password}).then(response=>{
    console.log(response.data)
    alert(response.data.message)
    if(response.data.token!=''){
        localStorage.setItem('token',response.data.token)
        window.location.href='/'
    }
    
   })
  }
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center bg-gradient-to-r from-[#591979] via-[#991986] to-[#591979]'>
      <div className='m-5 text-3xl text-white'>BLooG</div>
        <div className='h-1/2 w-2/5 bg-slate-200 rounded-lg shadow-2xl'>
             
             <form method='post' 
             onSubmit={Login}
             className='flex flex-col justify-center items-center h-5/6 gap-10 mt-10'>
                <input 
                onChange={(e)=>setUserDetails(e.target.value)}
                type='email' placeholder='Email' className='h-10 w-4/5 rounded-md' required/>
                <input 
                onChange={(e)=>setPassword(e.target.value)}
                type='password' placeholder='Password' className='h-10 w-4/5 rounded-md' required/>
                 <input type='submit' value='Login' className='h-10 w-4/5 rounded-md bg-[#96469A] cursor-pointer text-white font-bold'/>
                 <Link className='text-slate-700 font-bold cursor-pointer' to="/register">Not Registered?</Link>
             </form>

        </div>
      
    </div>
  )
}