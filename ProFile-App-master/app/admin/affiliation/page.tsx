"use client";
import { useState, useEffect } from "react";
import {
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Award,
  Calendar,
} from "lucide-react";
import {
  getAdminAffiliateStats,
  getPendingCommissions,
  markCommissionAsPaid,
  markMultipleCommissionsAsPaid,
  cancelCommission,
} from "@/app/actions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/app/components/Navbar";

type TopAffiliate = {
  id: string;
  code: string;
  clicks: number;
  conversions: number;
  totalEarned: number;
  user: {
    fullName: string;
    email: string;
  };
};

type RecentTransaction = {
  id: string;
  amount: number;
  commission: number;
  subscriptionType: string;
  status: string;
  createdAt: Date;
  affiliateLink: {
    code: string;
    user: {
      fullName: string;
      email: string;
    };
  };
  referredUser: {
    fullName: string;
    email: string;
  };
};

type AdminStats = {
  totalLinks: number;
  totalClicks: number;
  totalConversions: number;
  totalEarned: number;
  pendingCommissions: number;
  paidCommissions: number;
  topAffiliates: TopAffiliate[];
  recentTransactions: RecentTransaction[];
};

type PendingTransaction = {
  id: string;
  amount: number;
  commission: number;
  subscriptionType: string;
  createdAt: Date;
  affiliateLink: {
    code: string;
    user: {
      fullName: string;
      email: string;
      clerkId: string;
    };
  };
  referredUser: {
    fullName: string;
    email: string;
  };
};

