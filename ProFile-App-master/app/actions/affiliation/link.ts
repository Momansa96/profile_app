"use server";

/**
 * Actions liées à la gestion des liens d'affiliation
 * Ce fichier contient les fonctions pour :
 * - Génération de liens d'affiliation uniques
 * - Tracking des clics sur les liens d'affiliation
 */

import prisma from "@/lib/db";
import { users } from "@clerk/clerk-sdk-node";

// Générer ou récupérer le lien d'affiliation d'un candidat
export async function generateAffiliateLink(clerkId: string) {
  try {
    // Vérifier si un lien existe déjà
    const existingLink = await prisma.affiliateLink.findUnique({
      where: { clerkId },
    });

    if (existingLink) {
      return {
        success: true,
        code: existingLink.code,
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/sign-up?ref=${existingLink.code}`,
      };
    }

    // Générer un code unique (ex: JOHN2024XYZ)
    const user = await users.getUser(clerkId);
    const firstName = user.firstName?.toUpperCase().substring(0, 4) || "USER";
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const code = `${firstName}${new Date().getFullYear()}${randomCode}`;

    // Créer le lien d'affiliation
    const affiliateLink = await prisma.affiliateLink.create({
      data: {
        clerkId,
        code,
        updatedAt: new Date() // Initialiser updatedAt manuellement
      },
    });

    return {
      success: true,
      code: affiliateLink.code,
      url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/sign-up?ref=${affiliateLink.code}`,
    };
  } catch (error) {
    console.error("Erreur génération lien d'affiliation:", error);
    return { success: false, error: "Impossible de générer le lien d'affiliation" };
  }
}

// Tracker un clic sur le lien d'affiliation
export async function trackAffiliateClick(code: string) {
  try {
    await prisma.affiliateLink.update({
      where: { code },
      data: { clicks: { increment: 1 } },
    });
    return { success: true };
  } catch (error) {
    console.error("Erreur tracking clic d'affiliation:", error);
    return { success: false };
  }
}
