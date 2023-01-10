import React from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'

const Share = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <label>
        <div className='m-3 h-72 bg-[#d5d8d8] p-8 flex flex-col justify-center items-center'>
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
          />
        </div>
      </label>
    </div>
  )
}

export default Share