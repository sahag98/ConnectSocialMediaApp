import React from 'react'
import People from '../assets/people.png'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
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
                <h1 className='text-5xl text-center mb-5 font-bold'>Login</h1>
                <h3 className='mb-5 text-center'>Enter your information to sign in.</h3>
                <form className='flex flex-col gap-4'>
                    <input className='rounded-xl bg-[#E7E7E7] p-3 outline-none' placeholder='Enter Username' type="text" />
                    <input className='rounded-xl bg-[#E7E7E7] p-3 outline-none' placeholder='Enter Password' type="password" />
                    <p className='text-center'>New here?
                        <Link to='/register'>
                            <b className='cursor cursor-pointer'> Sign Up</b>
                        </Link>
                    </p>
                    <button onClick={() => navigate('/')} className='bg-[#313C3E] p-3 hover:bg-[#2b3536]  text-white rounded-md'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login