import React, { useEffect, useState } from 'react'
import { Data } from '../utils/Data'
import Spinner from './Spinner'
import { BsSearch } from 'react-icons/bs'
import axios from 'axios'
import SearchItem from './SearchItem'

const Search = ({ searchTerm, setSearchTerm }) => {
  const [searchData, setSearchData] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    (async () => {
      if (!searchTerm) {
        setSearchData([])
        return;
      }
      const res = await axios.get('/users/all/users')
      setSearchData(res.data.filter((data) => data.username.includes(searchTerm)))
    })()

  }, [searchTerm]);



  return (
    <div className='flex flex-col justify-center  h-1/2 items-center'>
      <div className='lg:hidden md:hidden flex items-center w-64 p-2 self-center bg-[#d5d8d8] rounded-md'>
        <BsSearch color='#313C3E' className='mr-2 cursor-pointer' />
        <input className='w-full outline-none text-sm bg-[#d5d8d8] text-[#313C3E] placeholder:text-[#313C3E]'
          type="text"
          placeholder='Search for people to connect with'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='mt-3 p-3 border rounded-md h-auto lg:h-auto lg:w-1/2 w-3/4 flex flex-col gap-4'>
        {searchData.map((s, index) => (
          <SearchItem key={index} item={s} searchTerm={searchTerm} />
        ))}

        {/* {searchData.map((data, index) => (
          <div key={index}>{data}</div>
        ))} */}
      </div>
    </div>
  )
}

export default Search