import { Cvdata } from "@/type";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId est requis" }, { status: 400 });
    }

    const cv = await prisma.cV.findUnique({
      where: { userId },
      include: {
        experiences: true,
        education: true,
        skills: true,
        languages: true,
        hobbies: true,
      },
    });

    if (!cv) {
      return NextResponse.json({ error: "CV non trouvé" }, { status: 404 });
    }

    return NextResponse.json(cv, { status: 200 });
  } catch (error) {
    console.error("Erreur serveur :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  try {
    const cvData: Cvdata = await req.json();
    if (!cvData || Object.keys(cvData).length === 0) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }
    const { userId, fullName, postSeeking, description, photoUrl, cvdata: { experiences, educations, languages, skills, hobbies } } = cvData;

    // Mise à jour du profil utilisateur
    await prisma.userProfile.upsert({
      where: { userId },
      update: { fullName, postSeeking, description, photoUrl },
      create: { userId, fullName, postSeeking, description, photoUrl },
    });

    const cv = await prisma.cV.upsert({
      where: { userId },
      update: {},
      create: { userId },
      include: {
        experiences: true,
        education: true,
        skills: true,
        languages: true,
        hobbies: true,
      },
    });

    // Mise à jour des expériences
    await prisma.experiences.deleteMany({ where: { cvId: cv.id } });
    await prisma.experiences.createMany({
      data: experiences.map(exp => ({
        cvId: cv.id,
        jobTitle: exp.jobTitle,
        companyName: exp.companyName,
        startDate: new Date(exp.startDate),
        endDate: exp.endDate ? new Date(exp.endDate) : null,
        description: exp.description,
      })),
    });

    // Mise à jour des formations
    await prisma.education.deleteMany({ where: { cvId: cv.id } });
    await prisma.education.createMany({
      data: educations.map(edu => ({
        cvId: cv.id,
        degree: edu.degree,
        school: edu.school,
        startDate: new Date(edu.startDate),
        endDate: edu.endDate ? new Date(edu.endDate) : null,
        description: edu.description,
      })),
    });

    // Mise à jour des compétences
    await prisma.skill.deleteMany({ where: { cvId: cv.id } });
    await prisma.skill.createMany({
      data: skills.map(skill => ({
        cvId: cv.id,
        name: skill.name,
      })),
    });

    // Mise à jour des langues
    await prisma.language.deleteMany({ where: { cvId: cv.id } });
    await prisma.language.createMany({
      data: languages.map(lang => ({
        cvId: cv.id,
        name: lang.name,
        proficiency: lang.proficiency,
      })),
    });

    // Mise à jour des loisirs
    await prisma.hobby.deleteMany({ where: { cvId: cv.id } });
    await prisma.hobby.createMany({
      data: hobbies.map(hobby => ({
        cvId: cv.id,
        name: hobby.name,
      })),
    });

    const updatedCv = await prisma.cV.findUnique({
      where: { userId },
      include: {
        experiences: true,
        education: true,
        skills: true,
        languages: true,
        hobbies: true,
      },
    });

    return NextResponse.json({ message: 'CV créé/mis à jour avec succès', cv: updatedCv });
  } catch (error: unknown) {
    console.error('Erreur lors de la création/mise à jour du CV :', error);
    return NextResponse.json({ message: 'Erreur lors de la création/mise à jour du CV', error: (error as Error).message }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Ajout de la déconnexion Prisma
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId est requis" }, { status: 400 });
    }

    await prisma.cV.delete({ where: { userId } });

    return NextResponse.json(
      { message: "CV supprimé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
