import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Feed from '../components/Feed'
import { Routes, Route } from 'react-router-dom';
import Search from '../components/Search';
import Share from '../components/Share';
import Profile from './Profile';
import Sidebar from '../components/Sidebar';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('')
    return (
        <div className=''>
            <div>
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <div className=''>
                <div className='fixed'>
                    <Sidebar />
                </div>

                <div className='flex flex-col w-full'>
                    <Routes>
                        <Route path="/" element={<Feed />} />
                        <Route path="/share" element={<Share />} />
                        <Route path="/profile/:username" element={<Profile />} />
                        <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
                    </Routes>
                </div>
                <div className=' w-80'>

                </div>
            </div>
        </div>
    )
}

export default Home