import React from 'react';
import { Box, Heading, Text, useColorModeValue, Flex } from '@chakra-ui/react';
import { FaSun, FaCloudSun, FaCloudShowersHeavy, FaCloudMoon, FaCloud, FaSnowflake, FaCalendarAlt, FaThermometerHalf, FaClock } from 'react-icons/fa';

const getWeatherIcon = (forecast) => {
  switch (forecast.toLowerCase()) {
    case 'sunny':
      return <FaSun />;
    case 'partly cloudy':
      return <FaCloudSun />;
    case 'cloudy':
      return <FaCloud />;
    case 'rain':
      return <FaCloudShowersHeavy />;
    case 'snow':
      return <FaSnowflake />;
    case 'night':
      return <FaCloudMoon />;
    default:
      return <FaCloud />;
  }
};

const ForecastCard = ({ data, isFirst }) => {
  const boxBg = useColorModeValue(isFirst ? 'teal.100' : 'gray.100', isFirst ? 'teal.600' : 'gray.700');
  const textColorFirst = useColorModeValue('teal.700', 'teal.100');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  const renderForecastItem = (icon, label, content) => (
    <Flex alignItems="center" color={textColor} mb={2}>
      {icon}
      <Text ml={2}>{label}: {content}</Text>
    </Flex>
  );

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
      {renderForecastItem(<FaCalendarAlt />, 'Date', data.date)}
      {renderForecastItem(getWeatherIcon(data.morning_forecast), 'Morning Forecast', data.morning_forecast)}
      {renderForecastItem(getWeatherIcon(data.afternoon_forecast), 'Afternoon Forecast', data.afternoon_forecast)}
      {renderForecastItem(getWeatherIcon(data.night_forecast), 'Night Forecast', data.night_forecast)}
      {renderForecastItem(<FaCloud />, 'Summary', data.summary_forecast)}
      {renderForecastItem(<FaClock />, 'Summary When', data.summary_when)}
      {renderForecastItem(<FaThermometerHalf />, 'Min Temp', `${data.min_temp}°C`)}
      {renderForecastItem(<FaThermometerHalf />, 'Max Temp', `${data.max_temp}°C`)}
    </Box>
  );
};

export default ForecastCard;
