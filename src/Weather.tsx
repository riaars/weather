import { WeatherProps } from "./props/WeatherProps";

function Weather({ item }: WeatherProps) {
  return (
    <div className="box weather-forecast" key={item.dt}>
      <img
        src={`https://openweathermap.org/img/wn/${item?.weather[0].icon}@2x.png`}
        alt="Weather Icon"
      />
      <div className="weather-label"> {item.weather[0].main}</div>
      <div className="weather-temp">{item?.main.temp} °C</div>
    </div>
  );
}

export default Weather;
