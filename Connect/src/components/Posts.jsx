import React from 'react'
import { Data } from '../utils/Data'

const Posts = () => {
  return (
    <div className='mt-10 flex flex-col justify-center gap-10 items-center'>
      {Data.map((data) => (
        <div key={data.id} className="bg-[#d5d8d8] flex flex-col gap-3 px-3 py-2 w-3/4 shadow-lg rounded-md  lg:w-1/2">
          <h2>{data.username}</h2>
          <img className='w-full object-contain' src={data.image} alt="" />
          <p>{data.caption}</p>
        </div>
      ))}
    </div>
  )
}

export default Posts