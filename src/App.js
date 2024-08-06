import React from 'react';
import { ChakraProvider, Container, Heading, IconButton, useColorMode } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import Weather from './api';
import theme from './theme';

function ThemeToggleButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Toggle theme"
      icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
      onClick={toggleColorMode}
      position="fixed"
      top="1rem"
      right="1rem"
      zIndex="1"
    />
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.xl" padding={4} centerContent>
        <Heading as="h1" size="2xl" marginBottom={6} textAlign="center">
          Malaysia Weather Forecast
        </Heading>
        <Weather />
        <ThemeToggleButton />
      </Container>
    </ChakraProvider>
  );
}

export default App;
