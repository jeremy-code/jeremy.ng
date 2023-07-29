import React, { Dispatch, memo, SetStateAction, useCallback, useState } from "react";
import {
  Box,
  ButtonGroup,
  ButtonGroupProps,
  Button as CButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

import { NavLink } from "@/components/Navbar";
import { useScrollSpy } from "@/hooks";

type FloatingNavbarProps = {
  isActive: boolean;
  tabs: string[];
};

type ButtonCarouselProps = {
  tabs: string[];
  currTab: string;
  setCurrTab: Dispatch<SetStateAction<string>>;
} & ButtonGroupProps;

const ButtonCarousel = ({ tabs, currTab, setCurrTab, ...props }: ButtonCarouselProps) => (
  <ButtonGroup isAttached {...props}>
    {tabs.map((tab) => (
      <NavLinkButton key={tab} tab={tab} isActive={currTab === tab} setCurrTab={setCurrTab} />
    ))}
  </ButtonGroup>
);

type NavLinkButtonProps = {
  tab: string;
  isActive: boolean;
  setCurrTab: Dispatch<SetStateAction<string>>;
};

const NavLinkButton = memo(({ tab, isActive, setCurrTab }: NavLinkButtonProps) => {
  const handleClick = useCallback(() => setCurrTab(tab), [setCurrTab, tab]);
  const activeBg = useColorModeValue("white", "gray.800");

  return (
    <NavLink href={tab}>
      <CButton colorScheme="gray" variant="link" position="relative" onClick={handleClick}>
        {isActive && <ActiveIndicator activeBg={activeBg} />}
        <Box position="relative">
          <Text fontWeight="normal">{tab}</Text>
        </Box>
      </CButton>
    </NavLink>
  );
});

NavLinkButton.displayName = "NavLinkButton";

type ActiveIndicatorProps = {
  activeBg: string;
};

const ActiveIndicator = ({ activeBg }: ActiveIndicatorProps) => (
  <Box
    as={motion.div}
    pos="absolute"
    inset={1}
    bg={activeBg}
    borderRadius="full"
    layoutId="outline"
  />
);

const FloatingNavbar = ({ isActive, tabs }: FloatingNavbarProps) => {
  const [currTab, setCurrTab] = useState(tabs[0]);
  const bgColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");

  useScrollSpy((entry, isInViewport) => {
    if (isInViewport) {
      setCurrTab(entry.target.id);
    } else if (entry.target.id === tabs[1]) {
      setCurrTab(tabs[0]);
    }
  });

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.5, type: "spring" }}
          // Otherwise, layoutId in ButtonCarousel.tsx will not work
          transformTemplate={(_, generated) => `translateX(-50%) ${generated}`}
          style={{
            position: "fixed",
            top: 8,
            left: "50%",
            zIndex: 100,
          }}
        >
          <ButtonCarousel
            tabs={tabs}
            currTab={currTab}
            setCurrTab={setCurrTab}
            bg={bgColor}
            border="1px solid"
            borderColor="whiteAlpha.300"
            borderRadius="full"
            backdropFilter="blur(16px)"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNavbar;
