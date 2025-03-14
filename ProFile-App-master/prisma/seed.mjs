import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker/locale/fr";

const prisma = new PrismaClient();

// Config Faker pour des données françaises
faker.seed(42);

async function main() {
  console.log("Début du seeding...");

  // Nettoyage de la base
  await prisma.$transaction([
    prisma.candidature.deleteMany(),
    prisma.emploi.deleteMany(),
    prisma.task.deleteMany(),
    prisma.experience.deleteMany(),
    prisma.education.deleteMany(),
    prisma.skill.deleteMany(),
    prisma.language.deleteMany(),
    prisma.hobby.deleteMany(),
    prisma.certification.deleteMany(),
    prisma.cv.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Création de 20 utilisateurs réalistes
  for (let i = 0; i < 20; i++) {
    const isRecruiter = i % 5 === 0; // 20% de recruteurs

    // Création utilisateur
    const user = await prisma.user.create({
      data: {
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        role: isRecruiter ? "RECRUTEUR" : "CANDIDAT",
      },
    });

    if (!isRecruiter) {
      // Création CV pour les candidats
      const cv = await prisma.cv.create({
        data: {
          userId: user.id,
          fullName: user.fullName,
          email: user.email,
          phone: faker.phone.number(),
          linkedin: `https://linkedin.com/in/${user.fullName.toLowerCase().replace(/\s/g, '-')}`,
          address: `${faker.location.streetAddress()}, ${faker.location.city()}`,
          postSeeking: faker.person.jobTitle(),
          description: faker.lorem.paragraphs(2),
          photoUrl: faker.image.avatar(),
          pdfUrl: faker.internet.url(),
        },
      });

      // Expériences professionnelles
      for (let j = 0; j < faker.number.int({ min: 1, max: 3 }); j++) {
        const experience = await prisma.experience.create({
          data: {
            cvId: cv.id,
            jobTitle: faker.person.jobTitle(),
            companyName: faker.company.name(),
            startDate: faker.date.past({ years: 5 }),
            endDate: faker.date.recent(),
            description: faker.lorem.sentences(2),
          },
        });

        // Tâches associées
        await prisma.task.createMany({
          data: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => ({
            experienceId: experience.id,
            content: faker.lorem.sentence(),
          })),
        });
      }

      // Formations
      const diplomes = ['BAC Pro', 'BTS', 'Licence', 'Master', 'MBA'];
      await prisma.education.createMany({
        data: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => ({
          cvId: cv.id,
          degree: faker.helpers.arrayElement(diplomes),
          school: faker.company.name(),
          startDate: faker.date.past({ years: 10 }),
          endDate: faker.date.recent(),
          description: faker.lorem.sentences(1),
        })),
      });

      // Compétences techniques
      const techSkills = ['JavaScript', 'Python', 'Java', 'React', 'Node.js'];
      await prisma.skill.createMany({
        data: techSkills.map(skill => ({
          cvId: cv.id,
          name: skill,
          level: faker.helpers.arrayElement(['Débutant', 'Intermédiaire', 'Avancé']),
        })),
      });

      // Langues
      await prisma.language.createMany({
        data: [
          { cvId: cv.id, name: 'Français', proficiency: 'Natif' },
          { cvId: cv.id, name: 'Anglais', proficiency: faker.helpers.arrayElement(['Intermédiaire', 'Avancé']) },
        ],
      });

      // Loisirs
      await prisma.hobby.createMany({
        data: Array.from({ length: faker.number.int({ min: 2, max: 4 }) }).map(() => ({
          cvId: cv.id,
          name: faker.helpers.arrayElement(['Voyages', 'Sport', 'Photographie', 'Lecture', 'Cuisine']),
        })),
      });

      // Certifications
      await prisma.certification.createMany({
        data: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => ({
          cvId: cv.id,
          name: `Certification ${faker.company.buzzVerb()} ${faker.company.buzzNoun()}`,
        })),
      });
    } else {
      // Création d'offres d'emploi pour les recruteurs
      await prisma.emploi.createMany({
        data: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => ({
          userId: user.id,
          jobTitle: faker.person.jobTitle(),
          companyName: faker.company.name(),
          locationJob: faker.location.city(),
          typeJob: faker.helpers.arrayElement(['CDI', 'CDD', 'Freelance']),
          description: faker.lorem.paragraphs(3),
          salary: `${faker.number.int({ min: 30000, max: 80000 })} €/an`,
          status: faker.helpers.arrayElement(['En attente', 'Publié', 'Archivé']),
        })),
      });
    }
  }

  // Création de candidatures réalistes
  const allEmplois = await prisma.emploi.findMany();
  const allCvs = await prisma.cv.findMany();

  for (const emploi of allEmplois) {
    const candidats = faker.helpers.arrayElements(allCvs, faker.number.int({ min: 1, max: 5 }));
    
    await prisma.candidature.createMany({
      data: candidats.map(cv => ({
        cvId: cv.id,
        emploiId: emploi.id,
        status: faker.helpers.arrayElement(['En attente', 'Accepté', 'Refusé']),
      })),
    });
  }

  console.log("Seeding terminé avec succès !");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
