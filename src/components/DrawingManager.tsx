import React from "react";

const DrawingManager: React.FC<google.maps.drawing.DrawingManagerOptions> = (
  options
) => {
  const [drawingManager, setDrawingManager] =
    React.useState<google.maps.drawing.DrawingManager>();

  React.useEffect(() => {
    if (!drawingManager) {
      setDrawingManager(
        new google.maps.drawing.DrawingManager({
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
        })
      );
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

  const markers = []
  drawingManager?.addListener("rectanglecomplete", (rectangle) => {
    console.log(rectangle)
    const ne = rectangle.getBounds().getNorthEast();
    const sw = rectangle.getBounds().getSouthWest();
    // const bounds = new window.google.maps.LatLngBounds(sw, ne);

    const lat = (ne.lat() + sw.lat()) / 2;
    const lng = (ne.lng() + sw.lng()) / 2;
    const position = { lat, lng };
    markers.push(position)
    // console.log(markers)
    // Clear the rectangle
    rectangle.setMap(null);
  })

  return null;
};

export default DrawingManager;
