"use server";
import prisma from "@/lib/db";
import { users } from "@clerk/clerk-sdk-node";
import { CvData } from "@/type";
import { put } from "@vercel/blob";

type CandidatureStatus = "En cours" | "Accepter" | "Rejeter";

//Fonction generale verifier et ajouter tout nouvel utilisateur
export async function checkAndAddUser(
  email: string,
  fullName: string,
  clerkId: string,
  role: "CANDIDAT" | "RECRUTEUR" = "CANDIDAT"
) {
  try {
    const user = await prisma.user.upsert({
      where: { clerkId },
      update: {},
      create: {
        email,
        fullName,
        clerkId,
        role,
      },
    });

    const clerkUser = await users.getUser(clerkId);

    if (clerkUser.publicMetadata?.role !== role) {
      await users.updateUser(clerkId, {
        publicMetadata: { role },
      });
    }
    console.log(
      "Utilisateur vérifié ou ajouté avec succès avec pour role:",
      role
    );
    return { ...user, success: true };
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur :", error);
    throw new Error("Impossible de vérifier ou d'ajouter l'utilisateur.");
  }
}

//Fonction pour recuperer les emplois trier du plus recent au plus ancien
export async function getJobs() {
  try {
    const jobs = await prisma.emploi.findMany({
      orderBy: { datePublished: "desc" }, // Trier par date de publication
    });
    return jobs;
  } catch (error) {
    console.error("Erreur lors de la récupération des emplois :", error);
    throw new Error("Impossible de récupérer les opportunités.");
  }
}

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

export async function getFavorites(clerkId: string) {
  const favorites = await prisma.favorite.findMany({
    where: { clerkId },
    select: { emploiId: true },
  });
  return favorites.map((fav) => fav.emploiId);
}

