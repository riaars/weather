import { useEffect, useState } from "react";
import { API_URL } from "../config/API";
import { API_KEY } from "../config/API_KEY";

export const useForecastWeather = (city: string) => {
  const [forecast, setForecast] = useState<any>([]);
  const [searchForecastError, setSearchForecastError] = useState<any>();
  const [loadingForecast, setLoadingForecast] = useState(false);

  async function forecastWeather(city: string) {
    const url = `${API_URL}forecast?q=${city}&appid=${API_KEY}&units=metric`;
    setSearchForecastError(null);
    setLoadingForecast(true);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Data not available`);
      }
      const json = await response.json();
      setForecast(json);
      setLoadingForecast(false);
    } catch (error: any) {
      setSearchForecastError(error);
      setLoadingForecast(false);
    }
  }

  useEffect(() => {
    forecastWeather(city);
  }, []);

  return {
    forecast,
    loadingForecast,
    searchForecastError,
    forecastWeather,
  };
};
