import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { CampusMap } from "@/components/CampusMap";
import { buildings } from "@/data/buildings";
import { Building } from "@/data/buildings";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Navigation as NavigationIcon, X } from "lucide-react";
import { getCategoryColor, calculateDistance, formatDistance, calculateWalkingTime, getCurrentLocation, Coordinates } from "@/utils/geoUtils";
import { ScrollArea } from "@/components/ui/scroll-area";

const MapView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [campusFilter, setCampusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | undefined>(
    searchParams.get("building") || undefined
  );
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [sortBy, setSortBy] = useState<"name" | "distance" | "area">("name");

  const categories = Array.from(new Set(buildings.map((b) => b.category).filter(Boolean)));
  const campuses = Array.from(new Set(buildings.map((b) => b.campus)));

  // Filter buildings
  let filteredBuildings = buildings.filter((building) => {
    const matchesSearch =
      building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      building.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCampus = campusFilter === "all" || building.campus === campusFilter;
    const matchesCategory = categoryFilter === "all" || building.category === categoryFilter;
    return matchesSearch && matchesCampus && matchesCategory;
  });

  // Calculate distances and sort
  if (userLocation) {
    filteredBuildings = filteredBuildings.map((building) => ({
      ...building,
      distance: calculateDistance(userLocation, {
        latitude: building.latitude,
        longitude: building.longitude,
      }),
    }));
  }

  // Sort buildings
  filteredBuildings.sort((a, b) => {
    if (sortBy === "distance" && "distance" in a && "distance" in b) {
      return (a.distance as number) - (b.distance as number);
    }
    if (sortBy === "area") {
      return b.area - a.area;
    }
    return a.name.localeCompare(b.name);
  });

  // Handle building selection from URL
  useEffect(() => {
    const buildingId = searchParams.get("building");
    if (buildingId) {
      setSelectedBuildingId(buildingId);
    }
  }, [searchParams]);

  // Update URL when building is selected
  const handleBuildingSelect = (buildingId: string) => {
    setSelectedBuildingId(buildingId);
    setSearchParams({ building: buildingId });
  };

  // Get user location
  const handleLocateMe = () => {
    setShowUserLocation(true);
    getCurrentLocation()
      .then((coords) => {
        setUserLocation(coords);
        setSortBy("distance");
      })
      .catch((error) => {
        console.error("Error getting location:", error);
        alert("Unable to get your location. Please enable location services.");
      });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-full md:w-96 border-r border-border bg-card flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-foreground">Campus Map</h1>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLocateMe}
                disabled={showUserLocation}
              >
                <NavigationIcon className="h-4 w-4 mr-2" />
                {showUserLocation ? "Located" : "Locate Me"}
              </Button>
            </div>

            {/* Search */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search buildings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid gap-2 sm:grid-cols-2">
              <Select value={campusFilter} onValueChange={setCampusFilter}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Campus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campuses</SelectItem>
                  {campuses.map((campus) => (
                    <SelectItem key={campus} value={campus}>
                      {campus}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category || ""}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <div className="mt-3">
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="distance" disabled={!userLocation}>
                    Distance {!userLocation && "(Enable location)"}
                  </SelectItem>
                  <SelectItem value="area">Area</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results count */}
            <div className="mt-3 text-sm text-muted-foreground">
              {filteredBuildings.length} of {buildings.length} buildings
            </div>
          </div>

          {/* Building List */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {filteredBuildings.map((building) => {
                const isSelected = building.id === selectedBuildingId;
                const color = getCategoryColor(building.category);
                const distance = "distance" in building ? (building as any).distance : null;

                return (
                  <button
                    key={building.id}
                    onClick={() => handleBuildingSelect(building.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border bg-card hover:border-primary/50 hover:bg-accent/5"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${color}20` }}
                      >
                        <MapPin className="h-5 w-5" style={{ color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-foreground mb-1 truncate">
                          {building.name}
                        </h3>
                        <div className="text-xs text-muted-foreground space-y-0.5">
                          <div className="flex items-center gap-1">
                            <span
                              className="inline-block w-2 h-2 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                            {building.category}
                          </div>
                          <div>{building.campus}</div>
                          {distance !== null && (
                            <div className="font-semibold text-primary">
                              {formatDistance(distance)} • {calculateWalkingTime(distance)} walk
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <CampusMap
            buildings={filteredBuildings}
            selectedBuildingId={selectedBuildingId}
            onBuildingSelect={handleBuildingSelect}
            showUserLocation={showUserLocation}
            showDirections={true}
            height="100%"
          />

          {/* Selected Building Info Card */}
          {selectedBuildingId && (
            <div className="absolute top-4 left-4 right-4 md:left-auto md:w-80 bg-card border border-border rounded-lg shadow-xl p-4">
              <button
                onClick={() => {
                  setSelectedBuildingId(undefined);
                  setSearchParams({});
                }}
                className="absolute top-2 right-2 p-1 hover:bg-accent rounded-md transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              {(() => {
                const building = buildings.find((b) => b.id === selectedBuildingId);
                if (!building) return null;
                const color = getCategoryColor(building.category);
                const distance =
                  "distance" in building ? (building as any).distance : null;

                return (
                  <>
                    <h3 className="font-bold text-lg text-foreground mb-2 pr-6">
                      {building.name}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block w-3 h-3 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-muted-foreground">{building.category}</span>
                      </div>
                      <div className="text-muted-foreground">📍 {building.campus}</div>
                      <div className="text-muted-foreground">
                        📏 {building.area.toLocaleString()} sq ft • {building.floors}
                      </div>
                      {building.rooms && (
                        <div className="text-muted-foreground">
                          🚪 {building.rooms} rooms
                        </div>
                      )}
                      {distance !== null && (
                        <div className="font-semibold text-primary">
                          📍 {formatDistance(distance)} away • {calculateWalkingTime(distance)}{" "}
                          walk
                        </div>
                      )}
                    </div>
                    <Button
                      className="w-full mt-4"
                      onClick={() => navigate(`/buildings/${building.id}`)}
                    >
                      View Full Details →
                    </Button>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapView;
