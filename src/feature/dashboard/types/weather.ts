export interface City {
  city_en: string;
  city_fa: string;
  lat: number;
  lon: number;
  country: string;
}

export interface CurrentWeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    showers: string;
    rain: string;
    snowfall: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    showers: number;
    rain: number;
    snowfall: number;
  };
}

export interface ForecastResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: {
    time: string;
    temperature_2m_mean: string;
    cloud_cover_mean: string;
    snowfall_water_equivalent_sum: string;
  };
  daily: {
    time: string[];
    temperature_2m_mean: number[];
    cloud_cover_mean: number[];
    snowfall_water_equivalent_sum: number[];
  };
}

export interface HistoricalResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: {
    time: string;
    temperature_2m_mean: string;
  };
  daily: {
    time: string[];
    temperature_2m_mean: number[];
  };
}

export type WeatherCondition = "sunny" | "cloudy" | "rain" | "storm";
