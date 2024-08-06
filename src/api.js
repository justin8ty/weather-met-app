import axios from 'axios';

const BASE_URL = 'https://api.data.gov.my';

export const fetchWeatherData = async (locationId) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather/forecast?contains=${locationId}@location__location_id`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
