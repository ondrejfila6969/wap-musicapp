import React from 'react'
import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <>
        <div className='w-xl p-2 h-10 rounded-full sonus-bg-linear-gradient'>
            <Search className='float-left' color='white'/>
            <input className='w-md ml-2 outline-none text-sm' placeholder='Invenire Sonus'></input>
        </div>
    </>
  )
}
