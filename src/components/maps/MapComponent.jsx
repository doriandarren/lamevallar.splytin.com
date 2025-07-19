import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Map(){
   useEffect(() => {
    const map = L.map("map", {
      scrollWheelZoom: false,    // Desactiva zoom con la rueda del ratón
      doubleClickZoom: false,    // Desactiva zoom con doble clic
      dragging: true,            // Permite mover el mapa
      zoomControl: true          // Activa los botones de zoom
    }).setView([41.3851, 2.1734], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([41.3851, 2.1734]).addTo(map).bindPopup("¡Hola!").openPopup();
  }, []);

  return <div id="map" className="h-[450px] w-full shadow-md rounded-lg"></div>;
}
