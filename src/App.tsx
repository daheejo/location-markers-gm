import React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import "./App.css";
import Map from "./components/Map";
import Marker from "./components/Marker";
import DrawingManager from "./components/DrawingManager";
import { usePositionContext } from "./mapContext";
import positions from "./constants/positions";

function App() {
  const API_KEY = "AIzaSyBoJnGFrN2OMZfK2ldnfd8aWxDGmz_VnBw";
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };
  const { setPositions } = usePositionContext();

  React.useEffect(() => {
    setPositions(positions);
  }, []);

  // const [map, setMap] = React.useState<google.maps.Map | null>(null);

  return (
      <div className="app">
        <Wrapper
          apiKey={API_KEY}
          render={render}
          libraries={["drawing"]}
          language="ko"
        >
          <Map>
            {positions.map((position, index) => (
              <Marker key={index} position={position} />
            ))}
            <DrawingManager />
          </Map>
        </Wrapper>
        <div className="location-info"></div>
      </div>
  );
}

export default App;
