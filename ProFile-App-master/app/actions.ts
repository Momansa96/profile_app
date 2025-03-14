"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

interface ExperienceData {
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  description?: string;
  tasks: { content: string }[];
}

interface EducationData {
  degree: string;
  school: string;
  startDate: string;
  endDate: string;
  description?: string;
}

interface SkillData {
  name: string;
  level: string;
}

interface LanguageData {
  name: string;
  proficiency: string;
}

interface HobbyData {
  name: string;
}

interface CertificationData {
  name: string;
}
interface CvData {
  userId?: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedin?: string;
  postSeeking: string;
  description: string;
  photoUrl: string;
  pdfUrl?: string;
  experiences: ExperienceData[];
  educations: EducationData[];
  skills: SkillData[];
  languages: LanguageData[];
  hobbies: HobbyData[];
  certifications: CertificationData[];
}





export async function checkAndAddUser(email: string, fullName: string) {
  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        fullName,
        role: "CANDIDAT",
      },
    });
    console.log(`Utilisateur ${user.fullName} vient de se connecte.`);
    return { ...user, success: true };
  } catch (error) {
    console.error(
      "Erreur lors de la vérification ou de l'ajout de l'utilisateur:",
      error
    );
    throw new Error("Impossible de vérifier ou d'ajouter l'utilisateur.");
  }
}

export async function saveCvData(data: CvData, userId: string) {
  try {
    const { fullName, email, phone, address, linkedin, postSeeking, description, photoUrl, pdfUrl, experiences, educations, skills, languages, hobbies, certifications } = data;

    // Vérification si un CV existe déjà pour cet utilisateur
    let cv = await prisma.cv.findUnique({
      where: { userId: userId },
    });

    // Transaction pour les opérations CV
    const result = await prisma.$transaction(async (tx) => {
      // Upsert du CV principal
      cv = await tx.cv.upsert({
        where: { userId: userId },
        update: {
          fullName,
          email,
          phone,
          address,
          linkedin,
          postSeeking,
          description,
          photoUrl,
          pdfUrl,
          experiences: { deleteMany: {} },
          educations: { deleteMany: {} },
          skills: { deleteMany: {} },
          languages: { deleteMany: {} },
          hobbies: { deleteMany: {} },
          certifications: { deleteMany: {} },
        },
        create: {
          userId: userId,
          fullName,
          email,
          phone,
          address,
          linkedin,
          postSeeking,
          description,
          photoUrl,
          pdfUrl,
        },
      });

      // Création des relations avec transactions imbriquées
      await Promise.all([
        tx.experience.createMany({
          data: experiences.map(exp => ({
            cvId: cv?.id ?? '',
            jobTitle: exp.jobTitle,
            companyName: exp.companyName,
            startDate: new Date(exp.startDate),
            endDate: new Date(exp.endDate),
            description: exp.description,
            tasks: {
              create: exp.tasks?.map(task => ({ content: task.content })) || []
            }
          }))
        }),
        
        tx.education.createMany({
          data: educations.map(edu => ({
            cvId: cv?.id ?? '',
            degree: edu.degree,
            school: edu.school,
            startDate: new Date(edu.startDate),
            endDate: new Date(edu.endDate),
            description: edu.description,
          }))
        }),
        
        tx.skill.createMany({
          data: skills.map(skill => ({
            cvId: cv?.id ?? '',
            name: skill.name,
            level: skill.level,
          }))
        }),
        
        tx.language.createMany({
          data: languages.map(lang => ({
            cvId: cv?.id ?? '',
            name: lang.name,
            proficiency: lang.proficiency,
          }))
        }),
        
        tx.hobby.createMany({
          data: hobbies.map(hobby => ({
            cvId: cv?.id ?? '',
            name: hobby.name,
          }))
        }),
        
        tx.certification.createMany({
          data: certifications.map(cert => ({
            cvId: cv?.id ?? '',
            name: cert.name,
          }))
        })
      ]);

      return cv;
    });

    revalidatePath("/dashboardjober");
    return result;
  } catch (error) {
    console.error("Erreur de sauvegarde:", error);
    throw new Error("Échec de la sauvegarde du CV");
  }
}



//Fonction espace recruteur

// Fonction pour récupérer les données des candidats
export async function getDataJober() {
  try {
    const data = await prisma.$queryRaw`SELECT * FROM CV ;`;
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    return null; // Ou lancez une erreur, selon votre besoin
  }
}

//Foonction de gestion des offres d'emploi

// Fonction pour publier une offre d'emploi


// Fonction pour creer une offre d'emploi


// Fonction pour récupérer toutes les offres d'emploi par recruteur


