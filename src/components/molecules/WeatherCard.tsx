'use client';

import {
  Box,
  Center,
  Divider,
  HStack,
  Heading,
  Image,
  Text,
  useColorMode,
} from '@chakra-ui/react';

import { OPEN_WEATHER_IMAGE_URL } from '@/constants/openWeather';
import { useWeatherByPosition } from '@/hooks/weather';

type WeatherCardProps = {
  latitude: number;
  longitude: number;
};

const WeatherCard = ({ latitude, longitude }: WeatherCardProps) => {
  const { data, isLoading, isError } = useWeatherByPosition(
    latitude,
    longitude,
  );

  const { colorMode } = useColorMode();

  if (!data || isLoading || isError) return null;

  return (
    <Box
      color="white"
      backgroundColor={colorMode === 'light' ? 'blue.500' : 'blue.300'}
      boxShadow="lg"
      width="fit-content"
      padding={4}
      borderWidth={1}
      borderRadius={8}>
      <Heading as="h2" marginBottom={2}>
        {data.name} ({data.main.temp} &deg;C)
      </Heading>
      <HStack gap={4}>
        <Box width={36} textAlign="center">
          <Box height={20}>
            <Image
              src={`${OPEN_WEATHER_IMAGE_URL}/${data.weather[0].icon}@4x.png`}
              alt={data.weather[0].main}
              objectFit="cover"
              width="full"
              height="full"
            />
          </Box>
          <Text textTransform="capitalize" fontWeight="bold">
            {data.weather[0].description}
          </Text>
        </Box>
        <Center height={24}>
          <Divider orientation="vertical" />
        </Center>
        <Box>
          <Text>Humidity: {data.main.humidity}%</Text>
          <Text>Pressure: {data.main.pressure} hPa</Text>
          <Text>Wind: {data.wind.speed} m/s</Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default WeatherCard;
