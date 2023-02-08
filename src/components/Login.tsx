import React from "react";

type Props = {};

function Login({}: Props) {
  return (
    <div className="flex justify-center mt-10">
      <div className="flex flex-col w-[80%] rounded-md bg-white shadow-2xl pb-6">
        <div className="p-2 w-fit h-12">
          <p>
            <span className="text-blueStrateg_in">Strateg</span>.in
          </p>
        </div>
        <div className="flex justify-center ">
          <div className="w-[70%] flex flex-col items-center space-y-4">
            <p className="text-blueStrateg_in">Login to your Account</p>
            <hr className="w-[50%] bg-blueStrateg_in h-1 rounded-full " />
            <input
              type="email"
              placeholder="Email"
              className="bg-slate-100 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-slate-100 rounded-md"
            />
            <button className="bg-blueStrateg_in text-white font-bold px-4 py-1 rounded-full">
              Login
            </button>

            <div className="text-center">
              <p>No account ? Let&apos;s register below</p>
            </div>
            <button className="bg-blueStrateg_in text-white font-bold px-4 py-1 rounded-full">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
