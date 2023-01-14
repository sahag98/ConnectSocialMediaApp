import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import people from "../assets/noavatar.png"
import { AiOutlineClose } from 'react-icons/ai'
const customStyles = {
  content: {
    position: 'relative',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: "20%",
    height: "auto",
    transform: 'translate(-50%, -50%)',
  },
};

const mobileStyles = {
  content: {
    position: 'relative',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: "80%",
    height: "auto",
    transform: 'translate(-50%, -50%)',
  },
};

const Rightbar = ({ user }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [phonemodalIsOpen, setPhoneIsOpen] = useState(false);
  const [selected, setSelected] = useState('')
  const [followermodalIsOpen, setfollowerIsOpen] = useState(false);
  const [followings, setFollowings] = useState([])
  const [followers, setFollowers] = useState([])
  useEffect(() => {
    const fetchFollowings = async () => {
      try {
        const res = await axios.get("/users/followings/" + user._id)
        const tes = await axios.get("/users/followers/" + user._id)
        setFollowers(tes.data)
        setFollowings(res.data)

      } catch (error) {
        console.log(error)
      }
    }
    fetchFollowings()
  }, [user])


  const selectMenu = () => {
    setSelected('follower')
    setIsOpen(!modalIsOpen)
  }

  const selectMenu2 = () => {
    setSelected('following')
    setIsOpen(!modalIsOpen)
  }

  const selectPhoneMenu = () => {
    setSelected('follower')
    setPhoneIsOpen(!modalIsOpen)
  }

  const selectPhoneMenu2 = () => {
    setSelected('following')
    setPhoneIsOpen(!modalIsOpen)
  }

  return (
    <>
      <div className='hidden lg:flex'>
        <div className='relative flex gap-3'>
          <h2 onClick={selectMenu} className='font-semibold cursor-pointer'>{user.followers?.length} Followers</h2>
          <h2 onClick={selectMenu2} className='font-semibold cursor-pointer'>{user.followings?.length} Followings</h2>
        </div>
        <div >
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
            <AiOutlineClose onClick={() => setIsOpen(false)} size={25} className='cursor-pointer absolute top-2 right-2' />
            <div className='flex flex-col gap-5'>

              {selected === 'follower' && followers.map((f) => (
                <div className='flex items-center' key={f._id}>
                  <img className='w-10 h-10 object-cover rounded-full mr-5' src={f.profilePic ? f.profilePic : people} alt="" />
                  {f.username}
                </div>
              ))}

              {selected === 'following' && followings.map((f) => (
                <div className='flex items-center' key={f._id}>
                  <img className='w-10 h-10 object-cover rounded-full mr-5' src={f.profilePic ? f.profilePic : people} alt="" />
                  {f.username}
                </div>
              ))}
            </div>
          </Modal>
        </div>
      </div>

      <div>
        <div className='relative flex gap-3 lg:hidden'>
          <h2 onClick={selectPhoneMenu} className='font-semibold cursor-pointer'>{user.followers?.length} Followers</h2>
          <h2 onClick={selectPhoneMenu2} className='font-semibold cursor-pointer'>{user.followings?.length} Followings</h2>
        </div>
        <div >
          <Modal
            isOpen={phonemodalIsOpen}
            onRequestClose={() => setPhoneIsOpen(false)}
            style={mobileStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
            <AiOutlineClose onClick={() => setPhoneIsOpen(false)} size={25} className='cursor-pointer absolute top-2 right-2' />
            <div className='flex flex-col gap-5'>
              {selected === 'follower' && followers.map((f) => (
                <div className='flex items-center' key={f._id}>
                  <img className='w-10 h-10 object-cover rounded-full mr-5' src={f.profilePic ? f.profilePic : people} alt="" />
                  {f.username}
                </div>
              ))}

              {selected === 'following' && followings.map((f) => (
                <div className='flex items-center' key={f._id}>
                  <img className='w-10 h-10 object-cover rounded-full mr-5' src={f.profilePic ? f.profilePic : people} alt="" />
                  {f.username}
                </div>
              ))}
            </div>
          </Modal>
        </div>
      </div>
    </>
  )
}

export default Rightbar