import { useAuth } from "@/context/UserContext";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

type TCredentials = {
  email: string;
  password: string;
};

function Login() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCredentials>();

  const onSubmit = (data: FieldValues) => {
    login({ email: data.email, password: data.password });
  };

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
            <p className="text-blueStrateg_in">Login to your Account</p>
            <hr className="w-[50%] bg-blueStrateg_in h-1 rounded-full " />
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
              className="bg-slate-100 rounded-md"
            />
            {errors.email && (
              <div className="text-[10px] text-red-500">
                Email doesn&apos;t exist
              </div>
            )}
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              className="bg-slate-100 rounded-md"
            />
            {errors.password && (
              <div className="text-[10px] text-red-500">Wrong password</div>
            )}
            <button
              type="button"
              className="bg-blueStrateg_in text-white font-bold px-4 py-1 rounded-full"
              onClick={handleSubmit(onSubmit)}
            >
              Login
            </button>

            <div className="text-center">
              <p>No account ? Let&apos;s register below</p>
            </div>
            <button className="bg-blueStrateg_in text-white font-bold px-4 py-1 rounded-full">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
