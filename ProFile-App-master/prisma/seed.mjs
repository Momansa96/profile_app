import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker/locale/fr";

const prisma = new PrismaClient();

faker.seed(42);

async function main() {
  console.log("Début du seeding...");

  // Nettoyage de la base (ordre correct)
  await prisma.$transaction([
    prisma.candidature.deleteMany(),
    prisma.favorite.deleteMany(),
    prisma.recruterFavorite.deleteMany(),
    prisma.task.deleteMany(),
    prisma.experience.deleteMany(),
    prisma.education.deleteMany(),
    prisma.skill.deleteMany(),
    prisma.language.deleteMany(),
    prisma.hobby.deleteMany(),
    prisma.certification.deleteMany(),
    prisma.cv.deleteMany(),
    prisma.emploi.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  console.log("Base de données nettoyée.");

  // Création de 10 utilisateurs
  for (let i = 0; i < 10; i++) {
    const isRecruiter = i % 2 === 0;
    const clerkId = `user_${faker.string.uuid()}`;

    // Création utilisateur
    const user = await prisma.user.create({
      data: {
        clerkId,
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        role: isRecruiter ? "RECRUTEUR" : "CANDIDAT",
      },
    });

    console.log(`Utilisateur créé : ${user.fullName} (${user.role})`);

    if (!isRecruiter) {
      // Création CV avec les bonnes relations
      await prisma.cv.create({
        data: {
          clerkId: user.clerkId, // Correction clé étrangère
          fullName: user.fullName,
          email: user.email,
          phone: faker.phone.number(),
          linkedin: `linkedin.com/in/${user.fullName.toLowerCase().replace(/\s/g, '-')}`,
          address: `${faker.location.streetAddress()}, ${faker.location.city()}`,
          postSeeking: faker.person.jobTitle(),
          description: faker.lorem.paragraphs(2),
          photoUrl: faker.image.avatar(),
          pdfUrl: faker.internet.url(),
          
          // Relations imbriquées
          experiences: {
            create: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => ({
              jobTitle: faker.person.jobTitle(),
              companyName: faker.company.name(),
              startDate: faker.date.past({ years: 5 }),
              endDate: faker.date.recent(),
              description: faker.lorem.sentences(2),
              tasks: {
                create: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => ({
                  content: faker.lorem.sentence()
                }))
              }
            }))
          },
          
          educations: {
            create: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => ({
              degree: faker.helpers.arrayElement(['BAC Pro', 'BTS', 'Licence', 'Master', 'MBA']),
              school: faker.company.name(),
              startDate: faker.date.past({ years: 10 }),
              endDate: faker.date.recent(),
              description: faker.lorem.sentences(1)
            }))
          },
          
          skills: {
            create: ['JavaScript', 'Python', 'Java', 'React', 'Node.js'].map(skill => ({
              name: skill,
              level: faker.helpers.arrayElement(['Débutant', 'Intermédiaire', 'Avancé'])
            }))
          },
          
          languages: {
            create: [
              { name: 'Français', proficiency: 'Natif' },
              { name: 'Anglais', proficiency: faker.helpers.arrayElement(['Intermédiaire', 'Avancé']) }
            ]
          },
          
          hobbies: {
            create: Array.from({ length: faker.number.int({ min: 2, max: 4 }) }).map(() => ({
              name: faker.helpers.arrayElement(['Voyages', 'Sport', 'Photographie', 'Lecture', 'Cuisine'])
            }))
          },
          
          certifications: {
            create: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => ({
              name: `Certification ${faker.company.buzzVerb()} ${faker.company.buzzNoun()}`
            }))
          }
        }
      });

      console.log(`CV créé pour ${user.fullName}`);
    } else {
      // Création emplois avec la bonne relation
      await prisma.emploi.createMany({
        data: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => ({
          clerkId: user.clerkId,
          jobTitle: faker.person.jobTitle(),
          companyName: faker.company.name(),
          locationJob: faker.location.city(),
          typeJob: faker.helpers.arrayElement(['CDI', 'CDD', 'Freelance']),
          description: faker.lorem.paragraphs(3),
          salary: `${faker.number.int({ min: 30000, max: 80000 })} €/an`,
          status: faker.helpers.arrayElement(['En attente', 'Publié', 'Archivé'])
        }))
      });

      console.log(`Emplois créés pour ${user.fullName}`);
    }

    // Ajoutez un délai entre les transactions pour éviter de surcharger la base de données
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Création des candidatures
  const allEmplois = await prisma.emploi.findMany();
  const allCvs = await prisma.cv.findMany();

  for (const emploi of allEmplois) {
    await prisma.candidature.createMany({
      data: faker.helpers
        .arrayElements(allCvs, faker.number.int({ min: 1, max: 5 }))
        .map(cv => ({
          clerkId: cv.clerkId,
          emploiId: emploi.id,
          status: faker.helpers.arrayElement(['En attente', 'Accepté', 'Refusé'])
        }))
    });

    console.log(`Candidatures créées pour l'emploi ${emploi.jobTitle}`);
  }

  console.log("Seeding terminé avec succès !");
}

main()
  .catch(e => {
    console.error("Erreur de seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });