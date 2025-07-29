import React, { useState } from 'react'
import logo from '../images/logo.png'
import {Link, useNavigate} from 'react-router'
import { api_base_url } from '../helper';
// import { emit } from '../../../backend/app';

const SignUp = () => {
    const [username,setUsername]=useState("");
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [pwd,setPwd]=useState("");
    const [error,setError]=useState("");

    const navigate=useNavigate();

    const submitForm=(e)=>{
        e.preventDefault();
        console.log(username);
        console.log(name);
        console.log(email);
        console.log(pwd);

        fetch(api_base_url+"/signUp",{
            mode: "cors",
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                username: username,
                name: name,
                email: email,
                password: pwd
            })
        }).then((res)=>res.json()).then((data)=>{
            if(data.success)
            {
                navigate("/signin");
            }
            else{
                setError(data.msg);
            }
        })
    }
  return (
    <>
        <div className='con flex flex-col items-center justify-center h-screen '>
            <form onSubmit={submitForm} className='w-[26vw] min-h-[auto] bg-[#0f0e0e] flex flex-col items-center justify-center rounded-2xl p-5' action="">
                <img className='-mt-3 w-240px h-[100px]' src={logo} alt="" />
                <div className='w-full'>
                    <p className='text-14px mt-3'>Username</p>
                    <div className='inputBox'>
                        <input onChange={(e)=>{setUsername(e.target.value)}} value={username} type="text" placeholder='Username' name="" required />
                    </div>

                    <p className='text-14px mt-3'>Name</p>
                    <div className='inputBox'>
                        <input onChange={(e)=>{setName(e.target.value)}} value={name} type="text" placeholder='Name' name="" required />
                    </div>

                    <p className='text-14px mt-3'>Email</p>
                    <div className='inputBox'>
                        <input onChange={(e)=>{setEmail(e.target.value)}} value={email}  type="email" placeholder='Email' name="" required />
                    </div>

                    <p className='text-14px mt-3'>Password</p>
                    <div className='inputBox'>
                        <input onChange={(e)=>{setPwd(e.target.value)}} value={pwd}  type="password" placeholder='Password' name="" required />
                    </div>
                    
                    <p className='text-[14px] text-[gray] my-3'>Already have an account? <Link to="/signin" className='text-purple-600'>Login</Link> </p>

                    <p className='text-[14px] text-red-500 mb-3'>{error} </p>
                    <button className='btnNormal w-full'>Sign Up</button>
                </div>
            </form>
        </div>
    </>
  )
}

export default SignUp