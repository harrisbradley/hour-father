// src/components/PrayerMap.js
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import L from "leaflet";

// ✅ Fix default marker icon path (Leaflet quirk)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function PrayerMap({refreshKey}) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function fetchPrayersWithLocation() {
      const q = query(
        collection(db, "prayers"),
        where("location", "!=", null),
        orderBy("prayedAt", "desc")
      );

      const snapshot = await getDocs(q);
      const results = snapshot.docs
        .map((doc) => {
          const data = doc.data();
          if (data.location?.lat && data.location?.lng) {
            return {
              id: doc.id,
              lat: data.location.lat,
              lng: data.location.lng,
              time: data.prayedAt?.toDate(),
            };
          }
          return null;
        })
        .filter(Boolean);

      setLocations(results);
    }

    fetchPrayersWithLocation();
  }, [refreshKey]);

  return (
    <div style={{ height: "400px", marginTop: "2rem", borderRadius: "8px", overflow: "hidden" }}>
      <h3>🌍 Global Prayer Map</h3>
      <MapContainer
        center={[20, 0]} // center of the map (roughly global center)
        zoom={2}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]}>
            <Popup>
              Prayer logged at:<br />
              {loc.time?.toLocaleString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default PrayerMap;
