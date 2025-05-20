import React from 'react'
import LibraryHeader from '../LibraryHeader/LibraryHeader'
import LibraryPlaylist from '../LibraryPlaylist/LibraryPlaylist'

export default function Library() {
  return (
    <div className="flex-1 bg-gray-400 rounded-3xl sonus-bg-linear-gradient p-8 flex flex-col">
      <LibraryHeader />
      
      <div className="mt-5 overflow-y-scroll flex-1 pr-2">
        <div className="grid h-[200px] md:grid-cols-2 grid-cols-1 gap-4">
          <LibraryPlaylist imageUrl={"playlistCoverExample.png"} title={"Playlist Example 1"} />
          <LibraryPlaylist imageUrl={"playlistCoverExample.png"} title={"Playlist Example 2"} />
          <LibraryPlaylist imageUrl={"playlistCoverExample.png"} title={"Playlist Example 3"} />
          <LibraryPlaylist imageUrl={"playlistCoverExample.png"} title={"Playlist Example 4"} />
          <LibraryPlaylist imageUrl={"playlistCoverExample.png"} title={"Playlist Example 5"} />
          <LibraryPlaylist imageUrl={"playlistCoverExample.png"} title={"Playlist Example 6"} />
          <LibraryPlaylist imageUrl={"playlistCoverExample.png"} title={"Playlist Example 7"} />
        </div>
      </div>
    </div>
  )
}
