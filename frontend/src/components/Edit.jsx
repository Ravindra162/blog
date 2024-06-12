import React, { useState, useEffect } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import { useQuill } from 'react-quilljs';
import { useParams } from 'react-router-dom';
// or const { useQuill } = require('react-quilljs');

import 'quill/dist/quill.snow.css';

import axios from 'axios';

const Edit = () => {
    const blog = useParams() 
    const { quill, quillRef } = useQuill();
    const [user, setUser] = useState()
    const [value,setValue] = useState('')
    const [title,setTitle] = useState('')
    const [category,setCategory] = useState('Technology')
    const [base64, setBase64] = useState('');
    const [file,setFile] = useState()
    const [currentBlog,setCurrentBlog] = useState({})
    useEffect(() => {
        axios.get(`https://blog-l9ra.onrender.com/blog/getSingleBlog?blogId=${blog.blogId}`,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }).then(response=> {
            console.log(response.data)
            setCurrentBlog(response.data.blog)
            localStorage.setItem('writing',response.data.blog.content)
            if(quill)
            quill.root.innerHTML = response.data.blog.content
        })
        
      }, []);
      useEffect(()=>{
        
        if (quill) {
            quill.root.innerHTML = localStorage.getItem('writing')
          quill.on('text-change', (delta, oldDelta, source) => {
            console.log(quill.root.innerHTML); // Get innerHTML using quill
            console.log(quillRef.current.firstChild.innerHTML);
            localStorage.setItem('writing',quill.root.innerHTML)
 // Get innerHTML using quillRef
          });
        }
      },[quill])
     


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
        formData.append('description',quill.root.innerHTML); // Append description
        formData.append('image', file); // Append image file
        formData.append('category',category); // Append category
    
        // Add your post upload logic here
        axios.put('https://blog-l9ra.onrender.com/blog/update/'+blog.blogId, formData, {
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })
            .then(response => {
                console.log(response.data.message);
                alert(response.data.message)
                localStorage.removeItem('writing')
                // window.location.href="/"
            })
            .catch(err =>{
                 console.log(err.response.data.message)
                 alert(err.response.data.message)
                    });
    };
    
    return (
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
            <div className='bg-black text-slate-300' style={{ width: 500, height: 300 }}>
             <div ref={quillRef} />
            </div>
            <button
            className='relative text-white bg-green-500 h-[40px] w-[70px] z-10 rounded-xl top-10'
            onClick={uploadPost}
            >Post</button>
            </form>
        </div>
    );
};

export default Edit;
