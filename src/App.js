import React, { useEffect, useState } from 'react';
import { ChakraProvider, Container, Heading, Select } from '@chakra-ui/react';
import { fetchWeatherData } from './api';
import ForecastCard from './components/ForecastCard';

function App() {
  const [locations, setLocations] = useState([
    { location_id: 'St001', location_name: 'Langkawi' },
    { location_id: 'Tn001', location_name: 'Kuala Lumpur' },
    { location_id: 'Ds001', location_name: 'Petaling Jaya' },
  ]);
  const [selectedLocation, setSelectedLocation] = useState('St001'); // Set default location to 'Langkawi'
  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const cachedLocations = sessionStorage.getItem('locations');
        let locationData = [];
        if (cachedLocations) {
          locationData = JSON.parse(cachedLocations);
        } else {
          // Add your fetchAllLocations logic here if needed
          // locationData = await fetchAllLocations();
          sessionStorage.setItem('locations', JSON.stringify(locationData));
        }

        locationData = locationData.filter(location => location.location_id && location.location_name);
        
        setLocations(prevLocations => [...prevLocations, ...locationData]);
        if (!selectedLocation) {
          setSelectedLocation(locationData[0]?.location_id); // Set default location if not selected
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    loadLocations();
  }, [selectedLocation]);

  useEffect(() => {
    if (selectedLocation) {
      const fetchData = async () => {
        try {
          console.log('Fetching data for location:', selectedLocation); // Log selected location
          const data = await fetchWeatherData(selectedLocation);
          console.log('API response:', data); // Log API response
          setForecasts(data.slice(0, 7)); // Limit to 7 days
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };
      fetchData();
    }
  }, [selectedLocation]);

  return (
    <ChakraProvider>
      <Container maxW="container.md">
        <Heading as="h1" my={8}>
          Weekly Weather Forecast
        </Heading>
        <Select
          placeholder="Select location"
          onChange={(e) => setSelectedLocation(e.target.value)}
          value={selectedLocation}
          mb={8}
        >
          {locations.map((location) => (
            <option key={location.location_id} value={location.location_id}>
              {location.location_name}
            </option>
          ))}
        </Select>
        {forecasts.map((forecast, index) => (
          <ForecastCard
            key={index}
            date={forecast.date}
            minTemp={forecast.min_temp}
            maxTemp={forecast.max_temp}
            summary={forecast.summary_forecast}
          />
        ))}
      </Container>
    </ChakraProvider>
  );
}

export default App;

// function App() {
//   const [forecasts, setForecasts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await fetchWeather();
//       setForecasts(data.slice(0, 9));
//     };
//     fetchData();
//   }, []);

//   return (
//     <ChakraProvider>
//       <Container maxW="container.md">
//         <Heading as="h1" my={8}>
//           Weekly Weather Forecast
//         </Heading>
//         {forecasts.map((forecast, index) => (
//           <ForecastCard
//             key={index}
//             date={forecast.date}
//             minTemp={forecast.min_temp}
//             maxTemp={forecast.max_temp}
//             summary={forecast.summary_forecast}
//           />
//         ))}
//       </Container>
//     </ChakraProvider>
//   );
// }