/**
 * Point d'entrée central pour toutes les actions server
 * Ce fichier réexporte toutes les fonctions depuis les modules thématiques
 */

// Actions utilisateur
export { checkAndAddUser } from "./user";

// Actions CV
export {
  uploadImage,
  saveCvData,
  getCvData,
  checkCvExists,
} from "./cv";

// Actions emplois
export { getJobs } from "./jobs";

// Actions favoris
export {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "./favorites";

// Actions candidatures
export {
  getApplications,
  addApplication,
  removeApplication,
} from "./applications";

// Actions recruteur - Offres d'emploi
export {
  createJobOffer,
  updateJobOffer,
  deleteJobOffer,
  getAllJobOffers,
} from "./recruiter/jobs";

// Actions recruteur - Candidats
export {
  getDataJober,
  getCandidateFavorites,
  addCandidateFavorite,
  removeCandidateFavorite,
  getJobApplications,
  updateCandidateStatus,
} from "./recruiter/candidates";

// Actions affiliation - Liens
export {
  generateAffiliateLink,
  trackAffiliateClick,
} from "./affiliation/link";

// Actions affiliation - Statistiques
export {
  getAffiliateStats,
} from "./affiliation/stats";

// Actions affiliation - Transactions
export {
  recordAffiliateSale,
} from "./affiliation/transaction";

// Actions affiliation - Administration
export {
  getAdminAffiliateStats,
  getPendingCommissions,
  markCommissionAsPaid,
  markMultipleCommissionsAsPaid,
  cancelCommission,
} from "./affiliation/admin";

// Actions abonnements
export {
  createSubscription,
  checkActiveSubscription,
} from "./subscription";
