import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Building2, Layers, MapPin, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { buildings } from "@/data/buildings";
import { BuildingPhotoGallery } from "@/components/BuildingPhotoGallery";

const BuildingDetail = () => {
  const { id } = useParams();
  const building = buildings.find(b => b.id === id);

  if (!building) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold">Building not found</h1>
          <Button asChild>
            <Link to="/buildings">Back to Buildings</Link>
          </Button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      Academic: "bg-primary/10 text-primary",
      Engineering: "bg-secondary/10 text-secondary",
      Lab: "bg-accent/10 text-accent",
      Research: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
      Administrative: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    };
    return colors[category || ""] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/buildings" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Buildings
          </Link>
        </Button>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Building Details</h1>
          <Button asChild>
            <Link to={`/map?building=${building.id}`} className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              View on Map
            </Link>
          </Button>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <Card className="shadow-accent-glow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="mb-2 text-3xl">{building.name}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      {building.category && (
                        <Badge className={getCategoryColor(building.category)}>
                          {building.category}
                        </Badge>
                      )}
                      <Badge variant="outline" className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {building.campus}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Photo Gallery */}
                {building.photos && building.photos.length > 0 && (
                  <BuildingPhotoGallery
                    photos={building.photos}
                    buildingName={building.name}
                    panoramaUrl={building.panoramaUrl}
                  />
                )}
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-border bg-muted/50 p-4">
                    <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Layers className="h-4 w-4" />
                      Floors
                    </div>
                    <div className="text-2xl font-bold text-foreground">{building.floors}</div>
                  </div>
                  
                  <div className="rounded-lg border border-border bg-muted/50 p-4">
                    <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Maximize className="h-4 w-4" />
                      Total Area
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {building.area.toLocaleString()} sq.ft
                    </div>
                  </div>
                  
                  {building.rooms && (
                    <div className="rounded-lg border border-border bg-muted/50 p-4">
                      <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        Rooms/Classrooms
                      </div>
                      <div className="text-2xl font-bold text-foreground">{building.rooms}</div>
                    </div>
                  )}
                </div>
                
                {building.facilities && building.facilities.length > 0 && (
                  <div>
                    <h3 className="mb-3 font-semibold text-foreground">Facilities</h3>
                    <div className="flex flex-wrap gap-2">
                      {building.facilities.map((facility, index) => (
                        <Badge key={index} variant="secondary">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-foreground">Campus:</span>
                    <p className="text-muted-foreground">{building.campus}</p>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Address:</span>
                    <p className="text-muted-foreground">
                      SRM Institute of Science and Technology<br />
                      Kattankulathur - 603 203<br />
                      Chengalpattu District, Tamil Nadu
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Building Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Building ID:</span>
                  <span className="font-medium text-foreground">{building.id.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium text-foreground">{building.category || "General"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium text-foreground">{building.floors}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingDetail;
