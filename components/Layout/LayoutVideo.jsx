import React from "react";
import NavBar from "../Navbar/NavBar";
import SnackbarProvider from "react-simple-snackbar";

export default function Layout({ children }) {
  return (
    <SnackbarProvider>
      <div className="overflow-x-hidden flex w-full">
        <div className="w-full">
          <NavBar />
          {children}
        </div>
      </div>
    </SnackbarProvider>
  );
}
