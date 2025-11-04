"use client";
import React from "react";
import DomainsMobile from "./DomainsMobile";
import DomainsDesktop from "./DomainsDesktop";

export default function DomainsWrapper() {
  return (
    <div>
      <div className="hidden lg:block">
        <DomainsDesktop />
      </div>
      <div className=" lg:hidden">
        <DomainsMobile />
      </div>
    </div>
  );
}
