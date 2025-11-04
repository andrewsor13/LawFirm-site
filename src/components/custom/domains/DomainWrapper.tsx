"use client";

import React, { useEffect, useMemo } from "react";
import DomainDesktop from "./DomainDesktop";
import DomainMobile from "./DomainMobile";
import { Domain, DomainProps } from "@/lib/types";
import { useAppContext } from "@/context/AppContext";

export default function DomainWrapper({ domain }: DomainProps) {
  const { selectedDomain, setSelectedDomain, domains } = useAppContext();

  useEffect(() => {
    if (!selectedDomain || selectedDomain.slug !== domain.slug) {
      setSelectedDomain(domain);
    }
  }, [domain, selectedDomain, setSelectedDomain]);

  const activeDomain: Domain = useMemo(() => {
    if (selectedDomain?.faqs && selectedDomain?.services) return selectedDomain;
    if ((domain as Domain).faqs && (domain as Domain).services) return domain;
    const summary = domains.find((d) => d.slug === domain.slug);
    return {
      ...summary,
      services: [],
      faqs: [],
    } as Domain;
  }, [selectedDomain, domain, domains]);

  return (
    <div className="mt-25">
      <div className="hidden lg:block">
        <DomainDesktop domain={activeDomain} iconSize={80} />
      </div>
      <div className="lg:hidden">
        <DomainMobile domain={activeDomain} iconSize={60} />
      </div>
    </div>
  );
}
