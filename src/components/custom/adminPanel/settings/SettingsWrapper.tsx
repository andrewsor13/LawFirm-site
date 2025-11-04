import React from "react";
import SettingsDesktop from "./SettingsDesktop";
import SettingsMobile from "./SettingsMobile";

export default function SettingsWrapper() {
  return (
    <div>
      <div className="hidden lg:block">
        <SettingsDesktop />
      </div>
      <div className="lg:hidden">
        <SettingsMobile />
      </div>
    </div>
  );
}
