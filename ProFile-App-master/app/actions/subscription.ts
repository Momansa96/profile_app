"use server";

/**
 * Actions liées à la gestion des abonnements
 * Ce fichier contient les fonctions pour :
 * - Création d'abonnements après paiement
 * - Vérification du statut d'abonnement
 */

import prisma from "@/lib/db";
import { recordAffiliateSale } from "./affiliation/transaction";

// Créer un abonnement après paiement FedaPay
export async function createSubscription(
  clerkId: string,
  subscriptionType: "CANDIDAT" | "ENTREPRISE",
  price: number,
  referralCode?: string,
  fedapayTransactionId?: string,
  fedapayCustomerId?: string
) {
  try {
    // Vérifier si l'utilisateur a déjà un abonnement actif
    const existingSubscription = await prisma.subscription.findUnique({
      where: { clerkId },
    });

    if (existingSubscription && existingSubscription.status === "ACTIVE") {
      return { success: false, error: "Vous avez déjà un abonnement actif" };
    }

    // Calculer la date d'expiration (30 jours)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    // Créer l'abonnement
    const subscription = await prisma.subscription.create({
      data: {
        clerkId,
        type: subscriptionType,
        status: "ACTIVE",
        price,
        endDate,
        referredBy: referralCode || null,
        fedapayTransactionId,
        fedapayCustomerId,
      },
    });

    // Si parrainage, enregistrer la commission
    if (referralCode) {
      await recordAffiliateSale(
        referralCode,
        clerkId,
        subscriptionType,
        price,
        fedapayTransactionId,
        fedapayCustomerId
      );
    }

    console.log(`✅ Abonnement créé pour ${clerkId} : ${subscriptionType}`);
    return { success: true, subscription };
  } catch (error) {
    console.error("Erreur création abonnement:", error);
    return { success: false, error: "Impossible de créer l'abonnement" };
  }
}

// Vérifier si un utilisateur a un abonnement actif
export async function checkActiveSubscription(clerkId: string) {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { clerkId },
    });

    if (!subscription) {
      return { success: true, hasActiveSubscription: false };
    }

    // Vérifier si l'abonnement est expiré
    const now = new Date();
    if (subscription.endDate < now && subscription.status === "ACTIVE") {
      // Expirer l'abonnement
      await prisma.subscription.update({
        where: { clerkId },
        data: { status: "EXPIRED" },
      });
      return { success: true, hasActiveSubscription: false };
    }

    return {
      success: true,
      hasActiveSubscription: subscription.status === "ACTIVE",
      subscription,
    };
  } catch (error) {
    console.error("Erreur vérification abonnement:", error);
    return { success: false, error: "Impossible de vérifier l'abonnement" };
  }
}
