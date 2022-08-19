import ReactDOM from "react-dom/client";
import React from "react";
import App from "./components/App";
import config from "./config";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App GEOAPIFY_API_KEY={config.GEOAPIFY_API_KEY} />);
