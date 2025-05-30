import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="p-6 bg-stone-900 rounded-t-3xl max-w-full overflow-hidden min-h-[400px]">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-5 max-w-full">
        <img
          className="h-48 w-auto max-w-full rounded-xl object-cover flex-shrink-0"
          src="profilePicExample.png"
          alt="Profile"
        />
        <div className="flex flex-col justify-center min-w-0 max-w-full">
          <div className="text-sm text-gray-400 truncate">user</div>
          <div className="text-5xl font-bold truncate">{user.username}</div>
          <div className="text-xl text-gray-300 truncate">{user.email}</div>
        </div>
      </div>
    </div>
  );
}
