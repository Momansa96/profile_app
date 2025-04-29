"use client";
import { motion } from "framer-motion";
import { Search, X, Bookmark, BookmarkCheck } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addApplication, addFavorite, checkCvExists, getApplications, getFavorites, getJobs, removeApplication, removeFavorite, } from "@/app/actions";
import { Emploi } from "@prisma/client";
import { useUser } from '@clerk/nextjs';





export default function OpportunityPage() {
  const [opportunities, setOpportunities] = useState<Emploi[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Emploi | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [applications, setApplications] = useState<{ emploiId: string, status: string }[]>([]);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
const [rightSidebarOpen, setRightSidebarOpen] = useState(false);


  const { user } = useUser();
  const clerkId = user?.id ?? '';
  useEffect(() => {
    //Charger les offres d'emploi depuis la base de donnee
    async function fetchJobs() {
      try {
        const jobs = await getJobs();
        setOpportunities(jobs);
      } catch (error) {
        console.error("Erreur lors de la récupération des emplois :", error);
        toast.error("Impossible de récupérer les opportunités.");
      }
    }

    fetchJobs();
  }, [clerkId]);

  useEffect(() => {
    // Charger les candidatures depuis la base de données au montage du composant
    async function fetchApplications() {
      try {
        const applications = await getApplications(clerkId);
        setApplications(applications);
      } catch (error) {
        console.error("Erreur lors de la récupération des candidatures :", error);
        toast.error("Impossible de récupérer les candidatures.");
      }
    }

    fetchApplications();
  }, [clerkId]);




  useEffect(() => {
    // Charger les favoris depuis la base de données au montage du composant
    async function fetchFavorites() {
      try {
        // Remplacez par l'ID de l'utilisateur actuel
        const favorites = await getFavorites(clerkId);
        setFavorites(favorites);
      } catch (error) {
        console.error("Erreur lors de la récupération des favoris :", error);
        toast.error("Impossible de récupérer les favoris.");
      }
    }

    fetchFavorites();
  }, [clerkId]);

  const toggleFavorite = async (id: string) => {
    try {
      if (favorites.includes(id)) {
        // Retirer des favoris
        await removeFavorite(clerkId, id);
        setFavorites(favorites.filter(favId => favId !== id));
        toast.info("Retiré des favoris.");
      } else {
        // Ajouter aux favoris
        await addFavorite(clerkId, id);
        setFavorites([...favorites, id]);
        toast.success("Ajouté aux favoris.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des favoris :", error);
      toast.error("Impossible de mettre à jour les favoris.");
    }
  };








  const [sortOrder, setSortOrder] = useState<string>("");

  const handleSort = (order: string) => {
    setSortOrder(order);
  };

  const sortedRecentOpportunities = opportunities
    .slice(-2) // Limite aux 2 dernières opportunités
    .sort((a, b) => {
      if (sortOrder === "recent") {
        return new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime();
      } else if (sortOrder === "oldest") {
        return new Date(a.datePublished).getTime() - new Date(b.datePublished).getTime();
      }
      return 0;
    });

  const filteredOpportunities = opportunities.filter((job) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (searchTerm === "" || job.jobTitle.toLowerCase().includes(searchTermLower)) &&
      (selectedType === "" || job.typeJob === selectedType) &&
      (selectedLocation === "" || job.locationJob === selectedLocation)
    );
  });



  const handleApply = async (id: string) => {
    try {
      // Vérifiez que le CV existe pour le clerkId
      const cvExists = await checkCvExists(clerkId);
      if (!cvExists) {
        toast.error("Veuillez publier votre CV avant de postuler.");
        return;
      }

      // Vérifiez que l'emploi existe
      const emploi = opportunities.find((job) => job.id === id);
      if (!emploi) {
        throw new Error("L'emploi n'existe pas.");
      }

      // Vérifiez si l'utilisateur a déjà postulé à cet emploi
      const hasApplied = applications.some(
        (app) => app.emploiId === id

      );
      if (hasApplied) {
        toast.error("Vous avez déjà postulé à cet emploi.");
        return;
      }

      // Ajoutez la candidature
      await addApplication(clerkId, id);
      setApplications([
        ...applications,
        { emploiId: id, status: "En attente" },
      ]);
      toast.success("Candidature envoyée.");
      setSelectedOpportunity(null);
    } catch (error) {
      console.error("Erreur lors de l'envoi de la candidature :", error);
      toast.error("Impossible d'envoyer la candidature.");
    }
  };


  const handleCancelApply = async (id: string) => {
    try {
      await removeApplication(clerkId, id);
      setApplications(applications.filter(app => app.emploiId !== id));
      toast.info("Candidature annulée.");
    } catch (error) {
      console.error("Erreur lors de l'annulation de la candidature :", error);
      toast.error("Impossible d'annuler la candidature.");
    }
  };

  return (
    <>

      <div className="flex flex-col md:flex-row gap-4 h-[80vh] container no-scrollbar mt-2 sm:mt-14">

        <div className={`flex flex-col md:flex-row gap-6 h-[90vh] container no-scrollbar `}>

          <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
          {/* Sidebar Gauche */}
          <aside className={`${leftSidebarOpen ? "block" : "hidden"} md:block md:w-1/4 h-full overflow-y-auto bg-white p-4 rounded-lg shadow-md`}>
            {/* Section "Nouveautés" */}
            <div className="flex flex-col bg-white z-20 sticky -top-4">
              <div className="flex justify-between items-center mb-4   ">
                <h3 className="text-lg font-semibold text-teal-600">Nouveautés</h3>
                <p className="text-sm text-gray-500">{opportunities.length} Opportunités</p>
              </div>
              {/* Bouton toggle sidebar sur mobile */}
              <button className="md:hidden p-2 mb-2  bg-teal-500 text-white rounded" onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}>
                {leftSidebarOpen ? "Opportunites" : "Favoris"}
              </button>
              <select
                className="select select-bordered w-full mb-4"
                onChange={(e) => handleSort(e.target.value)} // Ajout d'une fonction pour gérer le tri
              >
                <option value="">Trier par date</option>
                <option value="recent">Plus récent</option>
                <option value="oldest">Plus ancien</option>
              </select>

            </div>

            {/* Liste des opportunités */}
            <div className="flex flex-col gap-4 scrollable no-scrollbar overflow-y-auto">
              {/* Opportunités récentes */}
              <div className="space-y-3 mt-2">
                {sortedRecentOpportunities.map((job) => (
                  <div
                    key={job.id}
                    className="bg-gray-100 p-3 rounded-md shadow-sm hover:bg-gray-200 cursor-pointer transition"
                    onClick={() => setSelectedOpportunity(job)}
                  >
                    <h4 className="text-sm font-medium text-gray-800">{job.jobTitle}</h4>
                    <p className="text-xs text-gray-600">{job.companyName} - {job.locationJob}</p>
                    <p className="text-xs text-gray-600">Type: {job.typeJob}</p>
                    <p className="text-xs text-gray-600">Salaire: {job.salary}</p>
                    <p className="text-xs text-gray-600">Date: {new Date(job.datePublished).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>

              {/* Favoris */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4 text-teal-600">Favoris</h3>
                <div className="space-y-3">
                  {opportunities
                    .filter((job) => favorites.includes(job.id))
                    .map((job) => (
                      <div
                        key={job.id}
                        className="bg-gray-100 p-3 rounded-md shadow-sm hover:bg-gray-200 cursor-pointer transition"
                        onClick={() => setSelectedOpportunity(job)}
                      >
                        <h4 className="text-sm font-medium text-gray-800">{job.jobTitle}</h4>
                        <p className="text-xs text-gray-600">{job.companyName} - {job.locationJob}</p>
                        <p className="text-xs text-gray-600">Type: {job.typeJob}</p>
                        <p className="text-xs text-gray-600">Salaire: {job.salary}</p>
                        <p className="text-xs text-gray-600">Date: {job.datePublished.toLocaleDateString()}</p>
                      </div>
                    ))}
                  {favorites.length === 0 && (
                    <p className="text-sm text-gray-500">Aucun favori enregistré.</p>
                  )}
                </div>
              </div>
            </div>
          </aside>


          {/* Contenu principal */}
          <div className="flex-1 h-full overflow-y-auto  bg-gray-50 p-1 pt-0  rounded-lg shadow-md relative">
            {/* Filtres */}
            <div className="flex flex-wrap w-full gap-2 bg-gray-50 mb-2 sticky  md:top-0 md:left-4 md:right-4 p-2   rounded-md ">
              {/* Champ de recherche */}
              <div className="flex gap-2 relative w-full md:w-auto">
                {/* Bouton toggle sidebar sur mobile */}
                <button className="md:hidden p-2  bg-teal-600 text-white rounded" onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}>
                  {leftSidebarOpen ? "Fermer Sidebar" : "Favoris"}
                </button>
                <input
                  type="text"
                  placeholder="Rechercher une opportunité..."
                  className="input input-bordered w-full md:w-auto pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="w-6 h-6 absolute right-2 top-3 text-gray-500" />
              </div>

              {/* Filtre par type */}
              <select
                className="select select-bordered w-full md:w-auto"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">Type d&apos;opportunité</option>
                <option value="Stage">Stage</option>
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Freelance">Freelance</option>
                <option value="Alternance">Alternance</option>
              </select>

              {/* Filtre par localisation */}
              <div className="flex gap-2 relative w-full md:w-auto">
                <select
                  className="select select-bordered w-full md:w-auto"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">Localisation</option>
                  {Array.from(new Set(opportunities.map((job) => job.locationJob))).map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
                <button className="md:hidden p-2  bg-teal-600 text-white rounded" onClick={() => setRightSidebarOpen(!rightSidebarOpen)}>
                  {rightSidebarOpen ? "Fermer Sidebar" : "Candidatures"}
                </button>
              </div>
            </div>


            {/* Liste des opportunités */}
            <div className="grid md:grid-cols-1  gap-4 scrollable-preview no-scrollbar overflow-hidden ">
              {filteredOpportunities.length > 0 ? (
                filteredOpportunities.map((job) => (
                  <div key={job.id} className="card bg-white shadow-md cursor-pointer hover:shadow-lg transition p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-800">{job.jobTitle}</h2>
                      <button onClick={(e) => {
                        e.stopPropagation(); // Empêche la propagation à la carte
                        toggleFavorite((job.id));
                      }} className="text-gray-600 hover:text-teal-500">
                        {favorites.includes(job.id) ? <BookmarkCheck size={24} fill='teal' /> : <Bookmark size={24} />}
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">{job.companyName} - {job.locationJob}</p>
                    <p className="text-gray-500 text-sm mt-1">{job.description.substring(0, 60)}...</p>
                    <p className="text-teal-600 font-medium mt-1">{job.salary}</p>
                    <p className="text-gray-500 text-sm mt-1">Date de publication: {new Date(job.datePublished).toLocaleDateString()}</p>
                    <button className="text-white text-sm mt-2 bg-teal-600 p-2 rounded-md" onClick={() => setSelectedOpportunity(job)}>Visualiser l&apos;offre</button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Aucune opportunité trouvée.</p>)
              }


            </div>
          </div>

          {/* Sidebar Droite (Suivi des Candidatures) */}
          <aside className={`${rightSidebarOpen ? "block" : "hidden"}  md:block md:w-1/4 h-full overflow-y-auto bg-white p-4 rounded-lg shadow-md`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold mb-4 text-teal-600">Suivre mes candidatures</h3>
              <button className="md:hidden p-2 mb-2  bg-teal-500 text-white rounded" onClick={() => setRightSidebarOpen(!rightSidebarOpen)}>
                {rightSidebarOpen ? "Opportunites" : "Favoris"}
              </button>
            </div>
            {applications.length > 0 ? (
              opportunities
                .filter((job) => applications.some(app => app.emploiId === job.id))
                .map((job) => (
                  <div key={job.id} className="bg-white p-3 rounded-md shadow-sm mb-3 relative overflow-hidden">
                    {(() => {
                      const currentApp = applications.find(app => app.emploiId === job.id);
                      if (!currentApp) return null;

                      const baseClasses = "text-sm rounded-badge px-2 py-1 border-2 absolute top-1 right-1 font-medium";

                      const statusStyles = {
                        "En cours": "text-orange-500 border-orange-500 bg-orange-100",
                        "Accepter": "text-green-500 border-green-500 bg-green-100",
                        "Rejeter": "text-red-500 border-red-500 bg-red-100",
                      };
                      const statusClasses = statusStyles[currentApp.status as keyof typeof statusStyles] || "text-gray-500 border-gray-500 bg-gray-300";


                      return (
                        <span className={`${baseClasses} ${statusClasses}`}>
                          {currentApp.status}
                        </span>
                      );
                    })()}


                    <div className="my-8">
                      <h4 className="text-sm font-medium text-gray-800">{job.jobTitle}</h4>
                      <p className="text-xs text-gray-600">{job.companyName} - {job.locationJob}</p>
                    </div>
                    <span className="text-md  px-2 cursor-pointer py-1  rounded-md absolute -left-1 -bottom-1 bg-red-400" onClick={() => handleCancelApply(job.id)}>Annuler</span>
                  </div>
                ))
            ) : (
              <p className="text-sm text-gray-500">Aucune candidature pour le moment.</p>
            )}
          </aside>

          {/* Modal */}
          {selectedOpportunity && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                <button className="absolute top-2 right-2 text-gray-600 hover:text-red-500" onClick={() => setSelectedOpportunity(null)}>
                  <X size={24} />
                </button>
                <h2 className="text-2xl font-bold text-gray-800">{selectedOpportunity.jobTitle}</h2>
                <p className="text-gray-600 mt-1">{selectedOpportunity.companyName} - {selectedOpportunity.locationJob}</p>
                <p className="mt-2 text-gray-700">{selectedOpportunity.description}</p>
                <p className="text-teal-600 font-semibold mt-2">{selectedOpportunity.salary}</p>
                <button className="btn btn-outline btn-teal-600 w-full mt-4"
                  onClick={() => {
                    handleApply(selectedOpportunity.id);
                  }}
                >Postuler</button>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>

  );
}


