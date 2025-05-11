import React from "react";
import { ListPlus } from "lucide-react";

export default function LibraryHeader() {
  return (
    <div className="bg-stone-900 rounded-t-3xl flex p-8 justify-between">
      <div className="text-2xl col">Library</div>
      <div className="w-10 h-10 cursor-pointer flex items-center justify-center">
        <ListPlus />
      </div>
    </div>
  );
}
