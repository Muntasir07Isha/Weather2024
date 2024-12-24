import React from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaSearchLocation,
  FaWind,
  FaTint,
  FaCompressArrowsAlt,
  FaEye,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import Chart from "./Chart";
import WeatherMap from "./WeatherMap";
import snowyImage from "../assets/snowy.jpg";
import rainyImage from "../assets/rainny.jpg";
import stormyImage from "../assets/stormy.jpg";
import sunnyImage from "../assets/sunny.jpg";
import cloudyImage from "../assets/cloudy.jpg";
import foggyImage from "../assets/foggy.jpg";
import overcastImage from "../assets/overcast.jpg";
import rainnyNightImage from "../assets/rainnyNight.jpg";
import clearNightImage from "../assets/clearNight.jpg";

const LandingPage = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [city, setCity] = useState("sydney");
  const [hourlyForecast, setHourlyForecast] = useState([]);

  const fetchWeather = async () => {
    try {
      setError("");
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;


      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`,
      );
      setWeather(response.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`,
      );
      setHourlyForecast(forecastResponse.data.list.slice(0, 8));
    } catch (err) {
      setError("Failed to load weather data");
      setWeather(null);
      setHourlyForecast([]);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getChartData = () => {
    return hourlyForecast.map((hour) => ({
      time: new Date(hour.dt * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      temperature: hour.main.temp,
    }));
  };

  const getBackgroundImage = () => {
    const weatherCondition = weather?.weather?.[0]?.main?.toLowerCase();
    const isNight =
      weather?.sys?.sunset && Date.now() > weather.sys.sunset * 1000;

    switch (weatherCondition) {
      case "clouds":
        return cloudyImage;
      case "snow":
        return snowyImage;
      case "rain":
        return isNight ? rainnyNightImage : rainyImage;
      case "thunderstorm":
        return stormyImage;
      case "clear":
        return isNight ? clearNightImage : sunnyImage;
      case "fog":
      case "mist":
      case "haze":
        return foggyImage;
      case "overcast":
        return overcastImage;
      default:
        return cloudyImage;
    }
  };

  return (
    <Box bg="gray.800" minH="100vh" p={6}>
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={8}
        alignItems="stretch"
      >
        {/* Left Section */}
        <Flex direction="column" width={{ base: "100%", md: "60%" }} gap={6}>
          {/* Main Weather Display */}
          <Box
            bg={`url(${getBackgroundImage()})`}
            bgSize="cover"
            bgPosition="center"
            height="300px"
            rounded="lg"
            boxShadow="lg"
            position="relative"
          >
            <InputGroup
              position="absolute"
              top={4}
              left={4}
              right={4}
              zIndex={1}
              maxWidth="400px"
              mx="auto"
            >
              <InputLeftElement pointerEvents="none">
                <Icon as={FaSearchLocation} color="gray.500" />
              </InputLeftElement>
              <Input
                placeholder="Enter city name.."
                bg="whiteAlpha.800"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
              />
              <Button onClick={fetchWeather} colorScheme="teal" ml={2}>
                Search
              </Button>
            </InputGroup>
            <VStack
              bg="rgba(0, 0, 0, 0.5)"
              p={4}
              rounded="md"
              color="white"
              position="absolute"
              bottom={4}
              left={4}
              right={4}
            >
              {weather ? (
                <>
                  <Text fontSize="xl" fontWeight="bold">
                    {weather.weather?.[0]?.description || "No Description"}
                  </Text>
                  <Text fontSize="5xl" fontWeight="bold">
                    {weather.main.temp}°C
                  </Text>
                  <Text fontSize="sm">
                    The low temperature will reach {weather.main.temp_min}°C
                  </Text>
                </>
              ) : (
                <Text>Loading...</Text>
              )}
            </VStack>
          </Box>

          {/* Today's Statistics */}
          <Box bg="gray.700" p={4} rounded="lg" boxShadow="lg">
            <Text fontSize="2xl" fontWeight="semibold" color="white" mb={4}>
              Today's Statistics
            </Text>
            <Flex
              wrap="wrap"
              gap={4}
              justifyContent="center"
              alignItems="center"
              direction={{ base: "column", md: "row" }} // Stack items vertically on mobile
            >
              {[
                {
                  label: "Wind Speed",
                  value: `${weather?.wind?.speed || "-"} m/s`,
                  icon: FaWind,
                  iconColor: "teal.400",
                },
                {
                  label: "Humidity",
                  value: `${weather?.main?.humidity || "-"}%`,
                  icon: FaTint,
                  iconColor: "blue.400",
                },
                {
                  label: "Pressure",
                  value: `${weather?.main?.pressure || "-"} hPa`,
                  icon: FaCompressArrowsAlt,
                  iconColor: "yellow.400",
                },
                {
                  label: "Visibility",
                  value: `${weather?.visibility / 1000 || "-"} km`,
                  icon: FaEye,
                  iconColor: "purple.400",
                },
                {
                  label: "Sunrise",
                  value:
                    new Date(
                      weather?.sys?.sunrise * 1000,
                    ).toLocaleTimeString() || "-",
                  icon: FaSun,
                  iconColor: "orange.400",
                },
                {
                  label: "Sunset",
                  value:
                    new Date(
                      weather?.sys?.sunset * 1000,
                    ).toLocaleTimeString() || "-",
                  icon: FaMoon,
                  iconColor: "red.400",
                },
              ].map((stat, idx) => (
                <Box
                  key={idx}
                  bg="whiteAlpha.300"
                  p={4}
                  rounded="md"
                  textAlign="center"
                  width={{
                    base: "100%",
                    sm: "calc(50% - 8px)",
                    md: "calc(33% - 8px)",
                  }} // Responsive width
                  minW="100px"
                >
                  <Icon
                    as={stat.icon}
                    boxSize={6}
                    color={stat.iconColor}
                    mb={2}
                  />
                  <Text fontSize="lg" fontWeight="bold" color="white">
                    {stat.label}
                  </Text>
                  <Text fontSize="xl" fontWeight="semibold" color="white">
                    {stat.value}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Box>

          {/* Chart Section */}
          <Box bg="gray.700" p={4} rounded="lg" boxShadow="lg">
            <Text fontSize="2xl" fontWeight="semibold" color="white" mb={4}>
              Hourly Temperature Forecast (°C)
            </Text>
            <Chart data={getChartData()} />
          </Box>
        </Flex>

        {/* Right Section: Weather Map */}
        <Box
          bg="gray.700"
          p={4}
          rounded="lg"
          boxShadow="lg"
          flex="1"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Text fontSize="2xl" fontWeight="semibold" color="white" mb={4}>
            Weather Map
          </Text>
          <Box flex="1" minHeight="300px">
            {weather && weather.coord ? (
              <WeatherMap
                coordinates={weather.coord}
                apiKey={import.meta.env.VITE_WEATHER_API_KEY}
              />
            ) : (
              <Text color="whiteAlpha.700">Loading map...</Text>
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default LandingPage;
