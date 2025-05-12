import React from 'react'
import LibraryHeader from '../LibraryHeader/LibraryHeader'
import LibraryPlaylist from '../LibraryPlaylist/LibraryPlaylist'

export default function Library() {
  return (
    <div className="flex-1 bg-gray-400 rounded-3xl sonus-bg-linear-gradient p-8">
      <LibraryHeader />
      <div className='mt-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
        <LibraryPlaylist imageUrl={"playlistCoverExample.png"} title={"Playlist Example"}/>
        <LibraryPlaylist imageUrl={"playlistCoverExample.png"} title={"Playlist Example"}/>
        <LibraryPlaylist imageUrl={"playlistCoverExample.png"} title={"Playlist Example"}/>
        <LibraryPlaylist imageUrl={"playlistCoverExample.png"} title={"Playlist Example"}/>
      </div>
    </div>
  )
}
