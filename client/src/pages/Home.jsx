import React, {useEffect} from 'react'
import NavBar from '../components/Navbar'
import ListPost from '../components/ListPost'
import { useRecoilState } from 'recoil'
import { userAtom } from '../store/user'
import axios from 'axios'
const Home = () => {
    
   
    return (<div className='h-screen w-full flex flex-col gap-0 justify-center items-center'>
    <NavBar/>
    <ListPost/>
    </div>)
}

export default Home