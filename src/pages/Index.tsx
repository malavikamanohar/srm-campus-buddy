import { Link } from "react-router-dom";
import { Building2, GraduationCap, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { campusStats } from "@/data/buildings";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero-gradient py-20 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">Kattankulathur Campus</span>
            </div>
            
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Welcome to SRMIST
              <span className="block text-secondary-foreground">Campus Guide</span>
            </h1>
            
            <p className="mb-8 text-lg text-primary-foreground/90 sm:text-xl">
              Navigate through our world-class campus with comprehensive building information, faculty directories, and interactive maps.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" asChild className="shadow-lg">
                <Link to="/buildings" className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Explore Buildings
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" asChild className="border-2 border-white/20 bg-white/10 text-primary-foreground hover:bg-white/20">
                <Link to="/faculties" className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  View Faculties
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -bottom-1 left-0 right-0 h-20 bg-background" style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%, 0 100%)" }} />
      </section>
      
      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-primary/20 bg-card-gradient transition-all hover:shadow-accent-glow">
              <CardContent className="p-6 text-center">
                <div className="mb-2 text-4xl font-bold text-primary">{campusStats.totalBuildings}</div>
                <div className="text-sm font-medium text-muted-foreground">Total Buildings</div>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 bg-card-gradient transition-all hover:shadow-accent-glow">
              <CardContent className="p-6 text-center">
                <div className="mb-2 text-4xl font-bold text-primary">{campusStats.classrooms}</div>
                <div className="text-sm font-medium text-muted-foreground">Classrooms</div>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 bg-card-gradient transition-all hover:shadow-accent-glow">
              <CardContent className="p-6 text-center">
                <div className="mb-2 text-4xl font-bold text-primary">{campusStats.campuses}</div>
                <div className="text-sm font-medium text-muted-foreground">Campus Areas</div>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 bg-card-gradient transition-all hover:shadow-accent-glow">
              <CardContent className="p-6 text-center">
                <div className="mb-2 text-4xl font-bold text-primary">1.69M</div>
                <div className="text-sm font-medium text-muted-foreground">Total Sq.Ft</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Quick Links Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-foreground">Quick Access</h2>
          
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
            <Link to="/buildings">
              <Card className="group cursor-pointer transition-all hover:shadow-accent-glow">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-xl font-semibold text-card-foreground">Buildings Directory</h3>
                    <p className="text-sm text-muted-foreground">Browse all campus buildings with detailed information</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/faculties">
              <Card className="group cursor-pointer transition-all hover:shadow-accent-glow">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                    <GraduationCap className="h-8 w-8 text-secondary" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-xl font-semibold text-card-foreground">Faculty Directory</h3>
                    <p className="text-sm text-muted-foreground">Find departments and faculty information</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-foreground">About SRMIST</h2>
            <p className="mb-4 text-muted-foreground">
              SRM Institute of Science and Technology is one of India's top-ranking universities, offering world-class education in Engineering, Management, Medicine, and Sciences. Our Kattankulathur campus spans 460 acres with state-of-the-art facilities.
            </p>
            <p className="text-muted-foreground">
              With over 70,000 students and 3,900 faculty members, SRMIST is committed to academic excellence, research innovation, and global collaboration.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
