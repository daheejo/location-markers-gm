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
  const API_KEY = "AIzaSyBoJnGFrN2OMZfK2ldnfd8aWxDGmz_VnBw";
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };
  const { setPositions, selectedPositions } =
    usePositionContext();

  React.useEffect(() => {
    setPositions(positions);
    window.alert(
      "지도의 상단 메뉴에서 사각형을 선택하시고 원하는 위치의 마커 위에 그리시면 우측에 위도,경보 정보가 뜹니다 :)"
    );
  }, []);

  return (
    <div className="app">
      <Wrapper
        apiKey={API_KEY}
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
