import React, { useState, useEffect } from 'react'
import { BiLike, BiCommentDetail } from 'react-icons/bi'
import axios from 'axios'
import { format } from 'timeago.js'
import people from "../assets/noavatar.png"
import { Link } from "react-router-dom"

const ProfilePosts = ({ post }) => {
  const [user, setUser] = useState({})
  const [likeNum, setLikeNum] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)

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
    <>
      <div className='hidden m-1 lg:flex'>
        <div className="bg-[#313C3E] flex flex-col gap-2 px-3 py-2 shadow-lg rounded-md  lg:w-[350px] lg:h-[350px]">
          {/* <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <img className='w-10 h-10 object-cover mr-2 rounded-full' src={user.profilePic ? user.profilePic : people} alt="" />
              <span className='font-semibold mr-2'>{user.username}</span>
            </div>
            <span>{format(post.createdAt)}</span>
          </div> */}
          <div className='h-[300px]'>
            <img className='w-full object-contain h-full' src={post?.img} alt="" />
          </div>
          <section className='flex items-center h-100 justify-between'>
            <p>{post.desc}</p>
            <div className='flex'>
              <span className='mr-1'>{likeNum}</span>
              <BiLike size={25} color={isLiked ? "red" : "black"} className="mr-3" />
              <span className='mr-1'>2</span>
              <BiCommentDetail size={25} />
            </div>
          </section>

        </div>
      </div>

      <div className='lg:hidden m-3 flex'>
        <div className="bg-[#d5d8d8] flex flex-col gap-2 px-1 py-1 shadow-lg rounded-md  w-[150px]">
          {/* <div className='flex items-center'>
            <div className='flex items-center'>
              <img className='w-10 h-10 object-cover mr-2 rounded-full' src={user.profilePic ? user.profilePic : people} alt="" />
              <span className='font-semibold mr-2'>{user.username}</span>
            </div>
            <span>{format(post.createdAt)}</span>
          </div> */}
          <div className='w-full h-[150px]'>
            <img className='w-full h-full object-cover' src={post?.img} alt="" />
          </div>

          <section className='flex items-center h-[30px] justify-between'>
            <p className='text-sm'>{post.desc}</p>
            <div className='flex items-center'>
              <span className='mr-1'>{likeNum}</span>
              <BiLike size={18} color={isLiked ? "red" : "black"} className="mr-3" />
              <span className='mr-1'>2</span>
              <BiCommentDetail size={18} />
            </div>
          </section>

        </div>
      </div>
    </>
  )
}

export default ProfilePosts