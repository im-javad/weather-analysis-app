import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import type { HistoricalResponse } from "../types/weather";
import { calculateMonthlyAverages, getMonthName } from "../utils/weather.util";
import Loader from "../../../components/Loader";
import Error from "../../../components/Error";

interface TemperatureChartProps {
  historicalData: HistoricalResponse | null;
  loading: boolean;
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({
  historicalData,
  loading,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  if (loading) {
    return (
      <Loader headerText={t("dashboard.monthlyAverage")} minHeight={240} />
    );
  }

  if (!historicalData) {
    return <Error headerText={t("dashboard.monthlyAverage")} minHeight={240} />;
  }

  const monthlyAverages = calculateMonthlyAverages(historicalData.daily);

  const chartData = monthlyAverages.map((item) => ({
    month: getMonthName(item.month, t),
    temperature: item.temperature,
    fullMonth: item.month,
  }));

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" sx={{ mb: 3 }}>
          {t("dashboard.monthlyAverage")}
        </Typography>

        <Box sx={{ height: 150 }}>
          <ResponsiveContainer>
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 15, left: -30, bottom: 0 }}
            >
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                interval={0}
                padding={{ left: 24, right: 0 }}
                fontSize={14}
              />
              <YAxis
                padding={{ top: 0, bottom: 20 }}
                tickLine={false}
                axisLine={false}
                fontSize={14}
              />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke={theme.palette.primary.main}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TemperatureChart;
