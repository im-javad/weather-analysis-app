import axios from "axios";
import type {
  CurrentWeatherResponse,
  ForecastResponse,
  HistoricalResponse,
} from "../types/weather";

const OPEN_METEO_BASE_URL = "https://api.open-meteo.com/v1";
const HISTORICAL_BASE_URL = "https://historical-forecast-api.open-meteo.com/v1";

const api = axios.create({
  timeout: 30000,
});

export const weatherAPI = {
  getCurrentWeather: async (
    latitude: number,
    longitude: number
  ): Promise<CurrentWeatherResponse> => {
    const response = await api.get(`${OPEN_METEO_BASE_URL}/forecast`, {
      params: {
        latitude,
        longitude,
        current: "temperature_2m,showers,rain,snowfall",
      },
    });
    return response.data;
  },

  get14DayForecast: async (
    latitude: number,
    longitude: number
  ): Promise<ForecastResponse> => {
    const response = await api.get(`${OPEN_METEO_BASE_URL}/forecast`, {
      params: {
        latitude,
        longitude,
        forecast_days: 14,
        daily:
          "temperature_2m_mean,cloud_cover_mean,snowfall_water_equivalent_sum",
      },
    });
    return response.data;
  },

  getHistoricalData: async (
    latitude: number,
    longitude: number
  ): Promise<HistoricalResponse> => {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const startDate = startOfYear.toISOString().split("T")[0];
    const endDate = yesterday.toISOString().split("T")[0];

    const response = await api.get(`${HISTORICAL_BASE_URL}/forecast`, {
      params: {
        latitude,
        longitude,
        start_date: startDate,
        end_date: endDate,
        daily: "temperature_2m_mean",
      },
    });
    return response.data;
  },
};

export default api;
