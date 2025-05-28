import React, { useState } from "react";
import {useAuth} from "../../context/AuthProvider";

export default function ProfilePage() {
  const {user, isLoading} = useAuth();

  if(isLoading) {
    return <div>Loading ...</div>
  }

  if(!user) {
    return <div>User not found</div>
  }

  return (
    <div className="p-15 bg-stone-900 rounded-t-3xl">
      <div className="flex flex-row">
        <img className="h-50 rounded-xl row mr-5" src="profilePicExample.png"></img>
        <div className="flex flex-col mt-auto">
          <div className="text-sm">user</div>
          <div className="text-5xl">{user.username}</div>
          <div className="text-xl">{user.email}</div>
        </div>
      </div>
    </div>
  );
}
