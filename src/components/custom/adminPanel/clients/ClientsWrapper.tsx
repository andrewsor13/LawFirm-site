import React from "react";
import ClientsDesktop from "./ClientsDesktop";
import ClientsMobile from "./ClientsMobile";

export default function ClientsWrapper() {
  return (
    <div>
      <div className="hidden lg:block">
        <ClientsDesktop />
      </div>
      <div className=" lg:hidden">
        <ClientsMobile />
      </div>
    </div>
  );
}
