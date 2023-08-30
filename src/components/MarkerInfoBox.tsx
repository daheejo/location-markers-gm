import React from "react";
interface markerInfoBoxProps {
  info: {
    name?: string;
    lat: number;
    lng: number;
  };
}

const MarkerInfoBox: React.FC<markerInfoBoxProps> = ({ info }) => {

  return (
    <div className="infobox">
      <p className="info-text">{info?.name}</p>
      <p className="info-text">lat: {info?.lat}</p>
      <p className="info-text">lng: {info?.lng}</p>
    </div>
  );
};

export default MarkerInfoBox;
