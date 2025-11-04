import React from "react";
import ContactDesktop from "./ContactDesktop";
import ContactMobile from "./ContactMobile";

export default function ContactWrapper() {
  return (
    <div>
      <div className="hidden lg:block">
        <ContactDesktop />
      </div>
      <div className="lg:hidden">
        <ContactMobile />
      </div>
    </div>
  );
}
