// Utility functions for geographic calculations

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Calculate distance between two points using Haversine formula
 * Returns distance in meters
 */
export function calculateDistance(point1: Coordinates, point2: Coordinates): number {
  const R = 6371e3; // Earth's radius in meters
  
  const φ1 = (point1.latitude * Math.PI) / 180;
  const φ2 = (point2.latitude * Math.PI) / 180;
  const Δφ = ((point2.latitude - point1.latitude) * Math.PI) / 180;
  const Δλ = ((point2.longitude - point1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

/**
 * Format distance for display
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
}

/**
 * Calculate estimated walking time
 * Average walking speed: 5 km/h = 1.4 m/s
 */
export function calculateWalkingTime(meters: number): string {
  const minutes = Math.ceil(meters / 83.33); // 5 km/h = 83.33 m/min
  if (minutes < 1) return "< 1 min";
  if (minutes === 1) return "1 min";
  return `${minutes} mins`;
}

/**
 * Get user's current location
 */
export function getCurrentLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  });
}

/**
 * Watch user's location for real-time updates
 */
export function watchLocation(
  callback: (coords: Coordinates) => void,
  errorCallback?: (error: GeolocationPositionError) => void
): number {
  if (!navigator.geolocation) {
    throw new Error("Geolocation is not supported by your browser");
  }

  return navigator.geolocation.watchPosition(
    (position) => {
      callback({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    errorCallback,
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
}

/**
 * Stop watching location
 */
export function clearLocationWatch(watchId: number): void {
  navigator.geolocation.clearWatch(watchId);
}

/**
 * Get category color for map markers
 */
export function getCategoryColor(category?: string): string {
  const colors: Record<string, string> = {
    Academic: "#3B82F6", // Blue
    Engineering: "#F97316", // Orange
    Lab: "#A855F7", // Purple
    Dining: "#22C55E", // Green
    Administrative: "#6B7280", // Gray
    Research: "#6366F1", // Indigo
    Sports: "#EF4444", // Red
    Transport: "#EAB308", // Yellow
    Security: "#374151", // Dark Gray
    Management: "#EC4899", // Pink
    Architecture: "#14B8A6", // Teal
    "Bio-Engineering": "#8B5CF6", // Violet
    "Career Centre": "#06B6D4", // Cyan
  };
  return colors[category || ""] || "#6B7280";
}
