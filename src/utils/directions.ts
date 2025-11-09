import { Coordinates } from "./geoUtils";

export interface DirectionStep {
  instruction: string;
  distance: number;
  duration: number;
  maneuver?: string;
}

export interface RouteData {
  coordinates: [number, number][];
  distance: number;
  duration: number;
  steps: DirectionStep[];
}

/**
 * Get walking directions from Mapbox Directions API
 */
export async function getWalkingDirections(
  start: Coordinates,
  end: Coordinates
): Promise<RouteData | null> {
  const accessToken = "pk.eyJ1IjoibG92YWJsZS1kZXYiLCJhIjoiY2x3ODZ5OXhuMGtiMjJqcGtuMWIyeGU1ZiJ9.aZ5EBL80rcIWgSi0LoJ6-w";
  
  const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?steps=true&geometries=geojson&access_token=${accessToken}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      
      // Extract steps with instructions
      const steps: DirectionStep[] = route.legs[0].steps.map((step: any) => ({
        instruction: step.maneuver.instruction || "Continue",
        distance: step.distance,
        duration: step.duration,
        maneuver: step.maneuver.type,
      }));

      return {
        coordinates: route.geometry.coordinates,
        distance: route.distance,
        duration: route.duration,
        steps,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching directions:", error);
    return null;
  }
}

/**
 * Format turn-by-turn instruction for display
 */
export function formatInstruction(step: DirectionStep, index: number): string {
  const distance = step.distance < 100 
    ? `${Math.round(step.distance)}m` 
    : `${(step.distance / 1000).toFixed(1)}km`;
  
  return `${index + 1}. ${step.instruction} (${distance})`;
}

/**
 * Get maneuver icon based on instruction type
 */
export function getManeuverIcon(maneuver?: string): string {
  const icons: Record<string, string> = {
    turn: "↻",
    "turn-right": "→",
    "turn-left": "←",
    "sharp-right": "⤴",
    "sharp-left": "⤵",
    "slight-right": "⤷",
    "slight-left": "⤶",
    straight: "↑",
    "uturn": "⤾",
    arrive: "📍",
    depart: "🚶",
  };
  
  return icons[maneuver || "straight"] || "↑";
}
