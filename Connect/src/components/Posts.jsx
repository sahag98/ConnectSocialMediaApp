import React from 'react'
import { Data } from '../utils/Data'
import { BiLike, BiCommentDetail } from 'react-icons/bi'

const Posts = () => {
  return (
    <div className='mt-10 flex flex-col justify-center gap-10 items-center'>
      {Data.map((data) => (
        <div key={data.id} className="bg-[#d5d8d8] flex flex-col gap-3 px-3 py-2 w-3/4 shadow-lg rounded-md  lg:w-1/4">
          <h2 className='font-semibold'>{data.username}</h2>
          <img className='w-full object-cover lg:w-[450px] lg:h-[450px]' src={data.image} alt="" />
          <section className='flex items-center justify-between'>
            <p>{data.caption}</p>
            <div className='flex'>
              <span className='mr-1'>1</span>
              <BiLike size={25} className="mr-3 cursor-pointer" />
              <span className='mr-1 cursor-pointer'>2</span>
              <BiCommentDetail size={25} />
            </div>
          </section>

        </div>
      ))}
    </div>
  )
}

export default Posts