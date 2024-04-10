"use client";

import { motion } from "framer-motion";

import { Box, type BoxProps } from "@/lib/styled/jsx";
import { token } from "@/lib/styled/tokens";

// Adapted from Aceternity UI https://ui.aceternity.com/components/background-beams

// On a MacBook Air 13" screen, Google Chrome, at 100% zoom, the visible area is
// 1425 x 698, which is a approximentally a ratio of 2:1.

const WIDTH = 700;
const HEIGHT = 350;
const NUM_OF_BEAMS = 10;

// In the original implementation, the paths were precomputed and stored in an
// array of strings. Likely, the reason was that parallel bezier curves are
// technically impossible. In this implementation, parallel ecliptical arcs are
// used instead to approximate bezier curves.
const paths = Array.from({ length: NUM_OF_BEAMS }, (_, index) => {
  // width and height of eclipse arcs are half of the width and height of the
  // svg so that the middle two arcs will completely cover the svg at correct
  // aspect ratio.
  const eclipseWidth = WIDTH / 2;
  const eclipseHeight = HEIGHT / 2;
  const offset = NUM_OF_BEAMS - index * 10;

  const eclipse = `${eclipseWidth} ${eclipseHeight}`;

  // Starts at -eclipseWidth, -eclipseHeight, so that when the svg is not at the
  // correct aspect ratio, the path will still be continuous and not cut off at
  // inner edges.
  return `\
M ${-eclipseWidth + offset} ${-eclipseHeight - offset}
a${eclipse} 0 0 1 ${eclipse}
a${eclipse} 0 0 0 ${eclipse}
a${eclipse} 0 0 1 ${eclipse}
a${eclipse} 0 0 0 ${eclipse}
`;
});

const pathsString = paths.join("");

export const BackgroundBeams = (props: BoxProps) => {
  return (
    <Box zIndex="hide" pos="absolute" inset={0} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        width="100%"
        height="100%"
      >
        <path
          stroke="url(#a)"
          strokeOpacity={0.05}
          strokeWidth={0.5}
          d={pathsString}
        />

        {paths.map((path, index) => (
          <motion.path
            key={`path-${path}`}
            d={path}
            stroke={`url(#linearGradient-${index})`}
            strokeOpacity={0.4}
            strokeWidth={0.5}
          />
        ))}
        <defs>
          <radialGradient
            id="a"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(250 50) rotate(90) scale(500 1500)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.1} stopColor={token("colors.gray.300")} />
            <stop offset={0.2} stopColor={token("colors.gray.300")} />
            <stop
              offset={0.5}
              stopColor={token("colors.white")}
              stopOpacity={0}
            />
          </radialGradient>
          {paths.map((path, index) => (
            <motion.linearGradient
              key={`linearGradient-${path}`}
              id={`linearGradient-${index}`}
              initial={{ x1: 0, x2: 0, y1: 0, y2: 0 }}
              animate={{
                x1: [0, "100%"],
                x2: [0, "95%"],
                y1: [0, "100%"],
                y2: [0, `${93 + Math.random() * 8}%`],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                ease: "easeInOut",
                repeat: Infinity,
                delay: Math.random() * 10,
              }}
            >
              <stop stopColor={token("colors.accent.9")} stopOpacity={0} />
              <stop stopColor={token("colors.accent.9")} />
              <stop offset="33%" stopColor={token("colors.violet.9")} />
              <stop
                offset="100%"
                stopColor={token("colors.purple.9")}
                stopOpacity={0}
              />
            </motion.linearGradient>
          ))}
        </defs>
      </svg>
    </Box>
  );
};
