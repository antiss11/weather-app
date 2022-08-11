import React from "react";
import "normalize.css";
import autocomplete from "./Autocomplete/autocomplete";
import { getFormattedForecast } from "../weather-analysis";
import "./App.css";
import DayForecast from "./DayForecast/DayForecast";
import { createTheme, Grid } from "@mui/material";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.GEOAPIFY_API_KEY = props.GEOAPIFY_API_KEY;
    this.autocompleteFieldRef = React.createRef();
    this.state = {
      coords: {
        longitude: null,
        latitude: null,
      },
      forecast: {},
    };

    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  componentDidMount() {
    this.autocompleteBox = autocomplete(
      this.GEOAPIFY_API_KEY,
      this.autocompleteFieldRef.current
    );
    this.autocompleteBox.on("select", (location) => {
      this.handleLocationChange(
        {
          latitude: location.properties.lat,
          longitude: location.properties.lon,
        },
        `${location.properties.address_line1}, ${location.properties.address_line2}`
      );
    });

    window.navigator.geolocation.getCurrentPosition((pos) => {
      this.handleLocationChange(pos.coords);
    });
  }

  async handleLocationChange(coords, location) {
    if (!location) {
      var location;
      let responce = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json&apiKey=${this.GEOAPIFY_API_KEY}`
      );
      let json = await responce.json();
      location = `${json.results[0].city}, ${json.results[0].country}`;
    }

    this.autocompleteBox.setValue(location);
    this.setState(
      {
        coords: {
          longitude: coords.longitude,
          latitude: coords.latitude,
        },
      },
      () => this.getForecast()
    );
  }

  async getForecast() {
    let responce = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${this.state.coords.latitude}&longitude=${this.state.coords.longitude}&hourly=temperature_2m&daily=weathercode&timezone=auto`
    );
    let json = await responce.json();
    let forecast = getFormattedForecast(json);
    this.setState({
      forecast,
    });
  }

  render() {
    const days = Object.entries(this.state.forecast).map((dayInfo) => {
      let date = dayInfo[0];
      let forecast = dayInfo[1];
      return <DayForecast name={getDayName(date)} forecast={forecast} />;
    });
    return (
      <div className="app">
        <div className="autocomplete" ref={this.autocompleteFieldRef} />
        {Object.keys(this.state.forecast).length > 0 && days}
      </div>
    );
  }
}

function getDayName(dateString) {
  return DAYS[new Date(dateString).getDay()];
}

export default App;
