export type PersonalDetails = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  photoUrl: string;
  description: string;
  postSeeking: string;
};

export type Experiences = {
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  description: string;
  tasks: { content: string }[];
};

export type Education = {
  degree: string;
  school: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Skill = {
  name: string;
  level: string;
};

export type Language = {
  name: string;
  proficiency: string; 
};

export type Hobby = {
  name: string;
};
export type Certification = {
  name: string;
};

export type CvData = {
  personalDetails: {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    address: string;
    postSeeking: string;
    description: string;
    photoUrl: string;
  };
  experiences: Experiences[];
  educations: Education[];
  languages: Language[];
  skills: Skill[];
  hobbies: Hobby[];
  certifications: Certification[];
};


