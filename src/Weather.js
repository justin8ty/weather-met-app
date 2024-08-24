import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  VStack,
  Select,
  FormControl,
  FormLabel,
  Spinner,
  Alert,
  AlertIcon,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import ForecastCard from "./components/ForecastCard";

const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          "https://api.data.gov.my/weather/forecast"
        );
        setWeatherData(response.data);
        const uniqueLocations = [
          ...new Set(response.data.map((item) => item.location.location_name)),
        ];
        setLocations(uniqueLocations);
      } catch (error) {
        setError("Error fetching the weather data");
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
    ? weatherData.filter(
        (data) => data.location.location_name === selectedLocation
      )
    : weatherData;

  if (loading) return <Spinner size="xl" />;
  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );

  return (
    <VStack spacing={8} padding={8}>
      <FormControl>
        <FormLabel htmlFor="location">Select Location</FormLabel>
        <Select
          id="location"
          placeholder="Select location"
          onChange={handleLocationChange}
        >
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
            <ForecastCard data={filteredWeatherData[0]} isFirst={true} />
          </GridItem>
        )}

        <Grid
          templateColumns={{ base: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }}
          gap={8}
        >
          {filteredWeatherData.slice(1).map((data, index) => (
            <GridItem key={index}>
              <ForecastCard data={data} isFirst={false} />
            </GridItem>
          ))}
        </Grid>
      </Grid>
    </VStack>
  );
};

export default Weather;
