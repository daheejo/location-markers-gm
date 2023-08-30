import React from "react";

interface MapContextProps {
  map: google.maps.Map | null;
  setMap: (map: google.maps.Map | null) => void;
}

interface PositionContextProps {
  positions: google.maps.LatLngLiteral[];
  setPositions: (positions: google.maps.LatLngLiteral[]) => void;
  selectedPositions: google.maps.LatLngLiteral[] | null;
  setSelectedPositions: (
    selectedLocations: google.maps.LatLngLiteral[] | null
  ) => void;
}

export const MapContext = React.createContext<MapContextProps | null>(null);
export const PositionContext = React.createContext<PositionContextProps | null>(
  null
);

const PositionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [positions, setPositions] = React.useState<google.maps.LatLngLiteral[]>(
    []
  );
  const [selectedPositions, setSelectedPositions] = React.useState<
    google.maps.LatLngLiteral[] | null
  >(null);

  return (
    <PositionContext.Provider
      value={{
        positions,
        setPositions,
        selectedPositions,
        setSelectedPositions,
      }}
    >
      {children}
    </PositionContext.Provider>
  );
};

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  return (
    <MapContext.Provider value={{ map, setMap }}>
      <PositionProvider>{children}</PositionProvider>
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = React.useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
};

export const usePositionContext = () => {
  const context = React.useContext(PositionContext);
  if (!context) {
    throw new Error(
      "usePositionContext must be used within a PositionProvider"
    );
  }
  return context;
};
