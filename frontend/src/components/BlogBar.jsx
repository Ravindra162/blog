import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Loading from './Loading'
const BlogBar = ({username}) => {
  const [upvotes,setUpvotes] = useState(0)
  const [isVoted,setIsVoted] = useState(false)
  const [isLoading,setIsLoading] = useState(true)
  const blog = useParams()
  useEffect(()=>{
    axios.get('http://localhost:3000/blog/getUpVotes?blogId='+blog.blogId,{
      headers:{
        Authorization:localStorage.getItem('token')
      }
    }).then(response=>{
      console.log(response.data)
      setUpvotes(response.data.count)
      setIsVoted(response.data.isVoted)
      setIsLoading(false)
    })
  },[])
  const upVote = () => {
    if(!isVoted){
      setUpvotes(parseInt(upvotes)+1)
      setIsVoted(true)
    }
    else{
      if(upvotes>=1)
        setUpvotes(upvotes-1)
      setIsVoted(false)
    }
    
    axios.post(`http://localhost:3000/blog/upvote`,{blogId:blog.blogId},{
      headers:{
        'Authorization':localStorage.getItem('token')
      }
    }).then(response=>{
      console.log(response)
    })
  }
  return (<>
  {isLoading&&<Loading/>}
    <div className='h-[50px] w-[45%] mt-10 rounded-2xl flex flex-col justify-between '>
      <div className='h-[90%] w-full rounded-2xl flex justify-between items-center gap-20 p-5'>
      <div className='w-1/2 h-full flex justify-center items-center'>
      <button className='text-white text-lg'>{"@"+username}</button>
      </div>
      <div className='h-[40px] md:w-1/2 w-[70px] flex justify-center items-center md:gap-6 gap-0'>
        <button 
        onClick={upVote}
        className={isVoted===false?`h-full md:w-[35%] w-[80px] bg-[#ffffffce] rounded-xl text-black`:`
        h-full md:w-[35%] w-[80px] bg-[#d0ff26ce] rounded-xl text-black
        `}>upvote👍 : {upvotes}</button>
        
      </div>
      </div>
      <div className='h-[2px] w-full bg-white'>

      </div>
    </div>
    
    </>
  )
}

export default BlogBar
