interface ListWeatherProps {
  main: string;
  icon: string;
}

interface TempProps {
  temp: number;
}
export interface ItemWeatherProps {
  dt: string;
  weather: ListWeatherProps[];
  main: TempProps;
  name: string;
}
export interface WeatherProps {
  item: ItemWeatherProps;
}
