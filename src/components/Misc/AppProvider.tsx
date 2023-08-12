"use client";

import React from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript, cookieStorageManagerSSR } from "@chakra-ui/react";

import { theme } from "@/utils";

const COLOR_MODE_COOKIE = "chakra_color_mode";

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const cookieStorageManager = cookieStorageManagerSSR(COLOR_MODE_COOKIE);

  return (
    <CacheProvider>
      <ChakraProvider theme={theme} colorModeManager={cookieStorageManager}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
};

export default AppProvider;
