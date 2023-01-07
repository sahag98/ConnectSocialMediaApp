import React from 'react'
import { ColorRing } from 'react-loader-spinner'

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <ColorRing
        visible={true}
        height="50"
        width="50"
        ariaLabel="blocks-loading"
        className="m-5"
        colors={['#313c3e', '#394648', '#425154', '#5d7276', '#313c3e']}
      />
      <p className='text-md text-center px-2'>{message}</p>
    </div>
  )
}

export default Spinner;