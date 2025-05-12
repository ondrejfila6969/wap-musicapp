import React from "react";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <div className="flex flex-row">
        <AdminSidebar />
        <div className="min-h-220 rounded-3xl w-full m-4 sonus-bg-linear-gradient p-8 flex flex-col justify-between">
          <Outlet />
        </div>
      </div>
    </>
  );
}
