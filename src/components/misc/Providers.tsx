"use client";

import React, { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

export const Providers = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};
