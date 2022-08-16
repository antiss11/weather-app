import React from "react";
import {
  Card,
  CardContent,
  Divider,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Typography, Box } from "@mui/material";
import { getIconByWeatherCode } from "/src/weather-analysis.js";
import { weatherCodes } from "../../weather-analysis";

const theme = createTheme({
  typography: {
    h3: {
      fontSize: 18,
    },
    h4: {
      fontSize: 16,
    },
    weatherVerdict: {
      fontSize: 14,
    },
  },
});

function DayForecast({ name, forecast }) {
  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardContent>
          <Typography variant="h3" component="h3" align="center">
            {name}
          </Typography>
          <Divider />
          <Box
            sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            {getIconByWeatherCode({
              weatherCode: forecast.weatherCode,
              isNight: false,
              iconSize: 60,
            })}
            <Typography variant="weatherVerdict">
              {weatherCodes[forecast.weatherCode]}
            </Typography>
          </Box>
          <Divider />
          <DayNightForecast dayName={name} forecast={forecast.day}>
            Day
          </DayNightForecast>
          <Divider />
          <DayNightForecast dayName={name} forecast={forecast.night}>
            Night
          </DayNightForecast>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

function DayNightForecast(props) {
  return (
    <Box sx={{ py: 1 }}>
      <Typography variant="h4" component="h4" align="center">
        {props.children}
      </Typography>
      <Box>
        <Typography align="center">{props.forecast} &deg;C</Typography>
      </Box>
    </Box>
  );
}

export default DayForecast;
