import React from "react";
import { NavBar } from "@/components/navBar";

const Header = () => {
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between px-6 py-4 border-b bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src="/images/nasa-logo.svg"
          alt="nasa logo"
          className="h-10 w-auto"
        />
        <h1 className="text-xl font-bold tracking-tight">
          Michael Regan's NASA Dashboard
        </h1>
      </div>
      <NavBar />
    </header>
  );
};

export default Header;
