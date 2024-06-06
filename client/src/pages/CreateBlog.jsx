    import React, { useState, useEffect } from 'react';
    import ReactQuill from 'react-quill';
    import Navbar from '../components/Navbar';
    import 'react-quill/dist/quill.snow.css';
    import { userAtom } from '../store/user';
    import { useRecoilState } from 'recoil';
    import axios from 'axios';
    import { blogAtom } from '../store/blog';
    import { image } from '@nextui-org/react';

    const CreateBlog = () => {
        const [user, setUser] = useRecoilState(userAtom);
        const [blog, setBlog] = useRecoilState(blogAtom);
        const [base64, setBase64] = useState('');
        const [file,setFile] = useState()

         


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
            const formData = new FormData();
        
            formData.append('title', blog.title); // Append title
            formData.append('description', blog.description); // Append description
            formData.append('image', file); // Append image file
            formData.append('category', blog.category); // Append category
        
            // Add your post upload logic here
            axios.post('http://localhost:3000/blog/create', formData, {
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            })
                .then(response => {
                    console.log(response.data.message);
                    alert(response.data.message)
                    // window.location.href="/"
                })
                .catch(err => console.log(err));
        };
        
        return (
            <>
                <Navbar userDetails={user} />
                <div>CreateBlog</div>
                <form method='post' encType='multipart/form-data' onSubmit={uploadPost}>
                <input
                    onChange={(e) => {
                        setBlog((prevBlog) => ({
                            ...prevBlog,
                            title: e.target.value
                        }));
                    }}
                    type='text'
                    placeholder='Title of your Blog'
                />
                <input
                onChange={(e) => {
                    setBlog((prev)=>({
                        ...prev,category:e.target.value
                    }))
                }}
                type='text' placeholder='category'/>
                <input 
                name='image'
                type='file' accept='.jpeg,.jpg,.png' onChange={handleFileChange} />
                <ReactQuill 
                    theme="snow" 
                    value={blog.description} 
                    onChange={(newValue) => {
                        setBlog((prevBlog) => ({
                            ...prevBlog,
                            description: newValue,
                            image: base64
                        }));
                    }} 
                />
                <button type='submit' >Upload Post</button>
                </form>
            </>
        );
    };

    export default CreateBlog;
