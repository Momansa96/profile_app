import {
  Certification,
  Education,
  Experiences,
  Hobby,
  Language,
  PersonalDetails,
  Skill,
} from "@/type";

export const personalDetailsPreset: PersonalDetails = {
  fullName: "Mohamed Gnahoui",
  email: "mohamedgnahoui@email.com",
  phone: "+229 67 48 03 35",
  address: "Godomey, Abomey-Calavi, Bénin",
  linkedin: "linkedin.com/in/mohamedgnahoui",
  photoUrl: "../../Avatar1.jpg",
  postSeeking: "Développeur Web Full Stack",
  description:
    "Développeur web passionné par la création d'expériences utilisateur intuitives et performantes. Fort d'une expertise en développement front-end (React.js) et back-end (Node.js, Laravel), je suis constamment à la recherche de solutions innovantes pour répondre aux besoins de mes clients et repousser les limites du web.",
};

export const experiencesPreset: Experiences[] = [
  {
    jobTitle: "Développeur Web Full Stack",
    companyName: "Tech Innov Bénin",
    startDate: "2024-05-01",
    endDate: "2025-12-01",
    description:
      "Conception, développement et déploiement d'applications web complètes, allant de la définition des besoins à la mise en production. Responsable de la maintenance et de l'évolution des plateformes existantes.",
    tasks: [
      { content: "Analyse des besoins clients et proposition de solutions techniques adaptées." },
      { content: "Développement front-end avec React.js (TypeScript, Redux, Hooks)." },
      { content: "Développement back-end avec Node.js (Express, MongoDB/PostgreSQL)." },
      
    ],
  },
  {
    jobTitle: "Développeur Web Front-End",
    companyName: "Sacom Digital Agency",
    startDate: "2023-01-01",
    endDate: "2024-04-30",
    description:
      "Développement et intégration de sites web responsives et performants, en mettant l'accent sur l'expérience utilisateur et l'accessibilité. Participation active à l'amélioration de l'architecture front-end.",
    tasks: [
      { content: "Développement de composants réutilisables avec React.js." },
      { content: "Intégration de maquettes graphiques (Figma, Adobe XD) en HTML/CSS/JavaScript." },
      { content: "Optimisation des performances web (chargement, rendu, SEO)." },
      
    ],
  },
  {
    jobTitle: "Stagiaire Développement Web",
    companyName: "École Internationale de Graphisme (EIG)",
    startDate: "2022-06-01",
    endDate: "2022-12-31",
    description:
      "Assistance à l'équipe de développement web dans la création de sites web dynamiques et interactifs. Découverte des différentes étapes du cycle de vie d'un projet web.",
    tasks: [
      { content: "Développement d'interfaces utilisateur simples en HTML, CSS et JavaScript." },
      { content: "Correction de bugs et amélioration de l'existant." },
      { content: "Participation aux réunions de planification et de suivi de projet." },
    ],
  },
];

export const educationsPreset: Education[] = [
  {
    degree: "Master en Ingénierie Logicielle",
    school: "Université Polytechnique d'Abomey-Calavi (UPAC)",
    startDate: "2025-09-01", // Date future
    endDate: "2027-06-30", // Date future
    description:
      "Formation de pointe en conception, développement et gestion de projets logiciels complexes. Spécialisation en architectures distribuées et technologies web.",
  },
  {
    degree: "Licence en Informatique",
    school: "Université UIT de Cotonou",
    startDate: "2022-09-01",
    endDate: "2025-06-30",
    description:
      "Acquisition des fondamentaux de l'informatique : algorithmique, programmation, bases de données, réseaux, systèmes d'exploitation. Projets pratiques de développement d'applications.",
  },
   {
    degree: "Certification Développeur Front-End React",
    school: "FreeCodeCamp",
    startDate: "2022-01-15",
    endDate: "2022-05-15",
    description:
      "Certification attestant de la maîtrise des technologies front-end, notamment HTML, CSS, JavaScript et React.js.",
  },
  {
    degree: "Baccalauréat Scientifique (Série C)",
    school: "Collège d'Enseignement Général d'Abomey-Calavi",
    startDate: "2019-09-01",
    endDate: "2021-06-30",
    description: "Baccalauréat avec spécialisation en mathématiques et physique-chimie.",
  },
];

export const skillsPreset: Skill[] = [
  { name: "React.js", level: "Avancé" },
  { name: "Node.js", level: "Intermédiaire" },
  { name: "JavaScript", level: "Avancé" },
  
];

export const languagesPreset: Language[] = [
  { name: "Français", proficiency: "Avancé" },
  { name: "Anglais", proficiency: "Intermédiaire" },
  { name: "Espagnol", proficiency: "Débutant" },
];

export const hobbiesPreset: Hobby[] = [
  { name: "Voyages et découvertes culturelles" },
  { name: "Lecture de romans et d'essais" },
  { name: "Pratique du basketball et du jogging" },
];
export const certificationPreset: Certification[] = [
  { name: "Certification DevOPS" },
  { name: "Certification Cybersecure" },
];