"use client";

import type { ReactNode } from "react";

import { ThemeProvider } from "next-themes";

/**
 * Provides global application context.
 */
export const AppProvider = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
