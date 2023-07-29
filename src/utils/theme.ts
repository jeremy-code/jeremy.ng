import { Fira_Code, Outfit } from "next/font/google";
import {
  theme as base,
  defineStyleConfig,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";

const outfit = Outfit({ weight: "variable", subsets: ["latin"] });
const firaCode = Fira_Code({ weight: "400", subsets: ["latin"] });

const fonts = {
  heading: `${outfit.style.fontFamily}, ${base.fonts.heading}`,
  body: `${outfit.style.fontFamily}, ${base.fonts.body}`,
  mono: `${firaCode.style.fontFamily}, ${base.fonts.mono}`,
};

const colors = {
  primary: {
    50: "#f0f1ff",
    100: "#e0e1fe",
    200: "#c1c3fd",
    300: "#a2a4fa",
    400: "#898cf6",
    500: "#6366f1",
    600: "#484acf",
    700: "#3133ad",
    800: "#1f218b",
    900: "#131473",
  },
};

const Text = defineStyleConfig({
  variants: {
    highlight: ({ colorMode, colorScheme }) => {
      const start = colorMode === "light" ? `${colorScheme}.500` : `${colorScheme}.200`;
      const end = colorMode === "light" ? `${colorScheme}.700` : `${colorScheme}.400`;

      return {
        bgImage: `linear-gradient(140deg, ${start} 0%, ${end} 100%)`,
        bgClip: "text",
      };
    },
  },
});

const components = {
  Text,
  Container: {
    baseStyle: {
      maxW: "container.xl",
    },
  },
  Button: {
    baseStyle: {
      fontWeight: "500",
    },
    variants: {
      link: {
        height: 10,
        minWidth: 10,
        lineHeight: "1.2",
        verticalAlign: "middle",
        padding: "0 1rem",
        _hover: {
          textDecor: "none",
        },
      },
    },
  },
  Section: {
    variants: {
      container: {
        w: "100%",
        mx: "auto",
        px: 4,
        py: 16,
        maxW: "container.xl",
      },
    },
  },
};

const styles = {
  global: {
    "::selection": {
      bg: "primary.500",
      color: "white",
    },
  },
};

const theme = extendTheme(
  {
    colors,
    components,
    fonts,
    styles,
  },
  withDefaultColorScheme({ colorScheme: "primary" })
);

export default theme;
