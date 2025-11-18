"use server";

/**
 * Actions d'administration pour le système d'affiliation
 * Ce fichier contient les fonctions pour :
 * - Récupération des statistiques globales d'affiliation
 * - Gestion des commissions (validation, paiement, annulation)
 */

import prisma from "@/lib/db";

// Récupérer toutes les statistiques d'affiliation pour l'admin
export async function getAdminAffiliateStats() {
  try {
    // Statistiques globales
    const totalLinks = await prisma.affiliateLink.count();
    const totalClicks = await prisma.affiliateLink.aggregate({
      _sum: { clicks: true },
    });
    const totalConversions = await prisma.affiliateLink.aggregate({
      _sum: { conversions: true },
    });
    const totalEarned = await prisma.affiliateLink.aggregate({
      _sum: { totalEarned: true },
    });

    // Commissions en attente
    const pendingCommissions = await prisma.affiliateTransaction.aggregate({
      _sum: { commission: true },
      where: { status: "PENDING" },
    });

    // Commissions payées
    const paidCommissions = await prisma.affiliateTransaction.aggregate({
      _sum: { commission: true },
      where: { status: "PAID" },
    });

    // Top 10 parrains
    const topAffiliates = await prisma.affiliateLink.findMany({
      orderBy: { totalEarned: "desc" },
      take: 10,
      include: {
        user: {
          select: { fullName: true, email: true },
        },
      },
    });

    // Transactions récentes
    const recentTransactions = await prisma.affiliateTransaction.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      include: {
        affiliateLink: {
          include: {
            user: {
              select: { fullName: true, email: true },
            },
          },
        },
        referredUser: {
          select: { fullName: true, email: true },
        },
      },
    });

    return {
      success: true,
      stats: {
        totalLinks,
        totalClicks: totalClicks._sum.clicks || 0,
        totalConversions: totalConversions._sum.conversions || 0,
        totalEarned: totalEarned._sum.totalEarned || 0,
        pendingCommissions: pendingCommissions._sum.commission || 0,
        paidCommissions: paidCommissions._sum.commission || 0,
        topAffiliates,
        recentTransactions,
      },
    };
  } catch (error) {
    console.error("Erreur récupération stats admin:", error);
    return { success: false, error: "Impossible de récupérer les statistiques" };
  }
}

// Récupérer toutes les commissions en attente
export async function getPendingCommissions() {
  try {
    const pendingTransactions = await prisma.affiliateTransaction.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "desc" },
      include: {
        affiliateLink: {
          include: {
            user: {
              select: { fullName: true, email: true, clerkId: true },
            },
          },
        },
        referredUser: {
          select: { fullName: true, email: true },
        },
      },
    });

    return { success: true, transactions: pendingTransactions };
  } catch (error) {
    console.error("Erreur récupération commissions en attente:", error);
    return { success: false, error: "Impossible de récupérer les commissions" };
  }
}

// Marquer une commission comme payée
export async function markCommissionAsPaid(transactionId: string) {
  try {
    const transaction = await prisma.affiliateTransaction.update({
      where: { id: transactionId },
      data: {
        status: "PAID",
        paidAt: new Date(),
      },
    });

    console.log(`✅ Commission ${transactionId} marquée comme payée`);
    return { success: true, transaction };
  } catch (error) {
    console.error("Erreur marquage commission comme payée:", error);
    return { success: false, error: "Impossible de marquer la commission comme payée" };
  }
}

// Marquer plusieurs commissions comme payées
export async function markMultipleCommissionsAsPaid(transactionIds: string[]) {
  try {
    const result = await prisma.affiliateTransaction.updateMany({
      where: {
        id: { in: transactionIds },
        status: "PENDING",
      },
      data: {
        status: "PAID",
        paidAt: new Date(),
      },
    });

    console.log(`✅ ${result.count} commissions marquées comme payées`);
    return { success: true, count: result.count };
  } catch (error) {
    console.error("Erreur marquage multiple commissions:", error);
    return { success: false, error: "Impossible de marquer les commissions comme payées" };
  }
}

// Annuler une commission
export async function cancelCommission(transactionId: string, reason?: string) {
  try {
    const transaction = await prisma.affiliateTransaction.findUnique({
      where: { id: transactionId },
      include: { affiliateLink: true },
    });

    if (!transaction) {
      return { success: false, error: "Transaction non trouvée" };
    }

    // Mettre à jour la transaction
    await prisma.affiliateTransaction.update({
      where: { id: transactionId },
      data: { status: "CANCELLED" },
    });

    // Mettre à jour les stats du lien d'affiliation
    await prisma.affiliateLink.update({
      where: { id: transaction.affiliateLinkId },
      data: {
        conversions: { decrement: 1 },
        totalEarned: { decrement: transaction.commission },
      },
    });

    console.log(`✅ Commission ${transactionId} annulée. Raison: ${reason || "Non spécifiée"}`);
    return { success: true };
  } catch (error) {
    console.error("Erreur annulation commission:", error);
    return { success: false, error: "Impossible d'annuler la commission" };
  }
}
