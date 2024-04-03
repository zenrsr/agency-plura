import React from "react";
import Loader from "./loader";

const LoadingPage = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Loader></Loader>
    </div>
  );
};

export default LoadingPage;
