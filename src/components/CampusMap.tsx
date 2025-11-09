import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Building } from "@/data/buildings";
import { getCategoryColor, getCurrentLocation, Coordinates } from "@/utils/geoUtils";
import { useNavigate } from "react-router-dom";

// Mapbox public token - users should get their own from https://mapbox.com
mapboxgl.accessToken = "pk.eyJ1IjoibG92YWJsZS1kZXYiLCJhIjoiY2x3ODZ5OXhuMGtiMjJqcGtuMWIyeGU1ZiJ9.aZ5EBL80rcIWgSi0LoJ6-w";

interface CampusMapProps {
  buildings: Building[];
  selectedBuildingId?: string;
  onBuildingSelect?: (buildingId: string) => void;
  showUserLocation?: boolean;
  height?: string;
}

export const CampusMap = ({
  buildings,
  selectedBuildingId,
  onBuildingSelect,
  showUserLocation = false,
  height = "600px",
}: CampusMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const userMarker = useRef<mapboxgl.Marker | null>(null);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const navigate = useNavigate();

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [80.044, 12.823], // SRMIST campus center
      zoom: 15.5,
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      "top-right"
    );

    // Add fullscreen control
    map.current.addControl(new mapboxgl.FullscreenControl(), "top-right");

    // Add scale control
    map.current.addControl(
      new mapboxgl.ScaleControl({
        maxWidth: 100,
        unit: "metric",
      }),
      "bottom-right"
    );

    return () => {
      map.current?.remove();
    };
  }, []);

  // Add building markers
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];

    buildings.forEach((building) => {
      const color = getCategoryColor(building.category);
      const isSelected = building.id === selectedBuildingId;

      // Create custom marker element
      const el = document.createElement("div");
      el.className = "custom-marker";
      el.style.width = isSelected ? "40px" : "30px";
      el.style.height = isSelected ? "40px" : "30px";
      el.style.borderRadius = "50% 50% 50% 0";
      el.style.backgroundColor = color;
      el.style.border = "3px solid white";
      el.style.transform = "rotate(-45deg)";
      el.style.cursor = "pointer";
      el.style.boxShadow = isSelected
        ? `0 0 20px ${color}`
        : "0 2px 10px rgba(0,0,0,0.3)";
      el.style.transition = "all 0.3s ease";

      // Inner dot
      const inner = document.createElement("div");
      inner.style.width = "8px";
      inner.style.height = "8px";
      inner.style.backgroundColor = "white";
      inner.style.borderRadius = "50%";
      inner.style.position = "absolute";
      inner.style.top = "50%";
      inner.style.left = "50%";
      inner.style.transform = "translate(-50%, -50%) rotate(45deg)";
      el.appendChild(inner);

      // Create popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false,
      }).setHTML(`
        <div style="padding: 8px; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold; font-size: 14px;">${building.name}</h3>
          <div style="font-size: 12px; color: #666; margin-bottom: 4px;">
            <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${color}; margin-right: 4px;"></span>
            ${building.category || "General"}
          </div>
          <div style="font-size: 12px; color: #666; margin-bottom: 4px;">
            📍 ${building.campus}
          </div>
          <div style="font-size: 12px; color: #666; margin-bottom: 8px;">
            📏 ${building.area.toLocaleString()} sq ft
          </div>
          <button 
            onclick="window.location.href='/buildings/${building.id}'"
            style="width: 100%; padding: 6px 12px; background: ${color}; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 500;"
          >
            View Details →
          </button>
        </div>
      `);

      // Create marker
      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([building.longitude, building.latitude])
        .setPopup(popup)
        .addTo(map.current!);

      // Marker click handler
      el.addEventListener("click", () => {
        if (onBuildingSelect) {
          onBuildingSelect(building.id);
        }
      });

      // Show popup on hover
      el.addEventListener("mouseenter", () => {
        popup.addTo(map.current!);
      });

      el.addEventListener("mouseleave", () => {
        if (!isSelected) {
          popup.remove();
        }
      });

      markers.current.push(marker);
    });
  }, [buildings, selectedBuildingId, onBuildingSelect]);

  // Fly to selected building
  useEffect(() => {
    if (!map.current || !selectedBuildingId) return;

    const building = buildings.find((b) => b.id === selectedBuildingId);
    if (building) {
      map.current.flyTo({
        center: [building.longitude, building.latitude],
        zoom: 17,
        duration: 1500,
      });
    }
  }, [selectedBuildingId, buildings]);

  // Handle user location
  useEffect(() => {
    if (!showUserLocation || !map.current) return;

    getCurrentLocation()
      .then((coords) => {
        setUserLocation(coords);

        // Remove old user marker
        if (userMarker.current) {
          userMarker.current.remove();
        }

        // Create user location marker
        const el = document.createElement("div");
        el.className = "user-location-marker";
        el.style.width = "20px";
        el.style.height = "20px";
        el.style.borderRadius = "50%";
        el.style.backgroundColor = "#3B82F6";
        el.style.border = "3px solid white";
        el.style.boxShadow = "0 0 20px rgba(59, 130, 246, 0.5)";
        el.style.animation = "pulse 2s infinite";

        // Add CSS animation for pulse
        const style = document.createElement("style");
        style.textContent = `
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
            }
          }
        `;
        document.head.appendChild(style);

        userMarker.current = new mapboxgl.Marker({ element: el })
          .setLngLat([coords.longitude, coords.latitude])
          .addTo(map.current!);

        // Fly to user location
        map.current!.flyTo({
          center: [coords.longitude, coords.latitude],
          zoom: 16,
          duration: 1500,
        });
      })
      .catch((error) => {
        console.error("Error getting user location:", error);
      });

    return () => {
      if (userMarker.current) {
        userMarker.current.remove();
      }
    };
  }, [showUserLocation]);

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-lg" style={{ height }}>
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};
