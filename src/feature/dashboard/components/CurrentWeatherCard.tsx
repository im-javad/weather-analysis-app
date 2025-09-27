import React from "react";
import { useTranslation } from "react-i18next";
import { Typography, Box, Avatar, Stack } from "@mui/material";
import type { CurrentWeatherResponse, City } from "../types/weather";
import {
  getWeatherCondition,
  getWeatherIcon,
  formatTemperature,
} from "../utils/weather.util";
import { MapSharp } from "@mui/icons-material";
import Loader from "../../../components/Loader";
import Error from "../../../components/Error";

interface CurrentWeatherCardProps {
  weatherData: CurrentWeatherResponse;
  selectedCity: City;
  loading: boolean;
}

const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  weatherData,
  selectedCity,
  loading,
}) => {
  const { t, i18n } = useTranslation();

  if (loading) {
    return (
      <Loader headerText={t("dashboard.currentWeather")} minHeight={240} />
    );
  }

  if (!weatherData) {
    return <Error headerText={t("dashboard.currentWeather")} minHeight={240} />;
  }

  const condition = getWeatherCondition(
    weatherData.current.rain,
    weatherData.current.showers,
    weatherData.current.snowfall
  );
  const weatherIcon = getWeatherIcon(condition);
  const cityName =
    i18n.language === "fa" ? selectedCity.city_fa : selectedCity.city_en;

  const currentDate = new Date(weatherData.current.time);
  const dayOfWeek = currentDate.toLocaleDateString(
    i18n.language === "fa" ? "fa-IR" : "en-US",
    { weekday: "long" }
  );
  const formattedDate = currentDate.toLocaleDateString(
    i18n.language === "fa" ? "fa-IR" : "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );
  const formattedTime = currentDate.toLocaleTimeString(
    i18n.language === "fa" ? "fa-IR" : "en-US"
  );

  const currentTemp = weatherData.current.temperature_2m;
  const minTemp = currentTemp - 5;
  const maxTemp = currentTemp + 5;

  return (
    <Box bgcolor="background.paper" p={2} borderRadius={5} minHeight={240}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }} mb={2}>
            <MapSharp />
            <Typography>{cityName}</Typography>
          </Box>
          <Typography variant="h3" sx={{ mb: 1 }}>
            {dayOfWeek}
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {formattedDate} • {formattedTime}
          </Typography>
          <Typography variant="h2" sx={{ mb: 1 }}>
            {formatTemperature(currentTemp)}
          </Typography>
          <Box sx={{ display: "flex" }} gap={1}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {t("dashboard.max")}: {Math.round(maxTemp)}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {t("dashboard.min")}: {Math.round(minTemp)}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Avatar
            src={weatherIcon}
            alt={t(`weather.${condition}`)}
            sx={{ width: 100, height: 100, mb: 1.5 }}
          />
          <Typography variant="h3" sx={{ mb: 1 }}>
            {t(`weather.${condition}`)}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default CurrentWeatherCard;
