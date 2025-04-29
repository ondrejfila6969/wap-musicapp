import React from 'react'
import { Search } from 'lucide-react';
import "./SearchBar.css";

export default function SearchBar() {
  return (
    <>
        <div className='w-xl p-3 rounded-full searchbar-wrapper'>
            <Search className='float-left' color='white'/>
            <input className='searchbar-search w-md ml-2 outline-none' placeholder='Invenire Sonus'></input>
        </div>
    </>
  )
}
