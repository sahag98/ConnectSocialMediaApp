import React, { useState } from 'react'
import People from '../assets/people.png'
import { BsSearch, BsFillPersonFill } from 'react-icons/bs'
import { RxHamburgerMenu } from 'react-icons/rx'
import { AiOutlineClose, AiOutlinePlusCircle } from 'react-icons/ai'
import { HiOutlinePlus } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [toggle, setToggle] = useState(false)
    return (
        <>
            <div className='hidden px-8 h-16 bg-[#ffffff] shadow-md lg:flex md:flex items-center justify-between'>
                <div className='flex justify-self-start'>
                    <img className='h-10' src={People} alt="" />
                    <Link to="/">
                    </Link>
                    <h1 className='text-[#313C3E] text-3xl cursor-pointer font-semibold ml-1'>CONNECT</h1>
                </div>
                <div className='flex  items-center w-80 p-2 self-center bg-[#d5d8d8] rounded-md'>
                    <BsSearch color='#313C3E' className='mr-2 cursor-pointer' />
                    <input className='w-full outline-none bg-[#d5d8d8] text-[#313C3E] placeholder:text-[#313C3E]' type="text" placeholder='Search for people to connect with' />
                </div>
                <div className='flex items-center'>
                    <div className='bg-[#d5d8d8] p-3 mr-3 cursor-pointer rounded-full transition-all hover:bg-[#c3c2c2]'>
                        <HiOutlinePlus color='black' className=' text-lg' />
                    </div>
                    <BsFillPersonFill className='cursor-pointer' color='#313C3E' size={30} />
                </div>
            </div>
            <div className='px-3 transition lg:hidden md:hidden relative flex items-center justify-between p-2'>
                <div className='flex item-center justify-center'>
                    <img className='h-8' src={People} alt="" />
                    <h1 className='text-[#313C3E] text-2xl font-semibold ml-1'>CONNECT</h1>
                </div>
                <div className='w-50 p-2 flex justify-between'>
                    <div className='bg-[#d5d8d8] p-3 mr-3 rounded-full'>
                        <BsSearch color='black' className='cursor-pointer text-lg' />
                    </div>
                    <div className='bg-[#d5d8d8] p-3 mr-3 rounded-full'>
                        <HiOutlinePlus color='black' className='cursor-pointer text-lg' />
                    </div>
                    <div className='bg-[#d5d8d8] p-3 rounded-full'>
                        <BsFillPersonFill color='black' className='cursor-pointer text-lg' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar