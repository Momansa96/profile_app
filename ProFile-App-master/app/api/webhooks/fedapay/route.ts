import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { createSubscription } from "@/app/actions";

/**
 * Webhook FedaPay pour traiter les paiements
 *
 * Documentation FedaPay: https://docs.fedapay.com/webhooks
 *
 * Configuration requise dans FedaPay:
 * 1. Aller dans Dashboard > Paramètres > Webhooks
 * 2. Ajouter cette URL: https://votre-domaine.com/api/webhooks/fedapay
 * 3. Sélectionner l'événement: transaction.approved
 */

export async function POST(req: NextRequest) {
  try {
    // Récupérer le payload du webhook
    const payload = await req.json();

    console.log("📩 Webhook FedaPay reçu:", JSON.stringify(payload, null, 2));

    // Vérifier le type d'événement
    const eventType = payload.event || payload.type;

    if (eventType !== "transaction.approved") {
      console.log(`⚠️ Événement ignoré: ${eventType}`);
      return NextResponse.json(
        { message: "Événement ignoré" },
        { status: 200 }
      );
    }

    // Extraire les données de la transaction
    const transaction = payload.data || payload.transaction || payload;

    const {
      id: fedapayTransactionId,
      customer_id: fedapayCustomerId,
      amount,
      status,
      custom_metadata,
    } = transaction;

    // Vérifier que le paiement est approuvé
    if (status !== "approved") {
      console.log(`⚠️ Paiement non approuvé. Statut: ${status}`);
      return NextResponse.json(
        { message: "Paiement non approuvé" },
        { status: 200 }
      );
    }

    // Extraire les métadonnées personnalisées
    // Ces données doivent être ajoutées lors de la création de la transaction FedaPay
    const clerkId = custom_metadata?.clerkId;
    const subscriptionType = custom_metadata?.subscriptionType; // "CANDIDAT" ou "ENTREPRISE"
    const referralCode = custom_metadata?.referralCode;

    if (!clerkId || !subscriptionType) {
      console.error("❌ Métadonnées manquantes dans la transaction FedaPay");
      return NextResponse.json(
        { error: "Métadonnées manquantes (clerkId ou subscriptionType)" },
        { status: 400 }
      );
    }

    // Vérifier si l'abonnement existe déjà pour cette transaction
    const existingSubscription = await prisma.subscription.findFirst({
      where: { fedapayTransactionId },
    });

    if (existingSubscription) {
      console.log(`⚠️ Abonnement déjà créé pour la transaction ${fedapayTransactionId}`);
      return NextResponse.json(
        { message: "Abonnement déjà créé" },
        { status: 200 }
      );
    }

    // Convertir le montant (FedaPay retourne en centimes)
    const priceInFCFA = amount / 100;

    // Créer l'abonnement
    const result = await createSubscription(
      clerkId,
      subscriptionType,
      priceInFCFA,
      referralCode,
      fedapayTransactionId,
      fedapayCustomerId
    );

    if (!result.success) {
      console.error(`❌ Erreur création abonnement: ${result.error}`);
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    // Supprimer le code d'affiliation du localStorage (côté client)
    // Note: Cette partie sera gérée côté client après redirection

    console.log(`✅ Abonnement créé avec succès pour ${clerkId}`);

    return NextResponse.json(
      {
        message: "Abonnement créé avec succès",
        subscription: result.subscription,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Erreur webhook FedaPay:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// Endpoint de test pour vérifier que le webhook est accessible
export async function GET() {
  return NextResponse.json({
    message: "Webhook FedaPay actif",
    timestamp: new Date().toISOString(),
  });
}
