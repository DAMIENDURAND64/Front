import { useAuth } from "@/context/UserContext";
import Link from "next/link";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type TCredentials = {
  email: string;
  password: string;
};
const schema = yup.object({
  email: yup
    .string()
    .email("Please provide a valid mail")
    .required("Please provide a email"),
  password: yup.string().required("Please provide a password"),
});

const Login = () => {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCredentials>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FieldValues) => {
    const isLoginSuccessful = await login({
      email: data.email,
      password: data.password,
    });
    if (!isLoginSuccessful) {
      setError("Email and password doesn't match");
    }
  };

  return (
    <div className="flex justify-center mt-32">
      <div className="flex flex-col w-[80%]  md:w-[60%] lg:w-[40%] rounded-md bg-white shadow-2xl pb-6">
        <div className="p-2 w-fit h-12">
          <p>
            <span className="text-blueStrateg_in">Strateg</span>.in
          </p>
        </div>
        <div className="flex justify-center ">
          <form className="w-[70%] flex flex-col items-center space-y-4">
            <div className="flex flex-col items-center space-y-1">
              <p className="text-blueStrateg_in">Login to your Account</p>
              <hr className="bg-blueStrateg_in h-1 rounded-full w-[75%]" />
            </div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="bg-slate-100 rounded-md"
            />
            {errors.email && (
              <p className="text-red-600 text-xs">{errors.email.message}</p>
            )}
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="bg-slate-100 rounded-md"
            />
            {errors.password && (
              <p className="text-red-600 text-xs">{errors.password.message}</p>
            )}
            <button
              type="button"
              className="bg-blueStrateg_in text-white font-bold px-4 py-1 rounded-full"
              onClick={handleSubmit(onSubmit)}
            >
              Login
            </button>
            {error && <p className="text-red-600 text-xs">{error}</p>}

            <div className="text-center">
              <p>No account ? Let&apos;s register below</p>
            </div>
            <Link href={"/auth/register"}>
              <button className="bg-blueStrateg_in text-white font-bold px-4 py-1 rounded-full">
                Register
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
