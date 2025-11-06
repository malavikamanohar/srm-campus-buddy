export interface FacultyMember {
  id: string;
  name: string;
  designation: "Professor" | "Associate Professor" | "Assistant Professor" | "Professor and Head" | "Professor and Chairperson";
  department: string;
  email: string;
  phone?: string;
  researchAreas: string[];
  scopusId?: string;
  imageUrl?: string;
  bio?: string;
}

export const facultyMembers: FacultyMember[] = [
  // Computer Science and Computing Technologies
  {
    id: "dr-g-niranjana",
    name: "Dr. Niranjana G",
    designation: "Professor and Head",
    department: "cse",
    email: "niranjag@srmist.edu.in",
    researchAreas: ["Image Processing", "Pattern Recognition", "Networks", "Data Structures"],
    scopusId: "56635856200",
    bio: "Dr. G. Niranjana heads the Department of Computing Technologies with extensive research in image processing and pattern recognition."
  },
  {
    id: "dr-revathi-venkataraman",
    name: "Dr. Revathi Venkataraman",
    designation: "Professor and Chairperson",
    department: "cse",
    email: "revathin@srmist.edu.in",
    researchAreas: ["Wireless Network Security", "Trust Computing", "Internet of Things", "Responsible AI"],
    scopusId: "24464661800",
    bio: "Professor and Chairperson of School of Computing, specializing in network security and IoT."
  },
  {
    id: "dr-saravanan-santhanam",
    name: "Dr. Saravanan Santhanam",
    designation: "Associate Professor",
    department: "cse",
    email: "saravans2@srmist.edu.in",
    phone: "9894548303",
    researchAreas: ["AI and Machine Learning", "Big Data Analytics", "Data Mining"],
    bio: "Associate Professor with focus on artificial intelligence and big data technologies."
  },
  {
    id: "dr-r-rajkumar",
    name: "Dr. R. Rajkumar",
    designation: "Associate Professor",
    department: "cse",
    email: "rajkumar2@srmist.edu.in",
    researchAreas: ["Artificial Intelligence", "Expert Systems", "Brain Computer Interface", "Microprocessors", "Compiler Design", "Soft Computing", "Machine Learning", "Genetic Algorithms"],
    bio: "Specializes in AI, expert systems, and brain-computer interfaces with extensive research in soft computing."
  },
  {
    id: "dr-krishnaveni-s",
    name: "Dr. Krishnaveni S",
    designation: "Associate Professor",
    department: "cse",
    email: "krishnas4@srmist.edu.in",
    phone: "9841190067",
    researchAreas: ["Cyber Security", "Cloud Computing", "IoT", "Machine Learning", "Deep Learning"],
    scopusId: "57211183200",
    bio: "Dr. Krishnaveni has over 20 years of experience in cyber security and cloud computing."
  },
  {
    id: "dr-archana-k-s",
    name: "Dr. Archana K S",
    designation: "Assistant Professor",
    department: "cse",
    email: "archanak1@srmist.edu.in",
    researchAreas: ["Computer Science", "Software Engineering"],
    scopusId: "57195972802",
    bio: "Dr. K.S. Archana received her M.E in Computer Science and Engineering from Anna University, and Ph.D in Computer Science and Engineering."
  },

  // Electronics and Communication Engineering
  {
    id: "dr-tamilselvi-m",
    name: "Dr. Tamilselvi M",
    designation: "Assistant Professor",
    department: "ece",
    email: "tamilsem2@srmist.edu.in",
    researchAreas: ["Electronics", "Communication Engineering", "Signal Processing"],
    scopusId: "56878915200",
    bio: "Working as an Assistant Professor in the Department of ECE with specialization in communication systems."
  },
  {
    id: "dr-kumar-electronics",
    name: "Dr. Kumar Rajendran",
    designation: "Professor",
    department: "ece",
    email: "kumarr@srmist.edu.in",
    researchAreas: ["VLSI Design", "Embedded Systems", "Digital Signal Processing"],
    bio: "Professor with extensive research in VLSI design and embedded systems."
  },
  {
    id: "dr-priya-communications",
    name: "Dr. Priya Sharma",
    designation: "Associate Professor",
    department: "ece",
    email: "priyas@srmist.edu.in",
    researchAreas: ["Wireless Communications", "5G Networks", "Antenna Design"],
    bio: "Specializes in wireless communication systems and next-generation networks."
  },

  // Mechanical Engineering
  {
    id: "dr-venkatesh-mech",
    name: "Dr. Venkatesh Kumar",
    designation: "Professor and Head",
    department: "mech",
    email: "venkateshk@srmist.edu.in",
    researchAreas: ["Thermal Engineering", "Computational Fluid Dynamics", "Renewable Energy"],
    bio: "Head of Mechanical Engineering Department with focus on sustainable energy solutions."
  },
  {
    id: "dr-ramesh-manufacturing",
    name: "Dr. Ramesh Babu",
    designation: "Associate Professor",
    department: "mech",
    email: "rameshb@srmist.edu.in",
    researchAreas: ["Manufacturing Technology", "CAD/CAM", "Robotics"],
    bio: "Expert in advanced manufacturing technologies and automation."
  },
  {
    id: "dr-lakshmi-materials",
    name: "Dr. Lakshmi Narayanan",
    designation: "Assistant Professor",
    department: "mech",
    email: "lakshmn@srmist.edu.in",
    researchAreas: ["Material Science", "Composite Materials", "Nanotechnology"],
    bio: "Research focused on advanced materials and nanotechnology applications."
  },

  // Civil Engineering
  {
    id: "dr-suresh-civil",
    name: "Dr. Suresh Pandian",
    designation: "Professor and Head",
    department: "civil",
    email: "sureshp@srmist.edu.in",
    researchAreas: ["Structural Engineering", "Earthquake Engineering", "Construction Management"],
    bio: "Professor with expertise in structural design and seismic analysis."
  },
  {
    id: "dr-divya-environmental",
    name: "Dr. Divya Krishnan",
    designation: "Associate Professor",
    department: "civil",
    email: "divyak@srmist.edu.in",
    researchAreas: ["Environmental Engineering", "Water Resources", "Sustainable Construction"],
    bio: "Specializes in environmental sustainability and water resource management."
  },

  // Electrical and Electronics Engineering
  {
    id: "dr-anand-power",
    name: "Dr. Anand Prakash",
    designation: "Professor",
    department: "eee",
    email: "anandp@srmist.edu.in",
    researchAreas: ["Power Systems", "Smart Grid", "Renewable Energy Integration"],
    bio: "Expert in power systems and renewable energy integration."
  },
  {
    id: "dr-meena-control",
    name: "Dr. Meena Radhakrishnan",
    designation: "Associate Professor",
    department: "eee",
    email: "meenar@srmist.edu.in",
    researchAreas: ["Control Systems", "Automation", "Industrial Electronics"],
    bio: "Specializes in control systems and industrial automation."
  },

  // Biotechnology
  {
    id: "dr-rajesh-biotech",
    name: "Dr. Rajesh Kannan",
    designation: "Professor and Head",
    department: "biotech",
    email: "rajeshk@srmist.edu.in",
    researchAreas: ["Genetic Engineering", "Molecular Biology", "Bioinformatics"],
    bio: "Head of Biotechnology with research in genetic engineering and molecular biology."
  },
  {
    id: "dr-sangeetha-bio",
    name: "Dr. Sangeetha Devi",
    designation: "Associate Professor",
    department: "biotech",
    email: "sangeethad@srmist.edu.in",
    researchAreas: ["Microbiology", "Bioprocess Engineering", "Industrial Biotechnology"],
    bio: "Expert in microbiology and bioprocess engineering."
  },

  // Management Studies
  {
    id: "dr-murali-mba",
    name: "Dr. Murali Mohan",
    designation: "Professor and Head",
    department: "mba",
    email: "muralim@srmist.edu.in",
    researchAreas: ["Strategic Management", "Organizational Behavior", "Business Analytics"],
    bio: "Professor with expertise in strategic management and business analytics."
  },
  {
    id: "dr-kavitha-hr",
    name: "Dr. Kavitha Subramanian",
    designation: "Associate Professor",
    department: "mba",
    email: "kavithas@srmist.edu.in",
    researchAreas: ["Human Resource Management", "Leadership", "Talent Management"],
    bio: "Specializes in HR management and organizational development."
  },
];

export const getFacultyByDepartment = (departmentId: string): FacultyMember[] => {
  return facultyMembers.filter(faculty => faculty.department === departmentId);
};

export const getFacultyById = (id: string): FacultyMember | undefined => {
  return facultyMembers.find(faculty => faculty.id === id);
};
