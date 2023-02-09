/* eslint-disable react-hooks/exhaustive-deps */
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

type TUser = {
  id: string;
  lastname: string;
  firstname: string;
  email: string;
  password: string;
};

type TCredentials = {
  email: string;
  password: string;
};
type TCredentialsRegister = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type TUserContextProviderProps = {
  children: React.ReactNode;
};

type AuthState = {
  user: TUser | null;
  isAuth: boolean;
};

interface IUserContext {
  user: TUser | null;
  isAuth: boolean;
  login: (credentials: TCredentials) => Promise<void>;
  register: (credentials: TCredentialsRegister) => Promise<void>;
}

const UserContext = createContext<IUserContext | null>(null);

const UserContextProvider = ({ children }: TUserContextProviderProps) => {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuth: false,
  });

  const login = async ({ email, password }: TCredentials) => {
    try {
      const { data, headers } = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      setAuthState((state) => ({
        isAuth: true,
        user: data,
      }));
      const token = headers["authorization"];
      axiosInstance.defaults.headers.common["authorization"] = token;
      localStorage.setItem("token", token || "");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const register = async ({
    email,
    password,
    firstName,
    lastName,
  }: TCredentialsRegister) => {
    try {
      const { data, headers } = await axiosInstance.post("/auth/register", {
        email,
        password,
        firstName,
        lastName,
      });
      setAuthState((state) => ({
        isAuth: true,
        user: data,
      }));
      const token = headers["authorization"];
      axiosInstance.defaults.headers.common["authorization"] = token;
      localStorage.setItem("token", token || "");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!authState.isAuth) {
      router.push("/auth/login");
    }
  }, [authState]);

  return (
    <UserContext.Provider
      value={{
        user: authState.user,
        isAuth: authState.isAuth,
        login,
        register,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useAuth must be used within a UserContextProvider");
  }
  return context;
};

export default UserContextProvider;
