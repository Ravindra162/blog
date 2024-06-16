import React, { useEffect, useState } from 'react'
import UserNavbar from '../components/UserNavbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import BlogBar from './BlogBar'
import Loading from './Loading'
const DisplayBlog = () => {
    // const blogId from url
    const blogId = useParams()
    const [isLoading,setIsLoading] = useState(true)
    const [blog,setBlog] = useState('')
    useEffect(()=>{
        axios.get('http://localhost:3000/blog/getSingleBlog?blogId='+blogId.blogId,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }).then(response=>{
            console.log(response)
            setBlog(response.data.blog)
            setIsLoading(false)
        })
    },[])
  return (
    <div className='h-vh w-full bg-black overflow-y-hidden'>
        {isLoading&&<Loading/>}
        <UserNavbar/>
        <hr/>
        <center><BlogBar username={blog.username}/></center>
        <div className='h-[650px] w-full  overflow-y-scroll'>
        <center>
            <div className='flex flex-col justify-center items-center gap-20 overflow-hidden'>
                <h1 className='text-3xl text-white mt-5'>{blog.title}</h1> 
                <img className='h-[150px] md:h-[300px] md:w-1/2' src={`${blog.image}`}/>
                <div className='w-2/3 text-white' dangerouslySetInnerHTML={{__html:blog.content}}>
                    {/* Render html here */}
                </div>
            </div>
        </center> 
        </div>
    </div>
  )
}

export default DisplayBlog
