import Link from "next/link";
import React from "react";

type Props = {};

const Unauthorized = (props: Props) => {
  return (
    <div className="p-4 text-center h-screen w-screen flex justify-center items-center flex-col">
      <h1 className="text-3xl md:text-6xl">Unauthorized Access !</h1>
      <p>Please contact the support or your agency owner to get access</p>
      <Link href="/">
        <a className="text-blue-500 mt-4 p-2">Go back to home</a>
      </Link>
    </div>
  );
};

export default Unauthorized;
