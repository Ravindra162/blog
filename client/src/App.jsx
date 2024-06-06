import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Home from './pages/Home'
import CreateBlog from './pages/CreateBlog'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  return <Router>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/writeblog' element={<CreateBlog/>}/>
      <Route exact path='/register' element={<Register/>}/>
      <Route exact path='/login' element={<Login/>}/>
    </Routes>
  </Router>
}

export default App