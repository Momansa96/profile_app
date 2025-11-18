"use server";

/**
 * Actions liées à la gestion des CV
 * Ce fichier contient toutes les fonctions pour :
 * - Upload d'images de profil
 * - Sauvegarde et récupération des données CV
 * - Vérification de l'existence d'un CV
 */

import prisma from "@/lib/db";
import { CvData } from "@/type";
import { put } from "@vercel/blob";

export async function uploadImage(formData: FormData) {
  const imageFile = formData.get("file") as File; // Récupère le fichier depuis le formulaire.

  // Upload du fichier vers le Blob Store.
  const blob = await put(imageFile.name, imageFile, {
    access: "public", // Rend le fichier accessible publiquement.
  });

  return blob; // Retourne les informations du blob (URL, etc.).
}

export async function saveCvData(cvData: CvData, clerkId: string) {
  try {
    const cv = await prisma.cv.upsert({
      where: { clerkId },
      update: {
        fullName: cvData.personalDetails.fullName,
        email: cvData.personalDetails.email,
        phone: cvData.personalDetails.phone,
        linkedin: cvData.personalDetails.linkedin,
        address: cvData.personalDetails.address,
        postSeeking: cvData.personalDetails.postSeeking,
        description: cvData.personalDetails.description,
        photoUrl: cvData.personalDetails.photoUrl,

        // Mettre à jour ou créer les relations pour chaque section
        experiences: {
          deleteMany: {}, // Supprimer les anciennes expériences liées au CV
          create: cvData.experiences.map((exp) => ({
            jobTitle: exp.jobTitle,
            companyName: exp.companyName,
            startDate: new Date(exp.startDate),
            endDate: new Date(exp.endDate),
            description: exp.description,
            tasks: {
              create: exp.tasks.map((task) => ({
                // Assurez-vous que exp.tasks existe et est un tableau
                content: task.content,
              })),
            },
          })),
        },
        educations: {
          deleteMany: {}, // Supprimer les anciennes éducations liées au CV
          create: cvData.educations.map((edu) => ({
            degree: edu.degree,
            school: edu.school,
            startDate: new Date(edu.startDate),
            endDate: new Date(edu.endDate),
            description: edu.description,
          })),
        },
        languages: {
          deleteMany: {}, // Supprimer les anciennes langues liées au CV
          create: cvData.languages.map((lang) => ({
            name: lang.name,
            proficiency: lang.proficiency,
          })),
        },
        skills: {
          deleteMany: {}, // Supprimer les anciennes compétences liées au CV
          create: cvData.skills.map((skill) => ({
            name: skill.name,
            level: skill.level,
          })),
        },
        hobbies: {
          deleteMany: {}, // Supprimer les anciens loisirs liés au CV
          create: cvData.hobbies.map((hobby) => ({
            name: hobby.name,
          })),
        },
        certifications: {
          deleteMany: {}, // Supprimer les anciennes certifications liées au CV
          create: cvData.certifications.map((cert) => ({
            name: cert.name,
          })),
        },
      },
      create: {
        clerkId: clerkId, // Utiliser clerkId directement
        fullName: cvData.personalDetails.fullName,
        email: cvData.personalDetails.email,
        phone: cvData.personalDetails.phone,
        linkedin: cvData.personalDetails.linkedin,
        address: cvData.personalDetails.address,
        postSeeking: cvData.personalDetails.postSeeking,
        description: cvData.personalDetails.description,
        photoUrl: cvData.personalDetails.photoUrl,

        // Créer les relations pour chaque section
        experiences: {
          create: cvData.experiences.map((exp) => ({
            jobTitle: exp.jobTitle,
            companyName: exp.companyName,
            startDate: new Date(exp.startDate), // Convertir en Date si nécessaire
            endDate: new Date(exp.endDate), // Convertir en Date si nécessaire
            description: exp.description,
            tasks: {
              create: exp.tasks.map((task) => ({
                // Assurez-vous que exp.tasks existe et est un tableau
                content: task.content,
              })),
            },
          })),
        },
        educations: {
          create: cvData.educations.map((edu) => ({
            degree: edu.degree,
            school: edu.school,
            startDate: new Date(edu.startDate), // Convertir en Date si nécessaire
            endDate: new Date(edu.endDate), // Convertir en Date si nécessaire
            description: edu.description,
          })),
        },
        languages: {
          create: cvData.languages.map((lang) => ({
            name: lang.name,
            proficiency: lang.proficiency,
          })),
        },
        skills: {
          create: cvData.skills.map((skill) => ({
            name: skill.name,
            level: skill.level,
          })),
        },
        hobbies: {
          create: cvData.hobbies.map((hobby) => ({
            name: hobby.name,
          })),
        },
        certifications: {
          create: cvData.certifications.map((cert) => ({
            name: cert.name,
          })),
        },
      },
    });

    console.log(`CV de ${cv.fullName} a été sauvegardé avec succès.`);
    return { ...cv, success: true };
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du CV:", error);
    throw new Error("Impossible de sauvegarder le CV.");
  }
}

export async function getCvData(clerkId: string) {
  try {
    const cv = await prisma.cv.findUnique({
      where: { clerkId },
      include: {
        experiences: { include: { tasks: true } },
        educations: true,
        languages: true,
        skills: true,
        hobbies: true,
        certifications: true,
      },
    });
    const formatDate = (date: Date): string => {
      return date.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };
    if (!cv) throw new Error("CV not found");
    return {
      personalDetails: {
        fullName: cv.fullName || "",
        email: cv.email || "",
        phone: cv.phone || "",
        linkedin: cv.linkedin || "",
        address: cv.address || "",
        postSeeking: cv.postSeeking || "",
        description: cv.description || "",
        photoUrl: cv.photoUrl || "",
      },
      experiences: cv.experiences.map((experience) => ({
        jobTitle: experience.jobTitle,
        companyName: experience.companyName,
        startDate: formatDate(experience.startDate),
        endDate: formatDate(experience.endDate),
        description: experience.description || "",
        tasks: experience.tasks.map((task) => ({
          content: task.content,
        })),
      })),
      educations: cv.educations.map((educcation) => ({
        degree: educcation.degree,
        school: educcation.school,
        startDate: formatDate(educcation.startDate),
        endDate: formatDate(educcation.endDate),
        description: educcation.description || "",
      })),
      languages: cv.languages.map((language) => ({
        name: language.name,
        proficiency: language.proficiency,
      })),
      skills: cv.skills.map((skill) => ({
        name: skill.name,
        level: skill.level,
      })),
      hobbies: cv.hobbies.map((hobby) => ({
        name: hobby.name,
      })),
      certifications: cv.certifications.map((certification) => ({
        name: certification.name,
      })),
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des données du CV:", error);

    throw new Error("Impossible de récupérer les données du CV.");
  }
}

export async function checkCvExists(clerkId: string) {
  try {
    const cv = await prisma.cv.findUnique({
      where: { clerkId },
    });
    return !!cv; // Retourne true si le CV existe, sinon false
  } catch (error) {
    console.error("Erreur lors de la vérification du CV :", error);
    throw new Error("Impossible de vérifier l'existence du CV.");
  }
}
