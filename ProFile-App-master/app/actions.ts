"use server";
import prisma from "@/lib/db";

async function createUserProfile(userId: string) {
  return prisma.cv.create({
    data: {
      userId,
      fullName: "",
      email: "",
      postSeeking: "",
      description: "",
      photoUrl: "",
    },
  });
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function checkAndAddUser(email: string | undefined) {
  if (!email || !isValidEmail(email)) {
    console.error("Email invalide ou non fourni.");
    throw new Error("Email invalide ou non fourni.");
  }

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        fullName: "",
        phone: "",
        address: "",
        linkedin: "",
      },
    });

    const cv = await prisma.cv.findUnique({
      where: { userId: user.id },
    });

    if (!cv) {
      const profile = await createUserProfile(user.id);
      console.log(`Profil créé pour ${user.email}`);
      return { ...user, profile };
    }

    console.log(`Utilisateur ${user.email} vérifié et ajouté.`);
    return { ...user, profile: cv };
  } catch (error) {
    console.error(
      "Erreur lors de la vérification ou de l'ajout de l'utilisateur:",
      error
    );
    throw new Error("Impossible de vérifier ou d'ajouter l'utilisateur.");
  }
}
