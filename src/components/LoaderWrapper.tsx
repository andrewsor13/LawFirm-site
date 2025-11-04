import React from "react";
import Loader from "./Loader";

export default function LoaderWrapper() {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[var(--body-background)] mx-auto">
      <Loader sizeClass="w-1/3 h-1/3" color="fill-white" />
    </div>
  );
}
