import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProfileFeed from '../components/ProfileFeed'
import { useParams } from 'react-router-dom'
import people from "../assets/noavatar.png"
import Rightbar from '../components/Rightbar'
import { useSelector } from "react-redux";


const Profile = () => {
  const [followingsOpen, setFollowingsOpen] = useState(false)
  const [followersOpen, setFollowersOpen] = useState(false)
  const username = useParams().username
  const { user: currentUser } = useSelector((state) => state.auth);
  const [user, setUser] = useState({})


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`)
      setUser(res.data)
    }
    fetchUser()
  }, [username])

  return (
    <div className='flex flex-col'>
      <div className='flex mt-3 flex-col justify-center items-center'>
        <div>
          <img className='w-40 h-40 object-cover rounded-full mb-2' src={user.profilePic ? user.profilePic : people} />
          <h1 className='text-center'>{user.username}</h1>
        </div>

        <Rightbar user={user} />
      </div>
      <div>
        <ProfileFeed username={username} />
      </div>
    </div>
  )
}

export default Profile