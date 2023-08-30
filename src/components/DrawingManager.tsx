import React from "react";
import { usePositionContext } from "../mapContext";

const DrawingManager: React.FC<google.maps.drawing.DrawingManagerOptions> = (
  options
) => {
  const [drawingManager, setDrawingManager] =
    React.useState<google.maps.drawing.DrawingManager>();
  const { positions } = usePositionContext();

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
  }, [drawingManager]);

  React.useEffect(() => {
    if (drawingManager) {
      drawingManager.setOptions(options);
    }
  }, [drawingManager, options]);

  const markers: google.maps.Marker[] = [];
  drawingManager?.addListener(
    "rectanglecomplete",
    (rectangle: google.maps.Rectangle) => {
      // console.log(positions)
      // console.log(positions?.find((position) => rectangle.getBounds()?.contains(position)));
      console.log(rectangle.getBounds()?.contains(positions?.[0]));
      // let coordsArr = [];

      // let coords = rectangle.getPath().getArray();
      // console.log(coords)
      // const ne = rectangle.getBounds().getNorthEast();
      // const sw = rectangle.getBounds().getSouthWest();
      // const lat = (ne.lat() + sw.lat()) / 2;
      // const lng = (ne.lng() + sw.lng()) / 2;
      // const position = { lat, lng };
      // markers.push(position);
      // console.log(markers)
      // Clear the rectangle
      rectangle.setMap(null);
    }
  );

  return null;
};

export default DrawingManager;
