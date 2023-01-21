import React from 'react'
import People from '../assets/people.png'
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { register } from "../actions/auth";
import axios from 'axios'


const Register = () => {
    const dispatch = useDispatch();
    const email = useRef()
    const name = useRef()
    const username = useRef()
    const password = useRef()
    // const passwordAgain = useRef()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [animate, setAnimate] = useState(false);
    // const [animateAgain, setAnimateAgain] = useState(false);
    // const [showPasswordAgain, setShowPasswordAgain] = useState(false);

    const show = () => {
        setShowPassword(!showPassword)
        setAnimate(!animate)
    }

    // const showAgain = () => {
    //     setShowPasswordAgain(!showPasswordAgain)
    //     setAnimateAgain(!animateAgain)
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            email: email.current.value,
            name: name.current.value,
            username: username.current.value,
            password: password.current.value,
        }
        try {
            dispatch(register(user))
            // await axios.post("/auth/register", user)
            navigate("/login")
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='items-center justify-evenly md:justify-center flex h-screen w-full bg-[url("https://cdn.glitch.global/5288658f-8afb-4ac7-b1fa-300b8de8635f/Rectangle%2054%20(1).png?v=1672430722934")] bg-cover bg-center'>
            <div className='flex-col justify-center w-[450px] h-[450px] items-center mr-10 bg-grey-blue rounded-full hidden lg:flex'>
                <img src={People} alt="" />
                <div className='mt-5'>
                    <h1 className='bg-[#717B7A] py-1 px-2 w-30 mb-2 rounded-md text-center text-white font-bold text-5xl pb-2'>CONNECT</h1>
                    <h3 className='font-light text-center'>A place to connect like no other</h3>
                </div>
            </div>
            <div className='bg-white rounded-xl p-5 w-4/5 lg:w-1/4'>
                <h1 className='text-5xl text-center mb-5 font-bold'>Sign Up</h1>
                <h3 className='mb-5'>Welcome to <b>CONNECT!</b> Sign up and start connecting.</h3>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input
                        required ref={email}
                        className='rounded-xl bg-[#E7E7E7] p-3 outline-none'
                        placeholder='Enter Email' type="email"
                    />
                    <input required ref={name}
                        className='rounded-xl bg-[#E7E7E7] p-3 outline-none'
                        placeholder='Enter Full Name' type="text" />
                    <input required ref={username}
                        className='rounded-xl bg-[#E7E7E7] p-3 outline-none'
                        placeholder='Enter Username' type="text" />
                    <div className='flex justify-between items-center'>
                        <input required ref={password}
                            className='rounded-xl w-full bg-[#E7E7E7] p-3 outline-none'
                            placeholder='Enter Password' type={showPassword ? "text" : "password"} />
                        <div className={animate ? 'animate-pulse ml-2' : 'ml-2'} onClick={show}>
                            {showPassword ? <AiOutlineEyeInvisible size={30} /> : <AiOutlineEye size={30} />}
                        </div>
                    </div>
                    {/* <div className='flex justify-between items-center'>
                        <input required ref={passwordAgain}
                            className='rounded-xl w-full bg-[#E7E7E7] p-3 outline-none'
                            placeholder='Re-enter Password' type={showPassword ? "text" : "password"} />
                        <div className={animateAgain ? 'animate-pulse ml-2' : 'ml-2'} onClick={showAgain}>
                            {showPasswordAgain ? <AiOutlineEyeInvisible size={30} /> : <AiOutlineEye size={30} />}
                        </div>
                    </div> */}

                    <p className='text-center'>Already a member?
                        <Link to='/login'>
                            <b className='cursor cursor-pointer'> Login</b>
                        </Link>
                    </p>
                    <button type='submit'
                        className='bg-[#313C3E] p-3 hover:bg-[#2b3536]  text-white rounded-md'
                    >Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register