import React, { useState, useEffect } from 'react'
import axios from "axios"
import ProfilePosts from './ProfilePosts'

const ProfileFeed = ({ username }) => {

  const [posts, setPosts] = useState([])
  useEffect(() => {

    const fetchPosts = async () => {
      const res = await axios.get("/posts/profile/" + username)
      setPosts(res.data)
    }
    fetchPosts()
  }, [username])

  return (
    <div className='flex flex-wrap justify-center'>
      {posts.map(p => (
        <ProfilePosts key={p._id} post={p} />
      ))}
    </div>
  )
}

export default ProfileFeed