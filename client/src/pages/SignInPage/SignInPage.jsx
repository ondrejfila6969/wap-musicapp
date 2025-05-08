import React from "react";
import SignInForm from "../../components/SignInForm/SignInForm";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col sm:flex-row text-white">
      <div className="flex flex-col justify-center items-center sm:items-end sm:pr-10 sm:w-1/2 w-full py-12">
        <div className="text-center sm:text-right">
          <img className="h-12" src="logo.png"></img>
          <p className="text-xl mt-2">Sign-In</p>
        </div>
      </div>
      <SignInForm />
    </div>
  );
}
