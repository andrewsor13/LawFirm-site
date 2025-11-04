import React from "react";
import AboutDesktop from "./AboutDesktop";
import AboutMobile from "./AboutMobile";
import { Lawyer } from "@/lib/types";

interface AboutWrapperProps {
  data: Lawyer[];
}

export default function AboutWrapper({ data }: AboutWrapperProps) {
  return (
    <div className="py-10">
      <div className="hidden md:block">
        <AboutDesktop data={data} />
      </div>
      <div className="md:hidden">
        <AboutMobile data={data} />
      </div>
    </div>
  );
}
