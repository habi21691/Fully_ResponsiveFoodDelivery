import React from "react";
import { useState, useRef } from "react";
import { Box, Container, Input,Button,ButtonGroup,IconButton,Typography } from "@mui/material";
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import {

  GoogleMap,
  Marker,
  DirectionsRenderer,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";


const center = { lat: 50.064192, lng: -130.605469 };

function GoogleMapTracing() {
  const google = window.google
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef()
  const destinationRef = useRef()

  if (!isLoaded) {
    return <Typography />;
  }
  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    // const directionsService = new google.maps.DirectionsService();
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }
  return (
    <
      
    >
      
      <Box position="relative"
      flexDirection="column"
      alignItems="center"
      h="300"
      w="300">
      <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box position="absolute" left={0} top={0}>
        {/* const autocomplete = new google.maps.places.Autocomplete(input, options); */}
        <Box flexGrow={1}>
          <Autocomplete>
            <Input type="text" placeholder="Origin" ref={originRef} />
          </Autocomplete>
        </Box>
        <Box flexGrow={1}>
          <Autocomplete>
            <Input type="text" placeholder="Destination" ref={destinationRef} />
          </Autocomplete>
        </Box>

        <ButtonGroup>
          <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
            Calculate Route
          </Button>
          <IconButton
            aria-label="center back"
            icon={<FaTimes/>}
            onClick={clearRoute}
          />
        </ButtonGroup>
      </Box>
    </>
  );
}

export default GoogleMap;
