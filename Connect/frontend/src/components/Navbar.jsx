import React, { useState } from 'react'
import People from '../assets/people.png'
import { BsSearch, BsFillPersonFill } from 'react-icons/bs'
import { RxHamburgerMenu } from 'react-icons/rx'
import { AiOutlineClose, AiOutlinePlusCircle } from 'react-icons/ai'
import { HiOutlinePlus } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";

const Navbar = ({ searchTerm, setSearchTerm }) => {
    const [toggle, setToggle] = useState(false)
    const { user: currentUser } = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        navigate("/login")
        window.location.reload()
    }
    return (
        <>
            <div className='hidden fixed w-full z-10 px-6 h-16 bg-[#ffffff] shadow-md lg:flex md:flex items-center justify-between'>
                <div className='flex justify-self-start'>

                    <img className='h-10' src={People} alt="" />
                    <Link to="/">
                        <h1 className='text-[#313C3E] text-3xl cursor-pointer font-semibold ml-1'>CONNECT</h1>
                    </Link>
                </div>
                <div className='flex items-center w-72 p-2 self-center bg-[#d5d8d8] rounded-md'>
                    <BsSearch color='#313C3E' className='mr-2 cursor-pointer' />
                    <input className='w-full outline-none text-sm bg-[#d5d8d8] text-[#313C3E] placeholder:text-[#313C3E]'
                        type="text"
                        placeholder='Search for people to connect with'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => navigate('/search')}
                    />
                </div>

                <div className='flex items-center justify-between'>
                    <div onClick={() => navigate(`/profile/${currentUser.username}`)} className='flex flex-col items-center bg-[#d5d8d8] rounded-full transition-all'>
                        <img className='object-cover hover:opacity-75 rounded-full w-12 h-12 border-2' src={currentUser.profilePic} alt="" />
                    </div>
                </div>
            </div>
            <div className='px-3 transition lg:hidden md:hidden relative flex items-center justify-between p-2'>
                <div className='flex item-center justify-center'>
                    <img className='h-8' src={People} alt="" />
                    <Link to="/">
                        <h1 className='text-[#313C3E] text-2xl font-semibold ml-1'>CONNECT</h1>
                    </Link>
                </div>
                <div className='relative w-50 p-2 flex justify-between'>
                    <Link to="/search">
                        <div className='bg-[#d5d8d8] p-3 mr-3 rounded-full'>
                            <BsSearch color='black' className='cursor-pointer text-lg' />
                        </div>
                    </Link>
                    <div onClick={() => navigate('/share')} className='bg-[#d5d8d8] p-3 mr-3 rounded-full'>
                        <HiOutlinePlus color='black' className='cursor-pointer text-lg' />
                    </div>
                    <div onClick={() => navigate(`/profile/${currentUser.username}`)} className='bg-[#d5d8d8] p-3 rounded-full'>
                        <BsFillPersonFill color='black' className='cursor-pointer text-lg' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar