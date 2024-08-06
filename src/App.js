import React from 'react';
import { Container, Heading } from '@chakra-ui/react';
import Weather from './api';
import TestComponent from './TestComponent';

function App() {
  return (
    <Container maxW="container.xl" padding={4}>
      <Heading as="h1" size="2xl" marginBottom={6} textAlign="center" color="teal.500">
        Weather Forecast
      </Heading>
      <Weather />
      <TestComponent />
    </Container>
  );
}

export default App;
