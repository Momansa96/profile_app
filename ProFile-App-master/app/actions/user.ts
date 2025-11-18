"use server";
import prisma from "@/lib/db";
import { users } from "@clerk/clerk-sdk-node";

/**
 * Fonction générale pour vérifier et ajouter tout nouvel utilisateur
 * Synchronise automatiquement le rôle entre Clerk et la base de données
 */
export async function checkAndAddUser(
  email: string,
  fullName: string,
  clerkId: string,
  role?: "CANDIDAT" | "RECRUTEUR"
) {
  try {
    // 🔍 Récupérer le rôle depuis Clerk (source de vérité)
    const clerkUser = await users.getUser(clerkId);
    const clerkRole = (clerkUser.publicMetadata?.role as "CANDIDAT" | "RECRUTEUR") || "CANDIDAT";

    // ✅ Utiliser le rôle de Clerk si non fourni en paramètre
    const finalRole = role || clerkRole;

    console.log(`🔐 checkAndAddUser - clerkId: ${clerkId}, Role Clerk: ${clerkRole}, Role fourni: ${role}, Role final: ${finalRole}`);

    const user = await prisma.user.upsert({
      where: { clerkId },
      update: {
        email,
        fullName,
        role: finalRole,
      },
      create: {
        email,
        fullName,
        clerkId,
        role: finalRole,
      },
    });

    // ✅ Synchroniser Clerk UNIQUEMENT si le rôle a changé
    if (clerkRole !== finalRole) {
      console.log(`🔄 Mise à jour du rôle Clerk: ${clerkRole} → ${finalRole}`);
      await users.updateUser(clerkId, {
        publicMetadata: { role: finalRole },
      });
    }

    console.log(
      "✅ Utilisateur vérifié ou ajouté avec succès avec pour role:",
      finalRole
    );
    return { ...user, success: true };
  } catch (error) {
    console.error("❌ Erreur lors de l'ajout de l'utilisateur :", error);
    throw new Error("Impossible de vérifier ou d'ajouter l'utilisateur.");
  }
}
