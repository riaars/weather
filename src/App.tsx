import { useEffect, useState } from "react";

import Weather from "./Weather";
import Search from "./Search";
import CurrentWeather from "./CurrentWeather";

import { ItemWeatherProps } from "./props/WeatherProps";

import { useSearchWeatherByCity } from "./hooks/useSearchWeatherByCity";
import { useForecastWeather } from "./hooks/useForecastWeather";

import "./App.css";

function App() {
  const [city, setCity] = useState("Stockholm");

  const { loadingCurrentWeather, searchWeatherByCity, weather } =
    useSearchWeatherByCity(city);
  const { forecast, loadingForecast, searchForecastError, forecastWeather } =
    useForecastWeather(city);

  useEffect(() => {
    searchWeatherByCity(city);
    forecastWeather(city);
  }, []);

  const handleUserSearch = () => {
    searchWeatherByCity(city);
    forecastWeather(city);
  };

  //get first 5 temp forecast from now
  const latest_forecast = forecast?.list?.slice(0, 5);

  return (
    <div className="App">
      <div className="main">
        <div>
          <Search
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onClick={handleUserSearch}
          />
          {loadingCurrentWeather || loadingForecast ? (
            <div>Loading...</div>
          ) : searchForecastError ? (
            <div className="error-message"> {searchForecastError.message} </div>
          ) : (
            <>
              {weather && <CurrentWeather item={weather} />}
              <div className="flex-row">
                {latest_forecast?.map((item: ItemWeatherProps) => (
                  <Weather item={item} key={item.dt} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
