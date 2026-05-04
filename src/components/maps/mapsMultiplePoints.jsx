import React, { useState, useEffect } from 'react'
// import { GoogleMap, Marker, LoadScript, InfoWindow } from "@react-google-maps/api";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import '../maps/streetMap.css';
import 'leaflet/dist/leaflet.css';
import sensor from '../../../src/images/sensor-removebg-preview.png'



function MapsMultiplePoints(props) {
    // props -> markers Array, zoom integer, isDragable
    const [activeMarker, setActiveMarker] = useState(null);


    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };


    const customBuildingIcon = L.icon({
        iconUrl: sensor,
        iconSize: [24, 24], // adjust the size of the icon
        iconAnchor: [22, 38], // position of the icon anchor
        popupAnchor: [-3, -38], // where popups will open relative to the icon anchor
    });


    return (
        // <div className="map-container">
        <div
            className="map-container"
            style={{
                height: props.height || "55vh",
                width: "100%",
                overflow: "hidden"
            }}
        >
            <MapContainer
                center={props.center}
                zoom={props.zoom}
                style={{ height: "100%", width: "100%" }}

            >

                <TileLayer
                    attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                {props.markers.map(({ id, name, position }, index) => (
                    <Marker
                        icon={customBuildingIcon}
                        // draggable={props.isDragable ? props.isDragable : true}
                        draggable={false}
                        // onDragEnd={onMarkerDragEnd}
                        key={index}
                        position={position}
                        onClick={() => handleActiveMarker(index)}
                    >
                        {activeMarker === index ? (
                            <Popup onCloseClick={() => setActiveMarker(null)} >
                                <div>{name}</div>
                            </Popup>
                        ) : null}
                    </Marker>
                ))}

            </MapContainer>
        </div>
    )
}

export default React.memo(MapsMultiplePoints)