export async function addFavorite(clerkId: string, emploiId: string) {
  try {
    // Vérifiez que l'emploi existe
    const emploi = await prisma.emploi.findUnique({
      where: { id: emploiId },
    });

    if (!emploi) {
      throw new Error("L'emploi n'existe pas.");
    }

    // Ajoutez le favori
    await prisma.favorite.create({
      data: { clerkId, emploiId },
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout du favori :", error);
    throw new Error("Impossible d'ajouter le favori.");
  }
}

export async function removeFavorite(clerkId: string, emploiId: string) {
  await prisma.favorite.deleteMany({
    where: { clerkId, emploiId },
  });
}

// Fonction pour récupérer les candidatures d'un utilisateur
export async function getApplications(clerkId: string) {
  const applications = await prisma.candidature.findMany({
    where: { clerkId },
    select: { emploiId: true, status: true },
  });
  return applications;
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

// Fonction pour ajouter une candidature
export async function addApplication(clerkId: string, emploiId: string) {
  try {
    // Vérifiez que le CV existe pour le clerkId
    const cv = await prisma.cv.findUnique({
      where: { clerkId },
    });

    if (!cv) {
      throw new Error("Le CV pour cet utilisateur n'existe pas.");
    }

    // Ajoutez la candidature
    await prisma.candidature.create({
      data: { clerkId, emploiId },
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la candidature :", error);
    throw new Error("Impossible d'ajouter la candidature.");
  }
}

// Fonction pour retirer une candidature
export async function removeApplication(clerkId: string, emploiId: string) {
  await prisma.candidature.deleteMany({
    where: { clerkId, emploiId },
  });
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

//Fonction espace recruteur

// Fonction pour récupérer les données des candidats
export async function getDataJober() {
  try {
    const data = await prisma.cv.findMany();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error("Impossible de récupérer les données des candidats.");
  }
}

type JobOffer = {
  id: string;
  jobTitle: string;
  companyName: string;
  locationJob: string;
  typeJob: string;
  description: string;
  salary?: string | null;
};

//Fonction pour creer une offre d'emploi
export async function createJobOffer(
  jobData: Omit<JobOffer, "id">,
  clerkId: string
): Promise<{ success: boolean; job?: JobOffer; error?: string }> {
  try {
    // Validation des données d'entrée
    if (
      !jobData.jobTitle ||
      !jobData.companyName ||
      !jobData.locationJob ||
      !jobData.typeJob
    ) {
      throw new Error("Les champs obligatoires sont manquants.");
    }

    // Création de l'offre d'emploi dans la base de données
    const newJob = await prisma.emploi.create({
      data: {
        jobTitle: jobData.jobTitle,
        companyName: jobData.companyName,
        locationJob: jobData.locationJob,
        typeJob: jobData.typeJob,
        description: jobData.description,
        salary: jobData.salary || null,
        clerkId, // Associer l'offre à l'utilisateur connecté
      },
    });

    return { success: true, job: newJob };
  } catch (error) {
    console.error("Erreur lors de la création de l'offre :", error);
    return { success: false, error: (error as Error).message };
  }
}

//Fonction pour mettre a jour une offre d'emploi
export async function updateJobOffer(
  jobId: string,
  jobData: Omit<JobOffer, "id">,
  clerkId: string
): Promise<{ success: boolean; job?: JobOffer; error?: string }> {
  try {
    // Vérification si l'offre d'emploi existe et appartient à l'utilisateur
    const job = await prisma.emploi.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new Error("L'offre d'emploi n'existe pas.");
    }

    if (job.clerkId !== clerkId) {
      throw new Error(
        "Vous n'êtes pas autorisé à mettre à jour cette offre d'emploi."
      );
    }

    // Mise à jour de l'offre d'emploi
    const updatedJob = await prisma.emploi.update({
      where: { id: jobId },
      data: {
        jobTitle: jobData.jobTitle,
        companyName: jobData.companyName,
        locationJob: jobData.locationJob,
        typeJob: jobData.typeJob,
        description: jobData.description,
        salary: jobData.salary || null,
      },
    });

    return { success: true, job: updatedJob };
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'offre :", error);
    return { success: false, error: (error as Error).message };
  }
}

//Fonction pour supprimer une offre d'emploi
export async function deleteJobOffer(
  jobId: string,
  clerkId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Vérification si l'offre d'emploi existe et appartient à l'utilisateur
    const job = await prisma.emploi.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new Error("L'offre d'emploi n'existe pas.");
    }

    if (job.clerkId !== clerkId) {
      throw new Error(
        "Vous n'êtes pas autorisé à supprimer cette offre d'emploi."
      );
    }

    // Suppression de l'offre d'emploi
    await prisma.emploi.delete({
      where: { id: jobId },
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la suppression de l'offre :", error);
    return { success: false, error: (error as Error).message };
  }
}

//Fontion pour recuperer toutes les offres d'emploi d'un recruteur
export async function getAllJobOffers(clerkId: string) {
  try {
    if (!clerkId) {
      throw new Error("L'identifiant utilisateur est manquant.");
    }

    // Récupérer les offres d'emploi de l'utilisateur connecté
    const jobOffers = await prisma.emploi.findMany({
      where: { clerkId },
      orderBy: { datePublished: "desc" }, // Trier par date de publication
    });

    return jobOffers;
  } catch (error) {
    console.error("Erreur lors de la récupération des offres :", error);
    throw new Error("Impossible de récupérer les offres d'emploi.");
  }
}

export async function getCandidateFavorites(clerkId: string) {
  try {
    const favorites = await prisma.recruterFavorite.findMany({
      where: { clerkId },
      select: { candidateId: true },
    });
    return favorites.map((fav) => fav.candidateId);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des favoris des candidats :",
      error
    );
    throw new Error("Impossible de récupérer les favoris des candidats.");
  }
}

export async function addCandidateFavorite(
  clerkId: string,
  candidateId: string
) {
  try {
    // Vérifiez que le candidat existe
    const candidate = await prisma.cv.findUnique({
      where: { id: candidateId },
    });

    if (!candidate) {
      throw new Error("Le candidat n'existe pas.");
    }

    // Ajoutez le favori
    await prisma.recruterFavorite.create({
      data: { clerkId, candidateId },
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout du favori du candidat :", error);
    throw new Error("Impossible d'ajouter le favori du candidat.");
  }
}

export async function removeCandidateFavorite(
  clerkId: string,
  candidateId: string
) {
  try {
    await prisma.recruterFavorite.deleteMany({
      where: { clerkId, candidateId },
    });
  } catch (error) {
    console.error(
      "Erreur lors de la suppression du favori du candidat :",
      error
    );
    throw new Error("Impossible de supprimer le favori du candidat.");
  }
}

export async function getJobApplications(clerkId: string) {
  try {
    const applications = await prisma.candidature.findMany({
      where: {
        emploi: {
          clerkId: clerkId,
        },
      },
      include: {
        cv: true,
        emploi: true,
      },
    });

    return applications
      .map((app) => {
        if (!app.cv || !app.emploi) {
          console.warn(`Candidature avec ID ${app.id} n'a pas de CV associé.`);
          return null; // ou un objet par défaut si vous préférez
        }

        return {
          id: app.id,
          clerkId: app.cv.clerkId,
          fullName: app.cv.fullName,
          email: app.cv.email,
          phone: app.cv.phone,
          linkedin: app.cv.linkedin,
          address: app.cv.address,
          postSeeking: app.cv.postSeeking,
          description: app.cv.description,
          photoUrl: "/Avatar6.jpg",
          pdfUrl: app.cv.pdfUrl,
          jobTitle: app.emploi.jobTitle,
          createdAt: app.createdAt,
          updatedAt: app.updatedAt,
        };
      })
      .filter((app) => app !== null); // Filtrer les candidatures sans CV
  } catch (error) {
    console.error("Erreur lors de la récupération des candidatures :", error);
    throw new Error("Impossible de récupérer les candidatures.");
  }
}

export async function updateCandidateStatus(
  candidateId: string,
  newStatus: CandidatureStatus
) {
  try {
    if (!["En cours", "Accepter", "Rejeter"].includes(newStatus)) {
      throw new Error("Statut invalide");
    }

    const updatedCandidate = await prisma.candidature.update({
      where: { id: candidateId },
      data: { status: newStatus },
    });
    return { success: true, data: updatedCandidate };
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour du statut du candidat:",
      error
    );
    return { success: false, error: "Impossible de mettre à jour le statut." };
  }
}
