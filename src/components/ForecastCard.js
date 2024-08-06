import React from 'react';
import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';

const ForecastCard = ({ data, isFirst }) => {
  const boxBg = useColorModeValue(isFirst ? 'teal.100' : 'gray.100', isFirst ? 'teal.600' : 'gray.700');
  const textColorFirst = useColorModeValue('teal.700', 'teal.100');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      padding={6}
      bg={boxBg}
      boxShadow={isFirst ? 'lg' : 'md'}
      mb={isFirst ? 8 : 0}
      width="100%"
    >
      <Heading as={isFirst ? "h2" : "h3"} size={isFirst ? "lg" : "md"} color={isFirst ? textColorFirst : textColor} marginBottom={4}>
        {isFirst ? `Today: ${data.location.location_name}` : data.location.location_name}
      </Heading>
      <Text color={textColor}>Date: {data.date}</Text>
      <Text color={textColor}>Morning Forecast: {data.morning_forecast}</Text>
      <Text color={textColor}>Afternoon Forecast: {data.afternoon_forecast}</Text>
      <Text color={textColor}>Night Forecast: {data.night_forecast}</Text>
      <Text color={textColor}>Summary: {data.summary_forecast}</Text>
      <Text color={textColor}>Summary When: {data.summary_when}</Text>
      <Text color={textColor}>Min Temp: {data.min_temp}°C</Text>
      <Text color={textColor}>Max Temp: {data.max_temp}°C</Text>
    </Box>
  );
};

export default ForecastCard;
