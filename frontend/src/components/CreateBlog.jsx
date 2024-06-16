import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-wysiwyg';
import UserNavbar from '../components/UserNavbar'

import axios from 'axios';

const CreateBlog = () => {
    const [user, setUser] = useState()
    const [value,setValue] = useState('')
    const [title,setTitle] = useState('')
    const [category,setCategory] = useState('Technology')
    const [base64, setBase64] = useState('');
    const [html, setHtml] = useState('');
    const [file,setFile] = useState('')
   
      
     


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadPost = (e) => {
        e.preventDefault();
        if(title==='' || file==='')return alert("Fill all details")
        const formData = new FormData();
    
        formData.append('title',title); // Append title
        formData.append('description',html); // Append description
        formData.append('image', file); // Append image file
        formData.append('category',category); // Append category
    
        // Add your post upload logic here
        axios.post('http://localhost:3000/blog/create',{title,category,html,base64}, {
            headers:{
                'Authorization':localStorage.getItem('token'),
                'Content-Type':'application/json'
            }
        })
            .then(response => {
                console.log(response.data.message);
                alert(response.data.message)
                localStorage.removeItem('writing')
                // window.location.href="/"
            })
            .catch(err => alert(err.response.data.message));
    };
    
    return (<>
    <UserNavbar/>
        <div className='h-screen w-full bg-[black] flex flex-col justify-center items-center'>
            <form className='w-full h-[90%] p-5 flex flex-col justify-center items-center gap-10' method='post' encType='multipart/form-data' onSubmit={uploadPost}>
            <input 
            onChange={(e)=>setTitle(e.target.value)}
            className='h-[30px] w-1/2' type='text' placeholder='title of blog' required />
            <select onChange={(e)=>setCategory(e.target.value)} >
                <option value={"Technology"}>Technology</option>
                <option value={"Health"}>Health</option>
                <option value={"Business"}>Business</option>
                <option value={"Programming"}>Programming</option>
            </select>
            <input 
            className='text-white'
            name='image'
            type='file' accept='.jpeg,.jpg,.png' onChange={handleFileChange} required/>
            {/* <ReactQuill className='bg-[#ffffffc1]'/> */}
            {/* <div className='bg-black text-slate-300' style={{ width: 500, height: 300 }}>
             <div ref={quillRef} />
            </div> */}
            <Editor className='text-white' value={html} onChange={(e)=>{
                console.log(e.target.value)
                setHtml(e.target.value)
            }} />
            <button
            className='relative text-white bg-green-500 h-[40px] w-[70px] z-10 rounded-xl top-10'
            onClick={uploadPost}
            >Post</button>
            </form>
        </div>
        </>
    );
};

export default CreateBlog;
