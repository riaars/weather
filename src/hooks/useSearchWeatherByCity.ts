import { useEffect, useState } from "react";
import { API_URL } from "../config/API";
import { API_KEY } from "../config/API_KEY";
import { ItemWeatherProps } from "../props/WeatherProps";

export const useSearchWeatherByCity = (city: string) => {
  const [loadingCurrentWeather, setLoadingCurrentWeather] = useState(false);
  const [weather, setWeather] = useState<ItemWeatherProps>();

  const [searchError, setSearchError] = useState<any>();
  async function searchWeatherByCity(city: string) {
    const url = `${API_URL}weather?q=${city}&APPID=${API_KEY}&units=metric`;
    setSearchError(null);
    setLoadingCurrentWeather(true);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Data not available`);
      }
      const json = await response.json();
      setWeather(json);
      setLoadingCurrentWeather(false);
    } catch (error: any) {
      setLoadingCurrentWeather(false);
      setSearchError(error);
    }
  }
  useEffect(() => {
    searchWeatherByCity(city);
  }, []);

  return {
    weather,
    searchWeatherByCity,
    loadingCurrentWeather,
    searchError,
  };
};
