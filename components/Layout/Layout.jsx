import React from "react";
import NavBar from "../Navbar/NavBar";
import Sidebar from "../Sidebar/Sidebar";
import SnackbarProvider from "react-simple-snackbar";
export default function Layout({ children }) {
  return (
    <SnackbarProvider>
      <div className="overflow-x-hidden flex w-full">
        <div className="relative lg:w-1/10">
          <Sidebar />
        </div>
        <div className="w-full lg:w-9/10 lg:ml-8">
          <NavBar />
          {children}
        </div>
      </div>
    </SnackbarProvider>
  );
}
