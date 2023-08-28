import { Wrapper, Status } from "@googlemaps/react-wrapper";
import "./App.css";
import Map from "./components/Map";

function App() {
  const API_KEY = 'AIzaSyBoJnGFrN2OMZfK2ldnfd8aWxDGmz_VnBw';
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  return (
    <div className="app">
      <Wrapper apiKey={API_KEY} render={render}>
        <Map />
      </Wrapper>
      <div className="location-info"></div>
    </div>
  );
}

export default App;
