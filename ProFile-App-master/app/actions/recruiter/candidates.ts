"use server";

/**
 * Actions liées à la gestion des candidats pour les recruteurs
 * Ce fichier contient les fonctions pour :
 * - Récupération des données des candidats
 * - Gestion des favoris de candidats
 * - Récupération et gestion des candidatures
 * - Mise à jour du statut des candidatures
 */

import prisma from "@/lib/db";

type CandidatureStatus = "En cours" | "Accepter" | "Rejeter";

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
