export interface Building {
  id: string;
  name: string;
  campus: "Main Campus" | "Annexure I" | "Annexure II" | "Common Area";
  floors: string;
  area: number;
  category?: string;
  facilities?: string[];
  rooms?: number;
  latitude: number;
  longitude: number;
}

export const buildings: Building[] = [
  // Main Campus (Central area: ~12.8230°N, 80.0440°E)
  { id: "canteen", name: "Canteen Block", campus: "Main Campus", floors: "G+4", area: 8374, category: "Dining", latitude: 12.8235, longitude: 80.0445 },
  { id: "pg", name: "PG Block", campus: "Main Campus", floors: "G+3", area: 7487, category: "Academic", latitude: 12.8228, longitude: 80.0438 },
  { id: "aarush", name: "Aarush Block", campus: "Main Campus", floors: "G+2", area: 780, category: "Academic", latitude: 12.8232, longitude: 80.0442 },
  { id: "hitech", name: "Hi-Tech Block", campus: "Main Campus", floors: "G+6", area: 103345, category: "Academic", rooms: 30, latitude: 12.8240, longitude: 80.0450 },
  { id: "mecha", name: "Mechanical 'A' Block", campus: "Main Campus", floors: "G+3", area: 18212, category: "Engineering", latitude: 12.8220, longitude: 80.0435 },
  { id: "mechb", name: "Mechanical 'B' Block", campus: "Main Campus", floors: "G+3", area: 29201, category: "Engineering", latitude: 12.8218, longitude: 80.0440 },
  { id: "mechc", name: "Mechanical 'C' Block", campus: "Main Campus", floors: "G+3", area: 18998, category: "Engineering", latitude: 12.8215, longitude: 80.0438 },
  { id: "mechd", name: "Mechanical 'D' Block", campus: "Main Campus", floors: "G+2", area: 9948, category: "Engineering", latitude: 12.8213, longitude: 80.0442 },
  { id: "meche", name: "Mechanical 'E' Block", campus: "Main Campus", floors: "G", area: 7866, category: "Engineering", latitude: 12.8210, longitude: 80.0445 },
  { id: "mechhanger", name: "Mechanical Hanger", campus: "Main Campus", floors: "G+1", area: 28554, category: "Lab", latitude: 12.8205, longitude: 80.0448 },
  { id: "aerohanger", name: "Aerospace Hanger", campus: "Main Campus", floors: "G+1", area: 28238, category: "Lab", latitude: 12.8203, longitude: 80.0452 },
  { id: "structlab", name: "Structural Lab & Testing Lab", campus: "Main Campus", floors: "G+1", area: 21329, category: "Lab", latitude: 12.8225, longitude: 80.0430 },
  { id: "es", name: "ES Block", campus: "Main Campus", floors: "G+3", area: 55483, category: "Academic", rooms: 9, latitude: 12.8238, longitude: 80.0440 },
  { id: "auto", name: "Automobile Block", campus: "Main Campus", floors: "G+2", area: 33963, category: "Engineering", latitude: 12.8208, longitude: 80.0455 },
  { id: "main", name: "Main Block", campus: "Main Campus", floors: "G+3", area: 41127, category: "Academic", rooms: 16, latitude: 12.8230, longitude: 80.0440 },
  { id: "oldlib", name: "Old Library Block (Civil Engineering)", campus: "Main Campus", floors: "G+3", area: 17736, category: "Academic", rooms: 8, latitude: 12.8233, longitude: 80.0435 },
  { id: "admin", name: "Admin Block", campus: "Main Campus", floors: "G+3", area: 5666, category: "Administrative", latitude: 12.8242, longitude: 80.0442 },
  { id: "crc", name: "CRC Block", campus: "Main Campus", floors: "G+8", area: 40018, category: "Career Centre", rooms: 20, latitude: 12.8245, longitude: 80.0438 },
  { id: "estate", name: "Estate Office", campus: "Main Campus", floors: "G+2", area: 1628, category: "Administrative", latitude: 12.8248, longitude: 80.0445 },
  { id: "kalam", name: "Dr. Abdul Kalam Block", campus: "Main Campus", floors: "G+1", area: 4470, category: "Academic", latitude: 12.8222, longitude: 80.0448 },
  { id: "police", name: "Police Outpost", campus: "Main Campus", floors: "G", area: 880, category: "Security", latitude: 12.8250, longitude: 80.0440 },
  
  // Annexure I (East side: ~12.8250°N, 80.0480°E)
  { id: "bel", name: "Basic Engineering Lab", campus: "Annexure I", floors: "G+5", area: 80842, category: "Lab", latitude: 12.8255, longitude: 80.0475 },
  { id: "mba", name: "MBA Block", campus: "Annexure I", floors: "G+4", area: 66933, category: "Management", latitude: 12.8260, longitude: 80.0480 },
  { id: "barch", name: "B.Arch Block", campus: "Annexure I", floors: "G+5", area: 23788, category: "Architecture", latitude: 12.8258, longitude: 80.0485 },
  { id: "barcha", name: "B.Arch - A", campus: "Annexure I", floors: "G+5", area: 20726, category: "Architecture", latitude: 12.8253, longitude: 80.0490 },
  { id: "barchb", name: "B.Arch - B", campus: "Annexure I", floors: "G+4", area: 24364, category: "Architecture", latitude: 12.8248, longitude: 80.0488 },
  { id: "biotech", name: "Bio Tech Block", campus: "Annexure I", floors: "G+6", area: 120554, category: "Bio-Engineering", latitude: 12.8265, longitude: 80.0478 },
  { id: "techpark", name: "Tech Park", campus: "Annexure I", floors: "G+15", area: 271076, category: "Research", latitude: 12.8270, longitude: 80.0482 },
  { id: "raman", name: "Raman Research Park", campus: "Annexure I", floors: "G+9", area: 81727, category: "Research", latitude: 12.8268, longitude: 80.0488 },
  { id: "chemres", name: "Chemistry Research (MCA & MBA)", campus: "Annexure I", floors: "G", area: 4556, category: "Research", latitude: 12.8262, longitude: 80.0492 },
  
  // Annexure II (North: ~12.8280°N, 80.0450°E)
  { id: "ub", name: "University Building", campus: "Annexure II", floors: "G+15", area: 466419, category: "Administrative", rooms: 74, latitude: 12.8285, longitude: 80.0455 },
  { id: "chemical", name: "Chemical Block", campus: "Annexure II", floors: "G+2", area: 17252, category: "Engineering", latitude: 12.8280, longitude: 80.0460 },
  
  // Common Area (Sports & facilities)
  { id: "sports", name: "Director Sports", campus: "Common Area", floors: "G+1", area: 5901, category: "Sports", latitude: 12.8200, longitude: 80.0425 },
  { id: "transport", name: "Transport Service Station", campus: "Common Area", floors: "G", area: 3082, category: "Transport", latitude: 12.8195, longitude: 80.0420 },
  { id: "fablab", name: "Fab Lab", campus: "Common Area", floors: "G+1", area: 7290, category: "Lab", latitude: 12.8275, longitude: 80.0465 },
  { id: "indoor", name: "Indoor Game Studio", campus: "Common Area", floors: "G", area: 10962, category: "Sports", latitude: 12.8198, longitude: 80.0428 },
];

export const campusStats = {
  totalArea: 1688774,
  totalBuildings: buildings.length,
  campuses: 4,
  classrooms: 343,
};
