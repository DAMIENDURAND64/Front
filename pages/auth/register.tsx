import { useAuth } from "@/context/UserContext";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type TCredentials = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
const schema = yup.object({
  lastName: yup.string().required("Please provide a firstname"),
  firstName: yup.string().required("Please provide a lastname"),
  email: yup
    .string()
    .email("Please provide a valid mail")
    .required("Please provide a email"),
  password: yup.string().required("Please provide a password"),
});

const Register = () => {
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
  } = useForm<TCredentials>({
    resolver: yupResolver(schema),
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-[80%]  md:w-[60%] lg:w-[40%] rounded-md bg-white shadow-2xl pb-6">
        <div className="p-2 w-fit h-12">
          <p>
            <span className="text-blueStrateg_in">Strateg</span>.in
          </p>
        </div>
        <div className="flex justify-center ">
          <form className="w-[70%] flex flex-col items-center space-y-4">
            <div className="flex flex-col items-center space-y-1">
              <p className="text-blueStrateg_in">Register your Account</p>
              <hr className="bg-blueStrateg_in h-1 rounded-full w-[75%]" />
            </div>
            <input
              {...userRegister("firstName", { required: true })}
              type="text"
              placeholder="Firstname"
              className="bg-slate-100 rounded-md"
            />
            {errors.firstName && (
              <p className="text-red-600 text-xs">{errors.firstName.message}</p>
            )}{" "}
            <input
              {...userRegister("lastName", { required: true })}
              type="text"
              placeholder="Lastname"
              className="bg-slate-100 rounded-md"
            />
            {errors.lastName && (
              <p className="text-red-600 text-xs">{errors.lastName.message}</p>
            )}
            <input
              {...userRegister("email", { required: true })}
              type="email"
              placeholder="Email"
              className="bg-slate-100 rounded-md"
            />
            {errors.email && (
              <p className="text-red-600 text-xs">{errors.email.message}</p>
            )}
            <input
              {...userRegister("password", { required: true })}
              type="password"
              placeholder="Password"
              className="bg-slate-100 rounded-md"
            />
            {errors.password && (
              <p className="text-red-600 text-xs">{errors.password.message}</p>
            )}
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
};

export default Register;
