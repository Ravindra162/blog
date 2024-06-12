import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const PostCateogries = () => {
    const navigate = useNavigate()
    const [category,setCategory] = useState('Technology')
    const [categories,setCategories] = useState([
      'Technology','Health','Programming','Business'
    ])
    const [blogs,setBlogs] = useState([])
   useEffect(()=>{
    axios.get(`https://blog-l9ra.onrender.com/blog/getBlogs?category=${category}`,{
      headers:{
        'Authorization':localStorage.getItem('token')
      }
    })
    .then(response=>{
      console.log(response.data)
      setBlogs(response.data.blogs)
    })
   },[category])

  return (
    <div className='h-screen w-full bg-black flex flex-col justify-center items-center gap-4 p-5'>
      <div className='hidden md:h-[40px] md:w-full md:flex justify-center items-center  p-1 gap-4'>
              {
                categories.map((elem,index)=>{
                  return <div 
                  onClick={(e)=>setCategory(elem)}
                  key={index} className={elem===category?`h-[99%] w-[10%] bg-[#ffffff8a] text-black flex justify-center items-center mb-1 rounded-xl cursor-pointer`:`h-[99%] w-[10%] bg-black text-white flex justify-center items-center mb-1 rounded-xl  cursor-pointer`}>
                      {elem}
                  </div>
                })
              }
            </div>
          <select onChange={(e)=>{setCategory(e.target.value)}} className='md:hidden h-[40px] w-[100px] bg-slate-200'>
              <option value='Technology'>Technology</option>
              <option value={'Health'}>Health</option>
              <option value={'Programming'}>Programming</option>
              <option value={'Business'}>Business</option>
          </select>
       <div className='h-[700px] w-full overflow-y-scroll'>
            {/* make this grid 3X3 scrolling  */}
            <div className='flex flex-col md:grid grid-cols-3 gap-4 p-4 justify-center items-center'>
              {
                blogs.length?blogs.map((elem,index)=>{
                  return <div 
                  key={index}
                  onClick={()=>{
                      navigate(`/user/blog/${elem.post_id}`)
                  }}
                  className='h-[250px] w-full flex flex-col justify-center items-center cursor-pointer'>
                  <img className='h-[220px] w-[99%] rounded-2xl' src={'https://blog-l9ra.onrender.com/images/'+elem.image}/>
                  <div className='title text-lg text-white'>
                      {elem.title}
                  </div>
              </div>
                }):<div className='h-[600px] text-white'>"No Blogs found"</div>
              }
                
                
            </div>
       </div>
        
    </div>
  )
}

export default PostCateogries 
