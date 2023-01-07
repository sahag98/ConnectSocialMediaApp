import React, { useEffect, useState } from 'react'
import { Data } from '../utils/Data'
import Spinner from './Spinner'
import { BsSearch } from 'react-icons/bs'
const Search = ({ searchTerm, setSearchTerm }) => {
  console.log(searchTerm)
  const [searchData, setSearchData] = useState([])
  const [loading, setLoading] = useState(false)
  console.log(loading)
  useEffect(() => {
    if (searchTerm !== '') {
      setLoading(true)
      const filteredData = Data.filter((data) => data.username.toLowerCase() == searchTerm.toLowerCase())
      setSearchData(filteredData)
    }
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
      <div className='mt-3 p-3 border rounded-md h-72 lg:h-72 lg:w-1/2 w-3/4 flex flex-col gap-4'>
        {loading && <Spinner message="Searching people" />}
        {searchData.map((data) => (
          <div key={data.id}>{data.username}</div>
        ))}
      </div>
    </div>
  )
}

export default Search