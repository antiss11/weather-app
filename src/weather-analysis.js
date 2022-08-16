import {
  WiDaySunny,
  WiDayCloudy,
  WiDaySunnyOvercast,
  WiDayFog,
  WiDayRain,
  WiDayThunderstorm,
  WiDayShowers,
  WiDaySnow,
  WiNightClear,
  WiNightCloudy,
  WiNightAltCloudy,
  WiNightFog,
  WiNightRain,
  WiNightThunderstorm,
  WiNightShowers,
  WiNightSnow,
} from "weather-icons-react";

import React from "react";

const weatherCodes = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",
  80: "Slight rain shower",
  81: "Moderate rain shower",
  82: "Violent rain shower",
  85: "Slight snow shower",
  86: "Heavy snow showet",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

function getFormattedForecast(forecastRawData) {
  return Object.assign(
    ...forecastRawData.daily.time.map((day, i) => ({
      [day]: {
        weatherCode: forecastRawData.daily.weathercode[i],
        night: Math.round(
          forecastRawData.hourly.temperature_2m
            .slice(i * 24, i * 24 + 7)
            .reduce((sum, temperature) => sum + temperature) / 7 // 7 - hours number between 00:00 AM and 06:00 AM
        ),
        day: Math.round(
          forecastRawData.hourly.temperature_2m
            .slice(i * 24 + 7, i * 24 + 23)
            .reduce((sum, temperature) => sum + temperature) / 16 // 16 - hours number between 07:00 AM and 22:00 PM
        ),
      },
    }))
  );
}

function getIconByWeatherCode({ weatherCode, isNight, iconSize }) {
  if (!isNight) {
    switch (weatherCode) {
      case 0:
      case 1:
        return <WiDaySunny size={iconSize} />;
      case 2:
        return <WiDayCloudy size={iconSize} />;

      case 3:
        return <WiDaySunnyOvercast size={iconSize} />;
      case 45:
      case 48:
        return <WiDayFog size={iconSize} />;
      case 51:
      case 53:
      case 55:
      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
        return <WiDayRain size={iconSize} />;
      case 71:
      case 73:
      case 75:
      case 77:
        return <WiDaySnow size={iconSize} />;
      case 80:
      case 81:
      case 82:
      case 85:
      case 86:
        return <WiDayShowers size={iconSize} />;
      case 95:
      case 96:
      case 99:
        return <WiDayThunderstorm size={iconSize} />;
    }
  } else {
    switch (weatherCode) {
      case 0:
      case 1:
        return <WiNightClear size={iconSize} />;
      case 2:
        return <WiNightCloudy size={iconSize} />;
      case 3:
        return <WiNightAltCloudy size={iconSize} />;
      case 45:
      case 48:
        return <WiNightFog size={iconSize} />;
      case 51:
      case 53:
      case 55:
      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
        return <WiNightRain size={iconSize} />;
      case 71:
      case 73:
      case 75:
      case 77:
        return <WiNightSnow size={iconSize} />;
      case 80:
      case 81:
      case 82:
      case 85:
      case 86:
        return <WiNightShowers size={iconSize} />;
      case 95:
      case 96:
      case 99:
        return <WiNightThunderstorm size={iconSize} />;
    }
  }
}

export { getFormattedForecast, getIconByWeatherCode, weatherCodes };
