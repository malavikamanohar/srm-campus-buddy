import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, ExternalLink, User, GraduationCap, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Separator } from "@/components/ui/separator";
import { getFacultyById } from "@/data/facultyMembers";
import { departments } from "@/data/faculties";

const FacultyMemberDetail = () => {
  const { id } = useParams();
  const faculty = getFacultyById(id || "");
  const department = faculty ? departments.find(d => d.id === faculty.department) : null;

  if (!faculty) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold">Faculty member not found</h1>
          <Button asChild>
            <Link to="/faculties">Back to Faculties</Link>
          </Button>
        </div>
      </div>
    );
  }

  const getDesignationColor = (designation: string) => {
    if (designation.includes("Head") || designation.includes("Chairperson")) {
      return "bg-primary/10 text-primary";
    }
    if (designation.includes("Professor") && !designation.includes("Associate") && !designation.includes("Assistant")) {
      return "bg-secondary/10 text-secondary";
    }
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6" asChild>
          <Link to={department ? `/faculties/department/${department.id}` : "/faculties"} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to {department ? department.name : "Faculties"}
          </Link>
        </Button>
        
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header */}
            <Card className="shadow-accent-glow">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-16 w-16 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h1 className="mb-3 text-3xl font-bold text-foreground">{faculty.name}</h1>
                    <Badge className={`mb-4 ${getDesignationColor(faculty.designation)}`}>
                      {faculty.designation}
                    </Badge>
                    
                    {department && (
                      <div className="mb-4 flex items-center gap-2 text-muted-foreground">
                        <GraduationCap className="h-4 w-4" />
                        <Link 
                          to={`/faculties/department/${department.id}`}
                          className="hover:text-primary transition-colors"
                        >
                          {department.name}
                        </Link>
                      </div>
                    )}
                    
                    {faculty.bio && (
                      <p className="text-muted-foreground">{faculty.bio}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Research Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FlaskConical className="h-5 w-5 text-primary" />
                  Research Areas & Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {faculty.researchAreas.map((area, index) => (
                    <div key={index} className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-4">
                      <div className="h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                      <span className="text-sm font-medium text-foreground">{area}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Additional Info Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Academic Contributions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  For detailed information about publications, research projects, and academic contributions, please contact the faculty member directly or visit their Scopus profile.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="mb-1 text-xs text-muted-foreground">Email</div>
                      <a 
                        href={`mailto:${faculty.email}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {faculty.email}
                      </a>
                    </div>
                  </div>
                  
                  {faculty.phone && (
                    <>
                      <Separator />
                      <div className="flex items-start gap-3">
                        <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="mb-1 text-xs text-muted-foreground">Phone</div>
                          <a 
                            href={`tel:${faculty.phone}`}
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            {faculty.phone}
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* External Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Academic Profiles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {faculty.scopusId ? (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a 
                      href={`https://www.scopus.com/authid/detail.uri?authorId=${faculty.scopusId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Scopus Profile
                    </a>
                  </Button>
                ) : (
                  <p className="text-sm text-muted-foreground">External profile links not available</p>
                )}
                
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a 
                    href={`https://www.srmist.edu.in/faculty/${faculty.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Official Faculty Page
                  </a>
                </Button>
              </CardContent>
            </Card>
            
            {/* Department Info */}
            {department && (
              <Card className="border-primary/20 bg-card-gradient">
                <CardHeader>
                  <CardTitle className="text-lg">Department</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="mb-2 font-semibold text-foreground">{department.name}</div>
                    <div className="text-sm text-muted-foreground">{department.location}</div>
                  </div>
                  <Button variant="secondary" className="w-full" asChild>
                    <Link to={`/faculties/department/${department.id}`}>
                      View Department
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyMemberDetail;
