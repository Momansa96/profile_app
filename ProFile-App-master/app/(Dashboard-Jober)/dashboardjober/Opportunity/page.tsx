"use client";
import { motion } from "framer-motion";
import { Search, X, Bookmark, BookmarkCheck } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const opportunities = [
  {
    id: 1,
    title: "Développeur Web Junior",
    company: "TechCorp",
    location: "Paris, France",
    type: "CDI",
    description: "Nous recherchons un développeur passionné pour rejoindre notre équipe technique.",
    salary: "40K€/an",
    datePublished: "2025-03-01"
  },
  {
    id: 2,
    title: "Designer UI/UX",
    company: "Creative Studio",
    location: "Télétravail",
    type: "Freelance",
    description: "Rejoignez notre équipe pour concevoir des interfaces innovantes et attrayantes.",
    salary: "Mission à partir de 3000€",
    datePublished: "2025-02-25"
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "BigData Solutions",
    location: "Lyon, France",
    type: "CDD",
    description: "Nous recherchons un analyste de données pour interpréter des tendances complexes.",
    salary: "50K€/an",
    datePublished: "2025-02-20"
  },
  {
    id: 4,
    title: "Community Manager",
    company: "SocialBuzz",
    location: "Marseille, France",
    type: "CDI",
    description: "Développez et animez notre communauté sur les réseaux sociaux.",
    salary: "35K€/an",
    datePublished: "2025-02-15"
  },
  {
    id: 5,
    title: "Ingénieur DevOps",
    company: "CloudTech",
    location: "Télétravail",
    type: "CDI",
    description: "Nous recherchons un ingénieur DevOps pour optimiser notre infrastructure cloud.",
    salary: "55K€/an",
    datePublished: "2025-02-10"
  },
  {
    id: 6,
    title: "Consultant SEO",
    company: "WebRank",
    location: "Lille, France",
    type: "Freelance",
    description: "Optimisez le référencement naturel de nos clients pour améliorer leur visibilité.",
    salary: "Mission à partir de 2500€",
    datePublished: "2025-02-05"
  },
  {
    id: 7,
    title: "Chef de Projet Digital",
    company: "DigitalWorks",
    location: "Bordeaux, France",
    type: "CDI",
    description: "Pilotez des projets digitaux d’envergure pour nos clients.",
    salary: "48K€/an",
    datePublished: "2025-01-30"
  },
  {
    id: 8,
    title: "Développeur Mobile",
    company: "AppTech",
    location: "Lyon, France",
    type: "CDD",
    description: "Développez des applications mobiles performantes et ergonomiques.",
    salary: "45K€/an",
    datePublished: "2025-01-25"
  },
  {
    id: 9,
    title: "Responsable Marketing",
    company: "MarketLead",
    location: "Paris, France",
    type: "CDI",
    description: "Mettez en place des stratégies marketing innovantes et efficaces.",
    salary: "50K€/an",
    datePublished: "2025-01-20"
  },
  {
    id: 10,
    title: "Rédacteur Web",
    company: "ContentPro",
    location: "Télétravail",
    type: "Freelance",
    description: "Rédigez des contenus optimisés SEO pour nos clients.",
    salary: "Mission à partir de 2000€",
    datePublished: "2025-01-15"
  },
  {
    id: 11,
    title: "Technicien Support IT",
    company: "HelpDesk Solutions",
    location: "Toulouse, France",
    type: "CDI",
    description: "Assistez nos clients et résolvez leurs problèmes informatiques.",
    salary: "30K€/an",
    datePublished: "2025-01-10"
  },
  {
    id: 12,
    title: "Graphiste",
    company: "DesignHouse",
    location: "Marseille, France",
    type: "CDI",
    description: "Créez des visuels attractifs pour nos supports marketing et publicitaires.",
    salary: "38K€/an",
    datePublished: "2025-01-05"
  },
  {
    id: 13,
    title: "Consultant Cybersécurité",
    company: "CyberSafe",
    location: "Télétravail",
    type: "CDI",
    description: "Analysez et renforcez la sécurité informatique de nos clients.",
    salary: "60K€/an",
    datePublished: "2024-12-30"
  },
  {
    id: 14,
    title: "Commercial B2B",
    company: "SalesForceX",
    location: "Nice, France",
    type: "CDI",
    description: "Développez notre portefeuille client et boostez nos ventes.",
    salary: "45K€/an + primes",
    datePublished: "2024-12-25"
  },
  {
    id: 15,
    title: "Formateur Informatique",
    company: "EduTech",
    location: "Lyon, France",
    type: "CDI",
    description: "Formez des étudiants et des professionnels aux nouvelles technologies.",
    salary: "42K€/an",
    datePublished: "2024-12-20"
  },
  {
    id: 16,
    title: "Ingénieur IA",
    company: "AI Labs",
    location: "Grenoble, France",
    type: "CDI",
    description: "Développez des solutions d’intelligence artificielle innovantes.",
    salary: "70K€/an",
    datePublished: "2024-12-15"
  },
  {
    id: 17,
    title: "Assistant RH",
    company: "HR Solutions",
    location: "Strasbourg, France",
    type: "Stage",
    description: "Assistez notre équipe RH dans le recrutement et la gestion administrative.",
    salary: "Indemnité : 900€/mois",
    datePublished: "2024-12-10"
  },
  {
    id: 18,
    title: "Responsable E-commerce",
    company: "ShopMaster",
    location: "Paris, France",
    type: "CDI",
    description: "Gérez et développez notre activité de vente en ligne.",
    salary: "50K€/an",
    datePublished: "2024-12-05"
  },
  {
    id: 19,
    title: "Animateur 3D",
    company: "PixMotion",
    location: "Télétravail",
    type: "Freelance",
    description: "Créez des animations 3D pour nos productions multimédias.",
    salary: "Mission à partir de 4000€",
    datePublished: "2024-12-01"
  },
  {
    id: 20,
    title: "Juriste en Droit du Numérique",
    company: "LegalTech",
    location: "Lille, France",
    type: "CDI",
    description: "Accompagnez nos clients dans les questions juridiques liées au numérique.",
    salary: "55K€/an",
    datePublished: "2024-11-25"
  },
];

