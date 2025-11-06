import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, BookOpen, FlaskConical, Building2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Separator } from "@/components/ui/separator";
import { departments } from "@/data/faculties";
import { getFacultyByDepartment } from "@/data/facultyMembers";
import { FacultyCard } from "@/components/FacultyCard";

const DepartmentDetail = () => {
  const { id } = useParams();
  const department = departments.find(d => d.id === id);
  const facultyMembers = department ? getFacultyByDepartment(department.id) : [];

  if (!department) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold">Department not found</h1>
          <Button asChild>
            <Link to="/faculties">Back to Faculties</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/faculties" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Faculties
          </Link>
        </Button>
        
        {/* Department Header */}
        <Card className="mb-8 border-primary/20 bg-hero-gradient text-primary-foreground shadow-accent-glow">
          <CardContent className="p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10">
                <Building2 className="h-8 w-8" />
              </div>
              <div>
                <h1 className="mb-2 text-3xl font-bold">{department.name}</h1>
                <div className="flex items-center gap-2 text-primary-foreground/90">
                  <MapPin className="h-4 w-4" />
                  {department.location}
                </div>
              </div>
            </div>
            
            {department.description && (
              <p className="text-lg text-primary-foreground/90">
                {department.description}
              </p>
            )}
          </CardContent>
        </Card>
        
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Programs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Programs Offered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {department.programs.map((program, index) => (
                    <Badge key={index} variant="secondary" className="px-4 py-2 text-base">
                      {program}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Research Focus */}
            {department.researchFocus && department.researchFocus.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FlaskConical className="h-5 w-5 text-primary" />
                    Research Focus Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {department.researchFocus.map((area, index) => (
                      <div key={index} className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-3">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span className="text-sm font-medium text-foreground">{area}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Facilities */}
            {department.facilities && department.facilities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Facilities & Laboratories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {department.facilities.map((facility, index) => (
                      <div key={index} className="rounded-lg border border-border bg-card-gradient p-3">
                        <span className="text-sm font-medium text-foreground">{facility}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Department Head</CardTitle>
              </CardHeader>
              <CardContent>
                {department.dean ? (
                  <div className="rounded-lg border border-border bg-muted/50 p-4">
                    <div className="mb-2 font-semibold text-foreground">{department.dean}</div>
                    <div className="text-sm text-muted-foreground">Professor and Head</div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Information not available</p>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Programs:</span>
                  <span className="font-semibold text-foreground">{department.programs.length}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Faculty Members:</span>
                  <span className="font-semibold text-foreground">{facultyMembers.length}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Research Areas:</span>
                  <span className="font-semibold text-foreground">{department.researchFocus?.length || 0}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 bg-card-gradient">
              <CardContent className="p-6 text-center">
                <p className="mb-4 text-sm text-muted-foreground">
                  For more information about admissions and programs
                </p>
                <Button className="w-full" asChild>
                  <a href="https://www.srmist.edu.in" target="_blank" rel="noopener noreferrer">
                    Visit Official Site
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Faculty Members Section */}
        <Separator className="my-12" />
        
        <div className="mb-8">
          <h2 className="mb-2 flex items-center gap-2 text-2xl font-bold text-foreground">
            <Users className="h-6 w-6 text-primary" />
            Faculty Members
          </h2>
          <p className="text-muted-foreground">
            Meet our distinguished faculty members and their research expertise
          </p>
        </div>
        
        {facultyMembers.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {facultyMembers.map(faculty => (
              <FacultyCard key={faculty.id} faculty={faculty} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                Faculty information is being updated. Please check back soon.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DepartmentDetail;
