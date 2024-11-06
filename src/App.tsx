import { useEffect, useState } from "react";

import "./App.css";
import { API_URL, API_KEY } from "./API";
import Weather from "./Weather";
import { ItemWeatherProps } from "./props/WeatherProps";

function App() {
  const [city, setCity] = useState("Stockholm");
  const [weather, setWeather] = useState<ItemWeatherProps>();
  const [forecast, setForecast] = useState<any>([]);

  const [loadingCurrentWeather, setLoadingCurrentWeather] = useState(false);
  const [loadingForecast, setLoadingForecast] = useState(false);

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

  async function forecastWeather(city: string) {
    const url = `${API_URL}forecast?q=${city}&appid=${API_KEY}&units=metric`;
    setSearchError(null);
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
      setSearchError(error);
      setLoadingForecast(false);
    }
  }

  useEffect(() => {
    searchWeatherByCity(city);
    forecastWeather(city);
  }, []);

  const handleUserSearch = () => {
    searchWeatherByCity(city);
    forecastWeather(city);
  };

  const currentDate = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = daysOfWeek[currentDate.getDay()];

  //get first 5 temp forecast from now
  const latest_forecast = forecast?.list?.slice(0, 5);

  return (
    <div className="App">
      <div className="main">
        <div>
          <div className="search-menu">
            <input
              className="input-search"
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter a city..."
              value={city}
            />
            <button className="btn-primary" onClick={() => handleUserSearch()}>
              Search
            </button>
          </div>

          {loadingCurrentWeather || loadingForecast ? (
            <div>Loading...</div>
          ) : searchError ? (
            <div> {searchError.message} </div>
          ) : (
            <>
              <div className="current-weather-wrapper">
                <img
                  src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`}
                  alt="Weather Icon"
                />
                <div className="current-weather-group">
                  <div className="current-weather">{weather?.main.temp} °C</div>
                  <div className="city">{weather?.name}</div>
                  <div>
                    {currentDay + " " + currentDate.toLocaleTimeString()}
                  </div>
                </div>
              </div>

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
