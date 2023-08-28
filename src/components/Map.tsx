import React from "react";

interface MapProps extends google.maps.MapOptions {
  style?: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
}

const Map: React.FC<MapProps> = () => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  //   const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    // if (ref.current && !map) {
    //   setMap(new window.google.maps.Map(ref.current, {}));
    // }
    if (ref.current) {
      new window.google.maps.Map(ref.current, {
        center: { lat: 37.569227, lng: 126.9777256 },
        zoom: 16,
      });
    }
    // setMap(map);
  }, [ref]);
  return <div ref={ref} style={{ height: "100vh", width:'70%' }} />;
};

export default Map;
