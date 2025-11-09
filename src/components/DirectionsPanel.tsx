import { DirectionStep, formatInstruction, getManeuverIcon } from "@/utils/directions";
import { formatDistance, calculateWalkingTime } from "@/utils/geoUtils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X, Navigation } from "lucide-react";

interface DirectionsPanelProps {
  steps: DirectionStep[];
  totalDistance: number;
  totalDuration: number;
  destinationName: string;
  onClose: () => void;
}

export const DirectionsPanel = ({
  steps,
  totalDistance,
  totalDuration,
  destinationName,
  onClose,
}: DirectionsPanelProps) => {
  return (
    <div className="absolute top-4 left-4 w-80 max-h-[80vh] bg-card border border-border rounded-lg shadow-xl flex flex-col z-10">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Navigation className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">Walking Directions</h3>
              <p className="text-xs text-muted-foreground">To {destinationName}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-primary">{formatDistance(totalDistance)}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-primary">{calculateWalkingTime(totalDistance)}</span>
          </div>
        </div>
      </div>

      {/* Steps */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                {getManeuverIcon(step.maneuver)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-snug">
                  {step.instruction}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {step.distance < 100 
                    ? `${Math.round(step.distance)}m` 
                    : `${(step.distance / 1000).toFixed(1)}km`}
                  {step.duration && ` • ${Math.ceil(step.duration / 60)} min`}
                </p>
              </div>
            </div>
          ))}
          
          <div className="flex gap-3 pt-2 border-t border-border">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-lg">
              📍
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">
                Arrive at {destinationName}
              </p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
