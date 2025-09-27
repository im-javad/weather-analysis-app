import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import type { ForecastResponse } from "../types/weather";
import {
  getWeatherCondition,
  getWeatherIcon,
  formatTemperature,
} from "../utils/weather.util";
import Loader from "../../../components/Loader";
import Error from "../../../components/Error";
import { useTheme } from "../../../contexts/ThemeContext";

interface ForecastCardsProps {
  forecastData: ForecastResponse | null;
  loading: boolean;
}

const ForecastCards: React.FC<ForecastCardsProps> = ({
  forecastData,
  loading,
}) => {
  const { t, i18n } = useTranslation();
  const { darkMode } = useTheme();

  if (loading) {
    return (
      <Loader headerText={t("dashboard.forecast14Days")} minHeight={350} />
    );
  }

  if (!forecastData) {
    return <Error headerText={t("dashboard.forecast14Days")} minHeight={350} />;
  }

  return (
    <Box bgcolor="background.paper" borderRadius={5} sx={{ px: 2, py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {t("dashboard.forecast14Days")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollbarWidth: "none",
          gap: 2,
        }}
      >
        {forecastData.daily.time.map((date, index) => {
          const temperature = forecastData.daily.temperature_2m_mean[index];
          const cloudCover = forecastData.daily.cloud_cover_mean[index];
          const snowfall =
            forecastData.daily.snowfall_water_equivalent_sum[index];

          const condition = getWeatherCondition(0, 0, snowfall, cloudCover);
          const weatherIcon = getWeatherIcon(condition);

          const dayOfWeek = new Date(date).toLocaleDateString(
            i18n.language === "fa" ? "fa-IR" : "en-US",
            { weekday: "short" }
          );

          return (
            <Card
              key={date}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 250,
                flexShrink: 0,
                textAlign: "center",
                background: darkMode ? "#3F4861" : "#CDD9E0",
              }}
            >
              <CardContent sx={{ px: 2 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    borderBottom: "1px solid",
                    borderColor: "transparent",
                    borderImage:
                      "linear-gradient(to right, #36363600 0%, #7E7E7E ,#36363600 100%)",
                    borderImageSlice: 1,
                  }}
                >
                  {dayOfWeek}
                </Typography>

                <Avatar
                  src={weatherIcon}
                  alt={t(`weather.${condition}`)}
                  sx={{
                    width: 70,
                    height: 70,
                    mx: "auto",
                    my: 2,
                    bgcolor: "transparent",
                  }}
                />

                <Typography sx={{ fontWeight: "bold" }}>
                  {formatTemperature(temperature)}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default ForecastCards;
