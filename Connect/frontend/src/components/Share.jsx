import axios from 'axios';
import React, { useState } from 'react'
import { useRef } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import storage from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
const Share = () => {
  const { user } = useSelector((state) => state.auth);
  const caption = useRef()
  const [file, setFile] = useState(null)
  const [url, setUrl] = useState("")
  const navigate = useNavigate()
  const [percent, setPercent] = useState(0)

  async function submitPost(e) {
    e.preventDefault()

    if (!file) {
      alert("Please choose a file first!")
    }
    const newPost = {
      userId: user._id,
      desc: caption.current.value
    }

    if (file) {
      const storageRef = ref(storage, `/images/${file.name}`)
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
            setFile(null)

            setUrl(url)
            newPost.img = url
            axios.post("/posts", newPost)
            navigate("/")
          })
        }
      )
    }
  }

  return (
    <main className='flex items-center justify-center h-screen'>
      <label>
        {!file &&
          <div className='m-3 h-72 cursor-pointer bg-[#d5d8d8] p-8 flex flex-col justify-center items-center'>
            <p className="font-bold text-2xl">
              <AiOutlineCloudUpload />
            </p>
            <p className="text-lg">Click to upload</p>
            <p className=" text-gray-400">
              Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB
            </p>
            <input
              type="file"
              name="upload-image"
              className="w-0 h-0"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => setFile(e.target.files[0])}
            />

          </div>
        }
        {file &&
          <>
            <div className='m-3 h-96 cursor-pointer bg-[#d5d8d8]flex flex-col justify-center items-center'>
              <img className='w-full h-full object-cover' src={URL.createObjectURL(file)} alt="image-preview" />
            </div>
            <form onSubmit={submitPost} className='flex flex-col m-3 items-center gap-3'>
              <input required autoFocus={true} type="text" className='outline-none p-2 bg-[#e7e7e7] w-full rounded-sm' placeholder='Enter caption' ref={caption} />
              <button className='bg-[#313C3E] w-full rounded-sm text-white p-2 hover:'>Post</button>
            </form>
          </>
        }
      </label>
    </main>

  )
}

export default Share