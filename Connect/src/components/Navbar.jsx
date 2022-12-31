import React, { useState } from 'react'
import People from '../assets/people.png'
import { BsSearch, BsFillPersonFill } from 'react-icons/bs'
import { RxHamburgerMenu } from 'react-icons/rx'
import { AiOutlineClose } from 'react-icons/ai'

const Navbar = () => {
    const [toggle, setToggle] = useState(false)
    return (
        <>
            <div className='hidden px-8 h-16 bg-[#ffffff] shadow-md lg:flex md:flex items-center justify-between'>
                <div className='flex justify-self-start'>
                    <img className='h-10' src={People} alt="" />
                    <h1 className='text-[#313C3E] text-3xl font-semibold ml-1'>CONNECT</h1>
                </div>
                <div className='flex  items-center w-80 p-2 self-center bg-slate-50 rounded-md'>
                    <BsSearch className='mr-2 cursor-pointer' />
                    <input className='w-full outline-none' type="text" placeholder='Search for people to connect with' />
                </div>
                <BsFillPersonFill color='#313C3E' size={30} />
            </div>
            <div className='transition lg:hidden md:hidden relative flex items-center justify-between p-2'>
                <div className='flex item-center justify-center'>
                    <img className='h-8' src={People} alt="" />
                    <h1 className='text-[#313C3E] text-2xl font-semibold ml-1'>CONNECT</h1>
                </div>
                <div>
                    <RxHamburgerMenu size={30} onClick={() => setToggle(!toggle)} />
                    {toggle &&
                        <div className='absolute top-0 right-0 h-screen w-3/4 bg-slate-300 items-center flex flex-col'>
                            <AiOutlineClose size={25} className='m-2 self-end' onClick={() => setToggle(false)} />
                            <div className='flex items-center self-center w-3/4 p-1 bg-slate-50 rounded-md'>
                                <BsSearch className='cursor-pointer mr-2' />
                                <input className='w-full outline-none' type="text" placeholder='Search for people' />
                            </div>
                            <div className='flex items-center self-start px-5 mt-5'>
                                <BsFillPersonFill className='mr-2' color='#313C3E' size={30} />
                                <span>Profile</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar