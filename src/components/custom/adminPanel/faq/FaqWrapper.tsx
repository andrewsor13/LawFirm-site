import React from "react";
import FaqDesktop from "./FaqDesktop";
import FaqMobile from "./FaqMobile";

export default function FaqWrapper() {
  return (
    <div>
      <div className="hidden lg:block">
        <FaqDesktop />
      </div>
      <div className=" lg:hidden">
        <FaqMobile />
      </div>
    </div>
  );
}
