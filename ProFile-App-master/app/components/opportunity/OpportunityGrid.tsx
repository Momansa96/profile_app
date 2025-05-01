import React from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

interface Job {
  id: string | number;
  jobTitle: string;
  companyName: string;
  locationJob: string;
  description: string;
  salary: string;
  datePublished: string | Date;
}

interface OpportunityGridProps {
  filteredOpportunities: Job[];
  favorites: (string | number)[];
  toggleFavorite: (jobId: string | number) => void;
  setSelectedOpportunity: (job: Job) => void;
}

const OpportunityGrid: React.FC<OpportunityGridProps> = ({
  filteredOpportunities,
  favorites,
  toggleFavorite,
  setSelectedOpportunity,
}) => {
  return (
    <div className="grid md:grid-cols-1 gap-4 scrollable-preview no-scrollbar overflow-hidden">
      {filteredOpportunities.length > 0 ? (
        filteredOpportunities.map((job) => (
          <div
            key={job.id}
            className="card bg-white shadow-md cursor-pointer hover:shadow-lg transition p-4 rounded-lg"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">{job.jobTitle}</h2>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(job.id);
                }}
                className="text-gray-600 hover:text-teal-500"
              >
                {favorites.includes(job.id) ? (
                  <BookmarkCheck size={24} fill="teal" />
                ) : (
                  <Bookmark size={24} />
                )}
              </button>
            </div>
            <p className="text-sm text-gray-600">
              {job.companyName} - {job.locationJob}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              {job.description.substring(0, 60)}...
            </p>
            <p className="text-teal-600 font-medium mt-1">{job.salary}</p>
            <p className="text-gray-500 text-sm mt-1">
              Date de publication:{" "}
              {typeof job.datePublished === "string"
                ? new Date(job.datePublished).toLocaleDateString()
                : job.datePublished.toLocaleDateString()}
            </p>
            <button
              className="text-white text-sm mt-2 bg-teal-600 p-2 rounded-md"
              onClick={() => setSelectedOpportunity(job)}
            >
              Visualiser l&apos;offre
            </button>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">Aucune opportunité trouvée.</p>
      )}
    </div>
  );
};

export default OpportunityGrid;
