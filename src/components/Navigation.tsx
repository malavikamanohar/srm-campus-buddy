import { Link, useLocation } from "react-router-dom";
import { Building2, GraduationCap, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchCommand } from "@/components/SearchCommand";

export const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-hero-gradient">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold leading-tight text-foreground">SRMIST</span>
              <span className="text-xs text-muted-foreground">Campus Guide</span>
            </div>
          </Link>
          
          <div className="flex-1 max-w-md">
            <SearchCommand />
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              size="sm"
              asChild
            >
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </Button>
            
            <Button
              variant={isActive("/buildings") ? "default" : "ghost"}
              size="sm"
              asChild
            >
              <Link to="/buildings" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">Buildings</span>
              </Link>
            </Button>
            
            <Button
              variant={isActive("/faculties") ? "default" : "ghost"}
              size="sm"
              asChild
            >
              <Link to="/faculties" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">Faculties</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
