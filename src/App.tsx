import React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import "./App.css";
import Map from "./components/Map";
import Marker from "./components/Marker";
import DrawingManager from "./components/DrawingManager";
import { usePositionContext } from "./mapContext";
import positions from "./constants/positions";
import MarkerInfoBox from "./components/MarkerInfoBox";

function App() {
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };
  const { setPositions, selectedPositions } =
    usePositionContext();

  React.useEffect(() => {
    setPositions(positions);
  }, []);

  return (
    <div className="app">
      <Wrapper
        apiKey={import.meta.env.VITE_GM_API_KEY}
        render={render}
        libraries={["drawing"]}
        language="ko"
      >
        <Map center={{ lat: 37.569227, lng: 126.9777256 }}>
          {positions.map((position, index) => (
            <Marker key={index} position={position} />
          ))}
          <DrawingManager />
        </Map>
      </Wrapper>
      <div className="location-info">
        {selectedPositions?.map((position, index) => (
          <MarkerInfoBox key={index} info={position} />
        ))}
      </div>
    </div>
  );
}

export default App;
