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
    <div className="p-6 bg-stone-900 rounded-t-3xl">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <img
          className="h-40 w-40 sm:h-50 sm:w-50 rounded-xl object-cover flex-shrink-0"
          src="profilePicExample.png"
          alt="Profile"
        />
        <div className="flex flex-col text-center sm:text-left flex-shrink min-w-0 max-w-full">
          <div
            className="text-gray-400 mb-1"
            style={{ fontSize: "clamp(0.75rem, 2vw, 1rem)" }}
          >
            user
          </div>
          <div
            className="font-semibold text-white"
            style={{
              fontSize: "clamp(1.5rem, 5vw, 3rem)",
              wordBreak: "break-word",
            }}
          >
            {user.username}
          </div>
          <div
            className="text-gray-300"
            style={{
              fontSize: "clamp(1rem, 3vw, 1.5rem)",
              wordBreak: "break-word",
            }}
          >
            {user.email}
          </div>
        </div>
      </div>
    </div>
  );
}
