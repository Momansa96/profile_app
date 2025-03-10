"use server"
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Méthode non autorisée' });
    }

    try {
        const { userId, personalDetails, experiences, educations, skills, languages, hobbies } = req.body;

        // Vérifier si un CV existe déjà pour l'utilisateur
        let existingCv = await prisma.cV.findFirst({
            where: { userId }
        });

        if (!existingCv) {
            // Créer un CV
            existingCv = await prisma.cV.create({
                data: {
                    userId,
                    title: personalDetails.postSeeking,
                    description: personalDetails.description
                }
            });
        }

        const cvId = existingCv.id;

        // Insérer les expériences
        await prisma.experience.createMany({
            data: experiences.map((exp: { companyName: string; jobTitle: string; description: string; startDate: number; endDate: number; }) => ({
                cvId,
                entreprise: exp.companyName,
                poste: exp.jobTitle,
                description: exp.description,
                dateDebut: exp.startDate,
                dateFin: exp.endDate
            }))
        });

        // Insérer les formations
        await prisma.education.createMany({
            data: educations.map((edu: { school: string; degree: string; startDate: number; endDate: number; }) => ({
                cvId,
                établissement: edu.school,
                diplôme: edu.degree,
                dateDebut: edu.startDate,
                dateFin: edu.endDate
            }))
        });

        // Insérer les compétences
        await prisma.skill.createMany({
            data: skills.map((skill: { name: string; }) => ({
                cvId,
                compétence: skill.name
            }))
        });

        // Insérer les langues
        await prisma.language.createMany({
            data: languages.map((lang: { language: string; proficiency: string; }) => ({
                cvId,
                langue: lang.language,
                niveau: lang.proficiency
            }))
        });

        // Insérer les loisirs
        await prisma.hobby.createMany({
            data: hobbies.map((hobby: { name: string; }) => ({
                cvId,
                loisir: hobby.name
            }))
        });

        res.status(200).json({ message: 'CV publié avec succès !', cvId });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}
