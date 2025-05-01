import React from "react";

interface Job {
  id: string | number;
  jobTitle: string;
  companyName: string;
  locationJob: string;
  typeJob: string;
  salary: string;
  datePublished: string | Date;
}

interface OpportunitiesSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  opportunities: Job[];
  sortedRecentOpportunities: Job[];
  favorites: (string | number)[];
  setSelectedOpportunity: (job: Job) => void;
  handleSort: (value: string) => void;
}

const OpportunitiesSidebar: React.FC<OpportunitiesSidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  opportunities,
  sortedRecentOpportunities,
  favorites,
  setSelectedOpportunity,
  handleSort,
}) => {
  return (
    <aside
      className={`${sidebarOpen ? "block" : "hidden"} md:block md:w-1/4 h-full overflow-y-auto bg-white p-4 rounded-lg shadow-md`}
    >
      {/* Section "Nouveautés" */}
      <div className="flex flex-col bg-white z-20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-teal-600">Nouveautés</h3>
          <p className="text-sm text-gray-500">{opportunities.length} Opportunités</p>
        </div>
        {/* Bouton toggle sidebar sur mobile */}
        <button
          className="md:hidden p-2 mb-2 bg-teal-500 text-white rounded"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "Opportunites" : "Favoris"}
        </button>
        <select
          className="select select-bordered w-full mb-4"
          onChange={(e) => handleSort(e.target.value)}
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
              <p className="text-xs text-gray-600">
                {job.companyName} - {job.locationJob}
              </p>
              <p className="text-xs text-gray-600">Type: {job.typeJob}</p>
              <p className="text-xs text-gray-600">Salaire: {job.salary}</p>
              <p className="text-xs text-gray-600">
                Date: {new Date(job.datePublished).toLocaleDateString()}
              </p>
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
                  <p className="text-xs text-gray-600">
                    {job.companyName} - {job.locationJob}
                  </p>
                  <p className="text-xs text-gray-600">Type: {job.typeJob}</p>
                  <p className="text-xs text-gray-600">Salaire: {job.salary}</p>
                  <p className="text-xs text-gray-600">
                    Date:{" "}
                    {typeof job.datePublished === "string"
                      ? new Date(job.datePublished).toLocaleDateString()
                      : job.datePublished.toLocaleDateString()}
                  </p>
                </div>
              ))}
            {favorites.length === 0 && (
              <p className="text-sm text-gray-500">Aucun favori enregistré.</p>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default OpportunitiesSidebar;
