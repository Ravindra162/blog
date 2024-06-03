import React, { useState } from 'react'
import Like from './Like'

const Post = ({username,image,title,upvotes,downvotes}) => {
  const [currentUpvotes,setCurrentUpvotes] = useState(upvotes)
  const [currentDownvotes,setCurrentDownvotes] = useState(downvotes)
  return (
    <div className='h-[340px] w-[1/2] bg-blue-300 m-5 flex flex-col'>
        <div className='h-[15%] w-full flex justify-between bg-yellow-100'>
            <div>{username}</div>
            <div>Follow</div>
        </div>
        <div className='h-[70%] w-full bg-green-400 flex justify-center items-center'>
            <div className='h-full w-1/2 bg-red-100'>
              <img className='h-full w-full' src={`http://localhost:3000/images/${image}`} alt='content-image'/>
            </div>
            <div className='h-full w-1/2'>
            {title}
            </div>
        </div>
        <div className='h-[15%] w-full flex justify-between'>
            <div className='upvote'
            onClick={()=>{
                set
            }}
            >upvote: {currentUpvotes}</div>
            <div className='downvote'>downvote: {currentDownvotes}</div>
        </div>
    </div>
  )
}

export default Post