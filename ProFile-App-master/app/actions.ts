"use server";
import prisma from "@/lib/db";
import { Cvdata} from "@/type";

export async function checkAndAddUser(email: string | undefined) {
  if (!email) return;

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: { email },
      include: { profile: true },
    });

    if (!user.profile) {
      const profile = await prisma.userProfile.create({
        data: {
          userId: user.id,
          fullName: "",
          phone: "",
          address: "",
          photoUrl: "",
          description: "",
          postSeeking: "",
        },
      });

      console.log(`Profil créé pour ${user.email}`);
      return { ...user, profile };
    }

    console.log(`Utilisateur ${user.email} vérifié et ajouté.`);
    return user;
  } catch (error) {
    console.error("Erreur lors de la vérification ou de l'ajout de l'utilisateur:", error);
    throw new Error("Impossible de vérifier ou d'ajouter l'utilisateur.");
  }
}


export const publishCv = async (cvData: Cvdata) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const response = await fetch(`${apiUrl}/api/cv`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cvData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur API: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    return result;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Erreur lors de la publication du CV:", error);
    throw new Error(`Erreur lors de la publication du CV: ${error.message}`);
  }
};
