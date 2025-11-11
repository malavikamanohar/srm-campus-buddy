import { Mail, Phone, ExternalLink, User } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FacultyMember } from "@/data/facultyMembers";
import { Link } from "react-router-dom";

interface FacultyCardProps {
  faculty: FacultyMember;
}


export const FacultyCard = ({ faculty }: FacultyCardProps) => {
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
    <Card className="group transition-all hover:shadow-accent-glow">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="mb-1 font-semibold leading-tight text-card-foreground group-hover:text-primary transition-colors">
              {faculty.name}
            </h3>
            <Badge className={getDesignationColor(faculty.designation)}>
              {faculty.designation}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4 flex-shrink-0" />
            <a href={`mailto:${faculty.email}`} className="hover:text-primary transition-colors">
              {faculty.email}
            </a>
          </div>
          
          {faculty.phone && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4 flex-shrink-0" />
              <a href={`tel:${faculty.phone}`} className="hover:text-primary transition-colors">
                {faculty.phone}
              </a>
            </div>
          )}
        </div>
        
        <div>
          <div className="mb-2 text-xs font-medium text-muted-foreground">Research Areas</div>
          <div className="flex flex-wrap gap-1">
            {faculty.researchAreas.slice(0, 3).map((area, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {area}
              </Badge>
            ))}
            {faculty.researchAreas.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{faculty.researchAreas.length - 3} more
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link to={`/faculties/member/${faculty.id}`}>
              View Profile
            </Link>
          </Button>
          
          {faculty.scopusId && (
            <Button variant="ghost" size="sm" asChild>
              <a 
                href={`https://www.scopus.com/authid/detail.uri?authorId=${faculty.scopusId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />
                Scopus
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
