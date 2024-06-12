import React ,{useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
const RecentPosts = () => {
    const navigate = useNavigate()
    const [recentBlogs, setRecentBlogs] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            window.location.href='/'
        }
        else{
            axios.get('http://localhost:3000/blog/getRecentPosts',{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            }).then(response=>{
                console.log(response.data.recentBlogs)
                setRecentBlogs(response.data.recentBlogs)
                setIsLoading(false)
            })
        }
    },[])
  return (
    <div className='h-screen w-full bg-black flex flex-col justify-center items-center'>
       {isLoading&&<Loading/>}
        <div className='h-[90%] w-[90%] flex flex-col '>
            <div className='text-4xl text-white mx-10'>Recent Posts</div>
            <div className='h-[94%] w-full flex justify-between items-center'>
                <div className='hidden md:h-[96%] md:w-[60%] md:flex md:flex-col md:justify-center md:items-center md:gap-5'>
                    <img 
                    src={recentBlogs.length?`http://localhost:3000/images/${recentBlogs[0]["image"]}`:''}
                    className='h-[90%] w-[90%] rounded-2xl' id='recent-post'/>
                    <p className='text-white text-xl'>{recentBlogs.length?recentBlogs[0]["title"]:''}</p>

                </div>
                <div className='h-full md:w-[40%] flex flex-col  p-5 justify-between'>
                    {/* small post div */}
                    {
                        recentBlogs.slice(1).map((elem,index)=>(
                            <div 
                            onClick={()=>{
                                navigate('/user/blog/'+elem.post_id)
                            }}
                            key={index}
                            className='h-[25%] w-[90%] flex justify-between items-center cursor-pointer'>
                            <img src={recentBlogs.length?`http://localhost:3000/images/${elem["image"]}`:''} className='h-full w-1/2 bg-green-50 rounded-2xl'/>
                            <div className='h-full w-1/2 flex flex-col justify-center ml-10 text-white'>
                                <p>{elem.created_at.slice(0,10)}</p>
                                <p>{elem.title}</p>
                                <Link>Read more..</Link>
                            </div>
                        </div>
                        ))
                    }
                    
                   
                   

                    
                </div>
            </div>

        </div>
    </div>
  )
}

export default RecentPosts
