import React from "react";

export default function ProfilePage() {
  return (
    <div className="p-15 bg-stone-900 rounded-t-3xl">
      <div className="flex flex-row">
        <img className="h-50 rounded-xl row mr-5" src="profilePicExample.png"></img>
        <div className="flex flex-col mt-auto">
          <div className="text-sm">user</div>
          <div className="text-5xl">UserNameEx1234</div>
          <div className="text-xl">example@example.com</div>
        </div>
      </div>
    </div>
  );
}
