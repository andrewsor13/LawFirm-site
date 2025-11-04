"use client";
import React from "react";
import FaqItem from "./FaqItem";
import { Faq } from "@/lib/types";

type Props = {
  faq: Faq;
};

export default function FaqWrapper({ faq }: Props) {
  return <FaqItem faq={faq} />;
}
