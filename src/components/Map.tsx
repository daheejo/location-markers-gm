import React from "react";
import { useMapContext } from "../mapContext";

interface MapProps extends google.maps.MapOptions {
  children?: React.ReactNode;
  center: google.maps.LatLngLiteral;
  zoom?: number;
}
const Map: React.FC<MapProps> = ({ children, center, zoom = 16 }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { map, setMap } = useMapContext();

  React.useEffect(() => {
    if (ref.current && !map) {
      const mapInitiated = new window.google.maps.Map(ref.current, {
        center: center,
        zoom: zoom,
        disableDefaultUI: true,
        draggable: false,
      });
      setMap(mapInitiated);
    }
  }, [ref, map]);
  return (
    <>
      <div ref={ref} className="map" />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

export default Map;
