import L from 'leaflet'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const mapMarker = L.divIcon({
  className: 'map-marker',
  html: '<span></span>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
})

function LocationPicker({ latitude, longitude, onChange }) {
  const lat = Number(latitude) || 21.6666667
  const lng = Number(longitude) || 81.1

  return (
    <div className="map-picker">
      <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onChange={onChange} />
        <Marker position={[lat, lng]} icon={mapMarker} />
      </MapContainer>
    </div>
  )
}

function MapClickHandler({ onChange }) {
  useMapEvents({
    click(event) {
      onChange({
        latitude: event.latlng.lat.toFixed(7),
        longitude: event.latlng.lng.toFixed(7),
      })
    },
  })
  return null
}

export default LocationPicker
