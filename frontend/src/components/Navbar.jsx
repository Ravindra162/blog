import React, {useState} from 'react';
import blogger  from '../assets/blogger.png'; 
import menu from '../assets/menu.png'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate()
  const [open,setOpen] = useState(false)
  return (
    <div className=' h-[70px] w-full bg-black md:flex flex md:justify-center justify-between items-center md:items-center md:gap-[10%] p-1'>
      <img className='h-full' src={blogger} alt="blogger" /> {/* Use image */}
      <div className='hidden md:flex h-[70px] w-2/5 ml-10 justify-center items-center gap-10 p-5'>
        <button
        onClick={()=>navigate('/')}
        className='text-2xl font-bold text-white mx-2 hover:text-black hover:bg-white px-2 py-1 rounded-md transition duration-450 ease-in-out hover:ease-in'>
          Home
        </button>
        <button className='text-2xl font-bold text-white mx-2 hover:text-black hover:bg-white px-2 py-1 rounded-md transition duration-450 ease-in-out hover:ease-in'>
          About
        </button>
        <button className='text-2xl font-bold text-white mx-2 hover:text-black hover:bg-white px-2 py-1 rounded-md transition duration-450 ease-in-out hover:ease-in'>
          Contact
        </button>
      </div>
      <div className='hidden h-full w-[20%] md:flex md:justify-center md:items-center md:gap-5'>
      <button 
      onClick={()=>{navigate('/login')}}
      className='text-2xl font-bold text-white mx-2 hover:text-black hover:bg-white px-2 py-1 rounded-md transition duration-450 ease-in-out hover:ease-in'>
          Login
        </button>
        <button
      onClick={()=>window.location.href='/register'}
         className='text-2xl font-bold text-white mx-2 hover:text-black hover:bg-white px-2 py-1 rounded-md transition duration-450 ease-in-out hover:ease-in'>
          Register
        </button>
        
      </div>
      <img
      onClick={()=>{
        if(open===true)setOpen(false)
          else setOpen(true)
      }}
      className='h-2/3 cursor-pointer md:hidden mr-8' src={menu}/>
      {open && (
        <div className='md:hidden bg-black w-full flex flex-col items-center justify-center p-5 absolute top-[13%] left-0'>
          <button
          onClick={()=>navigate('/')}
          className='text-2xl font-extralight text-white my-2 hover:text-black hover:bg-white px-2 py-1 rounded-md transition duration-450 ease-in-out hover:ease-in'>
            Home
          </button>
          <button className='text-2xl font-bold text-white my-2 hover:text-black hover:bg-white px-2 py-1 rounded-md transition duration-450 ease-in-out hover:ease-in'>
            About
          </button>
          <button className='text-2xl font-bold text-white my-2 hover:text-black hover:bg-white px-2 py-1 rounded-md transition duration-450 ease-in-out hover:ease-in'>
            Contact
          </button>
          <button
          onClick={()=>navigate('/login')}
          className='text-2xl font-bold text-white my-2 hover:text-black hover:bg-white px-2 py-1 rounded-md transition duration-450 ease-in-out hover:ease-in'>
            Login
          </button>
          <button
          onClick={()=>navigate('/register')}
          className='text-2xl font-bold text-white my-2 hover:text-black hover:bg-white px-2 py-1 rounded-md transition duration-450 ease-in-out hover:ease-in'>
            Register
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

export default Navbar;
