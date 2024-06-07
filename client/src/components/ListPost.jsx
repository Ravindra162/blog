import React,{useEffect, useState} from 'react'
import Post from './Post'
import axios from 'axios'
const ListPost = () => {
  const [blogs,setBlogs] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:3000/blog/get',{
      headers:{
        "Authorization":localStorage.getItem('token')
      }
    }).then(response=>{
        console.log(response)
        setBlogs(response.data.blogs)
    })
  },[])
  return (
    <div className='h-full w-[60%] bg-green-900 overflow-y-scroll p-10'>
        {
            blogs.map((elem,index)=>{
                return <center key={index}>
                  <Post
                   blogId = {elem.post_id}
                   username={elem.username}
                   image={elem.image} 
                   title={elem.title}
                   /></center>
            })
        }
    </div>
  )
}

export default ListPost