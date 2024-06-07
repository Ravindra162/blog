import React,{useEffect, useState} from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/user";
export default function App() {
  const navigate = useNavigate()
  const [login,setLogin] = useState(false)
  const [user,setUser] = useRecoilState(userAtom)
  useEffect(() => {
    axios.get('http://localhost:3000/users/get', {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(response => {
      setLogin(true)
        console.log(response.data.userDetails);
        setUser(response.data.userDetails);
    });
}, []);
  const logoutORlogin = () => {
    if(login===true){
      localStorage.removeItem('token')
      window.location.href='/login'
    }
    else{
      navigate('/login')
    }
    
  }
  const signUpOrProfile = () =>{
    if(login){
      window.location.href='/profile'
    }
    else window.location.href='/register'
  }
  return (
    <Navbar>
      <NavbarBrand>
        <p className="text-2xl font-bold text-inherit cursor-pointer"
        onClick={()=>window.location.href='/'}
        >Bloog</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/writeblog">
            Create Blog
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Favorites
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Theme
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button onClick={logoutORlogin}>{login===true?"logout":"Login"}</Button>
        </NavbarItem>
        <NavbarItem>
          <Button 
          onClick={signUpOrProfile}
          as={Link} color="primary" href="#" variant="flat">
            {login===true?user.username:"Sign Up"}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
