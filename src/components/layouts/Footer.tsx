'use client';

import { useEffect, useState } from 'react';
import {
  Alert,
  AlertIcon,
  Button,
  Link,
  Text,
  VStack,
  useColorMode,
} from '@chakra-ui/react';

import { WeatherCard } from '@/components/molecules';
import { getLatitudeLongitude } from '@/utils/position';

import type { Position } from '@/types/weather';

const Footer = () => {
  const [position, setPosition] = useState<Position | null>(null);

  const { colorMode } = useColorMode();

  const handleUpdatePosition = async () => {
    const position = await getLatitudeLongitude();
    setPosition(position);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      handleUpdatePosition();
    }
  }, []);

  return (
    <VStack
      as="footer"
      position="relative"
      width="full"
      borderTopWidth={1}
      borderColor={colorMode === 'light' ? 'gray.400' : 'gray.500'}
      paddingY={4}
      gap={4}>
      {position ? (
        <WeatherCard
          latitude={position.latitude}
          longitude={position.longitude}
        />
      ) : (
        <>
          <Alert status="warning">
            <AlertIcon />
            Allow this app to access your location to show the current weather.
          </Alert>
          <Button colorScheme="blue" onClick={handleUpdatePosition}>
            Show Current Weather
          </Button>
        </>
      )}
      <Text>
        {new Date().getFullYear()} &bull;{' '}
        <Link
          href="https://akmalhisyam.my.id"
          paddingY={3}
          _hover={{ color: colorMode === 'light' ? 'blue.500' : 'blue.200' }}
          isExternal>
          Muhammad Akmal Hisyam
        </Link>
      </Text>
    </VStack>
  );
};

export default Footer;
