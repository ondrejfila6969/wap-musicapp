import React from 'react'

export default function PlaylistHeader({name, creator}) {
  return (
     <div className="p-15 bg-stone-900 rounded-t-3xl">
      <div className="flex flex-row">
        <img className="h-50 rounded-xl row mr-5" src="profilePicExample.png"></img>
        <div className="flex flex-col mt-auto">
          <div className="text-5xl">{name}</div>
          <div className="text-xl">{creator}</div>
        </div>
      </div>
    </div>
  )
}
