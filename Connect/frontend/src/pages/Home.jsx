import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Posts from '../components/Posts'
import { Routes, Route } from 'react-router-dom';
import Search from '../components/Search';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('')
    return (
        <div className='px-2'>
            <div>
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <div className='h-full'>
                <Routes>
                    <Route path="/" element={<Posts />} />
                    <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
                </Routes>
            </div>
        </div>
    )
}

export default Home