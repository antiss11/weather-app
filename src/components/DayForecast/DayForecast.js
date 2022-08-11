import React from "react";
import { Card, CardContent, CardMedia, Divider } from "@mui/material";
import { Typography } from "@mui/material";
import { getIconByWeatherCode } from "/src/weather-analysis.js";

function DayForecast({ name, forecast }) {
  console.log(forecast);
  return (
    <Card sx={{ width: 1 }}>
      <CardContent>
        <Typography variant="h5" component="h4" align="center">
          {name}
        </Typography>
        <Divider />
        <Typography variant="h6" component="h5" align="center">
          Day:
        </Typography>
        <Typography align="center">
          {getIconByWeatherCode({
            weatherCode: forecast.weatherCode,
            isDay: true,
            iconSize: 60,
          })}
          {forecast.day}
        </Typography>
        <Divider />
        <Typography variant="h6" component="h5" align="center">
          Night:
        </Typography>
        <Typography align="center">
          {getIconByWeatherCode({
            weatherCode: forecast.weatherCode,
            isDay: false,
            iconSize: 60,
          })}
          {forecast.night}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DayForecast;
