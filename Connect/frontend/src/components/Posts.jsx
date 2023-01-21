import React, { useState, useEffect } from 'react'
import { BiLike, BiCommentDetail } from 'react-icons/bi'
import axios from 'axios'
import { format } from 'timeago.js'
import people from "../assets/noavatar.png"
import { Link } from "react-router-dom"

const Posts = ({ post }) => {
  const [user, setUser] = useState({})
  const [likeNum, setLikeNum] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {

  })

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`)
      setUser(res.data)
    }
    fetchUser()

  }, [post.userId])

  const likeHandler = () => {
    // try {
    //   axios.put("/posts/"+ post._id + "/like")
    // } catch (error) {

    // }
    // setLikeNum(isLiked ? likeNum - 1 : likeNum + 1)
    // setIsLiked(!isLiked)
  }

  return (
    <div className='m-5 flex flex-col justify-center items-center'>
      <div className="bg-[#d5d8d8] flex flex-col gap-3 px-3 py-2 w-full shadow-lg rounded-md  lg:w-1/4">
        <div className='flex items-center'>
          <Link to={`profile/${user.username}`} className='flex items-center'>
            <img className='w-10 h-10 object-cover mr-2 rounded-full' src={user.profilePic ? user.profilePic : people} alt="" />
            <span className='font-semibold mr-2'>{user.username}</span>
          </Link>
          <span>{format(post.createdAt)}</span>
        </div>

        <img className='w-full object-cover lg:w-[450px] lg:h-[450px]' src={post?.img} alt="" />
        <section className='flex items-center justify-between'>
          <p>{post.desc}</p>
          <div className='flex'>
            <span className='mr-1'>{likeNum}</span>
            <BiLike onClick={likeHandler} size={25} color={isLiked ? "red" : "black"} className="mr-3 cursor-pointer" />
            <span className='mr-1 cursor-pointer'>2</span>
            <BiCommentDetail size={25} />
          </div>
        </section>

      </div>
    </div>
  )
}

export default Posts