"use client";

import React, { useRef } from "react";

import { FloatingNavbar, Navbar } from "@/components/Navbar";
import { useInView } from "@/hooks";

type FancyNavbarProps = {
  tabs: string[];
};

const FancyNavbar = ({ tabs }: FancyNavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useInView(ref);

  return (
    <>
      <Navbar ref={ref} tabs={tabs} />
      <FloatingNavbar isActive={!onScreen} tabs={tabs} />
    </>
  );
};

export default FancyNavbar;
