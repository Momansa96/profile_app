"use server";

/**
 * Actions liées aux statistiques d'affiliation
 * Ce fichier contient les fonctions pour :
 * - Récupération des statistiques d'affiliation d'un utilisateur
 */

import prisma from "@/lib/db";

// Récupérer les statistiques d'affiliation d'un candidat
export async function getAffiliateStats(clerkId: string) {
  try {
    const affiliateLink = await prisma.affiliateLink.findUnique({
      where: { clerkId },
      include: {
        transactions: {
          orderBy: { createdAt: "desc" },
          include: {
            referredUser: {
              select: { fullName: true, email: true },
            },
          },
        },
      },
    });

    if (!affiliateLink) {
      return { success: false, error: "Lien d'affiliation non trouvé" };
    }

    // Calculer le montant en attente
    const pendingAmount = affiliateLink.transactions
      .filter((t) => t.status === "PENDING")
      .reduce((sum, t) => sum + t.commission, 0);

    return {
      success: true,
      stats: {
        code: affiliateLink.code,
        clicks: affiliateLink.clicks,
        conversions: affiliateLink.conversions,
        totalEarned: affiliateLink.totalEarned,
        pendingAmount,
        transactions: affiliateLink.transactions,
      },
    };
  } catch (error) {
    console.error("Erreur récupération stats d'affiliation:", error);
    return { success: false, error: "Impossible de récupérer les statistiques" };
  }
}
