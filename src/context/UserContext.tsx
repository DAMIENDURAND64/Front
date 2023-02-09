import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";

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
      router.push("/homepage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: authState.user,
        isAuth: authState.isAuth,
        login,
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
