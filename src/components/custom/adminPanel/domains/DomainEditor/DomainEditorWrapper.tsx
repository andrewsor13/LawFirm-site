import React from "react";
import DomainEditorDekstop from "./DomainEditorDesktop";
import { DomainProps } from "@/lib/types";
import DomainEditorMobile from "./DomainEditorMobile";

export default function DomainEditorWrapper({ domain }: DomainProps) {
  return (
    <div>
      <div className="hidden lg:block">
        <DomainEditorDekstop domain={domain} iconSize={80} />
      </div>
      <div className="lg:hidden">
        <DomainEditorMobile domain={domain} iconSize={40} />
      </div>
    </div>
  );
}
