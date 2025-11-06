export interface Faculty {
  id: string;
  name: string;
  department: string;
  designation?: string;
  email?: string;
  phone?: string;
}

export interface Department {
  id: string;
  name: string;
  dean?: string;
  location: string;
  programs: string[];
}

export const departments: Department[] = [
  {
    id: "cse",
    name: "Computer Science and Engineering",
    location: "Hi-Tech Block",
    programs: ["B.Tech CSE", "M.Tech CSE", "Ph.D"],
  },
  {
    id: "ece",
    name: "Electronics and Communication Engineering",
    location: "ES Block",
    programs: ["B.Tech ECE", "M.Tech ECE", "Ph.D"],
  },
  {
    id: "mech",
    name: "Mechanical Engineering",
    location: "Mechanical Blocks A-E",
    programs: ["B.Tech Mech", "M.Tech Mech", "Ph.D"],
  },
  {
    id: "civil",
    name: "Civil Engineering",
    location: "Old Library Block",
    programs: ["B.Tech Civil", "M.Tech Civil", "Ph.D"],
  },
  {
    id: "eee",
    name: "Electrical and Electronics Engineering",
    location: "ES Block",
    programs: ["B.Tech EEE", "M.Tech EEE", "Ph.D"],
  },
  {
    id: "auto",
    name: "Automobile Engineering",
    location: "Automobile Block",
    programs: ["B.Tech Automobile", "M.Tech Automobile"],
  },
  {
    id: "aero",
    name: "Aerospace Engineering",
    location: "Aerospace Hanger",
    programs: ["B.Tech Aerospace", "M.Tech Aerospace"],
  },
  {
    id: "biotech",
    name: "Biotechnology",
    location: "Bio Tech Block, Annexure I",
    programs: ["B.Tech Biotech", "M.Tech Biotech", "Ph.D"],
  },
  {
    id: "arch",
    name: "Architecture",
    location: "B.Arch Blocks, Annexure I",
    programs: ["B.Arch", "M.Arch"],
  },
  {
    id: "mba",
    name: "Management Studies",
    location: "MBA Block, Annexure I",
    programs: ["MBA", "Ph.D"],
  },
  {
    id: "chem",
    name: "Chemical Engineering",
    location: "Chemical Block, Annexure II",
    programs: ["B.Tech Chemical", "M.Tech Chemical"],
  },
];

export const governance = [
  { position: "Founder Chancellor", name: "Dr. T. R. Paarivendhar" },
  { position: "Pro Chancellor (Administration)", name: "Dr. Ravi Pachamoothoo" },
  { position: "Pro Chancellor (Academic)", name: "Dr. P. Sathyanarayanan" },
  { position: "Vice Chancellor", name: "Dr. C. Muthamizhchelvan" },
  { position: "Dean, College of Engineering and Technology", name: "Dr. T. V. Gopal", campus: "Kattankulathur" },
];
