import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProfileFeed from '../components/ProfileFeed'
import { useParams } from 'react-router-dom'
import people from "../assets/noavatar.png"
import Rightbar from '../components/Rightbar'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from "react-redux";
import storage from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"

const Profile = () => {
  const [followingsOpen, setFollowingsOpen] = useState(false)
  const [openInput, setOpenInput] = useState(false)
  const username = useParams().username
  const { user: currentUser } = useSelector((state) => state.auth);
  const [user, setUser] = useState({})
  const [file, setFile] = useState(null)
  const dispatch = useDispatch()
  const [percent, setPercent] = useState(0)

  console.log(currentUser.followings.includes(user?._id))

  const [followed, setFollowed] = useState(currentUser.followings.includes(user._id))
  console.log(followed)

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


  async function submitPic(e) {
    e.preventDefault()

    if (!file) {
      alert("Please choose a file first!")
    }
    if (file) {
      const storageRef = ref(storage, `/profileImages/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          setPercent(percent)
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            axios.put(`/users/${currentUser._id}/user`, {
              userId: currentUser._id,
              profilePic: url
            })
            window.location.reload()
          })
        }
      )

    }
  }

  const follow = async () => {
    await instance.put(`/users/${user._id}/follow`, {
      userId: currentUser._id,
    })
    dispatch({ type: "FOLLOW", payload: user._id })
  }

  const unfollow = async () => {
    await instance.put(`/users/${user._id}/unfollow`, {
      userId: currentUser._id,
    })
    dispatch({ type: "UNFOLLOW", payload: user._id })
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col gap-3 justify-center items-center'>
        <div className='flex flex-col items-center mt-3'>
          <img className='w-40 h-40 border object-cover rounded-full' src={user.profilePic ? user.profilePic : people} />
          <h1 className='text-center mb-2'>{user.username}</h1>
          {currentUser.username == username &&
            <div>
              {!openInput &&
                <button className='bg-[#313C3E] rounded-md p-2 text-white' onClick={() => setOpenInput(!openInput)}>Update Profile Pic</button>
              }
              {openInput &&
                <div className='flex items-center'>
                  <input
                    type="file"
                    name="upload-image"
                    className=""
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <button className='bg-[#313C3E] rounded-md p-2 text-white' onClick={submitPic}>upload</button>
                  <AiFillCloseCircle className='ml-5' color='#313C3E' size={30} onClick={() => setOpenInput(false)} />
                </div>
              }
            </div>
          }

        </div>

        <Rightbar user={user} />
        {currentUser.followings.includes(user?._id) ?
          <button className='bg-[#313C3E] text-white p-2 rounded-md' onClick={unfollow}>UnFollow</button> :
          <button onClick={follow}>Follow</button>
        }
      </div>
      <div>
        <ProfileFeed username={username} />
      </div>
    </div>
  )
}

export default Profile