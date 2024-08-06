import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, Text, VStack, Select, FormControl, FormLabel, Spinner, Alert, AlertIcon, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('https://api.data.gov.my/weather/forecast');
        setWeatherData(response.data);
        const uniqueLocations = [...new Set(response.data.map(item => item.location.location_name))];
        setLocations(uniqueLocations);
      } catch (error) {
        setError('Error fetching the weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const filteredWeatherData = selectedLocation
    ? weatherData.filter(data => data.location.location_name === selectedLocation)
    : weatherData;

  const boxBg = useColorModeValue('gray.100', 'gray.700');
  const boxBgFirst = useColorModeValue('teal.100', 'teal.600');
  const textColorFirst = useColorModeValue('teal.700', 'teal.100');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  if (loading) return <Spinner size="xl" />;
  if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;

  return (
    <VStack spacing={8} padding={8}>
      <FormControl>
        <FormLabel htmlFor="location">Select Location</FormLabel>
        <Select id="location" placeholder="Select location" onChange={handleLocationChange}>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </Select>
      </FormControl>

      <Grid templateColumns="1fr" gap={8} width="100%">
        {filteredWeatherData.length > 0 && (
          <GridItem colSpan={1}>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              padding={6}
              bg={boxBgFirst}
              boxShadow="lg"
              mb={8}
            >
              <Heading as="h2" size="lg" color={textColorFirst} marginBottom={4}>
                Today: {filteredWeatherData[0].location.location_name}
              </Heading>
              <Text color={textColor}>Date: {filteredWeatherData[0].date}</Text>
              <Text color={textColor}>Morning Forecast: {filteredWeatherData[0].morning_forecast}</Text>
              <Text color={textColor}>Afternoon Forecast: {filteredWeatherData[0].afternoon_forecast}</Text>
              <Text color={textColor}>Night Forecast: {filteredWeatherData[0].night_forecast}</Text>
              <Text color={textColor}>Summary: {filteredWeatherData[0].summary_forecast}</Text>
              <Text color={textColor}>Summary When: {filteredWeatherData[0].summary_when}</Text>
              <Text color={textColor}>Min Temp: {filteredWeatherData[0].min_temp}°C</Text>
              <Text color={textColor}>Max Temp: {filteredWeatherData[0].max_temp}°C</Text>
            </Box>
          </GridItem>
        )}

        <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }} gap={8}>
          {filteredWeatherData.slice(1).map((data, index) => (
            <GridItem key={index}>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                padding={6}
                bg={boxBg}
                boxShadow="md"
              >
                <Heading as="h3" size="md" color={textColor} marginBottom={4}>
                  {data.location.location_name}
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
            </GridItem>
          ))}
        </Grid>
      </Grid>
    </VStack>
  );
};

export default Weather;
