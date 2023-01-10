import React, { useState, useEffect } from 'react'
import Posts from './Posts'
import axios from "axios"



const Feed = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {

    const fetchPosts = async () => {
      const res = await axios.get("posts/timeline/63bb9940f0a0940418e7dc28")
      setPosts(res.data)
    }
    fetchPosts()
  }, [])

  return (
    <div>
      {posts.map(p => (
        <Posts key={p._id} post={p} />
      ))}
    </div>
  )
}

export default Feed