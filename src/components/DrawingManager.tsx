import React from "react";
import { usePositionContext } from "../mapContext";

const DrawingManager: React.FC<google.maps.drawing.DrawingManagerOptions> = (
  options
) => {
  const [drawingManager, setDrawingManager] =
    React.useState<google.maps.drawing.DrawingManager>();
  const { positions, setSelectedPositions } = usePositionContext();

  React.useEffect(() => {
    if (!drawingManager) {
      const initiatedDrawingManager = new google.maps.drawing.DrawingManager({
        ...google.maps.drawing.DrawingManager,
        drawingMode: google.maps.drawing.OverlayType.RECTANGLE,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [google.maps.drawing.OverlayType.RECTANGLE],
        },
        rectangleOptions: {
          fillColor: "#eb3434",
          fillOpacity: 0.5,
          strokeWeight: 1,
          clickable: false,
          zIndex: 1,
        },
      });
      setDrawingManager(initiatedDrawingManager);
      // initiatedDrawingManager.setMap(map);
    }
    return () => {
      if (drawingManager) {
        drawingManager.setMap(null);
      }
    };
  }, []);

  React.useEffect(() => {
    if (drawingManager) {
      drawingManager.setOptions(options);
    }
  }, [drawingManager, options]);

  drawingManager?.addListener(
    "rectanglecomplete",
    (rectangle: google.maps.Rectangle) => {
      const ne = rectangle.getBounds().getNorthEast();
      const sw = rectangle.getBounds().getSouthWest();
      const latNE = ne.lat();
      const lngNE = ne.lng();
      const latSW = sw.lat();
      const lngSW = sw.lng();

      const positionsWithinRectangle = positions.filter((position) => {
        const markerLat = position.lat;
        const markerLng = position.lng;

        return (
          markerLat >= latSW &&
          markerLat <= latNE &&
          markerLng >= lngSW &&
          markerLng <= lngNE
        );
      });

      if (positionsWithinRectangle.length > 0) {
        setSelectedPositions(positionsWithinRectangle);
      }
      // Clear the rectangle
      rectangle.setMap(null);
    }
  );

  return null;
};

export default DrawingManager;
