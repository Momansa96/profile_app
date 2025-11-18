"use server";

/**
 * Actions liées à la gestion des offres d'emploi pour les recruteurs
 * Ce fichier contient les fonctions pour :
 * - Création d'offres d'emploi
 * - Mise à jour d'offres d'emploi
 * - Suppression d'offres d'emploi
 * - Récupération des offres d'un recruteur
 */

import prisma from "@/lib/db";

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
