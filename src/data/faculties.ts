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
  description?: string;
  researchFocus?: string[];
  facilities?: string[];
}

export const departments: Department[] = [
  {
    id: "cse",
    name: "Computer Science and Engineering",
    dean: "Dr. Niranjana G",
    location: "Hi-Tech Block",
    programs: ["B.Tech CSE", "M.Tech CSE", "Ph.D"],
    description: "The Department of Computer Science and Engineering offers cutting-edge education in computing technologies, preparing students for careers in software development, artificial intelligence, and data science.",
    researchFocus: ["Artificial Intelligence", "Machine Learning", "Cyber Security", "Cloud Computing", "IoT"],
    facilities: ["High-Performance Computing Lab", "AI & ML Lab", "Cyber Security Lab", "Software Engineering Lab"],
  },
  {
    id: "ece",
    name: "Electronics and Communication Engineering",
    dean: "Dr. Kumar Rajendran",
    location: "ES Block",
    programs: ["B.Tech ECE", "M.Tech ECE", "Ph.D"],
    description: "The ECE Department focuses on advanced electronics, communication systems, and signal processing, preparing students for careers in telecommunications and embedded systems.",
    researchFocus: ["VLSI Design", "Wireless Communications", "5G Networks", "Embedded Systems", "Signal Processing"],
    facilities: ["VLSI Design Lab", "Communication Lab", "Embedded Systems Lab", "Digital Signal Processing Lab"],
  },
  {
    id: "mech",
    name: "Mechanical Engineering",
    dean: "Dr. Venkatesh Kumar",
    location: "Mechanical Blocks A-E",
    programs: ["B.Tech Mech", "M.Tech Mech", "Ph.D"],
    description: "The Mechanical Engineering Department offers comprehensive education in thermal sciences, manufacturing, and design engineering with state-of-the-art laboratories.",
    researchFocus: ["Thermal Engineering", "Manufacturing Technology", "Robotics", "Renewable Energy", "Material Science"],
    facilities: ["CAD/CAM Lab", "Thermal Engineering Lab", "Manufacturing Lab", "Robotics Lab"],
  },
  {
    id: "civil",
    name: "Civil Engineering",
    dean: "Dr. Suresh Pandian",
    location: "Old Library Block",
    programs: ["B.Tech Civil", "M.Tech Civil", "Ph.D"],
    description: "The Civil Engineering Department focuses on infrastructure development, structural design, and environmental sustainability with modern research facilities.",
    researchFocus: ["Structural Engineering", "Environmental Engineering", "Construction Management", "Water Resources"],
    facilities: ["Structural Lab", "Environmental Engineering Lab", "Surveying Lab", "Concrete Testing Lab"],
  },
  {
    id: "eee",
    name: "Electrical and Electronics Engineering",
    dean: "Dr. Anand Prakash",
    location: "ES Block",
    programs: ["B.Tech EEE", "M.Tech EEE", "Ph.D"],
    description: "The EEE Department specializes in power systems, control systems, and renewable energy with focus on smart grid technologies.",
    researchFocus: ["Power Systems", "Smart Grid", "Control Systems", "Renewable Energy", "Industrial Electronics"],
    facilities: ["Power Systems Lab", "Control Systems Lab", "Electrical Machines Lab", "Power Electronics Lab"],
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
    dean: "Dr. Rajesh Kannan",
    location: "Bio Tech Block, Annexure I",
    programs: ["B.Tech Biotech", "M.Tech Biotech", "Ph.D"],
    description: "The Biotechnology Department offers advanced programs in genetic engineering, bioinformatics, and bioprocess engineering.",
    researchFocus: ["Genetic Engineering", "Molecular Biology", "Bioinformatics", "Bioprocess Engineering"],
    facilities: ["Molecular Biology Lab", "Microbiology Lab", "Bioinformatics Lab", "Bioprocess Lab"],
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
    dean: "Dr. Murali Mohan",
    location: "MBA Block, Annexure I",
    programs: ["MBA", "Ph.D"],
    description: "The Management Studies department offers comprehensive MBA programs with specializations in various business domains.",
    researchFocus: ["Strategic Management", "Business Analytics", "Human Resource Management", "Marketing"],
    facilities: ["Business Analytics Lab", "Case Study Room", "Seminar Halls", "Leadership Development Center"],
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
