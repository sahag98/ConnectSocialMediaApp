import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import people from "../assets/noavatar.png"
import Spinner from './Spinner'

const SearchItem = ({ item }) => {
  return (
    <div className='flex items-center gap-2'>
      <Link className='flex items-center gap-2' to={`/profile/${item.username}`}>
        <img className='w-10 h-10 rounded-full' src={item.profilePic ? item.profilePic : people} alt="" />
        <p>{item.username}</p>
      </Link>
    </div>
  )
}

export default SearchItem