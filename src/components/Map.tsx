import React from "react";
import { useMapContext } from "../mapContext";

interface MapProps extends google.maps.MapOptions {
  children?: React.ReactNode;
}
const Map: React.FC<MapProps> = ({ children }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { map, setMap } = useMapContext();

  React.useEffect(() => {
    if (ref.current && !map) {
      const mapInitiated = new window.google.maps.Map(ref.current, {
        center: { lat: 37.569227, lng: 126.9777256 },
        zoom: 16,
        disableDefaultUI: true,
        draggable: false,
      });
      setMap(mapInitiated);
    }
  }, [ref, map]);
  return (
    <>
      <div ref={ref} style={{ height: "100vh", width: "70%" }} />
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
