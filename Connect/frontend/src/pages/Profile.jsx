import React from 'react'
import Posts from '../components/Posts'
import { Data } from '../utils/Data'

const Profile = () => {
  return (
    <div className='flex flex-col'>
      <div className='w-full h-80 bg-slate-600'>
        <img className='object-cover w-full h-full' src="https://images.pexels.com/photos/14425123/pexels-photo-14425123.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load" alt="" />
      </div>
      <div className='flex flex-col justify-center items-center'>
        <div className='mb-10'>
          <img className='w-60 object-contain rounded-full' src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600' />
          <h1 className='text-center'>Sahag</h1>
        </div>

        <div className='relative flex gap-3'>
          <h2>2 Followers</h2>
          <h2>3 Followings</h2>
        </div>
      </div>
    </div>
  )
}

export default Profile