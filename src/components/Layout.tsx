import React, { ReactNode } from "react";
import NavBar from "./NavBar";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col w-screen min-h-screen bg-slate-100">
      <NavBar />
      <div>{children}</div>
    </div>
  );
}
