import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProfileFeed from '../components/ProfileFeed'
import { useParams } from 'react-router-dom'
import people from "../assets/noavatar.png"


const Profile = () => {
  const [isOpen, setIsOpen] = useState(false)
  const username = useParams().username
  console.log(username)
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`)
      setUser(res.data)
    }
    fetchUser()

  }, [])
  return (
    <div className='flex flex-col'>
      <div className='flex mt-3 flex-col justify-center items-center'>
        <div>
          <img className='w-40 h-40 object-cover rounded-full mb-2' src={user.profilePic ? user.profilePic : people} />
          <h1 className='text-center'>{user.username}</h1>
        </div>
        <div className='relative flex gap-3'>
          <h2 onClick={() => setIsOpen(!isOpen)} className='font-semibold cursor-pointer'>{user.followers?.length} Followers</h2>
          <h2 className='font-semibold'>{user.followings?.length} Followings</h2>
        </div>
      </div>
      <div>
        <ProfileFeed username={username} />
      </div>
    </div>
  )
}

export default Profile