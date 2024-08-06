import React from 'react';
import { ChakraProvider, Container, Heading } from '@chakra-ui/react';
import Weather from './Weather';
import ThemeToggleButton from './components/ThemeToggleButton';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.xl" padding={4} centerContent>
        <Heading as="h1" size="2xl" marginBottom={6} textAlign="center">
          Weather Forecast
        </Heading>
        <Weather />
        <ThemeToggleButton />
      </Container>
    </ChakraProvider>
  );
}

export default App;
