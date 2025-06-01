import React from "react";
import SignInForm from "../../components/SignInForm/SignInForm";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col sm:flex-row text-white bg-black">
      <div className="flex flex-col justify-center items-center sm:items-end sm:pr-10 sm:w-1/2 w-full py-12 px-4">
        <div className="text-center sm:text-right">
          <img className="h-12 mx-auto sm:mx-0" src="logo.png" alt="Logo" />
          <p className="text-xl mt-4">Sign-In</p>
        </div>
      </div>
      <SignInForm />
    </div>
  );
}
