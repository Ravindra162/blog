import React, { useEffect, useState } from 'react'
import UserNavbar from '../components/UserNavbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { userAtom } from '../store/atoms/user'
import { useRecoilState } from 'recoil'
const Profile = () => {
    const navigate = useNavigate()
  const [selected,setSelected] = useState("MyBlogs")
  const [myBlogs,setMyBlogs] = useState([])
  const [votedBlogs,setVotedBlogs] = useState([])
  const [user,setUser] = useState()

  useEffect(()=>{
    axios.get('http://localhost:3000/users/get',{
        headers:{
            Authorization:localStorage.getItem('token')
        }
    }).then(response=>{
        console.log(response.data.userDetails)
        setUser(response.data.userDetails)
    })
  },[])
  useEffect(()=>{
        axios.get('http://localhost:3000/users/profile',{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }).then(response=>{
            console.log(response.data)
            setMyBlogs(response.data.userBlogs)
            setVotedBlogs(response.data.votedUserBlogs)
        })
    
   
    
  },[selected])
  const deletePost = (blogId) => {
    axios.delete(`http://localhost:3000/blog/deletePost/${blogId}`,{
        headers:{
            Authorization:localStorage.getItem('token')
        }
    }).then(response=>{
        console.log(response.data)
        if(response.data.message==='Post deleted successfully.'){
            alert("Blog deleted successfully")
        }
    })
  }
  return (<>
  <UserNavbar/>
    <div className='h-svh md:h-screen w-full bg-black flex gap-10 p-5 justify-center items-center'>
      <div className='h-full w-[30%] rounded-xl'>
            <div className='h-1/2 w-[120%] md:h-2/3 md:w-full flex justify-center items-center'>
                <img className='h-full rounded-3xl' src={`https://cdn.pixabay.com/photo/2024/05/30/12/49/man-8798457_1280.jpg`}/>
            </div>
            <div className='h-1/3 w-full flex flex-col justify-center items-center'>
                <h1 className='text-white text-3xl'>{user?user.username:''}</h1>
                <h1 className='text-white text-2xl'>{user?user.email:''}</h1>
                <div className='md:h-1/3 md:w-full flex justify-center items-center md:gap-5 gap-10 mt-5'>
                    <button className='h-full md:h-[65%] md:w-[30%] bg-green-600 rounded-lg p-1' >Upvotes 👍 : 57 </button>
                    <button className='h-full  md:h-[65%] md:w-[30%] bg-green-600 rounded-lg p-1' >Follow </button>
                </div>
            </div>
      </div>
      <div className='hidden h-0 w-0 bg-slate-100 md:h-full md:w-[70%] md:bg-slate-300 rounded-xl'>

      </div>
    </div>
    <div className='h-screen w-full bg-black '>
    <div className='h-[40px] w-full flex justify-center items-center  p-1 gap-4'>
              
                <div 
                onClick={(e)=>setSelected('MyBlogs')}
                className={selected==='MyBlogs'?`h-[99%] w-[40%] bg-[#ffffffff] text-black flex justify-center items-center mb-1 rounded-xl cursor-pointer`:'h-[99%] w-[40%] bg-[#ffffffbb] text-black flex justify-center items-center mb-1 rounded-xl cursor-pointer'}>
                      My blogs
                  </div>
                <div
                onClick={(e)=>setSelected('VotedBlogs')}
                className={selected==='VotedBlogs'?`h-[99%] w-[40%] bg-[#ffffffff] text-black flex justify-center items-center mb-1 rounded-xl cursor-pointer`:'h-[99%] w-[40%] bg-[#ffffffbb] text-black flex justify-center items-center mb-1 rounded-xl cursor-pointer'}>
                      Voted blogs
                  </div>
                
              
    </div>
    <div className='h-[700px] w-full bg-black border-2 border-white overflow-y-scroll'>
        {
           selected==='MyBlogs'?myBlogs.map((elem,index)=>{
                return <div
                key={index}
                className='h-[190px] w-full my-2 p-5 flex justify-between items-center'>
                <img className='h-[185px] w-1/2 rounded-xl' src={`http://localhost:3000/images/${elem.image}`}/>
                <div className='w-1/2 h-full m-2 flex flex-col'>
                <div className='text-lg text-white p-2'>   {elem.title}</div>
                <div className='h-1/3 w-full  flex justify-center items-center gap-5'>
                    <button 
                    onClick={()=>{navigate('/user/blog/'+elem.post_id)}}
                    className='h-[80%] w-1/3 bg-white rounded-lg'>view</button>
                    <button
                    onClick={()=>{navigate('/user/blog/edit/'+elem.post_id)}}
                    className='h-[80%] w-1/3 bg-green-400 rounded-lg'>edit</button>
                    <button
                    onClick={()=>deletePost(elem.post_id)}
                    className='h-[80%] w-1/3 bg-red-400 rounded-lg'>delete</button>
                </div>
                </div>
               </div>
            }):votedBlogs.map((elem,index)=>{
                return <div
                key={index}
                className='h-[190px] w-full my-2 p-5 flex justify-between items-center'>
                <img className='h-[185px] w-1/2 rounded-xl' src={`http://localhost:3000/images/${elem.image}`}/>
                <div className='w-1/2 h-full m-2 flex flex-col'>
                <div className='text-lg text-white p-2'>   {elem.title}</div>
                <div className='h-1/3 w-full  flex justify-center items-center gap-5'>
                    <button 
                    onClick={()=>{navigate('/user/blog/'+elem.post_id)}}
                    className='h-[80%] w-1/3 bg-white rounded-lg'>view</button>
                </div>
                </div>
               </div>
            })
        }
    </div>
    </div>  
    </>
  )
}

export default Profile
