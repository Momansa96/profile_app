"use server";

/**
 * Actions liées à la gestion des favoris des candidats
 * Ce fichier contient les fonctions pour :
 * - Récupération des emplois favoris
 * - Ajout d'un emploi aux favoris
 * - Suppression d'un emploi des favoris
 */

import prisma from "@/lib/db";

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
