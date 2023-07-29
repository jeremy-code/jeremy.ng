"use client";

import React, { startTransition, useCallback, useDeferredValue } from "react";
import {
  chakra,
  forwardRef,
  SwitchProps,
  useCheckbox,
  useColorMode,
  useColorModeValue,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import { dataAttr } from "@chakra-ui/utils";

import { Icon } from "@/components/Misc";

const DarkModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const deferredColorMode = useDeferredValue(colorMode);
  const isDark = deferredColorMode === "dark";

  // Memoize the callback
  const handleToggle = useCallback(() => {
    startTransition(toggleColorMode);
  }, [toggleColorMode]);

  return (
    <Switch
      size="lg"
      isChecked={isDark}
      colorScheme="gray"
      onChange={handleToggle}
      role="switch"
      aria-checked={isDark} // Add ARIA properties for better accessibility
    />
  );
};

const Switch = forwardRef<SwitchProps, "input">((props, ref) => {
  const { state, getCheckboxProps, getInputProps, getLabelProps } = useCheckbox(props);
  const styles = useMultiStyleConfig("Switch", props);
  const { colorMode } = useColorMode();

  return (
    <chakra.label className="chakra-switch" {...getLabelProps()} __css={styles.container}>
      <input className="chakra-switch__input" {...getInputProps({}, ref)} />
      <chakra.span
        {...getCheckboxProps()}
        className="chakra-switch__track"
        display="inline-flex"
        boxSizing="content-box"
        cursor="pointer"
        position="relative"
        verticalAlign="middle"
        lineHeight={0}
        __css={styles.track}
      >
        <chakra.span
          className="chakra-switch__thumb"
          data-checked={dataAttr(state.isChecked)}
          data-hover={dataAttr(state.isHovered)}
          display="grid"
          placeItems="center"
          __css={styles.thumb}
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          <Icon name={colorMode} />
        </chakra.span>
      </chakra.span>
    </chakra.label>
  );
});

export default DarkModeToggle;
