'use client';

import useSWR from 'swr';

import {
  OPEN_WEATHER_API_URL,
  OPEN_WEATHER_API_PARAMS,
} from '@/constants/openWeather';
import { fetcher } from '@/utils/fetcher';

import type { AxiosRequestConfig } from 'axios';
import type { Position } from '@/types/weather';

export const useWeatherByPosition = (latitude: number, longitude: number) => {
  const { data, error } = useSWR(
    [
      `${OPEN_WEATHER_API_URL}/weather`,
      {
        ...OPEN_WEATHER_API_PARAMS,
        lat: latitude,
        lon: longitude,
      },
    ],
    ([url, params]) => fetcher(url, params as AxiosRequestConfig<Position>),
  );

  return {
    data,
    isLoading: !error && !data,
    isError: !!error,
  };
};
