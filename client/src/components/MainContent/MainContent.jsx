import React from 'react'
import { Outlet } from 'react-router-dom'

export default function MainContent() {
  return (
    <div className="sonus-bg-linear-gradient rounded-3xl">
      <Outlet />
    </div>
  )
}
