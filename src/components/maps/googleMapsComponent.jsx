// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import sensor from '../../../src/images/sensor-removebg-preview.png'


// function MapsComponent(props) {
//   const mapContainerStyle = {
//     height: props.height || '50vh',
//     width: props.width,
//   };
//   const [position, setPosition] = useState({
//     lat: props.longitude || 37.772,
//     lng: props.latitude || -122.214,
//   });
//   const [zoom, setZoom] = useState(props.zoom || 15); // Default zoom level

//   const onMarkerDragEnd = (event) => {
//     const newLatLng = event.target.getLatLng(); // Get the new position (lat, lng)

//     if (newLatLng && newLatLng.lat !== undefined && newLatLng.lng !== undefined) {
//       setPosition({
//         lat: newLatLng.lat,
//         lng: newLatLng.lng,
//       });

//       if (typeof props.onMarkerDrop === 'function') {
//         props.onMarkerDrop({
//           lat: newLatLng.lat,
//           lng: newLatLng.lng,
//         });
//       } else {
//         console.error('onMarkerDrop function is not provided as a prop.');
//       }
//     } else {
//       console.error('Invalid marker position:', newLatLng);
//     }
//   };

//   const customBuildingIcon = L.icon({
//     iconUrl: sensor,
//     iconSize: [25, 25], // adjust the size of the icon
//     iconAnchor: [2, 14], // position of the icon anchor
//     popupAnchor: [-3, -38], // where popups will open relative to the icon anchor
//   });

//   useEffect(() => {
//     setPosition({
//       lat: props.center?.lat || 19.0760,
//       lng: props.center?.lng || 72.8777,
//     });
//     setZoom(props?.zoom) || 15;
//   }, []);
//   return (
//     <div className="map-container">
//       <MapContainer

//         zoom={zoom}
//         center={position}
//       >

//         <TileLayer
//           attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
//           url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
//         />
//         <Marker
//           icon={customBuildingIcon}
//           draggable={true} // Enable dragging
//           eventHandlers={{
//             dragend: onMarkerDragEnd, // Attach the event handler
//           }}
//           position={position}
//         />
//         <Popup
//           position={{ lat: (position.lat + props.flagDistance || 0.0018), lng: position.lng }}
//           onPositionChanged={() => { }}
//         >
//           <div>
//             <span style={{ padding: 0, margin: 0 }}>{props.stateName || 'New Location Here'}</span>
//           </div>
//         </Popup>

//       </MapContainer>
//     </div>
//   );
// }

// export default React.memo(MapsComponent);



////////New Map Changes//////
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import L from "leaflet";

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [28, 28],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

// Default location: New Delhi, India
const DEFAULT_LOCATION = { lat: 20.5937, lng: 78.9629 };

const SearchControl = ({ onMarkerDrop }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: false,
      showPopup: false,
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", (result) => {
      const { x, y } = result.location;
      onMarkerDrop({ lat: y, lng: x });
    });

    return () => {
      map.removeControl(searchControl);
    };
  }, [map, onMarkerDrop]);

  return null;
};

const MapsComponent = ({ onMarkerDrop, longitude, latitude }) => {
  const [markerPosition, setMarkerPosition] = useState(
    latitude && longitude ? { lat: latitude, lng: longitude } : DEFAULT_LOCATION
  );

  // useEffect(() => {
  //   // Ensure marker is placed at the default location on mount
  //   setMarkerPosition(DEFAULT_LOCATION);
  // }, []);
  useEffect(() => {
    if (latitude && longitude) {
      setMarkerPosition({ lat: latitude, lng: longitude });
    }
  }, [latitude, longitude]);

  const handleDragEnd = (event) => {
    const { lat, lng } = event.target.getLatLng();
    setMarkerPosition({ lat, lng });
    onMarkerDrop({ lat, lng });
  };

  return (
    <MapContainer
      center={markerPosition}
      zoom={12}
      style={{ height: "385px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <SearchControl onMarkerDrop={setMarkerPosition} />

      <Marker
        position={markerPosition}
        draggable={true}
        eventHandlers={{ dragend: handleDragEnd }}
        icon={customIcon}
      >
        <Popup>Drag me to change location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapsComponent;