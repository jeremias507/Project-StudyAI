"use client";

import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}


