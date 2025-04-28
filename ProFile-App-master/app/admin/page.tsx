'use client';

import { useState, useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import React from 'react';
import Image from 'next/image';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const initialUsers = Array.from({ length: 35 }, (_, i) => ({
  id: i + 1,
  name: `Utilisateur ${i + 1}`,
  email: `user${i + 1}@example.com`,
  status: i % 3 === 0 ? 'Suspendu' : 'Actif',
  inscriptions: 10 + (i % 5),
}));

const chartData = {
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai'],
  datasets: [
    {
      label: 'Inscriptions',
      data: [12, 19, 8, 15, 23],
      backgroundColor: '#28A745',
    },
  ],
};

const stats = [
  { label: 'Utilisateurs inscrits', value: 420 },
  { label: 'Recruteurs actifs', value: 45 },
  { label: 'CV publiés', value: 300 },
  { label: 'Candidatures envoyées', value: 780 },
];

const notifications: { type: keyof typeof notifIcons; message: string; date: string }[] = [
  { type: 'inscription', message: 'Nouvelle inscription : Utilisateur 25', date: '2025-04-08' },
  { type: 'cv', message: 'CV publié : Utilisateur 17', date: '2025-04-07' },
  { type: 'offre', message: 'Offre postée par Recruteur 4', date: '2025-04-06' },
];

// Icônes simples pour notifications (tu peux remplacer par des SVG ou libs)
const notifIcons = {
  inscription: '🆕',
  cv: '📄',
  offre: '📢',
};

function useOutsideAlerter(ref: React.RefObject<HTMLElement | null>, callback: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, callback]);
}

