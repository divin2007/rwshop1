'use client';
import React, { useState } from 'react';

interface Coordinates {
  lat: number;
  lng: number;
}

interface MapPinPickerProps {
  onLocationSelected: (coords: Coordinates) => void;
  initialLocation?: Coordinates;
}

export const MapPinPicker = ({ onLocationSelected, initialLocation }: MapPinPickerProps) => {
  // In a real implementation this would wrap Google Maps or Leaflet.
  // We're building a visual stub that enforces the map-only requirement.
  const [coords, setCoords] = useState<Coordinates | null>(initialLocation || null);

  const simulatePinDrop = (e: React.MouseEvent<HTMLDivElement>) => {
    // Generate some fake coords for the demo stub based on click pos
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Convert to rough Kigali coords
    const lat = -1.9441 + (y / rect.height - 0.5) * 0.1;
    const lng = 30.0619 + (x / rect.width - 0.5) * 0.1;

    const newCoords = { lat, lng };
    setCoords(newCoords);
    onLocationSelected(newCoords);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-text-primary mb-2">
        Delivery Location
      </label>
      <p className="text-xs text-status-warning mb-2 font-medium">
        Text addresses are not accepted. Please drop a pin on the map.
      </p>

      <div
        className="w-full h-64 bg-background-surface rounded border-2 border-dashed border-border relative overflow-hidden cursor-crosshair flex items-center justify-center hover:bg-gray-200 transition-colors"
        onClick={simulatePinDrop}
      >
        <div className="absolute inset-0 bg-[url('https://maps.wikimedia.org/osm-intl/13/4862/4113.png')] opacity-50 bg-cover bg-center"></div>

        {!coords ? (
          <div className="bg-background-card/90 px-4 py-2 rounded shadow-md z-10 pointer-events-none text-text-primary font-medium">
            Click map to drop pin
          </div>
        ) : (
          <div
            className="absolute z-10 w-6 h-8 -mt-8 -ml-3 pointer-events-none flex items-end justify-center"
            style={{ top: '50%', left: '50%' }}
          >
            <div className="w-6 h-6 rounded-full bg-primary border-2 border-secondary flex items-center justify-center shadow-lg">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
            </div>
            <div className="w-1 h-2 bg-secondary"></div>
          </div>
        )}
      </div>

      {coords && (
        <div className="mt-2 text-sm text-status-success font-medium flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Location pinned: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
        </div>
      )}
    </div>
  );
};
