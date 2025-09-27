import React, { useState, useEffect, lazy } from "react";
import { useTranslation } from "react-i18next";
import { Container, Box, Grid, Alert } from "@mui/material";
import type {
  City,
  CurrentWeatherResponse,
  ForecastResponse,
  HistoricalResponse,
} from "../types/weather";
import { weatherAPI } from "../service/weather.api";
import citiesData from "../../../data/cities-info.json";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";

const CurrentWeatherCard = lazy(
  () => import("../components/CurrentWeatherCard")
);
const ForecastCards = lazy(() => import("../components/ForecastCards"));
const TemperatureChart = lazy(() => import("../components/TemperatureChart"));

const DashboardContainer: React.FC = () => {
  const { t } = useTranslation();

  const [selectedCity, setSelectedCity] = useState<City>(citiesData[0]);
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherResponse | null>(null);
  const [forecastData, setForecastData] = useState<ForecastResponse | null>(
    null
  );
  const [historicalData, setHistoricalData] =
    useState<HistoricalResponse | null>(null);
  const [loading, setLoading] = useState({
    current: false,
    forecast: false,
    historical: false,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCity) {
      fetchWeatherData();
    }
  }, [selectedCity]);

  const fetchWeatherData = async () => {
    setError(null);
    setLoading({ current: true, forecast: true, historical: true });

    try {
      const [currentData, forecastDataResult, historicalDataResult] =
        await Promise.allSettled([
          weatherAPI.getCurrentWeather(selectedCity.lat, selectedCity.lon),
          weatherAPI.get14DayForecast(selectedCity.lat, selectedCity.lon),
          weatherAPI.getHistoricalData(selectedCity.lat, selectedCity.lon),
        ]);

      if (currentData.status === "fulfilled") {
        setCurrentWeather(currentData.value);
      } else {
        console.error("Current weather error:", currentData.reason);
      }
      setLoading((prev) => ({ ...prev, current: false }));

      if (forecastDataResult.status === "fulfilled") {
        setForecastData(forecastDataResult.value);
      } else {
        console.error("Forecast data error:", forecastDataResult.reason);
      }
      setLoading((prev) => ({ ...prev, forecast: false }));

      if (historicalDataResult.status === "fulfilled") {
        setHistoricalData(historicalDataResult.value);
      } else {
        console.error("Historical data error:", historicalDataResult.reason);
      }
      setLoading((prev) => ({ ...prev, historical: false }));

      if (
        currentData.status === "rejected" &&
        forecastDataResult.status === "rejected" &&
        historicalDataResult.status === "rejected"
      ) {
        setError(t("dashboard.error"));
      }
    } catch (err) {
      console.error("Weather data fetch error:", err);
      setError(t("dashboard.error"));
      setLoading({ current: false, forecast: false, historical: false });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header setSelectedCity={setSelectedCity} selectedCity={selectedCity} />

      <Container maxWidth="xl" sx={{ flexGrow: 1 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 5 }}>
            <CurrentWeatherCard
              weatherData={currentWeather!}
              selectedCity={selectedCity}
              loading={loading.current}
            />
          </Grid>

          <Grid size={{ xs: 12, lg: 7 }}>
            <TemperatureChart
              historicalData={historicalData}
              loading={loading.historical}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <ForecastCards
              forecastData={forecastData}
              loading={loading.forecast}
            />
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default DashboardContainer;
