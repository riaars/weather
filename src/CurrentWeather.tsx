import { WeatherProps } from "./props/WeatherProps";

function CurrentWeather({ item }: WeatherProps) {
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

  return (
    <div>
      <div className="current-weather-wrapper">
        <img
          src={`https://openweathermap.org/img/wn/${item?.weather[0].icon}@4x.png`}
          alt="Weather Icon"
        />
        <div className="current-weather-group">
          <div className="current-weather">{item?.main.temp} °C</div>
          <div className="city">{item?.name}</div>
          <div>{currentDay + " " + currentDate.toLocaleTimeString()}</div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
