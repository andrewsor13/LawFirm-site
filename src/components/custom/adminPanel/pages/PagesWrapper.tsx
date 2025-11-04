import React from "react";
import PagesComponent from "./PagesComponent";
import PagesComponentMobile from "./PagesCompnentMobile";

export default function PagesWrapper() {
  return (
    <div>
      <div className="hidden lg:block">
        <PagesComponent />
      </div>
      <div className="lg:hidden">
        <PagesComponentMobile />
      </div>
    </div>
  );
}
