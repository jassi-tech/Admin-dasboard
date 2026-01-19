"use client";

import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const UserMap = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        
        // Fix for Leaflet default icon issue in Next.js
        const L = require("leaflet");
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default?.src || require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png").default?.src || require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png").default?.src || require("leaflet/dist/images/marker-shadow.png"),
        });
    }, []);

    const locations: [number, number, string][] = [
        [51.505, -0.09, "User 1: London"],
        [48.8566, 2.3522, "User 2: Paris"],
        [40.7128, -74.006, "User 3: New York"],
        [28.6139, 77.209, "User 4: New Delhi"],
        [35.6762, 139.6503, "User 5: Tokyo"],
    ];

    if (!isClient) return null;

    return (
        <div style={{ height: "400px", width: "100%", borderRadius: "8px", overflow: "hidden" }}>
            <MapContainer
                center={[20, 0]}
                zoom={2}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map((loc, idx) => (
                    <Marker key={idx} position={[loc[0], loc[1]]}>
                        <Popup>{loc[2]}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default UserMap;
