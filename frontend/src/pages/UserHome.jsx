import React, { useState, useEffect } from 'react'
import UserNavbar from '../components/UserNavbar'
import RecentPosts from '../components/RecentPosts'
import PostCateogries from '../components/PostCateogries'
import axios from 'axios'
import Searched from '../components/Searched'
import Loading from '../components/Loading'
const UserHome = () => {

  const [authorOrTitle,setAuthorOrTitle] = useState('')
  const [blogs,setBlogs] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  useEffect(()=>{
    axios.get(`https://blog-l9ra.onrender.com/blog/search?authorOrTitle=${authorOrTitle}`,{
      headers:{
        'Authorization':localStorage.getItem('token')
      }
    }).then(response=>{
      console.log(response.data)
      setBlogs(response.data.blogs)
      setIsLoading(false)
    })
  },[authorOrTitle])
  return (
    <div className='h-screen w-full bg-black no-scrollbar'>
      {isLoading===true?<Loading/>:<></>}
      <UserNavbar/>
      <hr/>
      <div className='h-[90.5%] w-full user-container flex justify-center items-center'>
            <div className='md:h-[60%] md:w-1/2 h-[70%] w-[80%] bg-[#00000060] rounded-lg flex flex-col justify-center items-center gap-20'>
                <h1 className='text-5xl'>
                    Blogger's Blog
                </h1>
                <label className="input md:w-1/2 w-[90%] input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                <input t
                onChange={(e)=>setAuthorOrTitle(e.target.value)}
                ype="text" className="grow text-xl" placeholder="Search blog by title or author" />
               </label>
                </div>
      </div>
      {blogs.length?<Searched SearchedBlogs={blogs} />:<RecentPosts/>}
      <PostCateogries/>
    </div>
  )
}

export default UserHome
