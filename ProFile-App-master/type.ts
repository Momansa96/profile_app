export type PersonalDetails = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  photoUrl?: string;
  description?: string;
  postSeeking?: string;
};

export type Experiences = {
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  description: string;
  tasks: string[];
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

export type Cvdata = {
  userId: string;
  fullName: string;
  email: string;
  postSeeking?: string;
  description?: string;
  photoUrl?: string;
  pdfUrl?: string;
  cvdata: {
    experiences: Experiences[];
    educations: Education[];
    languages: Language[];
    skills: Skill[];
    hobbies: Hobby[];
  };
}

