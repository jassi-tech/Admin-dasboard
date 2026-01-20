"use client";

import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styles from "./UserMap.module.scss";

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

    const [locations, setLocations] = useState<[number, number, string][]>([]);

    useEffect(() => {
        // Fetch locations from backend API
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        fetch(`${API_URL}/locations`)
            .then((res) => res.json())
            .then((data) => setLocations(data))
            .catch((err) => console.error('Failed to load locations', err));
    }, []);


    if (!isClient) return null;

    return (
        <div className={styles.mapWrapper}>
            <MapContainer
                center={[20, 0]}
                zoom={2}
                scrollWheelZoom={false}
                className={styles.mapContainer}
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
