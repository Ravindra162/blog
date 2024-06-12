import React from 'react'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import UserHome from './pages/UserHome'
import CreateBlog from './components/CreateBlog'
import DisplayBlog from './components/DisplayBlog'
import Profile from './pages/Profile'
import Edit from './components/Edit'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/user' element={<UserHome/>}/>
        <Route exact path='/write' element={<CreateBlog/>}/>
        <Route exact path='/user/profile' element={<Profile/>}/>
        <Route exact path='/user/blog/:blogId' element={<DisplayBlog/>}/>
        <Route exact path='/user/blog/edit/:blogId' element={<Edit/>}/>
      </Routes>
    </Router>
  )
}

export default App
