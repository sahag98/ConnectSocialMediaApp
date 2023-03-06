import React, { useState } from 'react'
import { AiOutlineHome, AiFillHome, AiOutlinePlusCircle } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { BiCategory } from 'react-icons/bi'
import { TbDoorExit } from 'react-icons/tb'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";

const Sidebar = () => {
  const [selected, setSelected] = useState('home')
  const dispatch = useDispatch()
  const { user: currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  function activeBox(button) {
    setSelected(button)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
    window.location.reload()
  }
  return (
    <main className='bg-[#313C3E] lg:fixed top-16 shadow-xl hidden lg:flex lg:h-full lg:w-80'>
      <ul className='m-5 flex flex-col gap-2 w-full'>
        <Link to="/">
          <li onClick={() => activeBox('home')} className={selected == 'home' ? 'bg-[#252e2f] rounded-xl text-[#cfcfcf] font-bold cursor-pointer text-md p-2 h-12 hover:bg-[#252e2f] hover:rounded-xl flex items-center gap-4' : 'text-[#cfcfcf] cursor-pointer text-md p-2 h-12 hover:bg-[#252e2f] hover:rounded-xl flex items-center gap-4'}>
            {selected == 'home' ? <AiFillHome size={25} /> : <AiOutlineHome size={25} />}

            <p>Home</p>
          </li>
        </Link>
        <Link to="/share">
          <li onClick={() => activeBox('upload')} className={selected == 'upload' ? 'bg-[#252e2f] rounded-xl text-[#cfcfcf] font-bold cursor-pointer text-md p-2 h-12 hover:bg-[#252e2f] hover:rounded-xl flex items-center gap-4' : 'text-[#cfcfcf] cursor-pointer text-md p-2 h-12 hover:bg-[#252e2f] hover:rounded-xl flex items-center gap-4'}>
            <AiOutlinePlusCircle size={25} />
            <p>Upload</p>
          </li>
        </Link>
        <Link to={`/profile/${currentUser.username}`}>
          <li onClick={() => activeBox('profile')} className={selected == 'profile' ? 'bg-[#252e2f] rounded-xl text-[#cfcfcf] font-bold cursor-pointer text-md p-2 h-12 hover:bg-[#252e2f] hover:rounded-xl flex items-center gap-4' : 'text-[#cfcfcf] cursor-pointer text-md p-2 h-12 hover:bg-[#252e2f] hover:rounded-xl flex items-center gap-4'}>
            <CgProfile size={25} />
            <p>Profile</p>
          </li>
        </Link>
        <li onClick={() => activeBox('category')} className={selected == 'category' ? 'bg-[#252e2f] rounded-xl text-[#cfcfcf] font-bold cursor-pointer text-md p-2 h-12 hover:bg-[#252e2f] hover:rounded-xl flex items-center gap-4' : 'text-[#cfcfcf] cursor-pointer text-md p-2 h-12 hover:bg-[#252e2f] hover:rounded-xl flex items-center gap-4'}>
          <BiCategory size={25} />
          <p>Categories</p>
        </li>
        <li onClick={handleLogout} className={selected == 'Logout' ? 'bg-[#252e2f] rounded-xl text-[#cfcfcf] font-bold cursor-pointer text-md p-2 h-12 hover:bg-[#252e2f] hover:rounded-xl flex items-center gap-4' : 'text-[#cfcfcf] cursor-pointer text-md p-2 h-12 hover:bg-[#252e2f] hover:rounded-xl flex items-center gap-4'}>
          <TbDoorExit size={25} />
          <p>Log out</p>
        </li>
      </ul>
    </main>
  )
}

export default Sidebar