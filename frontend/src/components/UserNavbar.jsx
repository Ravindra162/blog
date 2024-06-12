import React, {useState, useEffect} from 'react';
import blogger  from '../assets/blogger.png'; 
import menu from '../assets/menu.png'
import write from '../assets/write.png'
import notification from '../assets/notification.png'
import {useNavigate} from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { userAtom } from '../store/atoms/user';
import axios from 'axios'
const UserNavbar = () => {
  const navigate = useNavigate()
  const [isLogin,setIsLogin] = useState(false)
  const [user,setUser] = useState(userAtom)
   useEffect(()=>{
      if(localStorage.getItem('token')){
          setIsLogin(true)
          axios.get('https://blog-l9ra.onrender.com/users/get',{
            headers:{
                Authorization:localStorage.getItem('token')
            }
          }).then(response=>{
            console.log(response.data)
              setUser(response.data.userDetails)
          })
      }
      else{
        navigate('/')
      }
  },[])
  const [open,setOpen] = useState(false)
  return (
    <div className=' h-[70px] w-full bg-black md:flex flex md:justify-center justify-between items-center md:items-center md:gap-[10%] p-1'>
      <img 
      onClick={()=>navigate('/user')}
      className='h-full cursor-pointer' src={blogger} alt="blogger" /> {/* Use image */}
      <div className='hidden md:flex h-[70px] w-2/5 ml-10 justify-center items-center gap-10 p-5'>
        <button 
        onClick={()=>{
          navigate('/user')
        }}
        className='text-2xl font-bold text-white mx-2 hover:text-black hover:bg-white px-2 py-1 rounded-md transition duration-450 ease-in-out hover:ease-in'>
          Home
        </button>
        <button className='text-2xl font-bold text-white mx-2 hover:text-black hover:bg-white px-2 py-1 rounded-md transition duration-450 ease-in-out hover:ease-in'>
          About
        </button>
        <div 
        onClick={()=>{
          navigate('/write')
        }}
        className='text-2xl font-bold text-white mx-2 hover:text-black hover:bg-white flex justify-center items-center gap-2 cursor-pointer px-2 py-1 rounded-md transition duration-450 ease-in-out hover:ease-in'>
          Write
          <img className='h-[40px]' src={write} />
        </div>
      </div>
      <div className='hidden h-full w-[20%] md:flex md:justify-center md:items-center md:gap-5'>
      <img className='h-[40px] m-5'
      src={notification}
      />
       <img 
       onClick={()=>{
        navigate('/user/profile')
       }}
       className='h-[45px] w-[45px] rounded-full m-2 cursor-pointer'
      src='https://cdn.pixabay.com/photo/2024/05/30/12/49/man-8798457_1280.jpg'
      />
      <p className='text-white text-xl'>{user.username}</p>
      <button className='text-red-500 text-xl' onClick={()=>{
        localStorage.removeItem('token')
        navigate('/')
      }}>
        logout
      </button>
        
      </div>
      <img
      onClick={()=>{
        if(open===true)setOpen(false)
          else setOpen(true)
      }}
      className='h-2/3 cursor-pointer md:hidden mr-8 rounded-full' src='https://cdn.pixabay.com/photo/2024/05/30/12/49/man-8798457_1280.jpg'/>
      {open && (
        <div className='md:hidden bg-black w-full flex flex-col items-center justify-center p-5 absolute top-[13%] left-0'>
          <button
          onClick={()=>{navigate('/user')}}
          className='text-2xl font-extralight text-white my-2 hover:text-black hover:bg-white px-2 py-1 rounded-md transition duration-450 ease-in-out hover:ease-in'>
            Home
          </button>
          <button
          onClick={()=>navigate('/user/profile')}
          className='text-2xl font-bold text-white my-2 hover:text-black hover:bg-white px-2 py-1 rounded-md transition duration-450 ease-in-out hover:ease-in'>
          {user.username}
          </button>
          <button
          onClick={()=>navigate('/write')}
          className='text-2xl font-bold text-white my-2 hover:text-black hover:bg-white px-2 py-1 rounded-md transition duration-450 ease-in-out hover:ease-in'>
           Write blog
          </button>
          <button
          onClick={()=>{
            localStorage.removeItem('token')
            navigate('/')
          }}
          className='text-2xl font-bold text-white my-2 hover:text-black hover:bg-white px-2 py-1 rounded-md transition duration-450 ease-in-out hover:ease-in'>
            Logout
          </button>
         
          <button 
          onClick={()=>setOpen(false)}
          className='text-2xl font-bold text-white my-2 hover:text-black hover:bg-white px-2 py-1 rounded-md transition duration-450 ease-in-out hover:ease-in'>
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default UserNavbar;
