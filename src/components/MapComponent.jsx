// components/MapComponent.jsx
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

// Example locations – you can add your own branches
const branchLocations = [
  { id: 1, name: "Lagos Main Workshop", lat: 6.5244, lng: 3.3792 },
  { id: 2, name: "Abuja Branch", lat: 9.0765, lng: 7.3986 },
  { id: 3, name: "Port Harcourt Branch", lat: 4.8156, lng: 7.0498 },
];

export default function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Replace this
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: 7.3775, lng: 5.9391 }} // Nigeria center
      zoom={6}
    >
      {branchLocations.map((branch) => (
        <Marker
          key={branch.id}
          position={{ lat: branch.lat, lng: branch.lng }}
          title={branch.name}
        />
      ))}
    </GoogleMap>
  );
}
