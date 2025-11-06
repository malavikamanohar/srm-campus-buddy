import { Link } from "react-router-dom";
import { Building2, Layers, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building } from "@/data/buildings";

interface BuildingCardProps {
  building: Building;
}

export const BuildingCard = ({ building }: BuildingCardProps) => {
  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      Academic: "bg-primary/10 text-primary hover:bg-primary/20",
      Engineering: "bg-secondary/10 text-secondary hover:bg-secondary/20",
      Lab: "bg-accent/10 text-accent hover:bg-accent/20",
      Research: "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-950 dark:text-purple-300",
      Administrative: "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300",
    };
    return colors[category || ""] || "bg-muted text-muted-foreground";
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-accent-glow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold leading-tight text-card-foreground group-hover:text-primary transition-colors">
                {building.name}
              </h3>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {building.campus}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 pb-3">
        <div className="flex flex-wrap gap-2">
          {building.category && (
            <Badge variant="secondary" className={getCategoryColor(building.category)}>
              {building.category}
            </Badge>
          )}
          <Badge variant="outline" className="flex items-center gap-1">
            <Layers className="h-3 w-3" />
            {building.floors}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-md bg-muted p-2">
            <div className="text-xs text-muted-foreground">Area</div>
            <div className="font-semibold text-foreground">
              {building.area.toLocaleString()} sq.ft
            </div>
          </div>
          {building.rooms && (
            <div className="rounded-md bg-muted p-2">
              <div className="text-xs text-muted-foreground">Rooms</div>
              <div className="font-semibold text-foreground">{building.rooms}</div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button variant="ghost" size="sm" className="w-full" asChild>
          <Link to={`/buildings/${building.id}`}>
            View Details →
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
