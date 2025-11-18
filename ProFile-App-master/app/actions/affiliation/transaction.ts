"use server";

/**
 * Actions liées aux transactions d'affiliation
 * Ce fichier contient les fonctions pour :
 * - Enregistrement des ventes et commissions d'affiliation
 */

import prisma from "@/lib/db";

// Enregistrer une conversion (achat via affiliation)
export async function recordAffiliateSale(
  referralCode: string,
  buyerClerkId: string,
  subscriptionType: string,
  amount: number,
  fedapayTransactionId?: string,
  fedapayCustomerId?: string
) {
  try {
    const affiliateLink = await prisma.affiliateLink.findUnique({
      where: { code: referralCode },
    });

    if (!affiliateLink) {
      return { success: false, error: "Code d'affiliation invalide" };
    }

    // Vérifier que l'acheteur n'est pas le parrain lui-même
    if (affiliateLink.clerkId === buyerClerkId) {
      return { success: false, error: "Impossible de parrainer soi-même" };
    }

    // Calculer la commission (10%)
    const commission = amount * 0.1;

    // Créer la transaction
    await prisma.affiliateTransaction.create({
      data: {
        affiliateLinkId: affiliateLink.id,
        referredClerkId: buyerClerkId,
        subscriptionType,
        amount,
        commission,
        status: "PENDING",
        fedapayTransactionId,
        fedapayCustomerId,
      },
    });

    // Mettre à jour les statistiques
    await prisma.affiliateLink.update({
      where: { id: affiliateLink.id },
      data: {
        conversions: { increment: 1 },
        totalEarned: { increment: commission },
      },
    });

    console.log(`✅ Affiliation enregistrée : ${commission} FCFA pour ${affiliateLink.code}`);
    return { success: true, commission };
  } catch (error) {
    console.error("Erreur enregistrement vente affiliation:", error);
    return { success: false, error: "Impossible d'enregistrer la vente" };
  }
}
