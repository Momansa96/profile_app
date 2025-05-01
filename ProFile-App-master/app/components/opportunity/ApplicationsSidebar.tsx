import React from "react";

interface Job {
  id: string | number;
  jobTitle: string;
  companyName: string;
  locationJob: string;
}

interface Application {
  emploiId: string | number;
  status: "En cours" | "Accepter" | "Rejeter" | string;
}

interface ApplicationsSidebarProps {
  opportunities: Job[];
  applications: Application[];
  handleCancelApply: (jobId: string | number) => void;
}

const statusStyles: Record<string, string> = {
  "En cours": "text-orange-500 border-orange-500 bg-orange-100",
  "Accepter": "text-green-500 border-green-500 bg-green-100",
  "Rejeter": "text-red-500 border-red-500 bg-red-100",
};

const ApplicationsSidebar: React.FC<ApplicationsSidebarProps> = ({
  opportunities,
  applications,
  handleCancelApply,
}) => {
  // On filtre les jobs pour lesquels il y a une application
  const appliedJobs = opportunities.filter((job) =>
    applications.some((app) => app.emploiId === job.id)
  );

  return (
    <aside className="hidden md:block md:w-1/4 h-full overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-teal-600">Suivre mes candidatures</h3>
      {appliedJobs.length > 0 ? (
        appliedJobs.map((job) => {
          const currentApp = applications.find((app) => app.emploiId === job.id);
          if (!currentApp) return null;

          const baseClasses =
            "text-sm rounded-badge px-2 py-1 border-2 absolute top-1 right-1 font-medium";
          const statusClasses =
            statusStyles[currentApp.status] ||
            "text-gray-500 border-gray-500 bg-gray-300";

          return (
            <div
              key={job.id}
              className="bg-white p-3 rounded-md shadow-sm mb-3 relative overflow-hidden"
            >
              <span className={`${baseClasses} ${statusClasses}`}>
                {currentApp.status}
              </span>
              <div className="my-8">
                <h4 className="text-sm font-medium text-gray-800">
                  {job.jobTitle}
                </h4>
                <p className="text-xs text-gray-600">
                  {job.companyName} - {job.locationJob}
                </p>
              </div>
              <span
                className="text-md px-2 cursor-pointer py-1 rounded-md absolute -left-1 -bottom-1 bg-red-400"
                onClick={() => handleCancelApply(job.id)}
              >
                Annuler
              </span>
            </div>
          );
        })
      ) : (
        <p className="text-sm text-gray-500">
          Aucune candidature pour le moment.
        </p>
      )}
    </aside>
  );
};

export default ApplicationsSidebar;
