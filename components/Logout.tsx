"use client";
import { API_KEY } from "@/lib/api/client";
import React from "react";

const Logout = () => {
  React.useEffect(() => {
    const handleWindowClose = () => {
      navigator.sendBeacon(`${API_KEY}/vigil_logout`);
      localStorage.removeItem("vv_auth");
    };

    window.addEventListener("beforeunload", handleWindowClose);

    // Clean up listener when component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  }, []);

  return null;
};

export default Logout;