export default function AdminDashboard() {
  const tabs = ['Analytics', 'Utilisateurs', 'Notifications', 'Paramètres'];
  const [activeTab, setActiveTab] = useState('Analytics');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const [users, setUsers] = useState(initialUsers);

  // Modals state
  const [modalViewUser, setModalViewUser] = useState<typeof initialUsers[0] | null>(null); 
  const [modalModifyUser, setModalModifyUser] = useState<typeof initialUsers[0] | null>(null); 

  // UserButton modal
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(userMenuRef, () => setUserMenuOpen(false));

  // Sidebar logout moved to bottom

  // Filter & paginate users
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const maxPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Actions
  const toggleUserStatus = (id: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === 'Actif' ? 'Suspendu' : 'Actif' }
          : u
      )
    );
    setModalModifyUser(null);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="flex flex-col justify-between w-64 bg-teal-800 text-white p-6">
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Admin</h2>
            <UserButton open={userMenuOpen} setOpen={setUserMenuOpen} ref={userMenuRef} />
          </div>
          <nav className="space-y-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`block w-full text-left px-4 py-2 rounded transition ${
                  activeTab === tab ? 'bg-white text-teal-800 font-semibold' : 'hover:bg-teal-700'
                }`}
                aria-current={activeTab === tab ? 'page' : undefined}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        {activeTab === 'Analytics' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Statistiques Générales</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-4 rounded shadow border text-center">
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-xl font-bold text-teal-700">{stat.value}</p>
                </div>
              ))}
            </div>

            <Bar data={chartData} />
          </div>
        )}

        {activeTab === 'Utilisateurs' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Liste des utilisateurs</h3>
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              className="mb-4 p-2 border rounded w-full"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              aria-label="Recherche utilisateur"
            />
            <table className="w-full border text-sm bg-white rounded shadow">
              <thead>
                <tr className="bg-teal-600 text-white">
                  <th className="p-2">ID</th>
                  <th className="p-2">Nom</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Statut</th>
                  <th className="p-2">Inscriptions</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-gray-500">
                      Aucun utilisateur trouvé.
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((u) => (
                    <tr key={u.id} className="border-t hover:bg-gray-50">
                      <td className="p-2">{u.id}</td>
                      <td className="p-2">{u.name}</td>
                      <td className="p-2">{u.email}</td>
                      <td className="p-2">
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                            u.status === 'Actif'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="p-2">{u.inscriptions}</td>
                      <td className="p-2 space-x-2">
                        <button
                          onClick={() => setModalViewUser(u)}
                          className="text-blue-600 btn bg-blue-200 hover:bg-blue-400 rounded px-2 "
                          aria-label={`Voir détails de ${u.name}`}
                        >
                          Voir Profile
                        </button>
                        <button
                          onClick={() => setModalModifyUser(u)}
                          className="text-yellow-600 btn bg-yellow-200 hover:bg-yellow-200 rounded px-2 "
                          aria-label={`Modifier statut de ${u.name}`}
                        >
                          Modifier
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm">
                Page {page} sur {maxPages}
              </p>
              <div className="space-x-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className={`px-3 py-1 border rounded bg-white hover:bg-gray-100 ${
                    page === 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Précédent
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(maxPages, p + 1))}
                  disabled={page === maxPages}
                  className={`px-3 py-1 border rounded bg-white hover:bg-gray-100 ${
                    page === maxPages ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Suivant
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Notifications' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Notifications récentes</h3>
            <ul className="space-y-4 max-w-xl">
              {notifications.length === 0 ? (
                <p className="text-gray-500">Aucune notification récente.</p>
              ) : (
                notifications.map((notif, i) => (
                  <li
                    key={i}
                    className={`flex items-center space-x-4 p-4 rounded shadow border ${
                      notif.type === 'inscription'
                        ? 'bg-green-50 border-green-200'
                        : notif.type === 'cv'
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-yellow-50 border-yellow-200'
                    }`}
                  >
                    <div
                      className={`text-2xl ${
                        notif.type === 'inscription'
                          ? 'text-green-600'
                          : notif.type === 'cv'
                          ? 'text-blue-600'
                          : 'text-yellow-600'
                      }`}
                      aria-hidden="true"
                    >
                      {notifIcons[notif.type]}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{notif.message}</p>
                      <p className="text-sm text-gray-500">{notif.date}</p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}

        {activeTab === 'Paramètres' && (
          <div className="max-w-xl">
            <h3 className="text-xl font-semibold mb-4">Paramètres de la plateforme</h3>
            <form className="space-y-6 bg-white p-6 rounded shadow border">
              <div>
                <label htmlFor="siteName" className="block font-medium mb-1">
                  Nom du site
                </label>
                <input
                  id="siteName"
                  type="text"
                  defaultValue="Mon Super Site"
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label htmlFor="maxUsers" className="block font-medium mb-1">
                  Nombre maximum d&apos;utilisateurs
                </label>
                <input
                  id="maxUsers"
                  type="number"
                  defaultValue={1000}
                  min={1}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Activer les inscriptions</label>
                <select className="w-full border rounded p-2" defaultValue="oui">
                  <option value="oui">Oui</option>
                  <option value="non">Non</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800 transition"
              >
                Enregistrer
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Modal Voir utilisateur */}
      {modalViewUser && (
        <Modal onClose={() => setModalViewUser(null)} title="Détails utilisateur">
          <div className="space-y-2">
            <p><strong>ID :</strong> {modalViewUser.id}</p>
            <p><strong>Nom :</strong> {modalViewUser.name}</p>
            <p><strong>Email :</strong> {modalViewUser.email}</p>
            <p><strong>Statut :</strong> {modalViewUser.status}</p>
            <p><strong>Inscriptions :</strong> {modalViewUser.inscriptions}</p>
          </div>
          <button
            onClick={() => setModalViewUser(null)}
            className="mt-4 bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800 transition"
          >
            Fermer
          </button>
        </Modal>
      )}

      {/* Modal Modifier utilisateur */}
      {modalModifyUser && (
        <Modal onClose={() => setModalModifyUser(null)} title={`Modifier ${modalModifyUser.name}`}>
          <p>
            Voulez-vous {modalModifyUser.status === 'Actif' ? 'suspendre' : 'réactiver'} ce compte ?
          </p>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => toggleUserStatus(modalModifyUser.id)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              {modalModifyUser.status === 'Actif' ? 'Suspendre' : 'Réactiver'}
            </button>
            <button
              onClick={() => setModalModifyUser(null)}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Annuler
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// Composant Modal générique
function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded p-6 max-w-md w-full shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title" className="text-xl font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}

// UserButton avec photo admin et menu flottant
// Define the UserButtonProps interface
interface UserButtonProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const UserButton = React.forwardRef<HTMLDivElement, UserButtonProps>(({ open, setOpen }, ref) => {
UserButton.displayName = 'UserButton';
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white rounded"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Menu utilisateur"
      >
        <Image
          src="/Avatar1.jpg" // Replace with your image path
          alt="Photo admin"
          width={40}
          height={40}
          className="w-8 h-8 rounded-full"
        />
        <span className="font-semibold">Admin</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg border z-50">
          <button
            onClick={() => alert('Profil')}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Profil
          </button>
          <button
            onClick={() => alert('Paramètres')}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Paramètres
          </button>
          <button
            onClick={() => alert('Déconnexion')}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
          >
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
});
