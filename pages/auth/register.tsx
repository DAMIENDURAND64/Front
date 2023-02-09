import { useAuth } from "@/context/UserContext";
import axios from "axios";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

type TCredentials = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

function Register() {
  const { register } = useAuth();

  const onSubmit = (data: FieldValues) => {
    register({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    });
  };
  const {
    register: userRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<TCredentials>();

  return (
    <div className="flex justify-center mt-10">
      <div className="flex flex-col w-[80%] rounded-md bg-white shadow-2xl pb-6">
        <div className="p-2 w-fit h-12">
          <p>
            <span className="text-blueStrateg_in">Strateg</span>.in
          </p>
        </div>
        <div className="flex justify-center ">
          <form className="w-[70%] flex flex-col items-center space-y-4">
            <p className="text-blueStrateg_in">Register your Account</p>
            <hr className="w-[50%] bg-blueStrateg_in h-1 rounded-full " />
            <input
              {...userRegister("firstName", { required: true })}
              type="text"
              placeholder="Firstname"
              className="bg-slate-100 rounded-md"
            />
            <input
              {...userRegister("lastName", { required: true })}
              type="text"
              placeholder="Lastname"
              className="bg-slate-100 rounded-md"
            />
            <input
              {...userRegister("email", { required: true })}
              type="email"
              placeholder="Email"
              className="bg-slate-100 rounded-md"
            />

            <input
              {...userRegister("password", { required: true })}
              type="password"
              placeholder="Password"
              className="bg-slate-100 rounded-md"
            />

            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-blueStrateg_in text-white font-bold px-4 py-1 rounded-full"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
