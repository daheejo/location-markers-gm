import { Wrapper, Status } from "@googlemaps/react-wrapper";
import "./App.css";
import Map from "./components/Map";
import Marker from "./components/Marker";
import DrawingManager from "./components/DrawingManager";

function App() {
  const API_KEY = "AIzaSyBoJnGFrN2OMZfK2ldnfd8aWxDGmz_VnBw";
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };
  const positions = [
    { lat: 37.571664, lng: 126.976339 },
    { lat: 37.571077, lng: 126.977819 },
    { lat: 37.572531, lng: 126.976907 },
    { lat: 37.571128, lng: 126.978903 },
    { lat: 37.570525, lng: 126.976510 },
    { lat: 37.570856, lng: 126.975416 },
    { lat: 37.571239, lng: 126.974300 },
    { lat: 37.571179, lng: 126.975974 },
    { lat: 37.575122, lng: 126.978051 },
    { lat: 37.565829, lng: 126.974968 },
    { lat: 37.569333, lng: 126.979174 },
    { lat: 37.568023, lng: 126.975977 },
    { lat: 37.568312, lng: 126.971513 },
    { lat: 37.570489, lng: 126.970891 },
    { lat: 37.568567, lng: 126.972200 },
    { lat: 37.569435, lng: 126.974367 },
    { lat: 37.571527, lng: 126.987070 },
    { lat: 37.573602, lng: 126.980783 },
    { lat: 37.573806, lng: 126.976534 },
  ];

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
