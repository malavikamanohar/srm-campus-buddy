import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import { BuildingCard } from "@/components/BuildingCard";
import { buildings } from "@/data/buildings";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Buildings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [campusFilter, setCampusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const categories = Array.from(new Set(buildings.map(b => b.category).filter(Boolean)));
  const campuses = Array.from(new Set(buildings.map(b => b.campus)));

  const filteredBuildings = buildings.filter(building => {
    const matchesSearch = building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         building.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCampus = campusFilter === "all" || building.campus === campusFilter;
    const matchesCategory = categoryFilter === "all" || building.category === categoryFilter;
    return matchesSearch && matchesCampus && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Campus Buildings</h1>
          <p className="text-muted-foreground">
            Explore all {buildings.length} buildings across the SRMIST Kattankulathur campus
          </p>
        </div>
        
        {/* Filters */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search buildings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={campusFilter} onValueChange={setCampusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Campuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campuses</SelectItem>
              {campuses.map(campus => (
                <SelectItem key={campus} value={campus}>{campus}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category || ""}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Results Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredBuildings.length} of {buildings.length} buildings
        </div>
        
        {/* Buildings Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBuildings.map(building => (
            <BuildingCard key={building.id} building={building} />
          ))}
        </div>
        
        {filteredBuildings.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No buildings found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buildings;
