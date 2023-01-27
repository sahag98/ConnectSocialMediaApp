import React, { useState, useEffect } from 'react'
import Posts from './Posts'
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";


const Feed = () => {
  const [posts, setPosts] = useState([])
  const { user: currentUser } = useSelector((state) => state.auth);
  useEffect(() => {

    const fetchPosts = async () => {
      const res = await axios.get(`/posts/timeline/${currentUser._id}`, {
        headers: {
          token:
            JSON.parse(localStorage.getItem("user")).accessToken
        }
      });
      setPosts(res.data)
    }
    fetchPosts()
  }, [])


  return (
    <>
      <div className='flex justify-center items-center mt-10'>
        {posts.length === 0 &&
          <p>Follow people to see their posts!</p>
        }
      </div>

      {posts.map(p => (
        <Posts key={p._id} post={p} />
      ))}
    </>
  )
}

export default Feed