import React, {useEffect, useState} from 'react'
import {Button} from '@nextui-org/react'
import { useRecoilState } from 'recoil'
import { userAtom } from '../store/user'
import axios from 'axios'
const Profile = () => { 
  const [user,setUser] = useRecoilState(userAtom)
  const [myBlogs,setMyBlogs] = useState([])
  const [votedBlogs,setVotedBlogs] = useState([])
  const [selected,SetSelected] = useState(false)
  console.log(user)
  useEffect(()=>{
    axios.get('http://localhost:3000/users/get',{
      headers:{
        Authorization:localStorage.getItem('token')
      }
    }).then(response=>{
      console.log(response.data)
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

  },[])
  return (
    <div className='h-screen w-full bg-blue-100 flex justify-center items-center shadow-2xl'>
      <div className='h-[95%] w-1/2 bg-white rounded-lg flex flex-col gap-9'>
        <div className='h-[30%] w-full bg-blue-400 rounded-lg flex justify-between'>
          <div className='h-full w-1/3  flex justify-center items-center'>
              <img className='h-2/3 w-[50%] bg-white rounded-full border-4 border-blue-100' src='https://cdn.pixabay.com/photo/2022/12/24/21/14/portrait-7676482_640.jpg'/>
          </div>
          <div className='h-full w-2/3 flex flex-col justify-center p-5'>
          <p className='text-2xl font-extrabold'>{user.username}</p>
          <p className='text-xl'>{user.email}</p>
          </div>
        </div>
        <div className='h-[70%] w-full  rounded-lg '>
          <div className='h-[13%] w-full bg-white rounded-lg flex justify-between p-2'>
            <Button
            onClick={()=>SetSelected(false)}
            className='w-[45%] bg-blue-100 font-semibold text-md' color='white'>My blogs</Button>
            <Button
            onClick={()=>SetSelected(true)}
            className='w-[45%] bg-blue-100 font-semibold text-md' color='white'>Voted blogs</Button>

          </div>
          <div className='h-[87%] w-full overflow-y-scroll bg-blue-400 rounded-lg'>
              {
                  selected===true?votedBlogs.map((elem,index)=>{
                    return <div key={index}>{elem.title}</div>
                  }):myBlogs.map((elem,index)=>{
                    return <div key={index}>{elem.title}</div>
                  })
              }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
