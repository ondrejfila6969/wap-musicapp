import React from "react";

export default function Error() {
  return (
    <div className="min-h-screen flex flex-col sm:flex-row text-white">
      <div className="flex flex-col justify-center items-center sm:items-end sm:pr-10 sm:w-1/2 w-full py-12">
        <div className="text-center sm:text-right">
          <img className="h-12" src="logo.png"></img>
          <p className="text-xl mt-2">Error</p>
        </div>
      </div>
      <h1 className="flex justify-left items-center sm:w-1/2 w-full px-4 pb-12 sm:pb-0 text-5xl">Wrong URL</h1>
    </div>
  );
}
