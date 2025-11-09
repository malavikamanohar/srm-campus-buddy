import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Building } from "@/data/buildings";
import { getCategoryColor, getCurrentLocation, Coordinates } from "@/utils/geoUtils";
import { getWalkingDirections, RouteData } from "@/utils/directions";
import { DirectionsPanel } from "./DirectionsPanel";

// Mapbox public token
mapboxgl.accessToken = "pk.eyJ1IjoibG92YWJsZS1kZXYiLCJhIjoiY2x3ODZ5OXhuMGtiMjJqcGtuMWIyeGU1ZiJ9.aZ5EBL80rcIWgSi0LoJ6-w";

interface CampusMapProps {
  buildings: Building[];
  selectedBuildingId?: string;
  onBuildingSelect?: (buildingId: string) => void;
  showUserLocation?: boolean;
  showDirections?: boolean;
  height?: string;
}

export const CampusMap = ({
  buildings,
  selectedBuildingId,
  onBuildingSelect,
  showUserLocation = false,
  showDirections = false,
  height = "600px",
}: CampusMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const userMarker = useRef<mapboxgl.Marker | null>(null);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [routeData, setRouteData] = useState<RouteData | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [80.044, 12.823],
      zoom: 15.5,
      pitch: 45,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({ visualizePitch: true }),
      "top-right"
    );
    map.current.addControl(new mapboxgl.FullscreenControl(), "top-right");
    map.current.addControl(
      new mapboxgl.ScaleControl({ maxWidth: 100, unit: "metric" }),
      "bottom-right"
    );

    return () => {
      map.current?.remove();
    };
  }, []);

  // Add building markers with enhanced popups
  useEffect(() => {
    if (!map.current) return;

    markers.current.forEach((marker) => marker.remove());
    markers.current = [];

    buildings.forEach((building) => {
      const color = getCategoryColor(building.category);
      const isSelected = building.id === selectedBuildingId;

      const el = document.createElement("div");
      el.className = "custom-marker";
      el.style.width = isSelected ? "40px" : "30px";
      el.style.height = isSelected ? "40px" : "30px";
      el.style.borderRadius = "50% 50% 50% 0";
      el.style.backgroundColor = color;
      el.style.border = "3px solid white";
      el.style.transform = "rotate(-45deg)";
      el.style.cursor = "pointer";
      el.style.boxShadow = isSelected ? `0 0 20px ${color}` : "0 2px 10px rgba(0,0,0,0.3)";
      el.style.transition = "all 0.3s ease";

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

      // Enhanced popup with photos
      const photosHTML = building.photos && building.photos.length > 0
        ? `
          <div style="margin-bottom: 8px; position: relative; height: 120px; overflow: hidden; border-radius: 6px;">
            <img 
              src="${building.photos[0]}" 
              alt="${building.name}"
              style="width: 100%; height: 100%; object-fit: cover;"
            />
            ${building.photos.length > 1 ? `
              <div style="position: absolute; bottom: 4px; right: 4px; background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px;">
                +${building.photos.length - 1} more
              </div>
            ` : ''}
            ${building.panoramaUrl ? `
              <div style="position: absolute; top: 4px; right: 4px; background: ${color}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 600;">
                360°
              </div>
            ` : ''}
          </div>
        `
        : '';

      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false,
        maxWidth: "280px",
      }).setHTML(`
        <div style="padding: 8px; min-width: 250px;">
          ${photosHTML}
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
            style="width: 100%; padding: 6px 12px; background: ${color}; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 500; margin-bottom: 4px;"
          >
            View Details →
          </button>
          ${userLocation && showDirections ? `
            <button 
              id="get-directions-${building.id}"
              style="width: 100%; padding: 6px 12px; background: #3B82F6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 500;"
            >
              🧭 Get Directions
            </button>
          ` : ''}
        </div>
      `);

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([building.longitude, building.latitude])
        .setPopup(popup)
        .addTo(map.current!);

      el.addEventListener("click", () => {
        if (onBuildingSelect) {
          onBuildingSelect(building.id);
        }
      });

      el.addEventListener("mouseenter", () => {
        popup.addTo(map.current!);
        
        // Add directions button listener after popup is added
        setTimeout(() => {
          const directionsBtn = document.getElementById(`get-directions-${building.id}`);
          if (directionsBtn && userLocation) {
            directionsBtn.addEventListener("click", async (e) => {
              e.stopPropagation();
              const route = await getWalkingDirections(userLocation, {
                latitude: building.latitude,
                longitude: building.longitude,
              });
              if (route) {
                setRouteData(route);
                drawRoute(route.coordinates);
              }
            });
          }
        }, 100);
      });

      el.addEventListener("mouseleave", () => {
        if (!isSelected) {
          popup.remove();
        }
      });

      markers.current.push(marker);
    });
  }, [buildings, selectedBuildingId, onBuildingSelect, userLocation, showDirections]);

  // Draw route on map
  const drawRoute = (coordinates: [number, number][]) => {
    if (!map.current) return;

    // Remove existing route layer
    if (map.current.getLayer("route")) {
      map.current.removeLayer("route");
      map.current.removeSource("route");
    }

    // Add route source and layer
    map.current.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates,
        },
      },
    });

    map.current.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#3B82F6",
        "line-width": 5,
        "line-opacity": 0.8,
      },
    });

    // Fit map to route
    const bounds = coordinates.reduce(
      (bounds, coord) => bounds.extend(coord as [number, number]),
      new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
    );
    map.current.fitBounds(bounds, { padding: 100 });
  };

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

        if (userMarker.current) {
          userMarker.current.remove();
        }

        const el = document.createElement("div");
        el.className = "user-location-marker";
        el.style.width = "20px";
        el.style.height = "20px";
        el.style.borderRadius = "50%";
        el.style.backgroundColor = "#3B82F6";
        el.style.border = "3px solid white";
        el.style.boxShadow = "0 0 20px rgba(59, 130, 246, 0.5)";
        el.style.animation = "pulse 2s infinite";

        const style = document.createElement("style");
        style.textContent = `
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
            100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
          }
        `;
        document.head.appendChild(style);

        userMarker.current = new mapboxgl.Marker({ element: el })
          .setLngLat([coords.longitude, coords.latitude])
          .addTo(map.current!);

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

  // Auto-fetch directions when both location and selected building are available
  useEffect(() => {
    if (!userLocation || !selectedBuildingId || !showDirections) return;

    const building = buildings.find((b) => b.id === selectedBuildingId);
    if (building) {
      getWalkingDirections(userLocation, {
        latitude: building.latitude,
        longitude: building.longitude,
      }).then((route) => {
        if (route) {
          setRouteData(route);
          drawRoute(route.coordinates);
        }
      });
    }
  }, [userLocation, selectedBuildingId, showDirections, buildings]);

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-lg" style={{ height }}>
      <div ref={mapContainer} className="absolute inset-0" />
      
      {routeData && selectedBuildingId && (
        <DirectionsPanel
          steps={routeData.steps}
          totalDistance={routeData.distance}
          totalDuration={routeData.duration}
          destinationName={
            buildings.find((b) => b.id === selectedBuildingId)?.name || "Destination"
          }
          onClose={() => {
            setRouteData(null);
            if (map.current?.getLayer("route")) {
              map.current.removeLayer("route");
              map.current.removeSource("route");
            }
          }}
        />
      )}
    </div>
  );
};
