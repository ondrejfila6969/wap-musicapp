import React from 'react'
import AdminSidebar from '../AdminSidebar/AdminSidebar'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <>
        <AdminSidebar />
        <Outlet />
    </>
  )
}
