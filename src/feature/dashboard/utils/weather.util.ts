import type { WeatherCondition } from "../types/weather";

export const getWeatherCondition = (
  rain: number,
  showers: number,
  snowfall: number,
  cloudCover?: number
): WeatherCondition => {
  if (snowfall > 0 || rain > 5 || showers > 5) {
    return "storm";
  }
  if (rain > 0.1 || showers > 0.1) {
    return "rain";
  }
  if (cloudCover && cloudCover > 70) {
    return "cloudy";
  }
  return "sunny";
};

export const getWeatherIcon = (condition: WeatherCondition): string => {
  const iconMap = {
    sunny: "/svgs/weather-status/sunny.svg",
    cloudy: "/svgs/weather-status/cloudy.svg",
    rain: "/svgs/weather-status/rain.svg",
    storm: "/svgs/weather-status/storm.svg",
  };
  return iconMap[condition];
};

export const formatTemperature = (temp: number): string => {
  return `${Math.round(temp)}°C`;
};

export const calculateMonthlyAverages = (dailyData: {
  time: string[];
  temperature_2m_mean: number[];
}) => {
  const monthlyData: { [key: string]: { sum: number; count: number } } = {};

  dailyData.time.forEach((date, index) => {
    const monthKey = date.substring(0, 7);
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { sum: 0, count: 0 };
    }
    monthlyData[monthKey].sum += dailyData.temperature_2m_mean[index];
    monthlyData[monthKey].count += 1;
  });

  return Object.entries(monthlyData).map(([month, data]) => ({
    month,
    temperature: Math.round((data.sum / data.count) * 10) / 10,
  }));
};

export const getMonthName = (
  monthString: string,
  t: (key: string) => string
): string => {
  const monthIndex = parseInt(monthString.split("-")[1]) - 1;
  const monthKeys = [
    "months.january",
    "months.february",
    "months.march",
    "months.april",
    "months.may",
    "months.june",
    "months.july",
    "months.august",
    "months.september",
    "months.october",
    "months.november",
    "months.december",
  ];
  return t(monthKeys[monthIndex]);
};
