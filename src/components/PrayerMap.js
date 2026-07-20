// src/components/PrayerMap.js
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import L from "leaflet";
import { timeZoneCenters } from "../utils/timezoneMap";
import { colors, fonts } from "../styles/ui";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function PrayerMap({ refreshKey, userTimeZone, darkMode }) {
  const [locations, setLocations] = useState([]);
  const centerCoords = timeZoneCenters[userTimeZone] || timeZoneCenters["default"];

  useEffect(() => {
    async function fetchPrayersWithLocation() {
      try {
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
      } catch (err) {
        console.warn("Error fetching prayer locations:", err);
      }
    }

    fetchPrayersWithLocation();
  }, [refreshKey]);

  // Dark mode vs light mode map tile layers
  const tileUrl = darkMode
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const tileAttribution = darkMode
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <div
      style={{
        marginTop: "2.5rem",
        padding: "1.5rem",
        backgroundColor: darkMode ? colors.darkCardBg : colors.lightCardBg,
        border: darkMode
          ? `1px solid ${colors.subtleGoldBorder}`
          : "1px solid #e2e8f0",
        borderRadius: "16px",
        boxShadow: darkMode
          ? "0 8px 24px rgba(0,0,0,0.4)"
          : "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <h3
        style={{
          margin: "0 0 1rem 0",
          fontFamily: fonts.sacred,
          fontSize: "1.2rem",
          color: darkMode ? colors.accent : colors.primary,
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span>🌍</span> Spiritual Prayer Journey Map
      </h3>

      <div
        style={{
          height: "380px",
          borderRadius: "12px",
          overflow: "hidden",
          border: darkMode ? "1px solid #334155" : "1px solid #cbd5e1",
        }}
      >
        <MapContainer
          center={centerCoords}
          zoom={2}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer attribution={tileAttribution} url={tileUrl} />
          {locations.map((loc) => (
            <Marker key={loc.id} position={[loc.lat, loc.lng]}>
              <Popup>
                <strong>Prayer Logged</strong>
                <br />
                {loc.time?.toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default PrayerMap;
