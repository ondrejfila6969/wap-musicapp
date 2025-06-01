import React from "react";

export default function Error() {
  return (
    <div className="min-h-screen flex flex-col sm:flex-row text-white">
      <div className="flex flex-col justify-center items-center sm:items-end sm:pr-10 sm:w-1/2 w-full py-12 px-4 sm:px-0">
        <div className="text-center sm:text-right">
          <img className="h-12 mx-auto sm:mx-0" src="/logo.png" alt="Logo" />
          <p className="text-xl mt-2">Error</p>
        </div>
      </div>

      <h1 className="flex justify-center sm:justify-start items-center sm:w-1/2 w-full px-4 pb-12 sm:pb-0 text-4xl sm:text-5xl text-center sm:text-left break-words">
        Wrong URL
      </h1>
    </div>
  );
}
