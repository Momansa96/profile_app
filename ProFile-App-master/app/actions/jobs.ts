"use server";

/**
 * Actions liées à la gestion des emplois pour les candidats
 * Ce fichier contient les fonctions pour :
 * - Récupération des offres d'emploi publiques
 */

import prisma from "@/lib/db";

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
