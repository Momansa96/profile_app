"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Copy, Check, TrendingUp, Users, Gift, Share2, AlertCircle } from "lucide-react";
import { generateAffiliateLink, getAffiliateStats } from "@/app/actions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/app/components/Navbar";

type AffiliateTransaction = {
  id: string;
  createdAt: Date;
  referredUser: {
    fullName: string;
    email: string;
  };
  subscriptionType: string;
  amount: number;
  commission: number;
  status: string;
};

type AffiliateStats = {
  code: string;
  clicks: number;
  conversions: number;
  totalEarned: number;
  pendingAmount: number;
  transactions: AffiliateTransaction[];
};

export default function ParrainagePage() {
  const { user } = useUser();
  const clerkId = user?.id;
  const [affiliateUrl, setAffiliateUrl] = useState("");
  const [affiliateCode, setAffiliateCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<AffiliateStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAffiliateData() {
      if (!clerkId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log("🔍 Chargement des données d'affiliation pour:", clerkId);

        // Générer/récupérer le lien
        const linkResult = await generateAffiliateLink(clerkId);
        console.log("📊 Résultat génération lien:", linkResult);

        if (linkResult.success && linkResult.url && linkResult.code) {
          setAffiliateUrl(linkResult.url);
          setAffiliateCode(linkResult.code);
          console.log("✅ Lien généré:", linkResult.url);
        } else {
          const errorMsg = linkResult.error || "Impossible de générer votre lien d'affiliation";
          setError(errorMsg);
          toast.error(errorMsg);
          console.error("❌ Erreur génération lien:", errorMsg);
        }

        // Charger les stats
        const statsResult = await getAffiliateStats(clerkId);
        console.log("📊 Résultat stats:", statsResult);

        if (statsResult.success && statsResult.stats) {
          setStats(statsResult.stats);
          console.log("✅ Stats chargées:", statsResult.stats);
        } else {
          console.warn("⚠️ Stats non disponibles:", statsResult.error);
        }
      } catch (error) {
        console.error("❌ Erreur chargement données affiliation:", error);
        const errorMsg = error instanceof Error ? error.message : "Erreur inconnue";
        setError(errorMsg);
        toast.error("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    }

    loadAffiliateData();
  }, [clerkId]);

  const copyToClipboard = () => {
    if (!affiliateUrl) {
      toast.error("Aucun lien à copier");
      return;
    }
    navigator.clipboard.writeText(affiliateUrl);
    setCopied(true);
    toast.success("Lien copié dans le presse-papier !");
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="h-screen w-full">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="loading loading-spinner loading-lg text-teal-600"></div>
            <p className="text-gray-600">Chargement de votre espace de parrainage...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full no-scrollbar">
      <Navbar />
      <ToastContainer position="bottom-right" autoClose={3000} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mt-14">
        {/* En-tête */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Gift className="w-8 h-8 text-teal-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-teal-700">
              Programme de Parrainage
            </h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            Partagez ProFile-App et gagnez 10% de cashback sur chaque abonnement !
          </p>
        </div>

        {/* Affichage d'erreur si migration non appliquée */}
        {error && (
          <div className="alert alert-error mb-6">
            <AlertCircle className="w-5 h-5" />
            <div>
              <h3 className="font-bold">Erreur de configuration</h3>
              <div className="text-sm">{error}</div>
              <div className="text-xs mt-2">
                💡 Si vous voyez cette erreur, la migration de la base de données n&apos;a probablement pas été appliquée.
                Exécutez : <code className="bg-black/20 px-2 py-1 rounded">npx prisma db push</code>
              </div>
            </div>
          </div>
        )}

        {/* Section Lien d'affiliation */}
        {affiliateUrl && (
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-4 sm:p-6 rounded-lg shadow-md mb-6 border border-teal-200">
            <div className="flex items-center gap-2 mb-3">
              <Share2 className="w-5 h-5 text-teal-600" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                Votre Lien de Parrainage Unique
              </h2>
            </div>

            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              Partagez ce lien et gagnez{" "}
              <strong className="text-teal-700">10% de cashback</strong> sur chaque
              abonnement Premium acheté via votre lien !
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={affiliateUrl}
                readOnly
                className="input input-bordered flex-1 bg-white text-sm font-mono"
              />
              <button
                onClick={copyToClipboard}
                className="btn bg-teal-600 text-white hover:bg-teal-700 w-full sm:w-auto"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" /> Copié !
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" /> Copier
                  </>
                )}
              </button>
            </div>

            <div className="mt-4 p-3 bg-white rounded-md border border-teal-300">
              <p className="text-xs sm:text-sm text-gray-600">
                Code de parrainage :{" "}
                <span className="font-mono font-bold text-teal-700 ml-2">
                  {affiliateCode || stats?.code || "Chargement..."}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Clics */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs sm:text-sm mb-1">
                  Clics sur votre lien
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {stats?.clicks ?? 0}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
            </div>
          </div>

          {/* Conversions */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs sm:text-sm mb-1">
                  Abonnements vendus
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">
                  {stats?.conversions ?? 0}
                </p>
              </div>
              <Users className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
            </div>
          </div>

          {/* Cashback Total */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-teal-500 hover:shadow-lg transition sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs sm:text-sm mb-1">
                  Cashback Total
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-teal-600">
                  {stats?.totalEarned?.toLocaleString() ?? "0"} FCFA
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  En attente : {stats?.pendingAmount?.toLocaleString() ?? "0"} FCFA
                </p>
              </div>
              <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-teal-500" />
            </div>
          </div>
        </div>

        {/* Historique des transactions */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
            Historique des Parrainages
          </h3>

          {stats?.transactions && stats.transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table w-full table-zebra">
                <thead>
                  <tr className="bg-teal-50">
                    <th className="text-xs sm:text-sm">Date</th>
                    <th className="text-xs sm:text-sm">Filleul</th>
                    <th className="text-xs sm:text-sm hidden sm:table-cell">Offre</th>
                    <th className="text-xs sm:text-sm">Montant</th>
                    <th className="text-xs sm:text-sm">Cashback</th>
                    <th className="text-xs sm:text-sm">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover">
                      <td className="text-xs sm:text-sm">
                        {new Date(transaction.createdAt).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="text-xs sm:text-sm">
                        <div>
                          <p className="font-medium">{transaction.referredUser.fullName}</p>
                          <p className="text-xs text-gray-500 hidden sm:block">
                            {transaction.referredUser.email}
                          </p>
                        </div>
                      </td>
                      <td className="text-xs sm:text-sm hidden sm:table-cell">
                        <span className="badge badge-outline">
                          {transaction.subscriptionType}
                        </span>
                      </td>
                      <td className="text-xs sm:text-sm font-medium">
                        {transaction.amount.toLocaleString()} FCFA
                      </td>
                      <td className="text-xs sm:text-sm font-bold text-teal-600">
                        +{transaction.commission.toLocaleString()} FCFA
                      </td>
                      <td>
                        <span
                          className={`badge badge-sm ${
                            transaction.status === "PAID"
                              ? "badge-success"
                              : transaction.status === "PENDING"
                              ? "badge-warning"
                              : "badge-error"
                          }`}
                        >
                          {transaction.status === "PAID"
                            ? "Payé"
                            : transaction.status === "PENDING"
                            ? "En attente"
                            : "Annulé"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-sm sm:text-base">
                Aucun parrainage pour le moment.
              </p>
              <p className="text-gray-400 text-xs sm:text-sm mt-2">
                Commencez à partager votre lien pour gagner des commissions !
              </p>
            </div>
          )}
        </div>

        {/* Section Comment ça marche */}
        <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border border-blue-200">
          <h3 className="text-base sm:text-lg font-semibold mb-3 text-blue-900 flex items-center gap-2">
            💡 Comment ça marche ?
          </h3>
          <ol className="list-decimal ml-4 sm:ml-6 space-y-2 text-gray-700 text-sm sm:text-base">
            <li>
              <strong>Partagez</strong> votre lien unique avec vos contacts (amis,
              réseaux sociaux, email, etc.)
            </li>
            <li>
              Vos filleuls <strong>s&apos;inscrivent</strong> via votre lien et{" "}
              <strong>achètent</strong> un abonnement Premium (3000 ou 5000 FCFA)
            </li>
            <li>
              Vous gagnez{" "}
              <strong className="text-teal-700">instantanément 10% de cashback</strong>{" "}
              sur chaque vente
            </li>
            <li>
              Le cashback est <strong>versé chaque mois</strong> sur votre compte Mobile
              Money
            </li>
          </ol>

          <div className="mt-4 p-3 bg-white rounded-md border-l-4 border-teal-500">
            <p className="text-xs sm:text-sm text-gray-600">
              <strong>Exemple :</strong> Si votre filleul achète l&apos;offre Candidat à 3000
              FCFA, vous gagnez{" "}
              <span className="font-bold text-teal-700">300 FCFA</span> de cashback !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}