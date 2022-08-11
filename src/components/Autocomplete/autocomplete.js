import React from "react";
import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";
import "./autocomplete.css";

function autocomplete(GEOAPIFY_API_KEY, root) {
  const autocomplete = new GeocoderAutocomplete(root, GEOAPIFY_API_KEY, {
    type: "city",
  });

  autocomplete.setPostprocessHook((feature) => {
    return `${feature.properties.address_line1} ${feature.properties.address_line2}`;
  });

  return autocomplete;
}

export default autocomplete;
