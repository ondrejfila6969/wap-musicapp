import React from 'react'
import "./UserMenu.css";
import { User } from 'lucide-react';

export default function UserMenu() {
  return (
    <div className="w-10 h-10 rounded-full p-2 userMenu-wrapper cursor-pointer">
        <User />
    </div>
  )
}
