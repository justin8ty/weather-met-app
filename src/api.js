import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, Text, VStack, Select, FormControl, FormLabel, Spinner, Alert, AlertIcon, Grid, GridItem } from '@chakra-ui/react';

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
              bgGradient="linear(to-r, teal.100, teal.300)"
              boxShadow="lg"
              mb={8}
            >
              <Heading as="h2" size="lg" color="teal.700" marginBottom={4}>
                {filteredWeatherData[0].location.location_name}
              </Heading>
              <Text>Date: {filteredWeatherData[0].date}</Text>
              <Text>Morning Forecast: {filteredWeatherData[0].morning_forecast}</Text>
              <Text>Afternoon Forecast: {filteredWeatherData[0].afternoon_forecast}</Text>
              <Text>Night Forecast: {filteredWeatherData[0].night_forecast}</Text>
              <Text>Summary: {filteredWeatherData[0].summary_forecast}</Text>
              <Text>Summary When: {filteredWeatherData[0].summary_when}</Text>
              <Text>Min Temp: {filteredWeatherData[0].min_temp}°C</Text>
              <Text>Max Temp: {filteredWeatherData[0].max_temp}°C</Text>
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
                bgGradient="linear(to-r, gray.100, gray.300)"
                boxShadow="md"
              >
                <Heading as="h3" size="md" color="teal.600" marginBottom={4}>
                  {data.location.location_name}
                </Heading>
                <Text>Date: {data.date}</Text>
                <Text>Morning Forecast: {data.morning_forecast}</Text>
                <Text>Afternoon Forecast: {data.afternoon_forecast}</Text>
                <Text>Night Forecast: {data.night_forecast}</Text>
                <Text>Summary: {data.summary_forecast}</Text>
                <Text>Summary When: {data.summary_when}</Text>
                <Text>Min Temp: {data.min_temp}°C</Text>
                <Text>Max Temp: {data.max_temp}°C</Text>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Grid>
    </VStack>
  );
};

export default Weather;
