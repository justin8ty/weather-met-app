import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Toggle theme"
      icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
      onClick={toggleColorMode}
      position="fixed"
      top="1rem"
      right="1rem"
      zIndex="1"
    />
  );
};

export default ThemeToggleButton;
