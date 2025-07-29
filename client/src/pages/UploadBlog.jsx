import React, { useState, useRef, useMemo } from 'react';
import Navbar from '../components/Navbar';
import JoditEditor from 'jodit-react';
import { api_base_url } from '../helper';


const UploadBlog = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminSecret, setAdminSecret] = useState('');
    const [error, setError] = useState('');
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const [title,setTitle] =useState("");
    const [desc,setDesc] =useState("");

    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: 'Start typing...',
        }),
        []
    );

    const checkAdmin = () => {
        if (adminSecret !== '') {
            if (adminSecret === 'admin1234') {
                setIsAdmin(true);
                setError('');
            } else {
                setError('Invalid admin secret!');
            }
        } else {
            setError('Please provide admin secret');
        }
    };

    const submitForm=(e)=>{
        e.preventDefault();

        let formData=new FormData();
        formData.append("title",title);
        formData.append("desc",desc);
        formData.append("content",content);
        formData.append("image",image);
        formData.append("token",localStorage.getItem("token"));

        fetch(api_base_url+"/uploadBlog",{
            mode: "cors",
            method: "POST",
            body: formData,
        }).then((res)=>res.json().then(data=>{
            if(data.success)
            {
                alert("Blog created successfully !");
                setTitle("");
                setDesc("");
                setContent("");
                setImage("");
                setError("");
            }
            else{
                setError(data.msg);
            }
        }))
    }

    return (
        <>
            {!isAdmin ? (
                <div className="flex items-center justify-center flex-col h-screen">
                    <div className="w-[25vw] h-[40vh] flex flex-col rounded-xl p-5 bg-gray-800 text-white">
                        <h3 className="text-2xl mb-4">Login to upload blog</h3>
                        <input
                            onChange={(e) => setAdminSecret(e.target.value)}
                            value={adminSecret}
                            type="text"
                            placeholder="Enter admin secret"
                            className="p-2 rounded bg-white text-black"
                        />
                        <p className="text-red-500 mt-2">{error}</p>
                        <button
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                            onClick={checkAdmin}
                        >
                            Login
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <Navbar />
                    <div className="px-[100px]">
                        <h3 className="text-3xl my-4">Upload Blog</h3>
                        <form onSubmit={submitForm}>
                            <input
                                type="text" onChange={(e)=>setTitle(e.target.value)} value={title}
                                placeholder="Enter title"
                                className="w-full p-2 mb-4 border rounded"
                            />
                            <textarea onChange={(e)=>setDesc(e.target.value)} value={desc}
                                placeholder="Enter Description"
                                className="w-full p-2 mb-4 border rounded"
                            ></textarea>
                            <JoditEditor
                                className='text-black'
                                ref={editor}
                                value={content}
                                config={config}
                                tabIndex={1}
                                onBlur={(newContent) => setContent(newContent)}
                            />

                            <div className="my-3">
                                <input
                                    type="file"
                                    id="file"
                                    className="hidden"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                                <label
                                    htmlFor="file"
                                    className="cursor-pointer border-2 border-white px-4 py-2 rounded inline-block text-white hover:bg-white hover:text-black"
                                >
                                    Upload Image
                                </label>
                                <p className="mt-2 text-sm text-gray-300">
                                    {image ? image.name : 'No file chosen'}
                                </p>
                            </div>

                            <button className="btnNormal mt-3">Create Blog</button>
                        </form>

                    </div>
                </>
            )}
        </>
    );
};

export default UploadBlog;