export default function AdminAffiliationPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [pendingTransactions, setPendingTransactions] = useState<PendingTransaction[]>([]);
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "pending" | "top">("overview");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // Charger les statistiques globales
      const statsResult = await getAdminAffiliateStats();
      if (statsResult.success && statsResult.stats) {
        setStats(statsResult.stats);
      }

      // Charger les commissions en attente
      const pendingResult = await getPendingCommissions();
      if (pendingResult.success && pendingResult.transactions) {
        setPendingTransactions(pendingResult.transactions);
      }
    } catch (error) {
      console.error("Erreur chargement données admin:", error);
      toast.error("Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsPaid = async (transactionId: string) => {
    const result = await markCommissionAsPaid(transactionId);
    if (result.success) {
      toast.success("Commission marquée comme payée !");
      loadData(); // Recharger les données
    } else {
      toast.error(result.error || "Erreur lors du marquage");
    }
  };

  const handleMarkMultipleAsPaid = async () => {
    if (selectedTransactions.length === 0) {
      toast.warning("Sélectionnez au moins une transaction");
      return;
    }

    const result = await markMultipleCommissionsAsPaid(selectedTransactions);
    if (result.success) {
      toast.success(`${result.count} commissions marquées comme payées !`);
      setSelectedTransactions([]);
      loadData();
    } else {
      toast.error(result.error || "Erreur lors du marquage");
    }
  };

  const handleCancelCommission = async (transactionId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir annuler cette commission ?")) {
      return;
    }

    const result = await cancelCommission(transactionId);
    if (result.success) {
      toast.success("Commission annulée !");
      loadData();
    } else {
      toast.error(result.error || "Erreur lors de l'annulation");
    }
  };

  const toggleSelection = (transactionId: string) => {
    setSelectedTransactions((prev) =>
      prev.includes(transactionId)
        ? prev.filter((id) => id !== transactionId)
        : [...prev, transactionId]
    );
  };

  const selectAll = () => {
    if (selectedTransactions.length === pendingTransactions.length) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(pendingTransactions.map((t) => t.id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="loading loading-spinner loading-lg text-teal-600"></div>
            <p className="text-gray-600">Chargement du dashboard admin...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Navbar />
      <ToastContainer position="bottom-right" autoClose={3000} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mt-20">
        {/* En-tête */}
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-teal-700 mb-2">
            Administration des Affiliations
          </h1>
          <p className="text-gray-600">
            Gérez les parrainages et les commissions
          </p>
        </div>

        {/* Statistiques globales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Liens</p>
                <p className="text-3xl font-bold text-blue-600">{stats?.totalLinks || 0}</p>
              </div>
              <Users className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Clics</p>
                <p className="text-3xl font-bold text-green-600">{stats?.totalClicks || 0}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Conversions</p>
                <p className="text-3xl font-bold text-purple-600">{stats?.totalConversions || 0}</p>
              </div>
              <Award className="w-10 h-10 text-purple-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Commissions</p>
                <p className="text-2xl font-bold text-teal-600">
                  {stats?.totalEarned?.toLocaleString() || "0"} FCFA
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  En attente : {stats?.pendingCommissions?.toLocaleString() || "0"} FCFA
                </p>
              </div>
              <DollarSign className="w-10 h-10 text-teal-500" />
            </div>
          </div>
        </div>

        {/* Onglets */}
        <div className="tabs tabs-boxed bg-white mb-6 shadow-md">
          <a
            className={`tab ${activeTab === "overview" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Vue d&apos;ensemble
          </a>
          <a
            className={`tab ${activeTab === "pending" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            Commissions en attente ({pendingTransactions.length})
          </a>
          <a
            className={`tab ${activeTab === "top" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("top")}
          >
            Top Parrains
          </a>
        </div>

        {/* Contenu des onglets */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Transactions récentes */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Transactions Récentes
              </h3>
              <div className="overflow-x-auto">
                <table className="table w-full table-zebra">
                  <thead>
                    <tr className="bg-teal-50">
                      <th>Date</th>
                      <th>Parrain</th>
                      <th>Filleul</th>
                      <th>Type</th>
                      <th>Commission</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats?.recentTransactions.slice(0, 10).map((t) => (
                      <tr key={t.id}>
                        <td className="text-sm">
                          {new Date(t.createdAt).toLocaleDateString("fr-FR")}
                        </td>
                        <td className="text-sm">{t.affiliateLink.user.fullName}</td>
                        <td className="text-sm">{t.referredUser.fullName}</td>
                        <td className="text-sm">
                          <span className="badge badge-outline">{t.subscriptionType}</span>
                        </td>
                        <td className="text-sm font-bold text-teal-600">
                          {t.commission.toLocaleString()} FCFA
                        </td>
                        <td>
                          <span
                            className={`badge badge-sm ${
                              t.status === "PAID"
                                ? "badge-success"
                                : t.status === "PENDING"
                                ? "badge-warning"
                                : "badge-error"
                            }`}
                          >
                            {t.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "pending" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Commissions en Attente de Paiement
              </h3>
              {selectedTransactions.length > 0 && (
                <button
                  onClick={handleMarkMultipleAsPaid}
                  className="btn btn-sm bg-green-600 text-white hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Marquer {selectedTransactions.length} comme payée(s)
                </button>
              )}
            </div>

            {pendingTransactions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className="bg-teal-50">
                      <th>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={selectedTransactions.length === pendingTransactions.length}
                          onChange={selectAll}
                        />
                      </th>
                      <th>Date</th>
                      <th>Parrain</th>
                      <th>Code</th>
                      <th>Filleul</th>
                      <th>Type</th>
                      <th>Montant</th>
                      <th>Commission</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingTransactions.map((t) => (
                      <tr key={t.id} className="hover">
                        <td>
                          <input
                            type="checkbox"
                            className="checkbox checkbox-sm"
                            checked={selectedTransactions.includes(t.id)}
                            onChange={() => toggleSelection(t.id)}
                          />
                        </td>
                        <td className="text-sm">
                          {new Date(t.createdAt).toLocaleDateString("fr-FR")}
                        </td>
                        <td className="text-sm">
                          <div>
                            <p className="font-medium">{t.affiliateLink.user.fullName}</p>
                            <p className="text-xs text-gray-500">{t.affiliateLink.user.email}</p>
                          </div>
                        </td>
                        <td className="text-sm">
                          <span className="font-mono text-teal-600">{t.affiliateLink.code}</span>
                        </td>
                        <td className="text-sm">
                          <div>
                            <p className="font-medium">{t.referredUser.fullName}</p>
                            <p className="text-xs text-gray-500">{t.referredUser.email}</p>
                          </div>
                        </td>
                        <td className="text-sm">
                          <span className="badge badge-outline">{t.subscriptionType}</span>
                        </td>
                        <td className="text-sm font-medium">{t.amount.toLocaleString()} FCFA</td>
                        <td className="text-sm font-bold text-teal-600">
                          {t.commission.toLocaleString()} FCFA
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleMarkAsPaid(t.id)}
                              className="btn btn-xs bg-green-600 text-white hover:bg-green-700"
                              title="Marquer comme payé"
                            >
                              <CheckCircle className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleCancelCommission(t.id)}
                              className="btn btn-xs bg-red-600 text-white hover:bg-red-700"
                              title="Annuler"
                            >
                              <XCircle className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
                <p className="text-gray-500">Aucune commission en attente !</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "top" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Top 10 Parrains
            </h3>
            <div className="space-y-4">
              {stats?.topAffiliates.map((affiliate, index) => (
                <div
                  key={affiliate.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                        index === 0
                          ? "bg-yellow-500"
                          : index === 1
                          ? "bg-gray-400"
                          : index === 2
                          ? "bg-orange-600"
                          : "bg-teal-600"
                      }`}
                    >
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{affiliate.user.fullName}</p>
                      <p className="text-xs text-gray-500">{affiliate.user.email}</p>
                      <p className="text-xs text-gray-500 font-mono mt-1">Code : {affiliate.code}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-teal-600">
                      {affiliate.totalEarned.toLocaleString()} FCFA
                    </p>
                    <p className="text-xs text-gray-500">
                      {affiliate.conversions} conversion(s) · {affiliate.clicks} clic(s)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}