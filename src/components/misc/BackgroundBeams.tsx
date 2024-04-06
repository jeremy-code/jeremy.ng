"use client";

import { memo } from "react";
import { motion } from "framer-motion";

import { css } from "@/lib/styled/css";
import { Box, type BoxProps } from "@/lib/styled/jsx";
import { token } from "@/lib/styled/tokens";

const paths = [
  "M-373-197s68 405 532 532a716 716 0 0 1 532 532",
  "M-380-189s68 405 532 532a716 716 0 0 1 532 532",
  "M-366-205s68 405 532 532a716 716 0 0 1 532 532",
  "M-359-213s68 405 532 532a716 716 0 0 1 532 532",
  "M-352-221s68 405 532 532a716 716 0 0 1 532 532",
  "M-345-229s68 405 532 532a716 716 0 0 1 532 532",
  "M-338-237s68 405 532 532a716 716 0 0 1 532 532",
  "M-331-245s68 405 532 532a716 716 0 0 1 532 532",
  "M-324-253s68 405 532 532a716 716 0 0 1 532 532",
  "M-317-261s68 405 532 532a716 716 0 0 1 532 532",
  "M-310-269s68 405 532 532a716 716 0 0 1 532 532",
  "M-303-277s68 405 532 532a716 716 0 0 1 532 532",
  "M-296-285s68 405 532 532a716 716 0 0 1 532 532",
  "M-289-293s68 405 532 532a716 716 0 0 1 532 532",
  "M-282-301s68 405 532 532a716 716 0 0 1 532 532",
  "M-275-309s68 405 532 532a716 716 0 0 1 532 532",
  "M-268-317s68 405 532 532a716 716 0 0 1 532 532",
  "M-261-325s68 405 532 532a716 716 0 0 1 532 532",
  "M-254-333s68 405 532 532a716 716 0 0 1 532 532",
  "M-247-341s68 405 532 532a716 716 0 0 1 532 532",
  "M-240-349s68 405 532 532a716 716 0 0 1 532 532",
  "M-233-357s68 405 532 532a716 716 0 0 1 532 532",
  "M-226-365s68 405 532 532a716 716 0 0 1 532 532",
  "M-219-373s68 405 532 532a716 716 0 0 1 532 532",
  "M-212-381s68 405 532 532a716 716 0 0 1 532 532",
  "M-205-389s68 405 532 532a716 716 0 0 1 532 532",
  "M-198-397s68 405 532 532a716 716 0 0 1 532 532",
  "M-191-405s68 405 532 532a716 716 0 0 1 532 532",
  "M-184-413s68 405 532 532a716 716 0 0 1 532 532",
  "M-177-421s68 405 532 532a716 716 0 0 1 532 532",
  "M-170-429s68 405 532 532a716 716 0 0 1 532 532",
  "M-163-437S-95-32 369 95a716 716 0 0 1 532 532",
  "M-156-445S-88-40 376 87a716 716 0 0 1 532 532",
  "M-149-453S-81-48 383 79a716 716 0 0 1 532 532",
  "M-142-461S-74-56 390 71a716 716 0 0 1 532 532",
  "M-135-469S-67-64 397 63a716 716 0 0 1 532 532",
  "M-128-477S-60-72 404 55a716 716 0 0 1 532 532",
  "M-121-485S-53-80 411 47a716 716 0 0 1 532 532",
  "M-114-493S-46-88 418 39a716 716 0 0 1 532 532",
  "M-107-501S-39-96 425 31a716 716 0 0 1 532 532",
  "M-100-509s68 405 532 532a716 716 0 0 1 532 532",
  "M-93-517s68 405 532 532a716 716 0 0 1 532 532",
  "M-86-525S-18-120 446 7a716 716 0 0 1 532 532",
  "M-79-533S-11-128 453-1a716 716 0 0 1 532 532",
  "M-72-541S-4-136 460-9a716 716 0 0 1 532 532",
  "M-65-549S3-144 467-17a716 716 0 0 1 532 532",
  "M-58-557S10-152 474-25a716 716 0 0 1 532 532",
  "M-51-565S17-160 481-33a716 716 0 0 1 532 532",
  "M-44-573S24-168 488-41a716 716 0 0 1 532 532",
  "M-37-581S31-176 495-49a716 716 0 0 1 532 532",
];

export const BackgroundBeams = memo((props: BoxProps) => {
  return (
    <Box
      pos="absolute"
      h="full"
      w="full"
      inset={0}
      maskSize="40px"
      maskRepeat="no-repeat"
      display="flex"
      placeItems="center"
      justifyContent="center"
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 696 316"
        className={css({
          h: "full",
          w: "full",
          pos: "absolute",
        })}
      >
        <path
          stroke="url(#a)"
          strokeOpacity="0.05"
          strokeWidth="0.5"
          d={paths.join("")}
        />

        {paths.map((path, index) => (
          <motion.path
            key={`path-${index}`}
            d={path}
            stroke={`url(#linearGradient-${index})`}
            strokeOpacity="0.4"
            strokeWidth="0.5"
          />
        ))}
        <defs>
          <radialGradient
            id="a"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(0 555 -1561 0 352 34)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".1" stopColor={token("colors.gray.300")} />
            <stop offset=".2" stopColor={token("colors.gray.300")} />
            <stop offset=".4" stopColor="white" stopOpacity="0" />
          </radialGradient>
          {paths.map((_, index) => (
            <motion.linearGradient
              key={`gradient-${index}`}
              id={`linearGradient-${index}`}
              initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
              animate={{
                x1: ["0%", "100%"],
                x2: ["0%", "95%"],
                y1: ["0%", "100%"],
                y2: ["0%", `${93 + Math.random() * 8}%`],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                ease: "easeInOut",
                repeat: Infinity,
                delay: Math.random() * 10,
              }}
            >
              <stop stopColor={token("colors.accent.10")} stopOpacity="0" />
              <stop stopColor={token("colors.accent.10")} />
              <stop offset="33%" stopColor={token("colors.violet.9")} />
              <stop
                offset="100%"
                stopColor={token("colors.purple.9")}
                stopOpacity="0"
              />
            </motion.linearGradient>
          ))}
        </defs>
      </svg>
    </Box>
  );
});

BackgroundBeams.displayName = "BackgroundBeams";