export default function OpportunityPage() {
  const [selectedOpportunity, setSelectedOpportunity] = useState<typeof opportunities[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sortBySidebar, setSortBySidebar] = useState(""); // État pour le tri de la sidebar ("recent" ou "oldest")

  useEffect(() => {
    // Charger les favoris depuis le localStorage au montage du composant
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    // Sauvegarder les favoris dans le localStorage à chaque modification
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);


  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredOpportunities = opportunities.filter((job) => {
    return (
      (searchTerm === "" || job.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedType === "" || job.type === selectedType) &&
      (selectedLocation === "" || job.location === selectedLocation)
    );
  });

  const handleSortByChangeSidebar = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBySidebar(e.target.value);
  };

  // Tri des opportunités pour la sidebar uniquement
  const sortedSidebarOpportunities = [...opportunities].sort((a, b) => {
    if (sortBySidebar === "recent") {
      return new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime();
    } else if (sortBySidebar === "oldest") {
      return new Date(a.datePublished).getTime() - new Date(b.datePublished).getTime();
    }
    return 0;
  });

  return (
    <div className='flex flex-col gap-2 h-screen'>
      <div className="container mx-auto no-scrollbar p-4 mt-14 flex gap-6 ">
        {/* Sidebar */}
        <aside className="hidden md:block w-1/4 h-screen  no-scrollbar overflow-hidden bg-white p-4 rounded-lg shadow-md">
          <div className='flex flex-col bg-white z-20'>
            <div className="flex justify-between items-center mb-2 gap-2">
              <h3 className="text-lg font-semibold text-teal-600">
                Dernières Opportunités
              </h3>
              <p className='text-sm'>{opportunities.length} Jobs</p>
            </div>
            <select
              className="select select-bordered w-full mb-4"
              value={sortBySidebar}
              onChange={handleSortByChangeSidebar}
            >
              <option value="">Trier par date</option>
              <option value="recent">Plus récent </option>
              <option value="oldest">Plus ancien </option>
            </select>
          </div>
          <div className='flex flex-col gap-4 scrollable no-scrollbar overflow-hidden'>
            <div className="space-y-3 mt-2">
              {sortedSidebarOpportunities.slice(-4).map((job) => (
                <div key={job.id} className="bg-gray-100 p-3 rounded-md shadow-sm hover:bg-gray-200 cursor-pointer" onClick={() => setSelectedOpportunity(job)}>
                  <h4 className="text-sm font-medium text-gray-800">{job.title}</h4>
                  <p className="text-xs text-gray-600">{job.company} - {job.location}</p>
                  <p className="text-xs text-gray-600">Type: {job.type}</p>
                  <p className="text-xs text-gray-600">Salaire: {job.salary}</p>
                  <p className="text-xs text-gray-600">Date: {job.datePublished}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 text-teal-600">Favoris</h3>
              <div className="space-y-3">
                {opportunities
                  .filter((job) => favorites.includes(job.id))
                  .map((job) => (
                    <div key={job.id} className="bg-gray-100 p-3 rounded-md shadow-sm hover:bg-gray-200 cursor-pointer" onClick={() => setSelectedOpportunity(job)}>
                      <h4 className="text-sm font-medium text-gray-800">{job.title}</h4>
                      <p className="text-xs text-gray-600">{job.company} - {job.location}</p>
                      <p className="text-xs text-gray-600">Type: {job.type}</p>
                      <p className="text-xs text-gray-600">Salaire: {job.salary}</p>
                      <p className="text-xs text-gray-600">Date: {job.datePublished}</p>
                    </div>
                  ))}
                {favorites.length === 0 && <p className="text-sm text-gray-500">Aucun favori enregistré.</p>}
              </div>
            </div>
          </div>
        </aside>

        {/* Contenu principal */}
        <div className="w-full md:w-3/4 h-screen scrollable-preview no-scrollbar overflow-hidden">
          {/* Filtres */}
          <div className="flex flex-wrap w-auto gap-4 mb-2 ">
            <div className='flex gap-1 relative'>
              <input
                type="text"
                placeholder="Rechercher une opportunité..."
                className="input input-bordered w-auto pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className='w-11 absolute right-0 top-3 px-3' />
            </div>
            <select className="select select-bordered" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option value="">Type d&apos;opportunité</option>
              <option value="Stage">Stage</option>
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Freelance">Freelance</option>
              <option value="Alternance">Alternance</option>
            </select>
            <select className="select select-bordered" value={selectedExperience} onChange={(e) => setSelectedExperience(e.target.value)}>
              <option value="">Expérience requise</option>
              <option value="Débutant">Débutant</option>
              <option value="Intermédiaire">Intermédiaire</option>
              <option value="Confirmé">Confirmé</option>
            </select>
            <select className="select select-bordered" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
              <option value="">Localisation</option>
              <option value="Paris">Paris</option>
              <option value="Lyon">Lyon</option>
              <option value="Marseille">Marseille</option>
              <option value="Télétravail">Télétravail</option>
            </select>
          </div>

          {/* Liste des opportunités */}
          <div className="grid md:grid-cols-2 gap-4 scrollable-preview no-scrollbar overflow-hidden  mt-2">
            {filteredOpportunities.map((job) => (
              <div key={job.id} className="card bg-white shadow-md cursor-pointer hover:shadow-lg transition p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
                  <button onClick={(e) => {
                    e.stopPropagation(); // Empêche la propagation à la carte
                    toggleFavorite(job.id);
                  }} className="text-gray-600 hover:text-teal-500">
                    {favorites.includes(job.id) ? <BookmarkCheck size={24} fill='teal' /> : <Bookmark size={24} />}
                  </button>
                </div>
                <p className="text-sm text-gray-600">{job.company} - {job.location}</p>
                <p className="text-gray-500 text-sm mt-1">{job.description.substring(0, 60)}...</p>
                <p className="text-teal-600 font-medium mt-1">{job.salary}</p>
                <p className="text-gray-500 text-sm mt-1">Date de publication: {job.datePublished}</p>
                <button className="text-teal-500 text-sm mt-2" onClick={() => setSelectedOpportunity(job)}>Voir plus</button>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {selectedOpportunity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
              <button className="absolute top-2 right-2 text-gray-600 hover:text-red-500" onClick={() => setSelectedOpportunity(null)}>
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold text-gray-800">{selectedOpportunity.title}</h2>
              <p className="text-gray-600 mt-1">{selectedOpportunity.company} - {selectedOpportunity.location}</p>
              <p className="mt-2 text-gray-700">{selectedOpportunity.description}</p>
              <p className="text-teal-600 font-semibold mt-2">{selectedOpportunity.salary}</p>
              <button className="btn btn-outline btn-teal-600 w-full mt-4">Postuler</button>
            </motion.div>
          </div>
        )}
      </div>
    </div>

  );
}
