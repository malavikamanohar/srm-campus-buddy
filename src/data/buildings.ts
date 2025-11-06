export interface Building {
  id: string;
  name: string;
  campus: "Main Campus" | "Annexure I" | "Annexure II" | "Common Area";
  floors: string;
  area: number;
  category?: string;
  facilities?: string[];
  rooms?: number;
}

export const buildings: Building[] = [
  // Main Campus
  { id: "canteen", name: "Canteen Block", campus: "Main Campus", floors: "G+4", area: 8374, category: "Dining" },
  { id: "pg", name: "PG Block", campus: "Main Campus", floors: "G+3", area: 7487, category: "Academic" },
  { id: "aarush", name: "Aarush Block", campus: "Main Campus", floors: "G+2", area: 780, category: "Academic" },
  { id: "hitech", name: "Hi-Tech Block", campus: "Main Campus", floors: "G+6", area: 103345, category: "Academic", rooms: 30 },
  { id: "mecha", name: "Mechanical 'A' Block", campus: "Main Campus", floors: "G+3", area: 18212, category: "Engineering" },
  { id: "mechb", name: "Mechanical 'B' Block", campus: "Main Campus", floors: "G+3", area: 29201, category: "Engineering" },
  { id: "mechc", name: "Mechanical 'C' Block", campus: "Main Campus", floors: "G+3", area: 18998, category: "Engineering" },
  { id: "mechd", name: "Mechanical 'D' Block", campus: "Main Campus", floors: "G+2", area: 9948, category: "Engineering" },
  { id: "meche", name: "Mechanical 'E' Block", campus: "Main Campus", floors: "G", area: 7866, category: "Engineering" },
  { id: "mechhanger", name: "Mechanical Hanger", campus: "Main Campus", floors: "G+1", area: 28554, category: "Lab" },
  { id: "aerohanger", name: "Aerospace Hanger", campus: "Main Campus", floors: "G+1", area: 28238, category: "Lab" },
  { id: "structlab", name: "Structural Lab & Testing Lab", campus: "Main Campus", floors: "G+1", area: 21329, category: "Lab" },
  { id: "es", name: "ES Block", campus: "Main Campus", floors: "G+3", area: 55483, category: "Academic", rooms: 9 },
  { id: "auto", name: "Automobile Block", campus: "Main Campus", floors: "G+2", area: 33963, category: "Engineering" },
  { id: "main", name: "Main Block", campus: "Main Campus", floors: "G+3", area: 41127, category: "Academic", rooms: 16 },
  { id: "oldlib", name: "Old Library Block (Civil Engineering)", campus: "Main Campus", floors: "G+3", area: 17736, category: "Academic", rooms: 8 },
  { id: "admin", name: "Admin Block", campus: "Main Campus", floors: "G+3", area: 5666, category: "Administrative" },
  { id: "crc", name: "CRC Block", campus: "Main Campus", floors: "G+8", area: 40018, category: "Career Centre", rooms: 20 },
  { id: "estate", name: "Estate Office", campus: "Main Campus", floors: "G+2", area: 1628, category: "Administrative" },
  { id: "kalam", name: "Dr. Abdul Kalam Block", campus: "Main Campus", floors: "G+1", area: 4470, category: "Academic" },
  { id: "police", name: "Police Outpost", campus: "Main Campus", floors: "G", area: 880, category: "Security" },
  
  // Annexure I
  { id: "bel", name: "Basic Engineering Lab", campus: "Annexure I", floors: "G+5", area: 80842, category: "Lab" },
  { id: "mba", name: "MBA Block", campus: "Annexure I", floors: "G+4", area: 66933, category: "Management" },
  { id: "barch", name: "B.Arch Block", campus: "Annexure I", floors: "G+5", area: 23788, category: "Architecture" },
  { id: "barcha", name: "B.Arch - A", campus: "Annexure I", floors: "G+5", area: 20726, category: "Architecture" },
  { id: "barchb", name: "B.Arch - B", campus: "Annexure I", floors: "G+4", area: 24364, category: "Architecture" },
  { id: "biotech", name: "Bio Tech Block", campus: "Annexure I", floors: "G+6", area: 120554, category: "Bio-Engineering" },
  { id: "techpark", name: "Tech Park", campus: "Annexure I", floors: "G+15", area: 271076, category: "Research" },
  { id: "raman", name: "Raman Research Park", campus: "Annexure I", floors: "G+9", area: 81727, category: "Research" },
  { id: "chemres", name: "Chemistry Research (MCA & MBA)", campus: "Annexure I", floors: "G", area: 4556, category: "Research" },
  
  // Annexure II
  { id: "ub", name: "University Building", campus: "Annexure II", floors: "G+15", area: 466419, category: "Administrative", rooms: 74 },
  { id: "chemical", name: "Chemical Block", campus: "Annexure II", floors: "G+2", area: 17252, category: "Engineering" },
  
  // Common Area
  { id: "sports", name: "Director Sports", campus: "Common Area", floors: "G+1", area: 5901, category: "Sports" },
  { id: "transport", name: "Transport Service Station", campus: "Common Area", floors: "G", area: 3082, category: "Transport" },
  { id: "fablab", name: "Fab Lab", campus: "Common Area", floors: "G+1", area: 7290, category: "Lab" },
  { id: "indoor", name: "Indoor Game Studio", campus: "Common Area", floors: "G", area: 10962, category: "Sports" },
];

export const campusStats = {
  totalArea: 1688774,
  totalBuildings: buildings.length,
  campuses: 4,
  classrooms: 343,
};
