"use server";

/**
 * Actions liées à la gestion des candidatures
 * Ce fichier contient les fonctions pour :
 * - Récupération des candidatures d'un utilisateur
 * - Soumission d'une candidature
 * - Retrait d'une candidature
 */

import prisma from "@/lib/db";

// Fonction pour récupérer les candidatures d'un utilisateur
export async function getApplications(clerkId: string) {
  const applications = await prisma.candidature.findMany({
    where: { clerkId },
    select: { emploiId: true, status: true },
  });
  return applications;
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
