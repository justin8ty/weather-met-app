import { Box, Text, Heading } from '@chakra-ui/react';

const ForecastCard = ({ date, minTemp, maxTemp, summary }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Heading fontSize="xl">{date}</Heading>
      <Text mt={4}>
        Min Temp: {minTemp}°C, Max Temp: {maxTemp}°C
      </Text>
      <Text mt={4}>{summary}</Text>
    </Box>
  );
};

export default ForecastCard;
