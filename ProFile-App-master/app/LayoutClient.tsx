"use client";

import { useState, useEffect } from "react";
import Loading from "./loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </>
      )}
    </>
  );
}