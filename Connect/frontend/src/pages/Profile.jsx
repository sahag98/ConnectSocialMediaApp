import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProfileFeed from '../components/ProfileFeed'
import { useParams } from 'react-router-dom'
import people from "../assets/noavatar.png"
import Rightbar from '../components/Rightbar'
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const [followingsOpen, setFollowingsOpen] = useState(false)
  const [followersOpen, setFollowersOpen] = useState(false)
  const username = useParams().username
  const { user: currentUser } = useSelector((state) => state.auth);
  const [user, setUser] = useState({})
  const dispatch = useDispatch()

  const instance = axios.create({
    baseURL: 'http://localhost:8800/api',
    timeout: 1000,
    headers: { 'token': JSON.parse(localStorage.getItem("user")).accessToken }
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`)
      setUser(res.data)
    }
    fetchUser()
  }, [username])

  const follow = async () => {
    await instance.put(`/users/${user._id}/follow`, {
      userId: currentUser._id,
    })
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col gap-3 justify-center items-center'>
        <div>
          <img className='w-40 h-40 object-cover rounded-full mb-2' src={user.profilePic ? user.profilePic : people} />
          <h1 className='text-center'>{user.username}</h1>
        </div>

        <Rightbar user={user} />
        <button onClick={follow}>Follow</button>
      </div>
      <div>
        <ProfileFeed username={username} />
      </div>
    </div>
  )
}

export default Profile