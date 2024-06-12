import React ,{useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const Searched = ({SearchedBlogs}) => {
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState(SearchedBlogs)
  return (
    <div className='h-screen w-full bg-black flex flex-col justify-center items-center'>
       
        <div className='h-[700px] w-full overflow-y-scroll'>
            <div className='flex flex-col justify-center items-center gap-10 p-5'>
                {
                    blogs.map((elem,index)=>{
                        return <div 
                            onClick={()=>{
                                navigate('/user/blog/'+elem.post_id)
                            }}
                            className='h-[200px]  md:h-[290px] w-[90%] md:w-2/3 flex p-4 cursor-pointer'>
                            <img 
                            className='w-1/2 rounded-xl'
                            src={"http://localhost:3000/images/"+elem.image} alt="blog" />
                            <div className='md:text-2xl text-lg text-white p-5'>
                                {elem.title}
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
                    
                   
         
    </div>
  )
}

export default Searched
