import React, { useState, useEffect } from 'react'
import { BiLike, BiCommentDetail } from 'react-icons/bi'
import { AiOutlinePlusCircle, AiOutlineSafety } from 'react-icons/ai'
import axios from 'axios'
import { format } from 'timeago.js'
import people from "../assets/noavatar.png"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

const Posts = ({ post }) => {
  const [user, setUser] = useState({})
  const [likeNum, setLikeNum] = useState(post.likes.length)
  const [commentNum, setCommentNum] = useState(post.comments.length)
  const [isLiked, setIsLiked] = useState(false)
  const [isCommented, setIsCommented] = useState(false)
  const { user: currentUser } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false)
  const [comment, setComment] = useState('')
  const [commenter, setCommenter] = useState({})

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id))
    setIsCommented(post.comments.includes(currentUser._id))
  }, [currentUser._id, post.likes, post.comments])

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`)
      setUser(res.data)
    }
    fetchUser()

  }, [post.userId])

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id })
    } catch (error) {

    }
    setLikeNum(isLiked ? likeNum - 1 : likeNum + 1)
    setIsLiked(!isLiked)
  }

  const commentHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/comment", { comment: comment, user: currentUser })
    } catch (error) {

    }
    setCommentNum(isCommented ? commentNum - 1 : commentNum + 1)
    setIsCommented(!isCommented)
    window.location.reload()
  }




  return (
    <div className='mx-5 mb-10 lg:m-20 md:mt-12 flex flex-col justify-center items-center'>
      <div className="bg-[#d5d8d8] flex flex-col gap-2 py-2 w-full shadow-lg rounded-md  lg:w-1/4">
        <div className='flex items-center ml-2'>
          <Link to={`profile/${user.username}`} className='flex items-center'>
            <img className='w-10 h-10 object-cover mr-2 rounded-full' src={user.profilePic ? user.profilePic : people} alt="" />
            <span className='font-semibold mr-2'>{user.username}</span>
          </Link>
          <span>{format(post.createdAt)}</span>
        </div>

        <img className='w-full object-cover h-[350px] md:h-[500px] lg:w-[full] lg:h-[450px]' src={post?.img} alt="" />
        <section className='flex items-center justify-between m-1'>
          <p className='ml-2'>{post.desc}</p>
          <div className='flex'>
            <span className='mr-1'>{likeNum}</span>
            <BiLike onClick={likeHandler} size={25} color={isLiked ? "red" : "black"} className="mr-3 cursor-pointer" />
            <span className='mr-1 cursor-pointer'>{commentNum}</span>
            <BiCommentDetail onClick={() => setOpen(!open)} size={25} />
          </div>
        </section>
        {open &&
          <div className='h-auto flex flex-col'>
            <div className='flex justify-evenly items-center mb-2'>
              <input onChange={(e) => setComment(e.target.value)} className='outline-none p-1 w-4/5' type="text" />
              <AiOutlinePlusCircle size={28} onClick={commentHandler} />
            </div>
            <div className='flex flex-col gap-2'>
              {post.comments.map((c, index) => (
                <div className='flex' key={index}>
                  <div className='flex gap-2 mr-2'>
                    <img className='w-7 h-7' src={c.commenter.profilePic ? c.commenter.profilePic : people} alt="" />
                    <p className='mr-2'>{c.commenter.username}</p>
                  </div>
                  <p className='mr-2 text-left'>{c.comment}</p>
                </div>
              ))}
            </div>
          </div>
        }
      </div>
    </div >
  )
}

export default Posts