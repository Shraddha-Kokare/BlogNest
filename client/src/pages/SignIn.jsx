import React, { useState } from 'react'
import logo from '../images/logo.png'
import {data, Link, useNavigate} from 'react-router'
import { api_base_url } from '../helper';

const SignIn = () => {
    const [email,setEmail]=useState("");
        const [pwd,setPwd]=useState("");
        const [error,setError]=useState("");
        const navigate=useNavigate();
    
        const submitForm=(e)=>{
            e.preventDefault();
            fetch(api_base_url+"/login",{
                mode: "cors",
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: pwd
                })
            }).then(res=>res.json()).then(data=>{
                if(data.success){
                    localStorage.setItem("token",data.token);
                    localStorage.setItem("isLoggedIn",true);
                    setTimeout(()=>{
                        window.location.href="/";
                    },200);
                    
                }
                else{
                    setError(data.msg);
                }
            })
            console.log(email);
            console.log(pwd);
        }
  return (
    <>
            <div className='con flex flex-col items-center justify-center h-screen '>
                <form onSubmit={submitForm} className='w-[26vw] min-h-[auto] bg-[#0f0e0e] flex flex-col items-center justify-center rounded-2xl p-5' action="">
                    <img className='-mt-3 w-240px h-[100px]' src={logo} alt="" />
                    <div className='w-full'>
    
                        <p className='text-14px mt-3'>Email</p>
                        <div className='inputBox'>
                            <input onChange={(e)=>{setEmail(e.target.value)}} value={email}  type="email" placeholder='Email' name="" required />
                        </div>
    
                        <p className='text-14px mt-3'>Password</p>
                        <div className='inputBox'>
                            <input onChange={(e)=>{setPwd(e.target.value)}} value={pwd}  type="password" placeholder='Password' name="" required />
                        </div>
                        
                        <p className='text-[14px] text-[gray] my-3'>Don't have an account? <Link to="/signup" className='text-purple-600'>Register</Link> </p>
    
                        <p className='text-[14px] text-red-500 mb-3'>{error} </p>
                        <button className='btnNormal w-full'>Sign In</button>
                    </div>
                </form>
            </div>
        </>
  )
}

export default SignIn