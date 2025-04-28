"use client";
import React, { useEffect, useState } from "react";
import { Search, Briefcase, Star, PlusCircle, X, UserSearch, UserCheck, CircleHelp, Bell, Filter, BookmarkPlus, BookmarkMinus, Mail, Eye, Pen, Trash2, Download, CirclePlus, CircleMinus, } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { addCandidateFavorite, checkAndAddUser, createJobOffer, deleteJobOffer, getAllJobOffers, getCandidateFavorites, getDataJober, getJobApplications, removeCandidateFavorite, updateCandidateStatus, updateJobOffer, } from "../../actions";



type JobOffer = {
    id: string;
    jobTitle: string;
    companyName: string;
    locationJob: string;
    typeJob: string;
    description: string;
    salary?: string | null;
};

type CandidatureStatus = "En cours" | "Accepter" | "Rejeter";
type Candidate = {
    id: string;
    clerkId: string;
    fullName: string;
    email: string;
    phone: string;
    linkedin: string | null;
    address: string;
    postSeeking: string;
    description: string | null;
    photoUrl: string;
    pdfUrl: string | null;
    jobTitle?: string;
    createdAt: Date;
    updatedAt: Date;
};




const RecruiterDashboard = () => {
    const { user, isSignedIn } = useUser();
    const clerkId = user?.id;
    const [search, setSearch] = useState("");
    const [selectedPosition, setSelectedPosition] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [favorites, setFavorites] = useState<Candidate[]>([]);
    const [activeTab, setActiveTab] = useState("candidates");
    const [showJobForm, setShowJobForm] = useState(false);
    const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
    const [newJob, setNewJob] = useState<JobOffer>({
        id: "",
        jobTitle: "",
        companyName: "",
        locationJob: "",
        typeJob: "",
        description: "",
        salary: ""
    });
    const [editingJob, setEditingJob] = useState<JobOffer | null>(null);
    const [previewJob, setPreviewJob] = useState<JobOffer | null>(null);
    const [jobToDelete, setJobToDelete] = useState<string | null>(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [userAdded, setUserAdded] = useState(false);
    const [jobApplications, setJobApplications] = useState<Candidate[]>([]);
    const [newApplicationsCount, setNewApplicationsCount] = useState(0);
    const [showVerdictModal, setShowVerdictModal] = useState(false);
    const [candidateToVerdict, setCandidateToVerdict] =
        useState<Candidate | null>(null);
    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const data = await getDataJober();
                if (Array.isArray(data)) {
                    // Correct mapping based on your schema
                    const mappedCandidates: Candidate[] = data.map((item: Candidate) => ({
                        id: item.id,
                        clerkId: item.clerkId,
                        fullName: item.fullName,
                        email: item.email,
                        phone: item.phone,
                        linkedin: item.linkedin || null,
                        address: item.address,
                        postSeeking: item.postSeeking || "",
                        description: item.description || null,
                        photoUrl: item.photoUrl || "",
                        pdfUrl: item.pdfUrl || null,
                        createdAt: new Date(item.createdAt),
                        updatedAt: new Date(item.updatedAt),

                    }));
                    setCandidates(mappedCandidates);
                } else {
                    console.error("Failed to fetch candidates");
                }
            } catch (error) {
                console.error("Error fetching candidates:", error);
            }
        };


        fetchCandidates();
    }, []);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                if (clerkId) {
                    const favoriteIds = await getCandidateFavorites(clerkId);
                    const favoriteCandidates = candidates.filter(candidate => favoriteIds.includes(candidate.id));
                    setFavorites(favoriteCandidates);
                } else {
                    console.error("User ID is missing");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des favoris :", error);
            }
        };
        if (clerkId && candidates.length > 0) {
            fetchFavorites();
        }

    }, [clerkId, candidates,]
    );
    useEffect(() => {
        const fetchApplications = async () => {
            if (!clerkId) return;
            try {
                const applications = await getJobApplications(clerkId);
                setNewApplicationsCount(applications.length); // Update count when applications are fetched
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des candidatures :",
                    error
                );
            }
        };

        fetchApplications();
    }, [clerkId]);


    const toggleFavorite = async (candidateId: string) => {
        if (!clerkId) {
            console.error("Cet utilisateur n'est pas connecté");
            return;
        }
        try {
            if (favorites.map(fav => fav.id).includes(candidateId)) {
                await removeCandidateFavorite(clerkId, candidateId);
                setFavorites(favorites.filter(fav => fav.id !== candidateId));
            } else {
                await addCandidateFavorite(clerkId, candidateId);
                const candidate = candidates.find(c => c.id === candidateId);
                if (candidate) {
                    setFavorites([...favorites, candidate]);
                }
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour des favoris :", error);
        }
    };

    useEffect(() => {
        const fetchJobOffers = async () => {
            if (!clerkId) {
                console.error("Cet utilisateur n'est pas connecté");
                return;
            }
            try {
                const jobs = await getAllJobOffers(clerkId) as JobOffer[];
                setJobOffers(jobs);
            } catch (err) {
                console.error("Erreur lors de la récupération des offres :", err);
            }
        };

        if (clerkId) {
            fetchJobOffers();
        }
    }, [clerkId]);


    const filteredCandidates = (activeTab === "candidates"
        ? candidates
        : activeTab === "favorites"
            ? favorites
            : activeTab === "candidatures"
                ? jobApplications // Affiche les candidatures si l'onglet est actif
                : candidates // Par défaut, affiche tous les candidats
    ).filter((c) =>
        c.fullName.toLowerCase().includes(search.toLowerCase()) &&
        (selectedPosition ? c.postSeeking === selectedPosition : true) &&
        (selectedLocation ? c.address === selectedLocation : true)
    );

    const handleJobSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!clerkId) {
            console.error("User ID is missing");
            return;
        }

        // Validation des champs obligatoires
        const { jobTitle, companyName, locationJob, typeJob, description } = newJob;
        if (!jobTitle || !companyName || !locationJob || !typeJob || !description) {
            console.error("All fields are required");
            return;
        }

        try {
            if (editingJob) {
                // Mise à jour de l'offre d'emploi existante
                await handleUpdateJob(editingJob.id, {
                    jobTitle,
                    companyName,
                    locationJob,
                    typeJob,
                    description,
                    salary: newJob.salary
                });
            } else {
                // Création d'une nouvelle offre d'emploi
                const result = await createJobOffer(newJob, clerkId);
                if (result.success && result.job) {
                    setJobOffers((prev) => [...prev, result.job!]);
                } else {
                    console.error("Error creating job offer:", result.error);
                }
            }

            // Réinitialiser le formulaire et fermer le modal
            setNewJob({ id: "", jobTitle: "", companyName: "", locationJob: "", typeJob: "", description: "", salary: "" });
            setShowJobForm(false);
            setEditingJob(null);
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    };

    const handleUpdateJob = async (jobId: string, updatedJobData: Omit<JobOffer, 'id'>) => {
        if (!clerkId) {
            console.error("User ID is missing");
            return;
        }

        try {
            const result = await updateJobOffer(jobId, updatedJobData, clerkId);
            if (result.success && result.job) {
                setJobOffers((prev) =>
                    prev.map((job) => (job.id === jobId ? result.job! : job))
                );
                setEditingJob(null);
            } else {
                console.error("Error updating job offer:", result.error);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    };

    const handleDeleteJob = async (jobId: string) => {
        if (!clerkId) {
            console.error("User ID is missing");
            return;
        }

        try {
            const result = await deleteJobOffer(jobId, clerkId);
            if (result.success) {
                setJobOffers((prev) => prev.filter((job) => job.id !== jobId));
                setShowConfirmationModal(false);
            } else {
                console.error("Error deleting job offer:", result.error);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    };




    const openConfirmationModal = (jobId: string) => {
        setJobToDelete(jobId);
        setShowConfirmationModal(true);
    };


    const handleViewProfile = (candidate: Candidate) => {
        setSelectedCandidate(candidate);
    };

    const handleCloseProfile = () => {
        setSelectedCandidate(null);
    };



    const handleDownloadCV = () => {
        // Logique pour télécharger le CV
        alert(`Télécharger le CV de ${selectedCandidate?.fullName}`);
    };

    useEffect(() => {
        const addUser = async () => {
            if (user && clerkId && !userAdded) {
                try {
                    const email = user?.emailAddresses?.[0]?.emailAddress;
                    const fullName = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : "";
                    await checkAndAddUser(email, fullName, clerkId);
                    setUserAdded(true); // Mettre à jour l'état pour indiquer que l'utilisateur a été ajouté
                } catch (error) {
                    console.error("Erreur lors de l'ajout de l'utilisateur :", error);
                }
            }
        };

        addUser();
    }, [user, clerkId, userAdded]);

    useEffect(() => {
        const fetchJobApplications = async () => {
            if (!clerkId) return;
            try {
                const applications = await getJobApplications(clerkId);
                setJobApplications(applications);
            } catch (error) {
                console.error("Erreur lors de la récupération des candidatures :", error);
            }
        };

        fetchJobApplications();
    }, [clerkId]);

    const handleOpenVerdictModal = (candidate: Candidate) => {
        setCandidateToVerdict(candidate);
        setShowVerdictModal(true);
    };

    const handleCloseVerdictModal = () => {
        setCandidateToVerdict(null);
        setShowVerdictModal(false);
    };

    const handleUpdateCandidateStatus = async (newStatus: CandidatureStatus) => {
        if (!candidateToVerdict) return;

        try {
            // Appel de la Server Action
            const result = await updateCandidateStatus(candidateToVerdict.id, newStatus);

            if (result.success) {
                // Mise à jour de l'état local des candidats
                setCandidates((prevCandidates) =>
                    prevCandidates.map((candidate) =>
                        candidate.id === candidateToVerdict.id
                            ? { ...candidate, status: newStatus }
                            : candidate
                    )
                );
                handleCloseVerdictModal();
            } else {
                console.error("Erreur lors de la mise à jour du statut :", result.error);
                alert(`Erreur: ${result.error}`); // Afficher une alerte à l'utilisateur
            }
        } catch (error) {
            console.error("Erreur inattendue :", error);
            alert("Erreur inattendue lors de la mise à jour du statut.");
        }
    };


    return (

        <div className="flex h-screen  bg-gray-100">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 w-20 bg-white shadow-md px-5 flex flex-col gap-4 md:w-64 h-screen z-10 ">
                {/* Logo */}
                <div className="flex justify-center mb-8 md:justify-start">
                    <Link
                        className="block text-teal-600"
                        href="/dashboard/recruter"
                        aria-label="Retour à l'accueil"
                    >
                        {/* Logo pour les grands écrans */}
                        <Image
                            src="/profile-app-logo.png"
                            width={120}
                            height={100}
                            alt="Logo Profile App"
                            className="hidden md:block"
                        />

                        {/* Logo pour les petits écrans */}
                        <Image
                            src="/logo.png"
                            width={80}
                            height={80}
                            alt="Logo Profile App"
                            className="block md:hidden mt-8"
                        />
                    </Link>
                </div>




                {/* Navigation */}
                <nav className="flex flex-col gap-2">
                    {[
                        { id: "candidates", label: "Candidats", icon: <UserSearch /> },
                        { id: "jobs", label: "Offres d'emploi", icon: <Briefcase /> },
                        { id: "candidatures", label: "Candidatures", icon: <UserCheck /> },
                        { id: "favorites", label: "Favoris", icon: <Star /> },
                        { id: "tutoriels", label: "Tutoriel", icon: <CircleHelp /> },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center gap-2 p-2 rounded-md ${activeTab === item.id ? "bg-teal-200" : "hover:bg-teal-100"
                                }`}
                            aria-label={item.label}
                        >
                            {item.icon}
                            <span className="hidden sm:inline">{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Bouton Publier une Offre */}
                <button
                    onClick={() => setShowJobForm(true)}
                    className="bg-teal-600 text-white p-2 rounded-md flex items-center gap-2"
                    aria-label="Publier une offre d'emploi"
                >
                    <PlusCircle />
                    <span className="hidden sm:inline">Publier une offre</span>
                </button>
            </aside>


            {/* Main Content */}
            <main className="flex-1 ml-20 p-3 md:ml-64">
                <div className=" sticky top-0 z-20 flex justify-between gap-4 rounded-md items-center px-4 py-3 mb-5 bg-white shadow">
                    {/* Search Input */}
                    <div className="flex gap-2 relative w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Rechercher un candidat..."
                            className="input border-gray-300 focus:border-teal-500 focus:ring-teal-500 focus:outline-none block w-full sm:text-sm rounded-md pr-10"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            aria-label="Rechercher un candidat"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    {/* Notifications and User Button */}
                    <div className="flex gap-4 items-center ">
                        {/* Notification Bell */}
                        <div className="relative mt-2 cursor-pointer"
                        onClick={() => setActiveTab("candidatures")}
                        >
                            <button aria-label="Notifications">
                                <Bell className="h-6 w-6 fill-gray-600 hover:fill-gray-800" />
                            </button>
                            {newApplicationsCount > 0 && (
                                <div className="absolute inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full -top-1 -right-1">
                                    {newApplicationsCount}
                                </div>
                            )}
                        </div>

                        {/* User Button */}
                        {isSignedIn && <UserButton />}
                    </div>
                </div>

                {activeTab === "jobs" ? (
                    // Affichage des offres d'emploi
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 pt-14">
                        {jobOffers.map((job) => (
                            <div
                                key={job.id}
                                className="bg-white p-4 shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                            >
                                <div className="flex justify-end space-x-2 mb-4">
                                    <button
                                        onClick={() => {
                                            setNewJob({
                                                id: job.id,
                                                jobTitle: job.jobTitle,
                                                companyName: job.companyName,
                                                salary: job.salary || "",
                                                description: job.description,
                                                locationJob: job.locationJob,
                                                typeJob: job.typeJob,
                                            });
                                            setEditingJob(job);
                                            setShowJobForm(true);
                                        }}
                                        aria-label={`Modifier l'offre ${job.jobTitle}`}
                                        className="p-2 text-green-600 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
                                    >
                                        <Pen className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => openConfirmationModal(job.id)}
                                        aria-label={`Supprimer l'offre ${job.jobTitle}`}
                                        className="p-2 text-red-600 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <h3 className="font-bold text-xl mb-2">{job.jobTitle}</h3>
                                <p className="text-gray-600 mb-1">{job.typeJob}</p>
                                <p className="text-sm text-gray-500 mb-1">{job.locationJob}</p>
                                {job.salary && <p className="text-sm text-gray-500 mb-2">{job.salary}</p>}
                                <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>

                                <button
                                    onClick={() => setPreviewJob(job)}
                                    className="w-full flex items-center justify-center gap-2 p-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                                >
                                    Prévisualiser <Eye className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                ) : activeTab === "candidatures" ? (
                    // Affichage des candidatures
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCandidates.length > 0 ? (
                            filteredCandidates.map((candidate) => (
                                <div
                                    key={candidate.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden"
                                >
                                    <div className="md:flex">
                                        <div className="md:w-2/5">
                                            <Image
                                                src={candidate.photoUrl || "/profile_default.jpg"}
                                                width={400}
                                                height={400}
                                                alt="Candidat Photo Profil"
                                                className="w-full h-48 md:h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-4 md:w-3/5">
                                            <h3 className="text-lg font-semibold text-gray-800">{candidate.fullName}</h3>
                                            <p className="text-gray-600 text-sm">{candidate.postSeeking}</p>
                                            <p className="text-gray-500 text-xs">{candidate.address}</p>
                                            <p className="text-gray-500 text-xs">{candidate.linkedin}</p>
                                            {/* Afficher l'intitulé de l'offre */}
                                            <p className="text-gray-500 text-sm mt-2">
                                                Offre postulée : <span className="font-medium text-gray-700">{candidate.jobTitle}</span>
                                            </p>
                                            <div className="mt-4 flex justify-end">
                                                <button
                                                    className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
                                                    onClick={() => window.location.href = `mailto:${candidate.email}`}
                                                >
                                                    Contacter
                                                </button>
                                                <button
                                                    className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm ml-2"
                                                    onClick={() => handleOpenVerdictModal(candidate)}
                                                >
                                                    Verdict
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center col-span-3 text-gray-500">Aucun candidat trouvé.</p>
                        )}
                    </div>

                ) : activeTab === "tutoriels" ? (
                    <div className="p-6 bg-gradient-to-br from-teal-50 to-white rounded-md shadow-xl overflow-hidden">
                        {/* Titre principal */}
                        <h2 className="text-3xl text-center text-teal-700 font-extrabold mb-6 tracking-tight">
                            Bienvenue dans l&apos;Espace Recruteur
                        </h2>

                        {/* Introduction */}
                        <p className="mb-8 text-lg text-justify text-gray-800 leading-relaxed">
                            Bienvenue dans votre Espace Recruteur ! Cet outil a été conçu pour vous offrir une expérience de recrutement optimisée et intuitive. En un coup d&apos;œil, découvrez les différentes sections : sur la gauche, la barre latérale vous permet de naviguer entre la recherche de candidats, la gestion de vos offres d&apos;emploi, et vos profils favoris. En haut, la barre de recherche et les filtres vous aident à cibler les candidats idéaux, tandis que le bouton &quot;Publier une offre&quot; vous permet de diffuser vos opportunités en un clin d&apos;œil. Prêt à trouver votre prochain talent ? Laissez-vous guider et exploitez toutes les fonctionnalités à votre disposition !
                        </p>

                        {/* Sections FAQ */}
                        <div className="space-y-6">
                            {/* Section : Comment publier une offre d'emploi ? */}
                            <details className="group rounded-lg bg-teal-50 border border-teal-200 overflow-hidden">
                                <summary className="flex items-center justify-between p-4 cursor-pointer transition-colors hover:bg-teal-100">
                                    <h3 className="text-lg font-semibold text-gray-900">Comment publier une offre d&apos;emploi ?</h3>
                                    <span className="relative w-5 h-5 shrink-0">
                                        <CirclePlus className="absolute inset-0 w-full h-full opacity-100 group-open:opacity-0 transition-opacity duration-200" />
                                        <CircleMinus className="absolute inset-0 w-full h-full opacity-0 group-open:opacity-100 transition-opacity duration-200" />
                                    </span>
                                </summary>
                                <div className="p-4 leading-relaxed text-gray-700">
                                    <p>En tant que recruteur, je souhaite publier une offre d&apos;emploi pour attirer des candidats qualifiés.</p>
                                    <p className="mt-2">Pour cela, cliquez sur le bouton <span className="font-semibold text-teal-600">&quot;Publier une offre&quot;</span> dans la barre latérale. Remplissez attentivement le formulaire avec toutes les informations nécessaires :</p>
                                    <ul className="list-disc ml-6 mt-3 space-y-2">
                                        <li>Titre du poste</li>
                                        <li>Description du poste</li>
                                        <li>Localisation</li>
                                        <li>Type de contrat</li>
                                        <li>Expérience requise</li>
                                    </ul>
                                    <p className="mt-3">Une fois le formulaire soumis, votre offre sera visible par les candidats.</p>
                                </div>
                            </details>

                            {/* Section : Comment rechercher des candidats ? */}
                            <details className="group rounded-lg bg-teal-50 border border-teal-200 overflow-hidden">
                                <summary className="flex items-center justify-between p-4 cursor-pointer transition-colors hover:bg-teal-100">
                                    <h3 className="text-lg font-semibold text-gray-900">Comment rechercher des candidats ?</h3>
                                    <span className="relative w-5 h-5 shrink-0">
                                        <CirclePlus className="absolute inset-0 w-full h-full opacity-100 group-open:opacity-0 transition-opacity duration-200" />
                                        <CircleMinus className="absolute inset-0 w-full h-full opacity-0 group-open:opacity-100 transition-opacity duration-200" />
                                    </span>
                                </summary>
                                <div className="p-4 leading-relaxed text-gray-700">
                                    <p>En tant que recruteur, je souhaite trouver rapidement des profils pertinents parmi la base de données.</p>
                                    <p className="mt-2">Pour cela, vous disposez de plusieurs outils :</p>
                                    <ul className="list-disc ml-6 mt-3 space-y-2">
                                        <li>La barre de recherche : entrez des mots-clés liés au poste, aux compétences ou au nom du candidat.</li>
                                        <li>Les filtres : affinez votre recherche par poste, localisation et niveau d&apos;expérience.</li>
                                    </ul>
                                    <p className="mt-3">Utilisez ces outils combinés pour une recherche efficace et ciblée.</p>
                                </div>
                            </details>

                            {/* Section : Comment ajouter un candidat aux favoris ? */}
                            <details className="group rounded-lg bg-teal-50 border border-teal-200 overflow-hidden">
                                <summary className="flex items-center justify-between p-4 cursor-pointer transition-colors hover:bg-teal-100">
                                    <h3 className="text-lg font-semibold text-gray-900">Comment ajouter un candidat aux favoris ?</h3>
                                    <span className="relative w-5 h-5 shrink-0">
                                        <CirclePlus className="absolute inset-0 w-full h-full opacity-100 group-open:opacity-0 transition-opacity duration-200" />
                                        <CircleMinus className="absolute inset-0 w-full h-full opacity-0 group-open:opacity-100 transition-opacity duration-200" />
                                    </span>
                                </summary>
                                <div className="p-4 leading-relaxed text-gray-700">
                                    <p>En tant que recruteur, je souhaite sauvegarder les profils qui m&apos;intéressent pour les consulter ultérieurement.</p>
                                    <p className="mt-2">Pour cela, sur chaque carte de candidat, cliquez sur l&apos;icône en forme de marque page (<BookmarkPlus className="inline align-middle text-teal-600" size={16} />). Le candidat sera automatiquement ajouté à votre liste de favoris, accessible depuis l&apos;onglet <span className="font-semibold text-teal-600">&quot;Favoris&quot;</span>.</p>
                                </div>
                            </details>

                            {/* Section : Comment modifier ou supprimer une offre d'emploi ? */}
                            <details className="group rounded-lg bg-teal-50 border border-teal-200 overflow-hidden">
                                <summary className="flex items-center justify-between p-4 cursor-pointer transition-colors hover:bg-teal-100">
                                    <h3 className="text-lg font-semibold text-gray-900">Comment modifier ou supprimer une offre d&apos;emploi ?</h3>
                                    <span className="relative w-5 h-5 shrink-0">
                                        <CirclePlus className="absolute inset-0 w-full h-full opacity-100 group-open:opacity-0 transition-opacity duration-200" />
                                        <CircleMinus className="absolute inset-0 w-full h-full opacity-0 group-open:opacity-100 transition-opacity duration-200" />
                                    </span>
                                </summary>
                                <div className="p-4 leading-relaxed text-gray-700">
                                    <p>En tant que recruteur, je souhaite pouvoir mettre à jour ou retirer une offre d&apos;emploi si nécessaire.</p>
                                    <p className="mt-2">Pour cela, rendez-vous dans l&apos;onglet <span className="font-semibold text-teal-600">&quot;Offres d&apos;emploi&quot;</span>. Survolez l&apos;offre que vous souhaitez modifier ou supprimer. Des icônes apparaîtront :</p>
                                    <ul className="list-disc ml-6 mt-3 space-y-2">
                                        <li><Pen className="inline align-middle text-teal-600" size={16} /> : pour modifier l&apos;offre.</li>
                                        <li><Trash2 className="inline align-middle text-teal-600" size={16} /> : pour supprimer l&apos;offre (une confirmation vous sera demandée).</li>
                                    </ul>
                                </div>
                            </details>
                        </div>
                    </div>

                ) : (
                    <>
                        {/* Search & Filters */}
                        <div className="mb-5">
                            <div className="flex flex-col md:flex-row items-start gap-3">
                                <button className="btn bg-teal-600 hover:bg-teal-700 text-white" aria-label="Ouvrir les filtres">
                                    <Filter className="mr-2 fill-white" size={20} />
                                    Filtres
                                </button>

                                <div className="flex flex-col md:flex-row gap-2 flex-1">
                                    <select
                                        className="select select-bordered flex-1"
                                        value={selectedPosition}
                                        onChange={(e) => setSelectedPosition(e.target.value)}
                                        aria-label="Sélectionner un poste"
                                    >
                                        <option value="">Poste</option>
                                        {candidates.map((postSeeking, index) => (
                                            <option key={index} value={postSeeking.postSeeking || ""}>
                                                {postSeeking.postSeeking}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        className="select select-bordered flex-1"
                                        value={selectedLocation}
                                        onChange={(e) => setSelectedLocation(e.target.value)}
                                        aria-label="Sélectionner une localisation"
                                    >
                                        <option value="">Localisation</option>
                                        {candidates.map((Address, index) => (
                                            <option key={index} value={Address.address}>
                                                {Address.address}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>


                        {/* Candidate Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredCandidates.length > 0 ? (
                                filteredCandidates.map((candidate) => (
                                    <div
                                        key={candidate.id}
                                        className="card bg-base-100 shadow-md relative"
                                    >
                                        <div className="card-body p-4">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="avatar">
                                                    <div className="w-20 rounded-full">
                                                        <Image
                                                            src="/profile_default.jpg"
                                                            width={80}
                                                            height={80}
                                                            className="rounded-full object-cover"
                                                            alt={`Profil de ${candidate.fullName}`}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h2 className="card-title text-lg">{candidate.fullName}</h2>
                                                    <p className="text-gray-600 text-sm">
                                                        {candidate.postSeeking}
                                                    </p>
                                                    <p className="text-gray-500 text-xs">{candidate.address}</p>
                                                    <p className="text-gray-500 text-xs">{candidate.email}</p>
                                                </div>
                                            </div>

                                            <div className="card-actions justify-end">
                                                <a
                                                    href={`mailto:${candidate.email}`}
                                                    className="btn btn-sm bg-teal-600 hover:bg-teal-700 text-white"
                                                    aria-label={`Contacter ${candidate.fullName} par email`}
                                                >
                                                    Contacter
                                                    <Mail className="w-4 h-4 ml-2 stroke-current" />
                                                </a>
                                                <button
                                                    className="btn btn-sm btn-outline btn-teal"
                                                    onClick={() => handleViewProfile(candidate)}
                                                    aria-label={`Voir le profil de ${candidate.fullName}`}
                                                >
                                                    Voir Profil
                                                    <Eye className="w-4 h-4 ml-2 stroke-current" />
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            className="absolute top-2 right-2"
                                            onClick={() => toggleFavorite(candidate.id)}
                                            aria-label={
                                                favorites.some((f) => f.id === candidate.id)
                                                    ? `Retirer ${candidate.fullName} des favoris`
                                                    : `Ajouter ${candidate.fullName} aux favoris`
                                            }
                                        >
                                            {favorites.some((f) => f.id === candidate.id) ? (
                                                <BookmarkMinus className="fill-teal-600" size={30} />
                                            ) : (
                                                <BookmarkPlus size={30} />
                                            )}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center col-span-3 text-gray-500">Aucun candidat trouvé.</p>
                            )}
                        </div>

                    </>
                )}

            </main>

            {/* Modal de confirmation de suppression */}
            {showConfirmationModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        {/* Titre */}
                        <h2 className="text-lg font-bold mb-4 text-center">Confirmer la suppression</h2>

                        {/* Message */}
                        <p className="text-gray-600 text-center mb-6">
                            Êtes-vous sûr de vouloir supprimer cette offre d&apos;emploi ?
                        </p>

                        {/* Actions */}
                        <div className="flex justify-between gap-4">
                            <button
                                onClick={() => setShowConfirmationModal(false)}
                                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={() => handleDeleteJob(jobToDelete!)}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* Modal de profil du candidat */}
            {selectedCandidate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-[90%] max-w-2xl relative shadow-lg">
                        {/* Bouton de fermeture */}
                        <button
                            onClick={handleCloseProfile}
                            className="absolute top-4 right-4 p-2 bg-slate-300 rounded-full hover:bg-gray-400 transition-colors"
                            aria-label="Fermer"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Informations du candidat */}
                        <div className="flex gap-4 items-center mb-6">
                            <div className="rounded-md w-96 h-96 overflow-hidden">
                                <Image
                                    src="/profile_default.jpg"
                                    width={100}
                                    height={100}
                                    alt="Photo de profil du candidat"
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h2 className="font-bold text-lg underline">Informations du Candidat</h2>
                                <p className="text-md text-gray-500 mb-1">Nom : {selectedCandidate.fullName}</p>
                                <p className="text-gray-500 mb-1">Poste recherché : {selectedCandidate.postSeeking}</p>
                                <p className="text-sm text-gray-500 mb-1">Adresse : {selectedCandidate.address}</p>
                                <p className="text-sm text-gray-500 mb-1">Email : {selectedCandidate.email}</p>
                                <p className="text-sm text-gray-500 mb-1">Numéro : {selectedCandidate.phone}</p>
                                <p className="text-sm text-gray-500 mb-1">Présentation : {selectedCandidate.description}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex  justify-end gap-4 mt-4">
                            <button
                                className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors sm:w-auto w-full"
                                aria-label={`Contacter ${selectedCandidate.fullName} par email`}
                            >
                                <a href={`mailto:${selectedCandidate.email}`} className="flex items-center gap-2 text-center">
                                    Contacter <Mail className="w-4 h-4" />
                                </a>
                            </button>
                            <button
                                onClick={handleDownloadCV}
                                className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors sm:w-auto w-full"
                                aria-label={`Télécharger le CV de ${selectedCandidate.fullName}`}
                            >
                                Télécharger CV <Download className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}



            {/* Verdict Modal */}
            {showVerdictModal && candidateToVerdict && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-[400px] relative">
                        {/* Bouton de fermeture */}
                        <button
                            onClick={handleCloseVerdictModal}
                            className="absolute top-2 right-2 p-2 bg-slate-300 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Titre */}
                        <h3 className="font-bold text-lg text-gray-800 mb-4 text-center">
                            Décision concernant {candidateToVerdict.fullName}
                        </h3>

                        {/* Message */}
                        <p className="text-gray-600 mb-6 text-center">
                            Veuillez choisir le statut de cette candidature.
                        </p>

                        {/* Actions */}
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                onClick={handleCloseVerdictModal}
                                className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={() => handleUpdateCandidateStatus("Rejeter")}
                                className="flex-1 px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-md"
                            >
                                Refuser
                            </button>
                            <button
                                onClick={() => handleUpdateCandidateStatus("Accepter")}
                                className="flex-1 px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded-md"
                            >
                                Accepter
                            </button>
                        </div>
                    </div>
                </div>
            )}



            {previewJob && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-[90%] max-w-2xl relative shadow-lg">
                        {/* Bouton de fermeture */}
                        <button
                            onClick={() => setPreviewJob(null)}
                            className="absolute top-4 right-4 p-2 bg-slate-300 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Titre */}
                        <h2 className="text-2xl font-bold mb-4 text-left">Poste recherché: {previewJob.jobTitle}</h2>

                        {/* Description */}
                        <div>
                            <h2 className="font-bold text-md underline ">Description de l&apos;offre</h2>
                            <p className="text-gray-700 mb-6 line-clamp-3">{previewJob.description}</p>

                        </div>
                        {/* Informations de l'offre */}
                        <div className="flex flex-wrap justify-between gap-2 mb-4">
                            <p className="text-sm text-gray-500 w-full sm:w-1/3">Localisation: {previewJob.locationJob}</p>
                            <p className="text-sm text-gray-500 w-full sm:w-1/3">Type de poste: {previewJob.typeJob}</p>
                            <p className="text-sm text-gray-500 w-full sm:w-1/3">Salaire: {previewJob.salary}</p>
                        </div>
                    </div>
                </div>
            )}

            {showJobForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg w-full max-w-sm relative shadow-lg">
                        {/* Bouton de fermeture */}
                        <button
                            onClick={() => {
                                setShowJobForm(false);
                                setEditingJob(null);
                                setNewJob({
                                    id: "",
                                    jobTitle: "",
                                    companyName: "",
                                    locationJob: "",
                                    typeJob: "",
                                    description: "",
                                    salary: "",
                                });
                            }}
                            className="absolute top-4 right-4 p-2 bg-slate-300 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Titre */}
                        <h3 className="text-xl font-bold mb-2 text-center">
                            {editingJob ? "Modifier l'offre" : "Nouvelle offre d'emploi"}
                        </h3>

                        {/* Formulaire */}
                        <form onSubmit={handleJobSubmit} className="space-y-2">
                            {/* Titre du poste */}
                            <div>
                                <label className="block mb-1 text-sm">Titre du poste</label>
                                <input
                                    type="text"
                                    required
                                    className="input input-bordered w-full"
                                    value={newJob.jobTitle}
                                    onChange={(e) => setNewJob({ ...newJob, jobTitle: e.target.value })}
                                />
                            </div>

                            {/* Nom de l'entreprise */}
                            <div>
                                <label className="block mb-1 text-sm">Nom de l&apos;entreprise</label>
                                <input
                                    type="text"
                                    required
                                    className="input input-bordered w-full"
                                    value={newJob.companyName}
                                    onChange={(e) => setNewJob({ ...newJob, companyName: e.target.value })}
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block mb-1 text-sm">Description</label>
                                <textarea
                                    required
                                    className="textarea textarea-bordered w-full h-20"
                                    value={newJob.description}
                                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                                />
                            </div>

                            {/* Localisation du poste */}
                            <div>
                                <label className="block mb-1 text-sm">Localisation du poste</label>
                                <input
                                    type="text"
                                    required
                                    className="input input-bordered w-full"
                                    value={newJob.locationJob}
                                    onChange={(e) => setNewJob({ ...newJob, locationJob: e.target.value })}
                                />
                            </div>

                            {/* Type de poste */}
                            <div>
                                <label className="block mb-1 text-sm">Type de poste</label>
                                <select
                                    required
                                    className="select select-bordered w-full"
                                    value={newJob.typeJob}
                                    onChange={(e) => setNewJob({ ...newJob, typeJob: e.target.value })}
                                >
                                    <option value="">Sélectionner le type de poste</option>
                                    <option value="CDI">CDI</option>
                                    <option value="CDD">CDD</option>
                                    <option value="Stage">Stage</option>
                                    <option value="Alternance">Alternance</option>
                                    <option value="Freelance">Freelance</option>
                                </select>
                            </div>

                            {/* Salaire */}
                            <div>
                                <label className="block mb-1 text-sm">Salaire</label>
                                <input
                                    type="text"
                                    required
                                    className="input input-bordered w-full"
                                    value={newJob.salary ?? ""}
                                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                                />
                            </div>

                            {/* Bouton de soumission */}
                            <button
                                type="submit"
                                className="btn bg-green-700 text-white text-lg w-full hover:bg-green-500"
                            >
                                {editingJob ? "Modifier l'offre" : "Publier l'offre"}
                            </button>
                        </form>
                    </div>
                </div>
            )}


        </div>


    );
};

export default RecruiterDashboard;


