import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, GraduationCap, MapPin, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { departments, governance } from "@/data/faculties";
import { Separator } from "@/components/ui/separator";

const Faculties = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Faculty Directory</h1>
          <p className="text-muted-foreground">
            Explore departments and academic programs at SRMIST
          </p>
        </div>
        
        {/* Governance Section */}
        <Card className="mb-8 border-primary/20 bg-card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              University Governance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {governance.map((member, index) => (
                <div key={index} className="rounded-lg border border-border bg-background/50 p-4">
                  <div className="mb-1 text-sm font-medium text-primary">{member.position}</div>
                  <div className="font-semibold text-foreground">{member.name}</div>
                  {member.campus && (
                    <div className="mt-1 text-xs text-muted-foreground">{member.campus}</div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Separator className="my-8" />
        
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {/* Results Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredDepartments.length} of {departments.length} departments
        </div>
        
        {/* Departments Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDepartments.map(dept => (
            <Link key={dept.id} to={`/faculties/department/${dept.id}`}>
              <Card className="group transition-all hover:shadow-accent-glow cursor-pointer h-full">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="leading-tight group-hover:text-primary transition-colors">
                    {dept.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    <span className="text-muted-foreground">{dept.location}</span>
                  </div>
                  
                  {dept.dean && (
                    <div className="rounded-lg border border-border bg-muted/50 p-3">
                      <div className="mb-1 text-xs text-muted-foreground">Head of Department</div>
                      <div className="font-medium text-foreground">{dept.dean}</div>
                    </div>
                  )}
                  
                  <div>
                    <div className="mb-2 flex items-center gap-1 text-xs font-medium text-muted-foreground">
                      <BookOpen className="h-3 w-3" />
                      Programs Offered
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {dept.programs.map((program, index) => (
                        <Badge key={index} variant="secondary">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        {filteredDepartments.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No departments found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Faculties;
